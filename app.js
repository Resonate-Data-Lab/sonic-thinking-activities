/*
  Sonic Activities - all the JavaScript.

  Four jobs:
    1. routing   - which screen to show, based on the URL hash
    2. filtering - narrowing the activities by time, topic and social setting
    3. building the activity page, including working out related activities
    4. talking to Supabase - reading and posting responses, sending suggestions

  I used the hash (#/browse) rather than real URLs so the whole thing stays a
  static site you can open by double-clicking index.html. The back button
  still works.

  Everything is wrapped in an IIFE so I'm not leaving variables on window.
*/

(function () {
  "use strict";

  /* ==================================================================
     SUPABASE

     The keys are NOT in this file. They live in config.js, which is
     gitignored, so nothing secret ends up in the repo. Copy
     config.example.js to config.js and fill in your two values.

     Run supabase.sql in the SQL Editor first - it creates the tables and
     the rules that decide what these requests are allowed to do.

     If config.js is missing, everything below just switches itself off and
     the site carries on working without the Responses section.
     ================================================================== */
  var SUPABASE = window.SONIC_CONFIG || { url: "", anonKey: "" };

  function supabaseReady() {
    return !!SUPABASE.url && !!SUPABASE.anonKey &&
           SUPABASE.url.indexOf("YOUR-PROJECT") === -1 &&
           SUPABASE.anonKey.indexOf("YOUR-ANON") === -1;
  }

  function sbHeaders(extra) {
    var h = {
      "apikey": SUPABASE.anonKey,
      "Authorization": "Bearer " + SUPABASE.anonKey,
      "Content-Type": "application/json"
    };
    if (extra) Object.keys(extra).forEach(function (k) { h[k] = extra[k]; });
    return h;
  }

  function sbGet(path) {
    return fetch(SUPABASE.url + "/rest/v1/" + path, { headers: sbHeaders() })
      .then(function (r) {
        if (!r.ok) throw new Error("Read failed (" + r.status + ")");
        return r.json();
      });
  }

  /* "return=minimal" matters. The alternative, return=representation, makes
     Postgres run INSERT ... RETURNING, which needs permission to read the row
     back. Suggestions are deliberately unreadable, so that version fails with
     a row-level security error. We don't need the row, so we don't ask for it
     — which also means there's no JSON body to parse on the way out. */
  function sbInsert(table, row) {
    return fetch(SUPABASE.url + "/rest/v1/" + table, {
      method: "POST",
      headers: sbHeaders({ "Prefer": "return=minimal" }),
      body: JSON.stringify(row)
    }).then(function (r) {
      if (r.ok) return true;
      return r.text().then(function (t) {
        var msg = "";
        try { msg = JSON.parse(t).message || ""; } catch (e) { /* not JSON */ }
        throw new Error(msg || "couldn't save that (" + r.status + ")");
      });
    });
  }

  /* Time options for the Time dropdown. Everything is "up to", because the
     point of the filter is that nothing you see can overrun the time you have. */
  var TIME_STEPS = [5, 30, 60, 90];

  function sanitizeTime(t) {
    if (t === "any" || !t) return "any";
    var num = Number(t);
    if (isNaN(num)) return "any";
    for (var i = 0; i < TIME_STEPS.length; i++) {
      if (num <= TIME_STEPS[i]) return String(TIME_STEPS[i]);
    }
    return "any";
  }

  /* Each topic gets a line drawing. Several topics share one - they're there
     to give a page some character, not to be a precise icon per topic. */
  var TOPIC_GLYPH = {
    "Deep Listening": "waves", "Environmental Sound": "waves", "Describing Sound": "waves",
    "Warm-up": "spark", "Imagination": "spark",
    "Icebreakers": "people", "Collaboration": "people",
    "Field Recording": "mic",
    "Soundwalks": "path", "Sound & Place": "path",
    "Sound & Memory": "spiral", "Reflection": "spiral",
    "Sound & Identity": "person",
    "Sketching & Ideation": "pencil", "Cross-Sensory": "pencil",
    "Sound Design": "sliders", "Audio Tools & Editing": "sliders",
    "Composition & Notation": "note", "Vocal Play": "note", "Improvisation": "note",
    "Storytelling": "bubble",
    "Visualising Sound": "bars", "AI & Sound": "bars", "Sound Archives": "bars"
  };

  var $ = function (id) { return document.getElementById(id); };

  function escapeHTML(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  function timeWord(n) {
    if (n < 60) return n + " min";
    if (n === 60) return "1 hour";
    if (n === 90) return "1.5 hours";
    return (n / 60) + " hours";
  }

  function glyphFor(a) { return TOPIC_GLYPH[a.topics[0]] || "waves"; }

  function whenText(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var mins = Math.round((Date.now() - then) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return plural(mins, "minute", "minutes") + " ago";
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return plural(hrs, "hour", "hours") + " ago";
    var days = Math.round(hrs / 24);
    if (days < 30) return plural(days, "day", "days") + " ago";
    return new Date(then).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  }

  /* ------------------------------------------------------------ state */

  var state = { time: "any", topic: "any", social: "any" };
  var currentActivity = null;

  /* ------------------------------------------------------------ filtering */

  function matches(a) {
    var validTime = sanitizeTime(state.time);
    if (validTime !== "any" && a.minutes > Number(validTime)) return false;
    if (state.topic !== "any" && a.topics.indexOf(state.topic) === -1) return false;
    if (state.social !== "any" && a.setting !== state.social) return false;
    return true;
  }

  function filtered() {
    return ACTIVITIES.filter(matches).slice().sort(function (a, b) {
      return a.minutes - b.minutes || a.title.localeCompare(b.title);
    });
  }

  /* Related activities: the ones sharing the most topics, with a nudge toward
     the same social setting so a solo activity suggests other solo ones. */
  function relatedTo(a) {
    return ACTIVITIES
      .filter(function (b) { return b.id !== a.id; })
      .map(function (b) {
        var shared = b.topics.filter(function (t) { return a.topics.indexOf(t) !== -1; }).length;
        return { a: b, score: shared * 2 + (b.setting === a.setting ? 1 : 0) };
      })
      .filter(function (x) { return x.score > 1; })
      .sort(function (x, y) { return y.score - x.score || x.a.minutes - y.a.minutes; })
      .slice(0, 4)
      .map(function (x) { return x.a; });
  }

  /* ------------------------------------------------------------ routing */

  function parseHash() {
    var raw = window.location.hash.replace(/^#\/?/, "");
    if (!raw) return { name: "home" };
    var seg = raw.split("/");
    if (seg[0] === "browse")   return { name: "browse" };
    if (seg[0] === "about")    return { name: "about" };
    if (seg[0] === "suggest")  return { name: "suggest" };
    if (seg[0] === "activity") return { name: "activity", id: seg[1] };
    return { name: "home" };
  }

  function showView(name) {
    if (name !== "activity") {
      resetTimer();
    }
    ["home", "browse", "activity", "suggest", "about"].forEach(function (v) {
      $("view-" + v).hidden = v !== name;
    });
  }

  function route() {
    var r = parseHash();

    if (r.name === "activity") {
      var found = ACTIVITIES.filter(function (a) { return a.id === r.id; })[0];
      if (!found) { window.location.hash = "#/browse"; return; }
      renderActivity(found);
      showView("activity");
    } else if (r.name === "browse") {
      renderBrowse();
      showView("browse");
      document.title = "Browse — Sonic Activities";
    } else if (r.name === "suggest") {
      showView("suggest");
      document.title = "Suggest an activity — Sonic Activities";
    } else if (r.name === "about") {
      showView("about");
      document.title = "About — Sonic Activities";
    } else {
      showView("home");
      document.title = "Sonic Activities";
    }

    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------ home */

  function renderHome() {
    $("home-count").textContent = ACTIVITIES.length;
    $("home-topics").textContent = TOPICS.length;
  }

  function goRandom() {
    var pick = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    window.location.hash = "#/activity/" + pick.id;
  }

  /* ------------------------------------------------------------ browse */

  function buildFilters() {
    var time = $("filter-time");
    time.innerHTML = '<option value="any">Any length</option>';
    TIME_STEPS.forEach(function (n) {
      var o = document.createElement("option");
      o.value = String(n);
      o.textContent = "Up to " + timeWord(n);
      time.appendChild(o);
    });

    var topic = $("filter-topic");
    topic.innerHTML = '<option value="any">All topics</option>';
    TOPICS.forEach(function (t) {
      var o = document.createElement("option");
      o.value = t; o.textContent = t;
      topic.appendChild(o);
    });

    var social = $("filter-social");
    social.innerHTML = '<option value="any">Any group size</option>';
    ["solo", "pair", "group"].forEach(function (s) {
      var o = document.createElement("option");
      o.value = s; o.textContent = SETTING_LABELS[s];
      social.appendChild(o);
    });

    time.addEventListener("change", function () { state.time = sanitizeTime(time.value); renderBrowse(); });
    topic.addEventListener("change", function () { state.topic = topic.value; renderBrowse(); });
    social.addEventListener("change", function () { state.social = social.value; renderBrowse(); });
  }

  function renderBrowse() {
    state.time = sanitizeTime(state.time);
    $("filter-time").value = state.time;
    $("filter-topic").value = state.topic;
    $("filter-social").value = state.social;

    var list = filtered();
    var isFiltered = state.time !== "any" || state.topic !== "any" || state.social !== "any";

    $("result-count").textContent = isFiltered
      ? plural(list.length, "activity", "activities") + " match"
      : "All " + ACTIVITIES.length + " activities";

    var grid = $("activity-list");
    grid.innerHTML = "";
    list.forEach(function (a) { grid.appendChild(card(a)); });

    var empty = $("empty-state");
    if (list.length) {
      empty.hidden = true;
    } else {
      empty.hidden = false;
      empty.innerHTML =
        "<h2>Nothing matches that combination.</h2>" +
        "<p>Try widening one of the filters — group size and topic together can get quite narrow.</p>" +
        '<button class="btn btn-sm" type="button" data-clear>Clear filters</button>';
      empty.querySelector("[data-clear]").addEventListener("click", clearFilters);
    }
  }

  function card(a) {
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.className = "card";
    link.href = "#/activity/" + a.id;
    link.innerHTML =
      '<span class="card-top">' +
        '<svg class="card-glyph" viewBox="0 0 24 24" aria-hidden="true"><use href="#g-' + glyphFor(a) + '"/></svg>' +
        '<span class="card-meta">' + escapeHTML(a.timeLabel.split("(")[0].trim()) +
          " · " + escapeHTML(SETTING_LABELS[a.setting]) + "</span>" +
      "</span>" +
      '<h3 class="card-title">' + escapeHTML(a.title) + "</h3>" +
      '<p class="card-overview">' + escapeHTML(a.overview) + "</p>" +
      '<span class="card-topics">' +
        a.topics.map(function (t) { return '<span class="topic">' + escapeHTML(t) + "</span>"; }).join("") +
      "</span>";
    li.appendChild(link);
    return li;
  }

  function clearFilters() {
    state.time = "any"; state.topic = "any"; state.social = "any";
    renderBrowse();
  }

  /* ------------------------------------------------------------ activity timer */

  var timerInterval = null;
  var timerRemainingSeconds = 0;
  var timerIsRunning = false;

  function formatMMSS(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function playTimerChime() {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();
      var now = ctx.currentTime;

      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);

      var osc2 = ctx.createOscillator();
      var gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.25);
      gain2.gain.setValueAtTime(0.2, now + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.25);
      osc2.stop(now + 0.85);
    } catch (e) {
      /* Audio Context unavailable or blocked */
    }
  }

  function resetTimer(defaultMinutes) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerIsRunning = false;
    timerRemainingSeconds = 0;

    var container = $("activity-timer");
    if (!container) return;

    container.classList.remove("is-done");
    $("timer-badge").hidden = true;

    var input = $("timer-input");
    if (defaultMinutes !== undefined && defaultMinutes !== null) {
      input.value = defaultMinutes || 10;
    }

    input.disabled = false;
    $("timer-unit").hidden = false;
    $("timer-display").hidden = true;
    $("timer-start-btn").hidden = false;
    $("timer-start-btn").textContent = "Start";
    $("timer-pause-btn").hidden = true;
    $("timer-reset-btn").hidden = true;
  }

  function startTimer() {
    var input = $("timer-input");
    var display = $("timer-display");
    var startBtn = $("timer-start-btn");
    var pauseBtn = $("timer-pause-btn");
    var resetBtn = $("timer-reset-btn");
    var container = $("activity-timer");
    var badge = $("timer-badge");

    if (!timerIsRunning && timerRemainingSeconds <= 0) {
      var mins = parseInt(input.value, 10);
      if (isNaN(mins) || mins <= 0) mins = 5;
      timerRemainingSeconds = mins * 60;
    }

    if (timerRemainingSeconds <= 0) return;

    timerIsRunning = true;
    container.classList.remove("is-done");
    badge.hidden = true;

    input.disabled = true;
    $("timer-unit").hidden = true;
    display.hidden = false;
    display.textContent = formatMMSS(timerRemainingSeconds);

    startBtn.hidden = true;
    pauseBtn.hidden = false;
    pauseBtn.textContent = "Pause";
    resetBtn.hidden = false;

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function () {
      timerRemainingSeconds--;
      if (timerRemainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerIsRunning = false;
        timerRemainingSeconds = 0;
        display.textContent = "0:00";
        pauseBtn.hidden = true;
        container.classList.add("is-done");
        badge.hidden = false;
        playTimerChime();
      } else {
        display.textContent = formatMMSS(timerRemainingSeconds);
      }
    }, 1000);
  }

  function pauseTimer() {
    if (!timerIsRunning) {
      startTimer();
      return;
    }
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerIsRunning = false;
    $("timer-pause-btn").textContent = "Resume";
  }

  /* ------------------------------------------------------------ activity */

  function renderActivity(a) {
    currentActivity = a;
    document.title = a.title + " — Sonic Activities";
    resetTimer(a.minutes);

    $("activity-title").textContent = a.title;
    $("activity-overview").textContent = a.overview;
    $("activity-glyph").firstElementChild.setAttribute("href", "#g-" + glyphFor(a));

    $("activity-meta").innerHTML =
      '<li class="meta-pill is-time">' + escapeHTML(a.timeLabel) + "</li>" +
      '<li class="meta-pill">' + escapeHTML(SETTING_LABELS[a.setting]) + "</li>" +
      a.topics.map(function (t) {
        return '<li class="meta-pill">' + escapeHTML(t) + "</li>";
      }).join("");

    fillList($("activity-instructions"), a.instructions);
    fillList($("activity-reflection"), a.reflection);

    var ex = $("activity-examples");
    ex.innerHTML = "";
    a.examples.forEach(function (text) {
      var p = document.createElement("p");
      p.className = "example";
      p.textContent = text;
      ex.appendChild(p);
    });

    var rel = $("activity-related");
    rel.innerHTML = "";
    relatedTo(a).forEach(function (b) {
      var li = document.createElement("li");
      li.innerHTML =
        '<a href="#/activity/' + b.id + '">' +
          '<svg class="related-glyph" viewBox="0 0 24 24" aria-hidden="true"><use href="#g-' + glyphFor(b) + '"/></svg>' +
          "<span>" +
            '<span class="related-title">' + escapeHTML(b.title) + "</span>" +
            '<span class="related-meta">' + escapeHTML(b.timeLabel.split("(")[0].trim()) +
              " · " + escapeHTML(SETTING_LABELS[b.setting]) + "</span>" +
          "</span>" +
        "</a>";
      rel.appendChild(li);
    });

    resetForm($("response-form"), $("response-status"), $("response-submit"), "Post response");
    $("response-count").textContent = "0";
    loadResponses(a.id);
  }

  function fillList(el, items) {
    el.innerHTML = "";
    items.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      el.appendChild(li);
    });
  }

  /* ------------------------------------------------------------ responses */

  function loadResponses(activityId) {
    var list = $("responses-list");
    var stateEl = $("responses-state");
    list.innerHTML = "";

    if (!supabaseReady()) {
      setState(stateEl, "Responses aren't connected yet — add your Supabase keys in app.js to switch them on.", "info");
      return;
    }

    setState(stateEl, "Loading responses…", "info");

    /* No is_approved filter here on purpose. The database's own read rule
       already returns approved rows only, so asking for it again would be
       redundant - and it would break, because the read grant deliberately
       doesn't include that column. */
    var q = "responses?activity_id=eq." + encodeURIComponent(activityId) +
            "&select=id,display_name,body,created_at" +
            "&order=created_at.desc&limit=20";

    sbGet(q).then(function (rows) {
      // a slow request for a previous activity must not overwrite this one
      if (!currentActivity || currentActivity.id !== activityId) return;

      if (!rows.length) {
        setState(stateEl, "No responses yet. Yours would be the first.", "info");
        return;
      }
      stateEl.hidden = true;
      rows.forEach(function (r) {
        var li = document.createElement("li");
        li.className = "response";
        li.innerHTML =
          '<p class="response-body"></p>' +
          '<p class="response-by"><span class="response-name"></span>' +
          '<span class="response-when">' + escapeHTML(whenText(r.created_at)) + "</span></p>";
        li.querySelector(".response-body").textContent = r.body;
        li.querySelector(".response-name").textContent =
          (r.display_name && r.display_name.trim()) ? r.display_name.trim() : "Anonymous";
        list.appendChild(li);
      });
    }).catch(function () {
      if (!currentActivity || currentActivity.id !== activityId) return;
      setState(stateEl, "Couldn't load responses just now.", "error");
    });
  }

  function setState(el, text, kind) {
    el.textContent = text;
    el.className = "responses-state is-" + kind;
    el.hidden = false;
  }

  /* ------------------------------------------------------------ forms */

  function resetForm(form, statusEl, btn, label) {
    form.reset();
    statusEl.hidden = true;
    btn.disabled = false;
    btn.textContent = label;
  }

  function showStatus(el, text, kind) {
    el.textContent = text;
    el.className = "entry-status is-" + kind;
    el.hidden = false;
  }

  function countChars(input, out, max) {
    input.addEventListener("input", function () {
      out.textContent = String(input.value.length);
      out.parentNode.classList.toggle("is-near", input.value.length > max * 0.9);
    });
  }

  function handleSubmit(cfg) {
    cfg.form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!supabaseReady()) {
        showStatus(cfg.status, "Not connected yet. Add your Supabase keys in app.js first.", "error");
        return;
      }

      var row = cfg.build();
      if (row.error) { showStatus(cfg.status, row.error, "error"); return; }

      cfg.btn.disabled = true;
      cfg.btn.textContent = cfg.sending;
      showStatus(cfg.status, cfg.sending, "info");

      sbInsert(cfg.table, row.data).then(function () {
        cfg.form.reset();
        if (cfg.counter) cfg.counter.textContent = "0";
        cfg.btn.disabled = false;
        cfg.btn.textContent = cfg.label;
        showStatus(cfg.status, cfg.done, "ok");
        if (cfg.after) cfg.after();
      }).catch(function (err) {
        cfg.btn.disabled = false;
        cfg.btn.textContent = cfg.label;
        showStatus(cfg.status, "Couldn't send that — " + err.message, "error");
      });
    });
  }

  /* ------------------------------------------------------------ boot */

  countChars($("response-body"), $("response-count"), 2000);
  countChars($("suggest-summary"), $("suggest-count"), 2000);

  handleSubmit({
    form: $("response-form"), status: $("response-status"), btn: $("response-submit"),
    counter: $("response-count"), table: "responses",
    label: "Post response", sending: "Posting…", done: "Thanks — your response is up.",
    build: function () {
      var body = $("response-body").value.trim();
      if (body.length < 2) return { error: "Write a little more before posting." };
      return { data: {
        activity_id: currentActivity.id,
        display_name: $("response-name").value.trim() || null,
        body: body
      } };
    },
    after: function () { loadResponses(currentActivity.id); }
  });

  handleSubmit({
    form: $("suggest-form"), status: $("suggest-status"), btn: $("suggest-submit"),
    counter: $("suggest-count"), table: "activity_suggestions",
    label: "Send suggestion", sending: "Sending…", done: "Thanks — that's been sent through.",
    build: function () {
      var title = $("suggest-title").value.trim();
      var summary = $("suggest-summary").value.trim();
      if (title.length < 2) return { error: "Give it a title first." };
      if (summary.length < 10) return { error: "Add a bit more about how it runs." };
      return { data: {
        title: title,
        summary: summary,
        time_needed: $("suggest-time").value.trim() || null,
        setting: $("suggest-setting").value || null,
        display_name: $("suggest-name").value.trim() || null,
        email: $("suggest-email").value.trim() || null
      } };
    }
  });

  $("random-btn").addEventListener("click", goRandom);
  $("random-btn-2").addEventListener("click", goRandom);
  $("clear-filters").addEventListener("click", clearFilters);
  $("filters").addEventListener("submit", function (e) { e.preventDefault(); });

  $("timer-start-btn").addEventListener("click", startTimer);
  $("timer-pause-btn").addEventListener("click", pauseTimer);
  $("timer-reset-btn").addEventListener("click", function () {
    var aMins = currentActivity ? currentActivity.minutes : 10;
    resetTimer(aMins);
  });

  renderHome();
  buildFilters();
  window.addEventListener("hashchange", route);
  route();
})();
