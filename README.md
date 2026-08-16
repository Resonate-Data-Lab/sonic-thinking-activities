# Sonic Activities

A website for a collection of short sound and listening activities. You either press one
button and get a random one, or you browse and narrow down by how long you have, what the
activity is about, and whether you're on your own or with other people.

## Running it

No build step and no dependencies — it's plain HTML, CSS and JavaScript.

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 4178
```

Then go to `http://localhost:4178`.

## Setting up the database

People can post a response under any activity, and suggest new activities. Both go into
**Supabase**, which is a hosted Postgres database with a REST API — the free tier is more
than enough for this.

Everything the database needs is in one file: **`supabase.sql`**.

1. Make a new project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste in the whole of `supabase.sql`, press Run.
   That creates both tables and all the security rules.
3. Go to **Project Settings → API** and copy the **Project URL** and the **anon public**
   key.
4. Copy `config.example.js` to `config.js` and paste them in:

```js
window.SONIC_CONFIG = {
  url:     "https://YOUR-PROJECT.supabase.co",
  anonKey: "YOUR-ANON-PUBLIC-KEY"
};
```

`config.js` is in `.gitignore`, so your keys never get committed. `config.example.js` is
the one that lives in the repo.

That's it — no account, no library, no build step. `supabase.sql` is safe to run more than
once, so if you're unsure whether it applied, just run it again.

**Until you do that**, the site still works completely. Every activity is browsable, and
the response box shows "Responses aren't connected yet" instead of erroring.

### If responses say "Couldn't load responses just now"

Open the browser console and look at the failed request. If it says
`permission denied for table responses`, the tables were created but the privileges in
section 3 of `supabase.sql` weren't applied — that happens if you ran an older copy of the
file. Re-run the current `supabase.sql` in the SQL Editor and it will fix itself.

Note that the rest of the page keeps working either way — a database problem only ever
affects the Responses section.

## Security

### The key is in the browser, and that's how it's meant to work

This is a static site, so anything it needs to talk to the database, a visitor can read
out of the page. There's no way around that without putting a server in front — which is
also why the **anon key is designed to be public**. It's in the browser on every Supabase
site there is.

Keeping it out of the repo is still worth doing, so `config.js` is gitignored. But that's
about not leaving keys in git history forever, not about hiding them from visitors. What
actually makes the key harmless is that it can't do anything dangerous:

| Someone with your anon key tries to… | Result |
| --- | --- |
| Read approved responses | ✅ allowed — that's the feature |
| Post a response or a suggestion | ✅ allowed — that's the feature |
| Approve or unhide their own post | 🚫 `is_approved` isn't granted to them |
| Read the suggestions table (emails) | 🚫 no read privilege, no read policy |
| Edit or delete anything | 🚫 no update or delete privilege |
| Flood the site with thousands of posts | 🚫 rate limited to 3/min, 20/hour |

Three separate mechanisms in `supabase.sql` do that work:

1. **Column-level privileges.** Insert is granted on *named columns only*. Because
   `is_approved` and `status` aren't in those lists, nobody can approve their own post
   even by hand-editing the request — those columns always take the table default.
2. **Row Level Security.** Reads return approved rows only; there's no read policy at all
   on suggestions; no update or delete policies anywhere.
3. **A rate-limit trigger.** Counts recent posts per visitor and refuses past the limit.
   It identifies people by an **MD5 hash of their IP**, never the address itself, so no
   personal data is stored. Change the salt in `supabase.sql` to a random string of your
   own.

### The one key that must never go in

The **service_role** key bypasses every rule above. It belongs in a server environment
variable, never in `config.js`, never in the browser. To check which key you have, paste
it into [jwt.io](https://jwt.io) — the payload should say `"role": "anon"`.

### No accounts, on purpose

There is no sign up and no log in. You open the site and use it. Posting a response asks
for your words and optionally a name, and that's the entire interaction — no email, no
password, no profile, nothing to remember.

That's a design decision, not a missing feature. These are activities you do in a room or
on a walk; making someone create an account before they can write down what they noticed
would lose most of them at the first screen. It also means there's no user table to leak,
no password reset flow to get wrong, and no session handling to secure.

The site's code has no auth in it at all — it only ever calls `/rest/v1/`, never
`/auth/v1/`.

**One dashboard setting to change:** Supabase enables email signups by default on every
new project, even when the site never uses them. Go to **Authentication → Sign In /
Providers → Email** and turn off **Allow new users to sign up**. Otherwise the anon key
can still create accounts, which is a free way for someone to fill your user table. It's a
project setting rather than a table, so `supabase.sql` can't do it for you.

### If you deploy from the repo

GitHub Pages serves whatever is committed, so a gitignored `config.js` won't be there and
the Responses section will show "not connected". Either upload `config.js` to the host
separately, or accept committing it — which, given the table above, is what most Supabase
projects do.

### No library

The site talks to Supabase's REST API with plain `fetch()`, so there's nothing to install
and nothing to load from a CDN. Two request shapes, both documented at the bottom of
`supabase.sql`.

### Moderating

Responses appear straight away, which keeps it feeling alive. Each row has an
`is_approved` column you can flip to `false` to hide something — the read policy only
returns approved rows. If you'd rather check everything *before* it appears, change one
default in `supabase.sql` (it's commented where). Ready-made moderation queries are in
section 5 of that file.

## The idea

The activity is the thing people care about, so the activity is what the home page is
about. There are two ways in and nothing else on the page:

- **Give me a random activity** — for when you just want something to do
- **Browse activities** — for when you know roughly what you're after

Neither of those is buried in a nav bar. They're the page.

Browsing is three dropdowns, all defaulting to "everything":

| Filter | What it does |
| --- | --- |
| **Time** | How long you have. Everything is "up to" — nothing shown can overrun it. |
| **Topic** | What the activity is about. |
| **Social** | By myself / with a partner / with a group. |

They stack, so "up to 10 minutes" + "by myself" + "deep listening" narrows 51 activities
down to 4.

## Reducing the topics

The original activity list had **90 tags**. Most were used exactly once — `Longing`,
`Bird Sounds`, `Metadata & Organization`, `Voice Manipulation`. Ninety options in a
dropdown isn't a filter, it's a list, and a filter where most choices return one result
isn't useful.

So I mapped them down to **24 topics**, grouping the one-offs into the thing they're
actually about:

```
Deep Listening        Warm-up             Icebreakers          Field Recording
Soundwalks            Environmental Sound  Sound & Memory       Reflection
Sound & Identity      Sketching & Ideation Sound Design         Audio Tools & Editing
Composition & Notation Vocal Play          Improvisation        Collaboration
Sound & Place         Cross-Sensory        Imagination          Storytelling
AI & Sound            Sound Archives       Describing Sound     Visualising Sound
```

For example `Mindful Listening`, `Modes of Listening`, `Reflective Listening`,
`Sonic Awareness` and `noticing` all became **Deep Listening**. `Sonic Sketching`,
`Sketching`, `Ideation`, `Rapid Ideation` and `Planning` all became
**Sketching & Ideation**.

Every topic is used by at least one activity, and most activities carry two or three.

## What's on an activity page

In this order, because it's the order you'd actually want it:

1. **Title**
2. **Time, group size and topics** as a row of pills
3. **A one-sentence overview** — what this actually is
4. **How to do it** — three or four short lines, not a full script. If someone needs to
   read a page of instructions before they can start, they won't start.
5. **Reflect on it** — three questions to think about afterwards
6. **What it can look like** — example responses, so you know what "doing it properly"
   even means
7. **Responses** — what other people came up with, and a box to add your own
8. **Try next** — related activities

### How "Try next" works

Related activities are worked out in code rather than being hand-picked. Each other
activity scores two points per topic it shares, plus one if it's the same group size, and
the top four show. The group-size point matters: if you're on your own, being recommended
something that needs a circle of ten people is useless.

## Where the content comes from

The time, group size and full source description of each activity come from the original
activity list. `minutes` is the recorded time read as a number so it can be filtered —
`1 hour` → 60, `10-12 min` → 12, `25 min (5+5+10+5)` → 25. **Ranges take the top value**,
so if something says 10–12 minutes and you've filtered to 10, it won't be shown. It can't
overrun.

Written for this site, and not part of the original list:

- the **overview** and the short **instructions**, condensed from each full description
- the **reflection questions**
- the **example responses**
- the **topics**, which are my regrouping of the original 90 tags
- the **titles** of about a dozen activities, which had to be rewritten (see below)

The full original description of every activity is kept in `activities.js` as
`description`, even though no page displays it, so the overview and instructions can
always be checked against the text they came from.

## Removing internal references

The original list carried columns that were for whoever maintains it, not for the people
using the site — which week something came from, which document it was recorded in, what
kind of source that was. None of that is on the site.

Removing it properly meant more than deleting two fields:

- **Data.** The `week`, `source` and `sourceType` fields are gone from `activities.js`.
- **Filters.** There is no filter on any of it. It isn't in the code to filter on.
- **Titles.** Twelve activities had the reference in the title itself — "Week 4 In-Class
  Activities: Scoring Pictures". Deleting a field wouldn't have touched those, so they
  were renamed to what they actually are: *Scoring Pictures*, *Exploring Sound Archives*,
  *Pair Listening & Sound as Object*.
- **URLs.** Three activities had it in their ID, which shows in the address bar —
  `#/activity/week9-sound-archives`. Renamed to `#/activity/exploring-sound-archives`.
- **The source file.** The original spreadsheet contained all of those columns, so its
  copy was removed from the project folder rather than shipped with the site.

I checked this by rendering all 54 pages and searching the visible text for `week`,
`class slides`, `source type`, `spreadsheet`, `semester` and a few others. Zero matches.

## Design decisions

Light, but not blank. The first version of this was so stripped back it had no character
left, so the personality comes from four things that don't add visual weight:

**1. Line drawings.** Twelve flat stroke glyphs — sound waves, a mic, footsteps, a spiral,
a pencil — defined once as an SVG sprite in `index.html` and reused everywhere. Each topic
maps to one, so an activity gets a mark next to its title, on its card, and in the
"Try next" list. They're strokes, not images: no files to load, they scale to any size,
and they take the accent colour on hover.

**2. Type doing the work.** Big confident headings with tight letter-spacing, and **Ms
Madi**, a script face, for exactly one word in a heading. One accent word stops a page of
grotesk feeling like a form.

**3. Warm paper and grain.** The background is `#FBFAF6` rather than white, with a noise
texture at 3.5% over the top. Pure white plus flat colour looks like a wireframe; a warm
paper tone with a bit of grain looks like something someone made. The grain is an SVG
noise filter — a texture, not a gradient, since it has no colour ramp.

**4. A recurring editorial mark.** Every section label and page kicker has a short
accent-coloured rule hanging off it. It's a tiny thing repeated about eight times a page,
and it's most of what makes the layout feel deliberate.

The home page is also deliberately asymmetric — copy on the left, a large outline mark
sitting off-centre on the right — rather than everything stacked down the middle.

Rules I stuck to throughout:

- **No gradients.** Flat colour only.
- **No hover animations.** Nothing slides or fades. Hover is an instant colour swap —
  cards get a darker border, glyphs turn orange. `animation` and `transition` are set to
  `none !important` globally in `styles.css` so I can't reintroduce one by accident.
- **No drop shadows.** Depth comes from hairline borders and the paper tone.

### Type

- **Archivo** for everything. It's a variable font, so headings and body text are the same
  family at different weights.
- **Ms Madi**, a script, for the accent word in the logo and page titles.

Both are SIL Open Font License and free to use commercially. They're downloaded into
`assets/fonts/` rather than linked from Google Fonts, so the site doesn't depend on an
internet connection or an external service to look right, and both have fallback stacks
if a font file fails to load.

### Colour

One accent, defined once at the top of `styles.css`:

```css
--accent: #C2410C;   /* burnt orange */
```

Changing that one line re-colours every glyph, rule, link and button on the site.

## Mobile

The forms are the part that mattered most here, so:

- **Every input is 16px.** Anything smaller makes iOS Safari zoom in the moment you tap a
  field, which then leaves the page scrolled sideways. This is the single most common
  mobile form bug and it's a one-line fix.
- **Nothing interactive is under 44px tall**, which is the smallest comfortable thumb
  target. The small buttons were 42px until I measured them.
- **Side-by-side fields stack** below 620px, and buttons go full width.
- **The character counter turns orange** near the limit rather than only telling you once
  you've hit it.
- The status message after submitting is a `role="status"` element, so a screen reader
  announces it instead of it silently appearing.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure for the five screens, plus the SVG glyph sprite |
| `styles.css` | All the styling |
| `fonts.css` | Font loading rules |
| `app.js` | Routing, filtering, related activities, Supabase requests, forms |
| `activities.js` | The 51 activities as data |
| `supabase.sql` | **The whole database setup in one file** — tables, security rules, moderation queries |
| `assets/fonts/` | The font files |

The activity data lives in its own file, separate from the code that displays it, so
adding an activity means editing one file and nothing else.

## Testing I did

With 51 activities across four screens, clicking through everything by hand wasn't
practical, so I ran these checks in the browser console:

- all 54 pages load with no JavaScript errors, including a deliberately broken activity URL
- every activity page fills all five sections — overview, instructions, reflection,
  examples and related — so none render half-empty
- no page scrolls sideways at 1280px or 375px
- the filters stack correctly and the time filter never returns anything over the limit
- no page displays any internal reference (the sweep described above)
- no form control is under 16px or under 44px tall on a phone

For the database work I couldn't hit a real Supabase project from the browser console, so
I temporarily put test credentials in `app.js`, replaced `window.fetch` with a stub that
recorded what it was called with, and drove both forms. That confirmed the read URL, the
headers, the exact JSON body of both inserts, that responses render with the "Anonymous"
fallback and relative dates, and that the form clears and reports success. The recorded
bodies matched the column names in `supabase.sql` exactly.

Bugs this caught:

1. In "Try next" the title and the time ran together on one line. Both are `<span>`s
   inside the link, so the `margin-top` on the meta line did nothing until I gave them
   `display: block`.
2. Three activity IDs still had week numbers in them. The data fields were already gone,
   but the ID is what shows in the address bar, so they were still visible.
3. Two small buttons were 42px tall on mobile, just under the 44px thumb target.
4. A slow response request could land after you'd already clicked through to a different
   activity and render the wrong list. The fix checks the activity is still the current
   one before writing anything to the page.

## Known limitations / what I'd do next

- **No search.** You can filter, but you can't type a keyword. Fine at 51 activities,
  wouldn't be at 500.
- **Filters don't survive a link.** The URL doesn't record your filter selections, so you
  can't send someone a filtered view, and going back from an activity resets them.
- **Suggestions still need a human.** They land in the database, but someone has to read
  them and add the good ones to `activities.js` by hand. Fine for a small collection.
- **No spam protection.** Anyone can post a response. For a class-sized site that's fine,
  and there's a moderation column to hide anything bad — but a public site would want a
  rate limit or a captcha.
- **The example responses are illustrations**, not collected submissions. Once real ones
  come in through the form they should replace them.
- **The topic mapping is a judgement call.** Grouping 90 tags into 24 means some activities
  lost a specific label — a bird-sound sketching activity is now filed under
  "Describing Sound" rather than "Bird Sounds". More findable, less precise.
