/*
  The activity data. 51 activities, one object each.

  timeLabel / minutes / setting / description come from the original
  activity list. minutes is timeLabel read as a number so it can be
  filtered on - ranges take the top value so an activity cannot overrun.

  topics uses my own shortened list. The original had 90 tags, most of them
  used once, which is unusable as a filter. I mapped them down to 24.

  overview / instructions / reflection / examples are written for this site.
  description is kept as the full original text the others were built from,
  even though the page does not show it.
*/

const ACTIVITIES = [
  {
    id: `sound-walk`,
    title: `Sound Walk`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `solo`,
    topics: [
      `Soundwalks`,
      `Deep Listening`,
      `Environmental Sound`
    ],
    overview: `A ten-minute walk where you listen to a space in layers, first with your eyes closed and then open.`,
    instructions: [
      `Pick a space to walk through, indoors or outdoors.`,
      `Listen with your eyes closed for a stretch, then open them and keep walking.`,
      `Notice each layer of sound and what it makes you feel.`,
      `Stop and write down what stood out.`
    ],
    reflection: [
      `Which sounds would you normally filter out without noticing?`,
      `How did closing your eyes change what you heard?`,
      `What did really listening feel like compared to your usual half-attention?`
    ],
    examples: [
      `With my eyes closed the corridor felt much wider than it actually is. The vending machine hum was somewhere far to my right and footsteps kept arriving before I expected them. When I opened my eyes the hum basically disappeared — I could see the machine, so I stopped hearing it.`
    ],
    description: `This is a 10-minute listening exercise where you practice paying close attention to the sounds around you as you walk through a chosen space, indoors or outdoors. Instead of just hearing automatically and tuning things out, you deliberately focus on what you hear, layer by layer, and reflect on how each sound makes you feel or what memory or association it brings up. The walk unfolds in stages: first you listen with your eyes closed for a stretch, relying purely on your ears to map out the space around you; then you open your eyes and continue walking while listening, noticing how sight changes what you attend to; finally, you stop and write down your observations - which sounds stood out, which ones you'd normally filter out, and how the experience of really listening differed from your usual half-attention. The goal is to become more aware of your surroundings, break the habit of passive hearing, and experience what deeper, intentional listening actually feels like.`
  },
  {
    id: `mystery-sound`,
    title: `Mystery Sound`,
    timeLabel: `5 min`,
    minutes: 5,
    setting: `group`,
    topics: [
      `Warm-up`,
      `Deep Listening`,
      `Icebreakers`
    ],
    overview: `One person plays an ambiguous sound and everyone guesses what it is by describing how it sounds.`,
    instructions: [
      `One person picks a sound that isn't obvious and plays it.`,
      `Everyone listens without saying what it is.`,
      `Describe the qualities — metallic, organic, sudden, rhythmic — before guessing.`,
      `Reveal the source.`
    ],
    reflection: [
      `What made you land on your guess — texture, rhythm, or something else?`,
      `How did hearing other people's descriptions change what you heard?`,
      `Was the real source a letdown or a surprise?`
    ],
    examples: [
      `I said metallic and hollow, like something dragged across a grate. Three other people heard an animal. It was a fridge door opening slowly — and once I knew, I couldn't hear the metal any more.`
    ],
    description: `In this quick icebreaker, the facilitator plays a mystery sound for the whole group - something ambiguous enough that it isn't immediately obvious what's making it. Before anyone says what it actually is, everyone listens closely and tries to guess what the sound might be, describing not just a guess at the source but the qualities of the sound itself: is it metallic, organic, rhythmic, sudden? People call out guesses and descriptions, building a little collective mystery-solving moment, before the source is finally revealed. It's a low-stakes way to shift a room's attention toward listening at the very start of a session, breaking the ice while also modeling the kind of close, curious attention the rest of a sound-focused gathering will ask for. It works well as the opening minute of nearly any sound-focused workshop, class, or meeting.`
  },
  {
    id: `word-color-sound`,
    title: `Word, Color, Sound`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `group`,
    topics: [
      `Warm-up`,
      `Sound & Identity`,
      `Audio Tools & Editing`
    ],
    overview: `Turn how you feel right now into one word, then a colour, then a sound, and share all three.`,
    instructions: [
      `Write one word for how you feel in this moment.`,
      `Pick a colour that matches that word.`,
      `Find or make a sound for the same feeling.`,
      `Share all three and explain the connections.`
    ],
    reflection: [
      `Which of the three was hardest to choose, and why?`,
      `Did finding the sound change how you felt about the word?`,
      `Did anyone pair a colour and a sound in a way you'd never have thought of?`
    ],
    examples: [
      `Word: static. Colour: a washed-out grey-blue. Sound: the extractor fan in my kitchen. Hearing it back, 'static' wasn't quite right — it was more like something running that I'd stopped noticing.`
    ],
    description: `Participants start by writing down one word that captures how they're feeling in this particular moment - not how they generally feel, but a snapshot of right now. From that word, they choose a color that seems to match it intuitively, without overthinking the connection. Finally, they go looking for (or make) a sound that represents that same feeling - this might mean searching freesound.org for a clip, playing a few notes on an instrument, tapping out a rhythm on an object nearby, or using their own voice. Once everyone has their word, color, and sound ready, the group goes around and each person shares their combination, briefly explaining the connections they made. The activity builds a quick bridge between emotional self-awareness and sonic expression, translating an internal feeling into three very different registers - language, visual, and sound - and works well as a way to check in with a group and warm up creative, associative thinking at the start of a session.`
  },
  {
    id: `sonic-day-recall`,
    title: `Sonic Day Recall`,
    timeLabel: `5 min`,
    minutes: 5,
    setting: `pair`,
    topics: [
      `Deep Listening`,
      `Sound & Memory`,
      `Reflection`
    ],
    overview: `Replay your whole day in your head and list every sound you can remember from it.`,
    instructions: [
      `Sit comfortably and close your eyes.`,
      `Replay your day from waking up, in order.`,
      `Remember every sound you can along the way.`,
      `Write the list, then share it with a partner.`
    ],
    reflection: [
      `Which sound surprised you by coming back?`,
      `Which had you completely forgotten until now?`,
      `What does that say about how much sound you filter out of an ordinary day?`
    ],
    examples: [
      `Alarm, shower, kettle, the flat door, traffic, a bus announcement, someone's headphones leaking, keyboard, microwave, rain on the window. I'd completely forgotten the bus announcement until I got to the part where I sat down.`
    ],
    description: `Sit somewhere comfortable, close your eyes, and mentally replay your entire day from the moment you woke up - the places you went, the people you interacted with, the transitions between activities. As you move through this mental replay, try to remember every sound you encountered along the way: an alarm, running water, traffic, conversations, doors, footsteps, anything at all, even sounds you barely noticed at the time. Spend about five minutes doing this quietly on your own before opening your eyes and writing down as many of the sounds as you can recall, in whatever order they come back to you. Once you've got your list, share it with a partner and talk through which sounds surprised you to remember, which ones you'd completely forgotten until this exercise, and what it reveals about how much sound we filter out of conscious memory during an ordinary day.`
  },
  {
    id: `close-listening`,
    title: `Close Listening`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `solo`,
    topics: [
      `Deep Listening`,
      `Warm-up`,
      `Describing Sound`
    ],
    overview: `Listen to a place in two passes — first describing sounds without naming them, then naming them.`,
    instructions: [
      `Sit somewhere and listen for a few minutes without identifying anything.`,
      `First pass: describe each sound's qualities only — sharp, soft, steady, fading.`,
      `Second pass: go back and name what's making each one.`,
      `Compare the two lists.`
    ],
    reflection: [
      `What did you notice in the first pass that vanished once you named the source?`,
      `Which sounds were hardest to describe without naming?`,
      `Does naming a sound help you hear it, or stop you hearing it?`
    ],
    examples: [
      `Pass one: 'a high thin line that never stops', 'three short taps then nothing', 'a low wash that swells and drops'. Pass two: strip light, shoes on the stairs, traffic. The low wash was far more interesting before I called it traffic.`
    ],
    description: `Sit quietly somewhere - a room, a courtyard, a bench outside - and simply pay close attention to the sounds around you for a few minutes without trying to identify anything yet. As you listen, take notes in two distinct passes. In the first pass, describe each sound's raw qualities without naming what's making it: is it sharp or soft, high or low, steady or fading, rhythmic or random? Try to capture the sound the way it would sound to someone who'd never encountered it before. In the second, separate pass, go back through and this time name what you think is actually making each sound - a car, a bird, a fan, footsteps. Deliberately separating description from identification slows down the listening process considerably and draws attention to sonic detail and texture that usually gets completely skipped over the instant a sound gets slapped with a familiar label.`
  },
  {
    id: `getting-to-know-through-sounds`,
    title: `Getting to Know Each Other Through Sounds`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `group`,
    topics: [
      `Sound & Identity`,
      `Audio Tools & Editing`,
      `Collaboration`
    ],
    overview: `Everyone picks a sound that says something about them, and the group responds with a single word.`,
    instructions: [
      `Search freesound.org for a clip that captures your identity or mood.`,
      `Play it for the group, one person at a time.`,
      `Everyone else writes down one word — the first that comes to mind.`,
      `Share the words, then explain why you chose the sound.`
    ],
    reflection: [
      `How far were other people's words from what you intended?`,
      `What did you want the sound to say about you?`,
      `Which sound told you the most about the person who chose it?`
    ],
    examples: [
      `I picked a recording of a train pulling out because I've spent a lot of my life leaving places. The words people wrote were 'heavy', 'industrial', 'lonely' and 'excited' — nobody wrote anything about travel.`
    ],
    description: `Each person spends a few minutes searching freesound.org for a sound clip that captures something about their identity, their mood, or how they're feeling right now - this could be literal (a sound from their hometown) or more abstract and metaphorical (a texture or rhythm that just feels like them). Going around the group one at a time, each person plays their chosen sound for everyone else. While listening, everyone else writes down just one word - the first word the sound brings to mind for them, without overthinking it. After the sound finishes, people can share the word they wrote down before the person who chose it explains why they picked that particular sound. The activity turns a typical first-day-of-class introduction into a listening exercise, and often reveals just how differently the same sound can land for different listeners compared to what the person who chose it intended.`
  },
  {
    id: `mini-sonic-scavenger-hunt`,
    title: `Mini Sonic Scavenger Hunt`,
    timeLabel: `25 min`,
    minutes: 25,
    setting: `group`,
    topics: [
      `Field Recording`,
      `Soundwalks`,
      `Collaboration`
    ],
    overview: `In pairs, hunt for and record real-world sounds that match a list of prompts, then guess each other's.`,
    instructions: [
      `Pair up and take a list of prompts — an emotion, a texture, a kind of place.`,
      `Head outside and record a sound for each, renaming files as you go.`,
      `Upload everything to a shared folder.`,
      `Play a matching game: which recording goes with which prompt?`
    ],
    reflection: [
      `Which prompt was hardest to find a sound for?`,
      `Did people match your recordings to the prompts you intended?`,
      `Can a sound carry an emotion on its own, without any explanation?`
    ],
    examples: [
      `For 'something lonely' I recorded a trolley being pushed across an empty car park. Everyone matched it correctly. For 'something warm' I recorded a radiator ticking and every single person guessed it was the lonely one.`
    ],
    description: `Working with a partner, each pair receives a list of prompts to hunt for - things like a sound tied to a specific emotion, a sound with a particular texture, or a sound characteristic of a certain kind of environment, with different pairs often getting slightly different lists. Partners head outside together and try to find and record a real-world sound that matches each prompt on their list, using the voice memo app on a phone, renaming files as they go so they stay organized. Once everyone's back inside, recordings get uploaded to a shared folder, and the group plays a matching game together: given a set of prompts and a set of anonymized recordings, everyone tries to figure out which recording was meant to match which prompt. The activity sharpens both the practical skill of searching an environment for a specific kind of sound and the more abstract skill of communicating something intangible, like an emotion, through sound alone - and the matching game afterward reveals how successfully (or not) that communication actually worked.`
  },
  {
    id: `layered-listening`,
    title: `Layered Body-to-Distance Listening`,
    timeLabel: `9 min`,
    minutes: 9,
    setting: `solo`,
    topics: [
      `Deep Listening`,
      `Reflection`
    ],
    overview: `Move your attention outward in stages — from your own body, to arm's reach, to the furthest thing you can hear.`,
    instructions: [
      `Close your eyes and settle.`,
      `One minute on sounds from your own body.`,
      `One minute on sounds within arm's reach, then one on the furthest sounds you can find.`,
      `Pick one sound, sit with it, then freewrite for five minutes.`
    ],
    reflection: [
      `What could you hear from your own body that you'd never noticed?`,
      `Which distance was hardest to hold your attention at?`,
      `Why did you choose the sound you came back to?`
    ],
    examples: [
      `My own breathing was much louder than I expected and slightly uneven. At arm's reach there was only my sleeve moving. The furthest thing was a plane I couldn't see, and I stayed with that — it took nearly a minute to cross and never quite disappeared.`
    ],
    description: `Close your eyes and settle into stillness for this layered listening exercise, which moves your attention outward in stages. For the first minute, focus entirely on sounds coming from your own body - your breathing, your heartbeat if you can sense it, small movements, stomach sounds, anything internal or right at the surface of your skin. For the second minute, widen your attention to sounds within arm's reach - things close enough that you could touch them if you moved. For the third minute, push your attention as far outward as possible, listening for the very furthest sounds you're able to detect. Finally, choose one sound from anywhere in that range that especially caught your attention, and spend a final minute returning to and sitting with just that sound. When the listening portion ends, spend five minutes freewriting about the whole experience without lifting your pen - describing what you noticed, how your attention shifted across the different distances, and what it felt like in your body to listen this closely.`
  },
  {
    id: `recorded-sound-reflection`,
    title: `Recorded Sound Reflection`,
    timeLabel: `10-12 min`,
    minutes: 12,
    setting: `solo`,
    topics: [
      `Reflection`,
      `Field Recording`,
      `Sound & Memory`
    ],
    overview: `Listen back to a sound you recorded and compare the recording against your memory of making it.`,
    instructions: [
      `Listen to a sound you've already recorded, all the way through.`,
      `Listen again, noting details you missed the first time.`,
      `Write three to five sentences on how it compares to your memory of that moment.`,
      `No recording yet? Go and make one, then write about capturing it.`
    ],
    reflection: [
      `What did the second listen give you that the first didn't?`,
      `Has your memory of the moment drifted from what's actually on the recording?`,
      `What did the recording leave out that you remember being there?`
    ],
    examples: [
      `I remembered the market recording as busy and cheerful. Listening back it's mostly one man shouting the same three words and a lot of traffic underneath. The cheerfulness was apparently something I brought with me, not something on the tape.`
    ],
    description: `This is a choose-your-own-adventure style reflection built around whatever personal sound recordings you already have. If you've already recorded a personal sound as part of an ongoing practice, start there: listen to it all the way through once, then listen a second time, this time jotting down specific details you notice that you missed the first time around. Afterward, write three to five sentences describing what the experience of listening back was like, and how it compares to your memory of the moment you originally recorded it - are they the same, or has your memory drifted? If you haven't recorded anything yet, use this time instead to go out, notice a sound that feels meaningful or interesting to you, and record it fresh, then write a few sentences about what the experience of capturing it felt like in the moment.`
  },
  {
    id: `obscured-sounds`,
    title: `Obscured Sounds`,
    timeLabel: `12 min`,
    minutes: 12,
    setting: `group`,
    topics: [
      `Field Recording`,
      `Sound & Place`,
      `Warm-up`
    ],
    overview: `Record the same sound twice — once as cleanly as you can, once deliberately blocked or muffled.`,
    instructions: [
      `Find a sound that changes when you move around it or put something in the way.`,
      `Recording A: capture it as cleanly as possible.`,
      `Recording B: capture it blocked, muffled or reflected.`,
      `Share both and talk them through with someone.`
    ],
    reflection: [
      `What did the obscured version add rather than take away?`,
      `Which of the two felt more like the real thing?`,
      `How much of what you hear is decided by where you happen to be standing?`
    ],
    examples: [
      `Clean version: a washing machine on spin, right next to it. Obscured: the same machine from the hallway with the door shut. The second one is much better — you lose the detail but you get the low knocking underneath that the close recording completely buried.`
    ],
    description: `Participants leave the room and go looking for a sound that changes noticeably depending on where they're standing relative to it - moving closer, moving farther away, or putting an object between themselves and the source, like a wall, a door, or their own body. Once you've found a good candidate sound, you make two separate recordings of it: Recording A captures the sound as clearly as you possibly can, positioning yourself and the recorder to get the cleanest signal; Recording B deliberately captures the sound in an obscured state - blocked, muffled, interrupted, or reflected off a surface in some way. Back in the room, everyone uploads both recordings to a shared folder and takes time listening to what classmates captured, followed by a discussion with the person next to you about your experience finding and recording your sound. The activity builds concrete, embodied awareness of how physical position, distance, and obstruction shape what we actually hear - something usually invisible to us until we deliberately manipulate it.`
  },
  {
    id: `record-or-listen`,
    title: `Record or Listen`,
    timeLabel: `20 min (10 activity + 10 writing)`,
    minutes: 20,
    setting: `pair`,
    topics: [
      `Field Recording`,
      `Deep Listening`,
      `Reflection`
    ],
    overview: `Choose one path for the session — record with a specific brief, or loop back a sound you already have.`,
    instructions: [
      `Pick your path: recording or listening.`,
      `Recording: choose a focus — a boundary, a transition, a feeling, a sound you usually miss — and record for six to eight minutes.`,
      `Listening: loop one of your recordings while changing your position, your eyes, your headphones.`,
      `Write for ten minutes, then swap with a partner.`
    ],
    reflection: [
      `How did having a brief change what you pointed the microphone at?`,
      `Which physical state changed the recording most?`,
      `What did you hear on the fourth loop that you missed on the first?`
    ],
    examples: [
      `I took 'a transition' and recorded the doors between the stairwell and the street. Having a brief made me wait — normally I'd record the street itself, but the interesting part turned out to be the four seconds where neither space wins.`
    ],
    description: `This branching activity offers two different paths depending on whether you want to focus on recording or on listening today. On the recording path, you pick a specific focus for what you want to capture - something like “a boundary,” “a transition,” “a feeling,” “a sound I usually miss,” or “a sound I hate” - then spend six to eight minutes recording with that focus in mind, trying it a few different ways, before writing about how having a specific purpose changed the way you approached recording compared to recording without a goal. On the listening path, you pick a sound you've already recorded and listen to it on a loop using a simple looping tool, experimenting with different physical states as you listen - eyes open versus closed, sitting versus standing versus lying on the floor, listening while drawing, listening while writing, listening through headphones versus speakers - then reflect on how your physical and mental state changed what you actually heard in the same recording. Both paths conclude with roughly ten minutes of writing followed by a peer exchange where you swap what you wrote with a partner.`
  },
  {
    id: `getting-to-know-your-recorder`,
    title: `Getting to Know Your New Recorder`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `solo`,
    topics: [
      `Field Recording`,
      `Deep Listening`,
      `Environmental Sound`
    ],
    overview: `Record the same sounds on a proper recorder and on your phone, then compare the two side by side.`,
    instructions: [
      `Take a dedicated recorder and your phone to the same place.`,
      `Record the same sounds on both, at the same time.`,
      `Cover a range: close voices, distant machinery, wind or birds. Ten seconds each.`,
      `Play them back side by side and compare.`
    ],
    reflection: [
      `Where was the difference between the two biggest?`,
      `Which handled distant or quiet sound better?`,
      `What makes a recording feel clear rather than muddy?`
    ],
    examples: [
      `On voices they're nearly identical. On the distant traffic the phone flattens everything into one grey noise, while the recorder keeps individual cars separate. Wind is the opposite — the phone just gives up, but the recorder turns it into loud crackling.`
    ],
    description: `A short listening exercise designed to practice paying close attention to everyday sounds while also learning the practical quirks of a new recording device. During the activity, you record multiple sounds using both a dedicated audio recorder and your phone at approximately the same time and place, so the two devices are capturing near-identical audio for direct comparison. The recordings should include a range of different sound types - nearby human voices, distant mechanical noise like traffic or HVAC systems, and natural ambient sounds like wind or birds - so you get a sense of how each device handles different frequencies and distances. Each recording lasts about ten seconds, short enough to keep the exercise quick but long enough to capture real texture. After recording, you play back the audio from both devices side by side and compare them, listening specifically for differences in clarity, background detail, noise floor, and how well distant or quiet sounds come through. The exercise highlights how different recording devices capture sound in meaningfully different ways, and encourages greater awareness of environmental audio and the specific qualities that make a recording feel clear versus muddy.`
  },
  {
    id: `group-memories-redesign`,
    title: `Designing a Group Memory Activity`,
    timeLabel: `30 min`,
    minutes: 30,
    setting: `pair`,
    topics: [
      `Collaboration`,
      `Sound & Memory`,
      `Reflection`
    ],
    overview: `Take a solo reflection exercise about sound-memories and redesign it for a group to do together.`,
    instructions: [
      `With a partner, start from a solo exercise on sounds tied to personal memories.`,
      `Work out how you'd prompt a group instead of one person.`,
      `Decide how people share out loud without it feeling forced.`,
      `Write step-by-step instructions someone else could actually run.`
    ],
    reflection: [
      `What breaks when you move a private exercise into a group?`,
      `How do you make space for someone who doesn't want to share?`,
      `What does the group version give you that the solo version can't?`
    ],
    examples: [
      `We kept the first three minutes silent and individual, then had people write their memory on a card rather than say it. Cards go in a pile and get read out anonymously. It removes the pressure of speaking about something personal while still making it shared.`
    ],
    description: `A collaborative design activity where you and a partner adapt the “Sonically Significant Memories” exercise - originally a solo, individual reflection - into a group-based experience that multiple people could do together. Working together, you brainstorm what would need to change: how do you prompt a group (rather than one person) to reflect on sounds tied to personal memories? How do you create space for people to share those memories out loud without it feeling forced? You develop and iterate on a new version of the activity, thinking through pacing, prompts, and structure, with the goal of supporting both individual reflection and social reminiscing - letting participants surface personal sound-memories on their own, then share and discuss them as a group. The task wraps up with generating concrete ideas and writing clear, step-by-step instructions for how the new group activity would actually be conducted by someone else in the future.`
  },
  {
    id: `interactive-spectrogram`,
    title: `Interactive Spectrogram`,
    timeLabel: `5 min`,
    minutes: 5,
    setting: `solo`,
    topics: [
      `Warm-up`,
      `Visualising Sound`,
      `Deep Listening`
    ],
    overview: `Make sounds into a live spectrogram and watch what your voice, claps and taps actually look like.`,
    instructions: [
      `Open a free browser spectrogram and turn on your microphone.`,
      `Try your voice at different pitches, clapping, tapping, humming.`,
      `Watch each sound appear as a pattern in real time.`,
      `Try to make the visualisation look a particular way.`
    ],
    reflection: [
      `Did seeing the sound sharpen your listening or distract you from it?`,
      `What looked completely different from how it sounded?`,
      `What showed up on screen that your ears had missed?`
    ],
    examples: [
      `Humming makes clean stacked bands, which I expected. What surprised me was 'sh' — it fills the whole top of the screen like a cloud with no structure at all, and a clap is almost invisible because it's over before it draws anything.`
    ],
    description: `Using a free browser-based spectrogram tool, participants turn on their computer or phone's microphone and start making sounds - trying out their voice at different pitches, clapping, tapping on the table, humming, or singing a few notes. As they make each sound, they watch it appear in real time as a visual pattern on screen: pitch mapped against time, with color or brightness often representing volume or intensity. Participants are encouraged to experiment deliberately, trying to make the visualization look a certain way, or seeing what different types of sounds “look like” compared to how they expected. The goal is to notice how seeing a sound represented visually changes the experience of listening to it in the moment - whether it sharpens your attention to specific qualities of the sound, distracts you from purely listening, or reveals patterns and details in the sound that your ears alone might have missed entirely.`
  },
  {
    id: `handheld-recorder-exploration`,
    title: `Handheld Recorder Exploration`,
    timeLabel: `25 min (5+5+10+5)`,
    minutes: 25,
    setting: `group`,
    topics: [
      `Audio Tools & Editing`,
      `Field Recording`,
      `Deep Listening`
    ],
    overview: `Work out an unfamiliar recorder with no instructions, then notice how the device shapes what you record.`,
    instructions: [
      `Pick up the recorder with no instructions and work out how to record.`,
      `Go and record something three ways: different positions, different mic settings, windshield on and off.`,
      `Keep each take to about 15 seconds.`,
      `Share the clips, listen to other people's, then freewrite.`
    ],
    reflection: [
      `What did you reach for first, and what confused you?`,
      `How did the device change what you chose to record?`,
      `How was this different from recording on your phone?`
    ],
    examples: [
      `I spent two minutes trying to start it before realising you hold record rather than press it. Having a thing in my hand that is only for recording made me much more deliberate — with a phone I record and move on, with this I kept repositioning.`
    ],
    description: `This multi-step activity uses an unfamiliar handheld audio recorder as a way to notice how a piece of technology shapes your relationship to sound. You start by picking up the recorder with no instructions at all, and have to figure out on your own how it works well enough to make a recording, paying attention to what button or feature you instinctively reach for first, and what confuses or surprises you along the way. Next, you go out and intentionally record something interesting, trying it in three different ways - different physical positions relative to the sound source, different microphone settings if the device offers them, and with a windscreen (or improvised substitute like a sock) on and off - each recording capped at about 15 seconds. You then upload your recordings to a shared folder, and spend time listening back to your own clips as well as what your classmates captured. Finally, you do some freewriting reflecting on the whole experience: how the device itself shaped what and how you recorded, how this differed from recording on a phone, and what you'd change about the device if you were designing one specifically to encourage this kind of reflective attention.`
  },
  {
    id: `scoring-pictures`,
    title: `Scoring Pictures`,
    timeLabel: `45 min`,
    minutes: 45,
    setting: `pair`,
    topics: [
      `Cross-Sensory`,
      `Sound Design`,
      `Storytelling`
    ],
    overview: `Build a soundtrack for an image, then swap writing with a partner and score each other's.`,
    instructions: [
      `Find sound effects for what's literally in an image.`,
      `Find effects for the mood of it instead — usually more abstract.`,
      `Add music that either supports or contradicts that mood.`,
      `Build one full soundscape, then swap writing with a partner and score theirs.`
    ],
    reflection: [
      `How much did the music change what the image seemed to be about?`,
      `Was contradicting the mood more interesting than matching it?`,
      `Did your partner's soundtrack match what you meant when you wrote it?`
    ],
    examples: [
      `The image was an empty swimming pool. With echoey water drips it reads as peaceful and abandoned. I swapped the music for a low sustained string note and the same photo suddenly looks like something bad happened there.`
    ],
    description: `This set of activities explores how sound and music can shape the way we interpret images and creative writing, treating sound as an active ingredient in meaning-making rather than just background. Participants first search online sound-effect libraries for effects that represent both the literal elements visible in an image (footsteps, rain, a door) and, separately, the emotional atmosphere or mood the image conveys, which often requires more abstract or metaphorical sound choices. They then search for music that either enhances or deliberately contradicts the visual mood, noticing how the same image can feel completely different depending on the soundtrack layered underneath it. In the final part of the activity, participants choose one image and build a complete soundscape for it, layering sound effects and music together from online resources into something cohesive. The exercise concludes with a partner exchange: participants trade a piece of creative writing, imagine and describe a soundtrack for each other's work, and discuss how their sound choices shaped or reinterpreted the meaning of the same visual or written content.`
  },
  {
    id: `modes-of-listening`,
    title: `Modes of Listening`,
    timeLabel: `8 min`,
    minutes: 8,
    setting: `group`,
    topics: [
      `Deep Listening`,
      `Warm-up`
    ],
    overview: `Hear the same clip three times, each time listening for something completely different.`,
    instructions: [
      `Play a short clip. First listen: take it in as a whole and get the overall feel.`,
      `Second listen: focus only on the voice and what's being said.`,
      `Third listen: focus only on the background noise and hiss underneath.`,
      `Compare what each pass gave you.`
    ],
    reflection: [
      `Which pass told you the most?`,
      `What did you miss entirely on the first listen?`,
      `Was there structure in what you'd normally dismiss as noise?`
    ],
    examples: [
      `First time I'd have said it was a cheerful interview. Second time the words are actually quite hesitant. Third time there's a rhythmic clicking all the way through that I think is a fan, and once you hear it you can't get back to 'cheerful'.`
    ],
    description: `The facilitator plays the same short sound clip three separate times in a row, asking participants to shift their focus completely each time. On the first listen, you take the clip in holistically, all at once, trying to get an overall sense or “vibe” of the whole thing without picking apart individual elements. On the second listen, you zero in specifically on just the voice or spoken words within the clip, trying to figure out exactly what's being said, tuning out everything else. On the third listen, you shift focus again, this time tuning into the background noise, crackling, or static underneath the main sound, listening specifically for any patterns or structure in what would normally be dismissed as noise. The exercise, drawn from sound scholar Karin Bijsterveld's framework on different modes of listening, makes vivid just how much the same recording can reveal completely different information and details depending entirely on what you deliberately choose to attend to.`
  },
  {
    id: `modifying-sounds`,
    title: `Modifying Sounds, Editing and Sound Design`,
    timeLabel: `1 hour`,
    minutes: 60,
    setting: `solo`,
    topics: [
      `Sound Design`,
      `Audio Tools & Editing`
    ],
    overview: `Work across three free tools — a voice changer, a multitrack editor and a code-based music platform.`,
    instructions: [
      `Modify your own voice with VoiceChanger.io and hear pitch and speed transform it.`,
      `Build a short layered composition in Audacity.`,
      `Try generative music in EarSketch, which mixes coding with production.`,
      `Experiment freely rather than aiming for a finished piece.`
    ],
    reflection: [
      `Which tool gave you the most control, and which gave you the most surprises?`,
      `What did hearing your own voice altered feel like?`,
      `How does composing by code differ from composing by ear?`
    ],
    examples: [
      `Pitching my voice down two octaves was genuinely unpleasant to listen to — it stops sounding like a person. In Audacity I layered the same clip at three speeds and it turned into something like a crowd, which I didn't plan at all.`
    ],
    description: `This set of hands-on activities focuses on experimenting with sound creation and editing using several different digital tools, giving participants a taste of what's possible with accessible, free software. First, participants modify their own voice using VoiceChanger.io, hearing how pitch, speed, and effects can transform something as familiar as their own speech into something unrecognizable or expressive in new ways. Next, they create a short original sound composition using multiple layered sounds and effects in Audacity, practicing the basics of arranging, trimming, and mixing audio. Finally, they explore generative music creation through EarSketch, a platform that blends coding with music production. Throughout, the activities encourage open-ended experimentation with recording, editing, and manipulating sound, helping participants build an intuitive understanding of how different tools - voice modification, traditional multi-track editing, and code-based composition - can each be used to create and shape audio experiences in distinct ways.`
  },
  {
    id: `audacity-getting-started`,
    title: `Getting Started with Audacity`,
    timeLabel: `50 min`,
    minutes: 50,
    setting: `solo`,
    topics: [
      `Sound Design`,
      `Audio Tools & Editing`
    ],
    overview: `A first pass through Audacity — record, import, arrange, add an effect and export.`,
    instructions: [
      `Install Audacity and record your first sound straight into it.`,
      `Import a few more clips, your own or from freesound.org.`,
      `Arrange them on a track — trim, move, layer.`,
      `Try changing pitch or speed, then export and share it.`
    ],
    reflection: [
      `What was harder than you expected?`,
      `Which effect changed a sound the most for the least effort?`,
      `What would you want to make now that you know the basics?`
    ],
    examples: [
      `I recorded a door, imported rain and a bell, and laid them so the bell lands just as the door shuts. Slowing the bell to half speed made it sound enormous — that one change did more than all my careful arranging.`
    ],
    description: `This is a hands-on, step-by-step walkthrough for getting comfortable with Audacity, a free and widely-used audio editing tool, aimed at participants who may have never opened an audio editor before. You start by installing the software, then record your own first sound directly into the program just to get a feel for the recording interface and waveform display. Next, you import a few more sounds into the project - either additional recordings you make yourself or clips found on freesound.org - and arrange them into a sequence on a single track, learning to trim, move, and layer audio clips. Once you have a basic sequence, you experiment with a couple of simple effects, like changing the pitch or speed of a clip, to hear how much a sound can be transformed with just a few clicks. Finally, you export the finished composition as an audio file and share it with someone else. The goal is to build baseline confidence with recording, editing, and combining sounds - the core technical skills that any further sound design or audio storytelling work in the course will build on.`
  },
  {
    id: `pebble-music`,
    title: `Pebble Music`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `group`,
    topics: [
      `Collaboration`,
      `Composition & Notation`,
      `Warm-up`
    ],
    overview: `Everyone performs a simple pebble instruction at the same time, and the layers become a piece of music.`,
    instructions: [
      `Everyone takes a handful of pebbles and a card with a sequence of actions.`,
      `Actions might be dropping, shaking, clicking or rolling — some steady, some irregular.`,
      `Study your own card for a moment.`,
      `Perform all at once, each following only your own card.`
    ],
    reflection: [
      `When did it stop sounding like noise and start sounding like music?`,
      `Could you still hear your own part inside the whole?`,
      `How much complexity came out of how little instruction?`
    ],
    examples: [
      `My card was just 'shake slowly, pause, shake slowly'. On its own it's nothing. About fifteen seconds in, the irregular droppers and the steady shakers locked into something that genuinely sounded composed, and then fell apart again.`
    ],
    description: `Each participant is handed a small handful of pebbles and a role card assigning them a specific sequence of actions to perform with those pebbles - things like dropping them, shaking them in cupped hands, clicking them together, or rolling them across a surface, sometimes in a steady, regular rhythm and sometimes in a deliberately irregular, unpredictable one. Everyone studies their own individual sequence for a moment, then the whole group performs simultaneously, each person following only their own assigned role card at the same time as everyone else. Because different people are producing different pebble sounds at different rhythms all at once, the individual, simple actions layer together into a surprisingly rich, improvised group soundscape - something closer to a piece of minimalist percussion music than a group of people just shaking rocks. The activity is a simple, tactile introduction to composition built through timing, texture, and layering rather than melody or harmony, and a reminder of how much complexity can emerge from very simple individual instructions performed together.`
  },
  {
    id: `soundwalk-scavenger-hunt`,
    title: `Soundwalk & Scavenger Hunt`,
    timeLabel: `30 min`,
    minutes: 30,
    setting: `pair`,
    topics: [
      `Soundwalks`,
      `Environmental Sound`,
      `Field Recording`
    ],
    overview: `An unhurried solo listening walk, followed by a paired hunt for sounds that match set prompts.`,
    instructions: [
      `Walk slowly on your own, recording sounds as you meet them. No target, just noticing.`,
      `Then pair up and explore together.`,
      `Hunt for sounds matching prompts — something lonely, something made by wind, something sharp or hollow.`,
      `Compare the two halves.`
    ],
    reflection: [
      `Which half made you hear more — the open walk or the hunt?`,
      `Did having prompts help you notice, or narrow you down?`,
      `What did you find with a partner that you'd have walked past alone?`
    ],
    examples: [
      `Alone I mostly recorded big obvious things — traffic, birds. With prompts and a partner we ended up crouched by a drain for five minutes because 'hollow' sent us looking for spaces rather than objects.`
    ],
    description: `This set of activities pairs two complementary listening and sound-recording exercises, both designed to sharpen participants' awareness of the sounds present in their everyday environment. The first activity, a soundwalk, is a solo, unhurried exercise in deep listening: participants move slowly through a space, carefully observing and recording sounds as they encounter them, without a specific target or agenda beyond noticing. The second activity, a sonic scavenger hunt, shifts the exercise into a social, goal-directed mode - participants pair up with a partner and explore their surroundings together, actively searching for and recording a variety of sounds that match a set of prompts spanning different categories, such as emotional prompts (a sound that feels lonely), environmental prompts (a sound made by wind), and purely descriptive prompts (a sharp sound, a hollow sound). Together, the two activities move participants from open, contemplative listening toward a more playful, intentional, and collaborative form of sound-seeking.`
  },
  {
    id: `create-a-score`,
    title: `Create a Score for 30 Seconds of Silence`,
    timeLabel: `12 min`,
    minutes: 12,
    setting: `group`,
    topics: [
      `Sketching & Ideation`,
      `Composition & Notation`
    ],
    overview: `Sketch a visual score in two minutes, perform it, then perform someone else's with no explanation.`,
    instructions: [
      `On blank paper, sketch a score to guide someone through filling 30 seconds with sound.`,
      `You get about two minutes — don't overthink it.`,
      `Everyone performs their own score at the same time.`,
      `Pass your score to the left and perform again.`
    ],
    reflection: [
      `How close was someone else's performance to what you intended?`,
      `What did your symbols turn out to mean to a stranger?`,
      `Is a score instructions, or a suggestion?`
    ],
    examples: [
      `I drew a thick line getting thinner, then three dots. I meant a long fading hum then three taps. The person who got it did three loud claps then a long whistle — they read it right to left and honestly it sounded better.`
    ],
    description: `On a blank piece of paper, sketch out a simple visual score - using whatever symbols, marks, or notation makes sense to you - designed to guide another person through filling exactly 30 seconds of silence with sound. You only get about two minutes to create it, so the instruction is deliberately not to overthink the design; a quick, intuitive sketch works better than an elaborate plan. Once everyone has a score, the whole group performs together simultaneously, each person interpreting and following their own score out loud at the same time, creating an improvised layered soundscape from everyone's individual notations. Then, everyone passes their score to the person on their left and performs again - this time interpreting someone else's visual notation cold, with no explanation from the original creator. The activity is a playful, fast introduction to graphic notation and the gap between what a score-maker intends and what a score-reader actually does with it.`
  },
  {
    id: `sound-card-circle`,
    title: `Sound Card Circle`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `group`,
    topics: [
      `Vocal Play`,
      `Collaboration`,
      `Warm-up`
    ],
    overview: `Draw a sound from a pile and make it with your body, then do it again with a constraint.`,
    instructions: [
      `Everyone writes a sound — real or imagined — on two cards.`,
      `Stand in a circle and put the cards in a pile.`,
      `Round one: draw a card and make that sound however you can.`,
      `Round two: draw a sound card and a constraint card, like 'without using your voice'.`
    ],
    reflection: [
      `What did the constraint force you to discover?`,
      `Which sound turned out to be impossible?`,
      `How did it feel to make a noise in front of everyone?`
    ],
    examples: [
      `I drew 'thunderstorm' with 'as quietly as possible'. I ended up rippling my fingernails on a paper cup very close to my mouth. It was nothing like thunder but everyone guessed it immediately.`
    ],
    description: `Before the activity starts, each participant writes down a sound - any sound at all, real or imagined - on two separate notecards. Everyone then stands together in a circle. In the first round, each person draws one card from the shared pile (not necessarily their own) and tries to physically make that sound out loud, using their voice, hands, or whatever they can improvise with their body, while the rest of the circle listens and reacts. In the second round, the stakes go up: each person draws both a sound card and a separate constraint card (for example, “without using your voice” or “as quietly as possible”), and has to figure out how to make the assigned sound while working within that added limitation. The activity is a playful, low-pressure way to warm up a group's willingness to make noise together in front of each other, while also sparking creative thinking about the many different physical ways a single sound can actually be produced.`
  },
  {
    id: `guess-30-seconds`,
    title: `Guess 30 Seconds`,
    timeLabel: `5 min`,
    minutes: 5,
    setting: `group`,
    topics: [
      `Deep Listening`,
      `Warm-up`,
      `Environmental Sound`
    ],
    overview: `Track 30 seconds in your head with no clock — once in silence, once with background sound.`,
    instructions: [
      `Close your eyes and silently track 30 seconds. No counting out loud, no timer.`,
      `Raise your hand when you think you've got there.`,
      `Someone keeps the real time and notes how far off everyone was.`,
      `Run it again with ambient sound playing — traffic, rain, café noise.`
    ],
    reflection: [
      `Were you faster or slower with sound playing?`,
      `What were you actually using to measure time?`,
      `Where else does sound quietly change how long something feels?`
    ],
    examples: [
      `In silence I called it at 21 seconds — way early. With rain playing I got to 34. Silence made every second feel long, and having something to listen to made the time disappear.`
    ],
    description: `Close your eyes and, without counting out loud or using a phone timer, try to silently track the passage of exactly 30 seconds inside your own head. The moment you believe 30 seconds have passed, raise your hand, while the facilitator keeps the actual time and notes how close (or far off) each person's internal sense of time was. After everyone has gone through this once in silence, the group tries the exact same exercise again, but this time with ambient background sound playing throughout - something like traffic, rain, or café noise. Compare how accurate people's sense of 30 seconds was with the sound playing versus in silence. The activity is a quick, genuinely fun way to notice how much the presence or absence of ambient sound can distort or anchor our internal sense of time passing, something we rarely think about consciously.`
  },
  {
    id: `sonic-yes-and`,
    title: `Sonic Yes, And…`,
    timeLabel: `8 min`,
    minutes: 8,
    setting: `group`,
    topics: [
      `Vocal Play`,
      `Improvisation`,
      `Collaboration`
    ],
    overview: `A sound travels round the circle, and each person extends it rather than starting something new.`,
    instructions: [
      `Stand in a circle in small groups.`,
      `One person makes any sound at all.`,
      `The person to their left modifies or extends it — never starts fresh.`,
      `Keep passing until it returns to whoever began.`
    ],
    reflection: [
      `Where did the sound change most, and why there?`,
      `Was it harder to extend than to start something new?`,
      `Did it come back as anything like what it left as?`
    ],
    examples: [
      `It started as a single finger click. By the fourth person it was a clicking rhythm, by the seventh it had picked up a hum underneath, and it came back to me as something between a beatbox and a purr. Nobody decided that.`
    ],
    description: `Split into smaller groups and stand together in a circle. One person in each circle starts by making any sound at all - a vocal sound, a clap, a stomp, a tap on the floor, literally anything. The person standing to their immediate left then has to respond by modifying or extending that exact sound in some way, rather than starting something new from scratch - maybe they speed it up, add a variation, layer something on top, or transform it slightly. That modified sound then passes to the next person, who modifies it again, and so on around the entire circle, with the sound gradually evolving and mutating as it travels, until it finally makes its way back to the person who started it. Borrowed directly from the “yes, and” principle of improv theater, where performers build on each other's offers rather than blocking them, the activity builds group listening, spontaneous vocal and sound play, and a shared sense of collective creation in a low-pressure, high-energy way.`
  },
  {
    id: `pair-listening-sound-object`,
    title: `Pair Listening & Sound as Object`,
    timeLabel: `45 min`,
    minutes: 45,
    setting: `pair`,
    topics: [
      `Deep Listening`,
      `Describing Sound`,
      `Visualising Sound`
    ],
    overview: `Swap recordings with a partner, describe what you hear in detail, then imagine a sound as a physical object.`,
    instructions: [
      `Record a sound in your environment on your own.`,
      `Swap clips with a partner and describe theirs in detail — what it sounds like, what it might be, how it feels.`,
      `Look at annotated visualisations of sound and see how someone else's notes change your hearing.`,
      `Imagine a sound as an object: its texture, shape and weight.`
    ],
    reflection: [
      `How did your partner's description differ from what you thought you'd recorded?`,
      `Did someone else's annotation change what you could hear?`,
      `What shape and weight did your sound turn out to have?`
    ],
    examples: [
      `My partner described my recording as 'something small and impatient in a big empty room'. It was a tap dripping in my bathroom, which is tiny. As an object it would be a cold steel ball bearing — small, heavy, smooth, and it would not stop moving.`
    ],
    description: `This in-class activity focuses on collaborative listening and exploring different ways to interpret sound beyond just hearing it. Students first practice pair listening: each person observes and records a sound in their immediate environment on their own, then exchanges audio clips with a partner. Rather than just listening passively, they describe what they hear from their partner's clip in detail - what it sounds like, what it might be, how it makes them feel. They then examine annotated visualizations and audio annotations of sound (visual representations layered with notes or tags) to see how having someone else's interpretation attached to a sound changes how they themselves hear and understand it. The activity concludes with a more imaginative, cross-sensory exercise: participants think about a sound and imagine how it could be represented as a physical object, considering tactile qualities like texture (is it rough or smooth?), shape (sharp-edged or round?), and weight (heavy or light?) - encouraging reflection on how sound can be experienced and translated through senses other than hearing.`
  },
  {
    id: `sonic-imaginaries`,
    title: `Sonic Imaginaries`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `pair`,
    topics: [
      `Imagination`,
      `Sketching & Ideation`,
      `Reflection`
    ],
    overview: `Take one sound that matters to you and run it through a chain of odd cross-sensory prompts.`,
    instructions: [
      `Write down the name of a sound you'd be sad never to hear again.`,
      `Work through the prompts: if it were a colour, a texture, a shape, a smell, a genre?`,
      `If it kept a secret, what would that secret be? Add a prompt of your own.`,
      `Sketch one association, then describe them to a partner without naming the sound.`
    ],
    reflection: [
      `Which prompt got you furthest from the literal sound?`,
      `What did your partner guess, and what led them there?`,
      `Does a sound have one meaning or several?`
    ],
    examples: [
      `My sound is the boiler firing up in the morning. Colour: deep orange. Texture: rough wool. Shape: a low arch. Genre: a slow domestic drama. Its secret is that it knows you're awake before you do. My partner guessed a cat.`
    ],
    description: `Start by thinking of a sound that genuinely matters to you - a sound you'd be sad to never hear again - and write down just the name of that sound on a piece of paper, without describing it yet. Then, work through a long chain of increasingly unusual creative-association prompts about that sound, one at a time: if this sound were a color, what would it be? If it had a texture, what would it feel like? If it had a shape? If it could move, how would it move? What would it smell like? If it were a genre - comedy, sci-fi, horror - which one? If it kept a secret, what would that secret be? You can also write your own original prompt in the same “if this sound were...” format. Once you've generated a handful of these associations, sketch one of them on paper. Then turn to a partner and share your list of imaginaries out loud - without ever naming the actual sound - while they try to guess what it might be, before you finally reveal it. The activity treats a single sound as a rich source of metaphor and cross-sensory association, rather than something with just one fixed, literal meaning.`
  },
  {
    id: `sounds-you-hope-to-hear`,
    title: `Sounds You Hope to Hear`,
    timeLabel: `5 min`,
    minutes: 5,
    setting: `group`,
    topics: [
      `Icebreakers`,
      `Warm-up`,
      `Imagination`
    ],
    overview: `Name a sound you're looking forward to hearing again, and bring it to life for the group.`,
    instructions: [
      `Think of a sound you're genuinely looking forward to hearing soon.`,
      `Decide how you'll share it — play a recording, imitate it, or describe it vividly.`,
      `Go round the group and share.`,
      `Notice how much anticipation is in the room.`
    ],
    reflection: [
      `Why that sound and not another?`,
      `Is looking forward to a sound different from remembering one?`,
      `What is it you're actually anticipating — the sound, or what comes with it?`
    ],
    examples: [
      `The specific rattle our back gate makes, because it means I'm home and it's the last sound before someone opens the door. I tried to imitate it and it came out as a sort of metallic cough, which is close enough.`
    ],
    description: `Take a moment to think of a specific sound you're genuinely looking forward to hearing again soon - maybe something tied to an upcoming break, a trip, a change of season, or a reunion with someone. Rather than just naming it, bring the sound to life for the group: play an actual recording of it if you have one, imitate it yourself with your voice or body, or describe it vividly enough that others can almost hear it too. Once everyone has had a chance to think of their sound, go around and share. The activity is a lightweight, forward-looking twist on sound-based reflection: instead of noticing and cataloguing sounds that are already present in your life, it asks you to imagine and voice a sound you're currently missing or anticipating, tapping into anticipation and longing as much as memory.`
  },
  {
    id: `exploring-sound-archives`,
    title: `Exploring Sound Archives`,
    timeLabel: `45 min`,
    minutes: 45,
    setting: `group`,
    topics: [
      `Sound Archives`,
      `Environmental Sound`
    ],
    overview: `Browse real national park field recordings, then examine how the archive is organised and redesign it.`,
    instructions: [
      `Browse the U.S. National Parks sound archives — forests, coastlines, wildlife.`,
      `Pick recordings you find interesting and share why.`,
      `Look at how it's organised: what metadata is attached, how you'd search it.`,
      `Redesign the archive for one specific user — a researcher, a visitor, an artist.`
    ],
    reflection: [
      `What does the way it's organised tell you about who it's really for?`,
      `What could you not find because of how it's structured?`,
      `What would change if it were built for a sound artist instead?`
    ],
    examples: [
      `Everything is filed by park and by species, which is perfect if you already know what you want. As an artist I wanted 'quiet things' or 'things with a rhythm' and there's no way in at all. My redesign sorts by texture first and location second.`
    ],
    description: `This in-class activity asks students to explore real-world sound archives maintained by U.S. National Parks, which contain field recordings of natural environments like forests, coastlines, and wildlife. Students browse the archive, select recordings they find interesting, and share them with the class along with a brief explanation of why the recording caught their attention. They then shift into a more analytical mode, examining how the archive organizes and presents its sound data - what metadata is attached to each recording, how recordings are categorized or searchable, and what that organizational structure reveals about the archive's priorities and intended users. Finally, students imagine how different kinds of users - a researcher, a casual visitor, a sound artist - might want to interact with the archive differently, and design a new version of the archive tailored to one specific user scenario, encouraging reflection on accessibility, organization, and creative uses of environmental sound collections.`
  },
  {
    id: `sonic-object-sketching`,
    title: `Sonic Object Sketching`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `solo`,
    topics: [
      `Sketching & Ideation`,
      `Sound Design`
    ],
    overview: `Sketch everyday objects, then rough out three sounds for each with your voice or body.`,
    instructions: [
      `Pick a few everyday objects — a laptop, a mug, a chair.`,
      `Look at each from a few angles and sketch it quickly on a sticky note.`,
      `Brainstorm three sounds connected to each — not necessarily ones it makes.`,
      `Perform each as a quick sonic sketch and share it.`
    ],
    reflection: [
      `Was sketching a sound easier or harder than sketching the object?`,
      `Which of your sounds had nothing to do with what the object actually does?`,
      `Can you iterate on a sound the way you iterate on a drawing?`
    ],
    examples: [
      `For a mug I did the obvious ceramic clink, then the sound of it being set down too hard, then a long low hum for the warmth of holding it. The third one is nothing the mug can do, but it's the one that felt most like a mug.`
    ],
    description: `Look around your immediate environment and pick a few everyday objects to focus on - things like a laptop, a coffee mug, a chair. Observe each object closely from a few different angles, thinking about what's common or generalizable about it, what details could be omitted in a simplified version, and what could be emphasized or exaggerated, then sketch each object quickly and simply on a sticky note using just a pencil. Next, for each object, brainstorm three different sounds that might reasonably be associated with it - not necessarily sounds it actually makes, but sounds that feel connected to it in some way. Then, for each of those imagined sounds, actually perform a quick “sonic sketch” using your body, your voice, or objects nearby, and upload the results to a shared board. The activity extends visual sketching - a familiar and well-established design tool - into the sonic domain, treating sound itself as something you can rough out, iterate on, and revise quickly, the same way a designer would rough out a visual idea on paper.`
  },
  {
    id: `sound-that-makes-you-smile`,
    title: `A Sound That Makes You Smile`,
    timeLabel: `8 min`,
    minutes: 8,
    setting: `solo`,
    topics: [
      `Field Recording`,
      `Warm-up`,
      `Environmental Sound`
    ],
    overview: `Go outside and find or make a sound that makes you smile. No deeper criteria than that.`,
    instructions: [
      `Step outside — out of the room, or further.`,
      `Find a sound that genuinely makes you smile.`,
      `It doesn't need to be meaningful. Smiling is the only test.`,
      `Record it on your phone and come back.`
    ],
    reflection: [
      `What was it about the sound that did it?`,
      `Was it the sound itself or what it reminded you of?`,
      `How different is hunting for delight from hunting for something interesting?`
    ],
    examples: [
      `A dog outside the shop making an enormous sigh as it lay down on the pavement. I have no idea why that's funny but I've listened to it four times.`
    ],
    description: `Step outside - out of the room you're in, or further if you're able to - and go looking for a sound that genuinely makes you smile when you hear it, or make one yourself if nothing you encounter quite fits. It doesn't need to be significant or meaningful in any deep way; the only criterion is that it makes you smile. Once you find it, record it on your phone, then head back inside. It's a small, low-effort prompt, but it deliberately reorients an entire sound-hunting exercise around delight and lightness rather than analysis, description, or careful classification, which can be a welcome contrast to the more reflective, academic listening exercises that make up much of the rest of a sound studies course.`
  },
  {
    id: `ai-sound-imagination`,
    title: `AI Sound Imagination`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `solo`,
    topics: [
      `AI & Sound`,
      `Imagination`
    ],
    overview: `Write a prompt for an AI sound generator, imagine the result yourself first, then compare.`,
    instructions: [
      `Open a free AI sound generator.`,
      `Write a prompt: an imaginary place, an emotion expressed metaphorically, or something absurd.`,
      `Before listening, imagine what it will sound like — pitch, texture, rhythm.`,
      `Listen, and compare against what you pictured.`
    ],
    reflection: [
      `Where did your imagination and the AI agree?`,
      `What did the AI reach for that you'd never have thought of?`,
      `Is a sound conjured from words the same kind of thing as a recorded one?`
    ],
    examples: [
      `My prompt was 'the inside of a lighthouse during a storm'. I imagined wind, low booming, something metallic and rhythmic. What came back was mostly rain and a sort of generic rumble — no metal at all, and no sense of a space having walls.`
    ],
    description: `Visit a free AI sound generator online and write a text prompt describing a sound you'd like it to create, choosing one of three directions: a sound that transports the listener to an imaginary place, a sound that conveys an emotion in a metaphorical rather than literal way, or a sound that's simply absurd. Before you actually listen to what the AI produces, pause and try to imagine what that sound might be like purely in your own head, based on your own prompt - what pitch, texture, rhythm, or tone do you picture? Only after forming that mental image do you listen to the AI-generated results, comparing what you imagined against what the AI actually made, and noticing where they align and where they diverge. The activity is a playful way to notice the gap - or surprising overlap - between imagined sound conjured purely from language, and sound actually generated by a machine working from that same language.`
  },
  {
    id: `rhythms-personal-archives`,
    title: `Rhythms & Personal Sonic Archives`,
    timeLabel: `45 min`,
    minutes: 45,
    setting: `pair`,
    topics: [
      `Sound & Memory`,
      `Deep Listening`,
      `Reflection`
    ],
    overview: `Revisit sounds you've recorded over time, then design a tool for keeping a personal sonic archive.`,
    instructions: [
      `Look back over the personal sounds you've recorded and pick ones worth revisiting.`,
      `Share a few with a partner.`,
      `Talk through why you recorded each one and what was happening at the time.`,
      `Design a tool, object or ritual for capturing and revisiting meaningful sounds.`
    ],
    reflection: [
      `What kind of sound do you reach for without realising?`,
      `What's missing from your collection?`,
      `What would make you actually go back and listen to these?`
    ],
    examples: [
      `Almost everything I've recorded is either water or someone else's conversation. There's nothing from indoors and nothing quiet. My tool idea is something that records ten seconds automatically at a random moment each day, so I don't get to curate it.`
    ],
    description: `This in-class activity asks students to look back across the personal sounds they've recorded throughout the entire course and select ones that feel meaningful to revisit. Working with a partner, students share a few of these recordings and talk through why they chose to record each particular sound in the first place, what was happening in their life at the time, and how the recording itself was made (where, how close, what device). These reflections then feed directly into a design exercise: through writing, sketching, and open brainstorming, participants imagine what a tool or system - an app, a physical object, a ritual - could look like that would help them (or anyone) capture, organize, and revisit meaningful personal sounds on an ongoing basis, effectively prototyping an early concept for a personal sonic archive.`
  },
  {
    id: `vibecoding-sound-tools`,
    title: `Vibecoding Sound Tools`,
    timeLabel: `90 min`,
    minutes: 90,
    setting: `solo`,
    topics: [
      `AI & Sound`,
      `Audio Tools & Editing`
    ],
    overview: `Use an AI coding assistant to build a small working sound tool by describing it in plain language.`,
    instructions: [
      `Open an AI coding assistant and describe what you want in plain language.`,
      `Build a simple page that uploads and plays back sound files.`,
      `Iterate: add looping, playback speed, simple visual controls.`,
      `Notice what the AI decides for you along the way.`
    ],
    reflection: [
      `Which decisions still felt like yours?`,
      `Where did the AI quietly steer the outcome?`,
      `How does this compare to building it by hand?`
    ],
    examples: [
      `I asked for a looping player and got one in about a minute. When I asked for a waveform it also added a colour scheme, a title and a footer I never asked for — and I kept them, which is the part I find slightly uncomfortable.`
    ],
    description: `This activity introduces students to “vibecoding” - using an AI coding assistant (in this case, Gemini) to rapidly build a small, functional piece of software by describing what you want in natural language rather than writing code line by line from scratch. Students use the AI assistant to build a simple webpage capable of uploading and playing back sound files, then iterate on it by asking the AI to add or modify features such as looping playback, adjusting playback speed, or adding simple visual controls tied to the audio. Throughout the process, students reflect on how working with AI changes the experience of building something - what decisions still feel like theirs, where the AI steers the outcome, and how quickly a working prototype comes together compared to coding it manually. The goal is to explore how AI can handle much of the technical implementation while students focus their own creative energy on higher-level decisions about listening, sound interaction, and the design of personal sonic tools.`
  },
  {
    id: `plan-your-sound-effects`,
    title: `Plan Your Sound Effects`,
    timeLabel: `12 min`,
    minutes: 12,
    setting: `solo`,
    topics: [
      `Sound Design`,
      `Sketching & Ideation`,
      `Storytelling`
    ],
    overview: `Break the sound needs of a bigger project into three concrete effects, and actually make one.`,
    instructions: [
      `Start from a project you're already working on.`,
      `List three specific sound effects you need. Be concrete, not vague.`,
      `For each, decide how you'll get it: record, find, or generate.`,
      `Sketch each one, then go and produce one of them.`
    ],
    reflection: [
      `Which was harder to specify than you expected?`,
      `What changed once you had to decide how to get it?`,
      `Does breaking it into three make the whole soundscape feel possible?`
    ],
    examples: [
      `I need: a heavy door on a stairwell, a kettle reaching the boil, and 'the feeling of being watched'. The first two I can record at home this week. The third isn't a sound effect at all, which I only realised by trying to write it down.`
    ],
    description: `Working from an audio project, story idea, or design concept you're already developing, list out three specific sound effects you'll need for it - things like dialog, a door slamming, or wind - being as concrete as possible rather than vague. For each of the three sounds, decide how you're actually going to obtain it: will you record it yourself using whatever's available to you, track down an existing recording from a resource like freesound.org, or generate it using an AI audio tool like ElevenLabs? For each sound, also do a quick sketch capturing your idea for it visually, even roughly. Finally, pick just one of the three sounds and actually go produce it using whichever method you chose. The activity breaks the sometimes-overwhelming task of sourcing sound for a larger creative project into small, concrete, individually doable pieces, rather than trying to solve the whole soundscape at once.`
  },
  {
    id: `auralizing-the-future`,
    title: `Auralizing the Future`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `solo`,
    topics: [
      `Imagination`,
      `Reflection`
    ],
    overview: `Imagine using something you're designing, twice — once new, once after years of routine — and listen to both.`,
    instructions: [
      `Close your eyes and picture using your design as a specific scene. Where are you, what time is it?`,
      `Now picture using it far in the future, when it's an unremarkable part of your routine.`,
      `In both, pay attention to what you can hear, not just what you can see.`,
      `Freewrite about what came up.`
    ],
    reflection: [
      `What sounds were present the first time but gone the second?`,
      `What does it sound like when something stops being novel?`,
      `What did listening tell you that picturing it didn't?`
    ],
    examples: [
      `First scene: a quiet kitchen, morning, and I'm paying attention to every beep it makes. Second scene: years later, the same beeps are happening under a radio and a conversation and I don't hear them at all. The design succeeding sounds like it disappearing.`
    ],
    description: `Close your eyes and picture yourself actually using a design idea, object, or tool you're currently working on - not abstractly, but as a specific, lived scene: where are you, what time of day is it, what are you doing right before and after you use it? Once you have that first scenario clearly in mind, imagine using the same thing again, but this time much further in the future, after it's become a long-standing, unremarkable part of your everyday routine rather than something new and novel. As you picture both scenarios, pay close attention specifically to what sounds you imagine being present in each one - not just what you'd see or do, but what the moment would actually sound like. Afterward, spend some time freewriting about what came up in your imagination. The exercise treats imagined sound, or “auralization,” as a legitimate design and reflection tool, parallel to how designers commonly use visualization or mockups, but tuned specifically to the ear instead of the eye.`
  },
  {
    id: `extreme-slow-walk`,
    title: `Extreme Slow Walk`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `solo`,
    topics: [
      `Deep Listening`,
      `Soundwalks`
    ],
    overview: `Move through a space far slower than normal, sometimes a full minute for a few feet, and listen as you go.`,
    instructions: [
      `Move through a space dramatically slower than you normally would.`,
      `A few feet can take a full minute. Don't rush it.`,
      `Pay attention to your own movement, your breathing and the space around you.`,
      `Stay with the discomfort of the pace.`
    ],
    reflection: [
      `What did the slowness make audible that walking normally hides?`,
      `How did your own body sound at that speed?`,
      `How long before the pace stopped feeling uncomfortable?`
    ],
    examples: [
      `The first minute was genuinely embarrassing. After that my own clothes became the loudest thing in the room, and I started hearing the strip lights, which I'd have sworn were silent. Walking normally is apparently quite noisy.`
    ],
    description: `This session introduces two activities focused on mindful listening and reflecting on the personal sound collection students have built up over the semester. It begins with an “extreme slow walk,” an exercise inspired by the composer and deep-listening pioneer Pauline Oliveros, in which participants move through a space at a dramatically slower pace than normal - sometimes taking a full minute to move just a few feet - while paying careful attention to their own movement, breathing, and the surrounding soundscape as it unfolds in extreme slow motion. This deliberately uncomfortable pace strips away the usual autopilot of walking and forces sustained, moment-to-moment listening. The session then transitions into an audit activity, where students go back through their entire personal sonic archive collected over the semester, reviewing what they've gathered, noticing patterns or gaps, and reflecting on which recordings feel most significant - preparation that directly feeds into the semester's final project.`
  },
  {
    id: `sonic-portrait-interview`,
    title: `Sonic Portrait Interview`,
    timeLabel: `25 min`,
    minutes: 25,
    setting: `pair`,
    topics: [
      `Sound & Identity`,
      `Reflection`,
      `Sound & Memory`
    ],
    overview: `Interview a partner about the sounds that shape their life, and gather material for a sonic portrait.`,
    instructions: [
      `Pair up and decide who goes first.`,
      `Ask about the sounds of their life: most comforting, tied to a memory, most missed if it were gone.`,
      `As interviewer, follow up for specifics rather than accepting the first answer.`,
      `Gather quotes and descriptions you could build a short audio portrait from. Then swap.`
    ],
    reflection: [
      `Which question opened them up the most?`,
      `What did they say that you'd never have predicted?`,
      `What would you keep if you had only sixty seconds of them?`
    ],
    examples: [
      `She said her most comforting sound was her mum on the phone in another room — not the words, just the rhythm of someone talking who isn't talking to you. I'd build the whole portrait around that one line.`
    ],
    description: `In this activity, students interview a partner using a set of guiding questions designed to surface the sounds that shape their everyday life, memories, and emotions - questions like what sound they find most comforting, what sound they associate with a specific memory, or what sound they'd miss most if they could never hear it again. As the interviewer, you listen closely and ask natural follow-up questions to draw out more specific, vivid detail rather than settling for a surface-level answer. As the interviewee, you're asked to really sit with the questions rather than giving the first easy answer that comes to mind. The goal is to practice deep listening to another person's story as told through sound, and to gather rich material - quotes, specific sound descriptions, emotional context - that can later be used to create a short “sonic portrait”: a brief audio piece that represents your partner through a curated selection of meaningful sounds and their own words.`
  },
  {
    id: `one-sound-for-this-season`,
    title: `One Sound For This Season`,
    timeLabel: `7 min`,
    minutes: 7,
    setting: `group`,
    topics: [
      `Reflection`,
      `Sound & Memory`,
      `Icebreakers`
    ],
    overview: `Find a single sound that captures a recent stretch of your life, and share why.`,
    instructions: [
      `Think back over a recent stretch of time — a season, a project.`,
      `Land on one sound that captures how it felt, even if the link is loose.`,
      `Describe it, find it, record it or make it yourself.`,
      `Share it with the group and explain the connection.`
    ],
    reflection: [
      `Why that sound rather than an obvious one?`,
      `Does having a sound for it change how you remember the period?`,
      `Would you have picked the same sound a month ago?`
    ],
    examples: [
      `A laptop fan going hard. It's not a nice sound and that's the point — the whole stretch was working late in a room that was too warm, and the fan is the thing that was there for all of it.`
    ],
    description: `Take a few minutes to think back over a recent stretch of time - a semester, a season, a specific project - and try to land on a single sound that somehow captures how that whole period felt for you, even if the connection feels a little abstract or hard to fully explain. It can be a sound you describe out loud in words, one you find and play from an existing source online, one you record fresh right now, or one you make yourself with your voice or body. Spend a few minutes searching, reflecting, or experimenting until you land on something that feels right, then share your chosen sound with the group along with a brief explanation of the connection. The activity turns an abstract stretch of time into something concrete you can point to and listen back to later, rather than something you can only describe secondhand in words.`
  },
  {
    id: `classifying-sounds`,
    title: `Classifying Sounds`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `group`,
    topics: [
      `Describing Sound`,
      `Reflection`,
      `Collaboration`
    ],
    overview: `Place your recording on a shared grid running ugly to beautiful and mundane to unusual.`,
    instructions: [
      `Add a recording of yours to a shared board and give it a short label.`,
      `Place it on the two axes: ugly to beautiful, mundane to unusual.`,
      `Go on gut instinct rather than deliberating.`,
      `Watch the board fill and see where yours sits against everyone else's.`
    ],
    reflection: [
      `What made you call your sound beautiful or ugly?`,
      `Where did you disagree most with someone else?`,
      `Are these judgements about the sound, or about what makes it?`
    ],
    examples: [
      `I put a drain gurgling in ugly/unusual. Two other people moved similar sounds into beautiful. The argument that followed was basically about whether knowing what makes a sound should be allowed to affect whether you like it.`
    ],
    description: `Participants start by inserting an audio file they've recorded into a shared collaborative board and giving it a short label describing what it is. They then place their sound on a two-axis spectrum drawn out on the board: one axis runs from ugly to beautiful, the other from mundane to unusual, so every sound ends up positioned somewhere in this four-quadrant space based on a quick gut judgment. As more people add their sounds, the board fills up with a shared, visual map of everyone's audio, positioned right alongside sounds submitted by classmates. The activity turns an otherwise abstract listening experience into something visual and comparative - you can literally see where your sound landed relative to everyone else's - prompting reflection on why a particular sound feels ordinary versus striking, pleasant versus unpleasant, and just how much those judgments differ from one listener to the next even when everyone is technically listening to “the same kind” of sound.`
  },
  {
    id: `audio-diegetic-prototype`,
    title: `Audio Story Prototype`,
    timeLabel: `90 min`,
    minutes: 90,
    setting: `solo`,
    topics: [
      `Storytelling`,
      `Sound Design`
    ],
    overview: `Design a short audio-only story from character through to a finished edit, treating sound as the storytelling.`,
    instructions: [
      `Define your characters and what a listener must understand with no visuals.`,
      `Break the story into three to five acts and what changes in each.`,
      `For each act, separate sounds that carry information from sounds that carry mood.`,
      `Decide a source for every sound, gather them, and edit it together.`
    ],
    reflection: [
      `Could someone follow it with no visuals at all?`,
      `Where would a listener get lost?`,
      `Does the emotional arc come through in the edit, or only in your head?`
    ],
    examples: [
      `Act one is a person arriving somewhere. Information sounds: keys, a heavy door, a suitcase wheel stopping. Mood sounds: a room tone that's slightly too quiet. The test listener knew someone had arrived but thought it was a hotel, not a family home — that's the room tone's fault.`
    ],
    description: `This worksheet guides you through designing a short, audio-only story from the ground up, treating storytelling itself as a sound-design exercise. You start by defining your main character or characters - who they are, what traits matter, and what a listener needs to understand about their identity purely through sound and dialog, without any visuals to lean on. Next, you break your story into three to five acts, thinking through the core transformation that happens in each one and how your characters are different at the beginning versus the end of each act. You then sketch out what actually happens in each act in more concrete terms - the specific actions, events, and interactions - almost like a lightweight script or storyboard. The real heart of the worksheet is the sound design step: for each act, you identify which sounds convey information (helping a listener understand what's literally happening) and which sounds convey emotion or vibe (helping a listener feel the mood, even if no one explains it). For every sound you've identified, you decide on a source - will you record it yourself, find an existing recording (such as on freesound.org), or generate it using a tool like ElevenLabs? Once your sounds are gathered, you edit the whole story together in Audacity. The worksheet ends with a checklist prompting you to test whether a listener could follow the story with no visuals at all, where they might get confused, which moment matters most to get right, and whether the emotional arc actually comes through in the final sound edit.`
  },
  {
    id: `visual-vocal-sketching`,
    title: `Visual + Vocal Sketching`,
    timeLabel: `20 min (17 min + group discussion)`,
    minutes: 20,
    setting: `group`,
    topics: [
      `Sketching & Ideation`,
      `Vocal Play`,
      `Collaboration`
    ],
    overview: `Scribble freely on paper, then translate the lines into sounds with your voice and with objects.`,
    instructions: [
      `Seven minutes with paper and pen: take a line for a walk, scribble, then scribble with your eyes closed.`,
      `Fill the space with straight and wavy lines, then photograph and share it.`,
      `Pick a line in your own drawing and make a sound for it with your voice. Repeat for four lines.`,
      `Then use a noisy object on someone else's drawing, four more times.`
    ],
    reflection: [
      `How differently did you translate a line with your voice versus an object?`,
      `Was it easier to interpret your own drawing or a stranger's?`,
      `What did a line have to look like for the sound to feel obvious?`
    ],
    examples: [
      `A jagged line I did with my voice as short sharp 'ka' sounds. The same shape with a set of keys became something much more continuous, because you can't really make an object stop cleanly. The object versions all came out longer than the vocal ones.`
    ],
    description: `This three-part warm-up moves from pen-and-paper sketching into vocal and object-based sound-making, using a simple line drawing as the seed for everything that follows. In Part 1, you spend seven minutes warming up with a blank sheet of paper and a pen: you take a line for a walk in a loose wavy scribble, keep scribbling without overthinking it, close your eyes and continue scribbling blind, then sketch some short straight lines and some wavy ones, gradually filling in the available space and doodling into any larger gaps that remain. Once you're done, you photograph your sketch and upload it to a shared board. In Part 2, you look at a single line within your own drawing and, using just your voice, create a sound inspired by that line, recording it and placing it next to the line on the board (with an arrow connecting them if you like); you repeat this for at least three more lines, for four vocal sounds total. In Part 3, you pick an object from a bag of noisy objects, look at a line within someone else's drawing this time, and use the object to record a sound inspired by that line, again repeating for at least three more lines. The activity closes with a group session where everyone looks at each other's drawings, listens to the sounds attached to them, and discusses the experience together - surfacing how differently people translate the same kind of visual mark into sound depending on whether they're using their voice or an object.`
  },
  {
    id: `audiovisual-memory-map`,
    title: `Audiovisual Memory Map`,
    timeLabel: `10 min (+ optional homework)`,
    minutes: 10,
    setting: `pair`,
    topics: [
      `Sound & Memory`,
      `Sound & Place`,
      `Reflection`
    ],
    overview: `Draw a map of a place that matters to you and label it with the sounds and memories it holds.`,
    instructions: [
      `Think of a place where you're part of a community, and narrow to one part of it.`,
      `Draw a rough map on paper, labelling the important areas.`,
      `Add the memories and events that happened there, then add every sound you associate with it.`,
      `Pick one sound, work out how you'd rebuild it, and describe it on the back. Then swap maps.`
    ],
    reflection: [
      `Which sounds came back before the visual details did?`,
      `What would you need to reconstruct that sound honestly?`,
      `What did your partner ask about that you hadn't thought of?`
    ],
    examples: [
      `I mapped the corridor outside the sixth form common room. Sounds: a specific fire door, a vending machine, and everyone's voices bouncing because it was all hard surfaces. To rebuild it I'd need the door, the machine hum, and about twenty people recorded in a stairwell rather than a room.`
    ],
    description: `Start by thinking of a place that matters to you and where you engage with some kind of social community - it could be somewhere at school, back home, or somewhere like a summer camp - and try to narrow in on one specific part of that place you can clearly picture yourself walking through, like a particular set of rooms or a floor of a building. On paper, draw a basic map of that space, labeling and annotating the important areas as you go (using different colored pens for different parts if you want). Next, think about specific memories or events that happened in that space and label those on your map too. Then shift your attention specifically to sound: label your map with as many sounds tied to that space as you can think of. Pick one of those sounds and think through how you might actually reconstruct it - what would you need to find or record, and what layers might the reconstructed sound contain - then write a short description of that reconstructed sound on the back of your map. Finally, pair up with someone else, exchange maps, and ask each other questions about what you each drew. As a stretch follow-up, you can try to actually create the reconstructed sound you described over the following days.`
  },
  {
    id: `sound-that-reminds-you-of-home`,
    title: `A Sound That Reminds You of Home`,
    timeLabel: `6 min`,
    minutes: 6,
    setting: `group`,
    topics: [
      `Warm-up`,
      `Sound & Memory`,
      `Icebreakers`
    ],
    overview: `Introduce yourself with a sound that reminds you of home, no justification needed.`,
    instructions: [
      `Think of a specific sound that reminds you of home.`,
      `It doesn't need explaining — whatever comes first is right.`,
      `Share your name and describe or play your sound.`,
      `Say briefly why sound or listening interests you.`
    ],
    reflection: [
      `What does your sound suggest home means to you?`,
      `Whose sound was closest to yours?`,
      `How many people picked something nobody else would recognise?`
    ],
    examples: [
      `The specific creak of the third stair. Two other people also picked a stair or a floorboard, which I'd never have predicted — apparently home is largely the sound of a building complaining.`
    ],
    description: `As a quick way to introduce yourself to a new group, think of a specific sound that reminds you of home - it doesn't need to be explained or justified, just something that immediately comes to mind. Going around the group, each person shares their name, describes their sound (or plays it if they have a recording), and briefly says why they're drawn to the topic of sound or listening in general. The activity works well as an opening icebreaker for a new group of people, since it gives everyone a concrete, personal, sensory detail to introduce themselves with instead of a generic bio, and often reveals overlapping or surprisingly different associations with the idea of “home.”`
  },
  {
    id: `multi-sensory-place-sketching`,
    title: `Multi-Sensory Place Sketching`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `solo`,
    topics: [
      `Cross-Sensory`,
      `Sound & Place`,
      `Sketching & Ideation`
    ],
    overview: `Take a place you're missing and turn it into a sound, a texture, a gesture and then an object.`,
    instructions: [
      `Imagine a place that matters to you and that you wish you could visit now.`,
      `Find or make a sound that represents it.`,
      `Decide what texture and what physical gesture go with that sound.`,
      `Sketch an object that holds all three.`
    ],
    reflection: [
      `What texture did the place turn out to have?`,
      `What movement does the sound ask your body to make?`,
      `What would it mean to hold this place in your hand?`
    ],
    examples: [
      `The place is a beach in winter. Sound: wind with no birds in it. Texture: cold, slightly damp, smooth like a wet pebble. Gesture: turning something over and over in a closed fist. The object is a flat stone that makes a low sound when you rub your thumb across it.`
    ],
    description: `Start by imagining a place that's important to you - somewhere you wish you could visit right now, whether that's a specific spot from your past or somewhere far from where you currently are. First, find an existing recording or make a sound that represents this place - it could be a literal field recording or something more evocative. Next, think about what texture or textures you'd match with that sound: is it rough, smooth, warm, cold? Then think about what physical gesture or gestures you'd match with the sound - the motion your hand or body would make if you were interacting with it. Finally, bring it all together by sketching a physical object you might create that represents this place and this sound, incorporating the textures and gestures you identified along the way. The activity chains together sound, touch, and movement into a single design exercise, treating a place you're longing for as raw material for something you could actually hold.`
  },
  {
    id: `sound-rich-bio`,
    title: `Sound-Rich Bio`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `group`,
    topics: [
      `Sound & Identity`,
      `Icebreakers`
    ],
    overview: `Introduce yourself through a sound you love, a sound you hate, and one audio file you want to share.`,
    instructions: [
      `Write a short bio, one to three sentences.`,
      `Add a sound you love — be specific rather than general.`,
      `Add a sound you hate. Oddly specific is better.`,
      `Pick an audio file to share, then share everything with the group.`
    ],
    reflection: [
      `Which told people more about you — the love or the hate?`,
      `Why does that specific hated sound get to you?`,
      `What do your three choices have in common?`
    ],
    examples: [
      `Love: slow footsteps upstairs when I'm downstairs. Hate: someone scraping the last of a yoghurt out of the pot. The hated one got a much bigger reaction, and three people said they'd never thought about it but agreed instantly.`
    ],
    description: `Instead of writing a standard introduction, you write a short bio (one to three sentences) alongside three sound-specific prompts: a sound you love, a sound you hate, and an audio file you want to share with the group. The sound prompts push you past generic biographical facts into something more specific and sensory - a sound you love might be something like the sound of slow footsteps, and a sound you hate might be something oddly specific like the sound of squishing cotton balls between your fingers. Once everyone has written their responses, people share them with the group, often listening to each other's shared audio files together. The activity turns introductions into a way of getting to know people through their sonic likes and dislikes, which tend to reveal more personality than a standard “where are you from” icebreaker.`
  },
  {
    id: `bird-sound-design-sprint`,
    title: `Bird Sound Design Sprint`,
    timeLabel: `15 min`,
    minutes: 15,
    setting: `solo`,
    topics: [
      `Describing Sound`,
      `Sketching & Ideation`,
      `Environmental Sound`
    ],
    overview: `Learn the vocabulary for describing bird calls, then sketch as many objects as you can from one.`,
    instructions: [
      `Listen to a short podcast on the vocabulary for bird sounds — clear, hoarse, nasal, squeaky, buzzy, mechanical, clicking.`,
      `Notice how specific the language gets.`,
      `Pick one bird sound you heard about.`,
      `In five minutes, sketch as many object concepts from it as you can. Quantity over polish.`
    ],
    reflection: [
      `Which describing word was most useful, and which felt useless?`,
      `How many ideas did you get before you started repeating yourself?`,
      `What did going fast let you think of that going slow wouldn't?`
    ],
    examples: [
      `I took 'buzzy' and got eleven sketches in five minutes: a wind-up tin, a comb instrument, a door buzzer shaped like an egg, a spinning top with a reed in it. The last three are the only interesting ones and I'd never have got there by planning.`
    ],
    description: `Start by listening to a short podcast episode about the vocabulary used to describe bird sounds (terms like “clear,” “hoarse,” “nasal,” “squeaky,” “buzzy,” “mechanical,” or “clicking”), paying attention to how specific and varied the language for describing bird calls can be. Then pick one of the bird sounds you heard about, and in about five minutes, sketch as many different concepts as you can for a physical object inspired by that sound - you can sketch on paper or digitally, and the sketches can be as rough or as playful as you like (think mechanical bird figurines, sonic eggs, mini-flutes, spinning toys, anything the sound suggests to you). The goal is quantity and speed over polish: generate as many different directions as possible in a short burst, rather than getting attached to a single idea too early.`
  },
  {
    id: `find-interesting-object-sound`,
    title: `Find an Interesting Object Sound`,
    timeLabel: `5 min`,
    minutes: 5,
    setting: `group`,
    topics: [
      `Warm-up`,
      `Environmental Sound`,
      `Icebreakers`
    ],
    overview: `Find something near you that makes an interesting sound and share it with the group.`,
    instructions: [
      `Look around wherever you are.`,
      `Find an object that makes a sound worth sharing — nothing special required.`,
      `Record it quickly or plan to demonstrate it live.`,
      `Share it and say a word or two about what drew you to it.`
    ],
    reflection: [
      `What made you pick that object over everything else nearby?`,
      `What did other people's objects tell you about where they are?`,
      `How many interesting sounds were within reach that you'd never noticed?`
    ],
    examples: [
      `A metal tape measure — if you pull out about a foot and let it wobble it makes a really satisfying warble. I've had it in the drawer for years and never once played with it.`
    ],
    description: `Look around wherever you currently are and find an object that makes an interesting sound - it doesn't need to be anything special or obviously musical, just something that produces a sound you find worth sharing. Make a quick recording or simply demonstrate the sound live, then share it with the group along with a word or two about what drew you to it. It's a fast, low-barrier way to start a session with everyone contributing a small, personal discovery, and it works especially well when people are joining from different physical locations, since everyone's object sound reflects wherever they happen to be.`
  },
  {
    id: `cross-sensory-sound-sketching`,
    title: `Cross-Sensory Sound Sketching`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `group`,
    topics: [
      `Cross-Sensory`,
      `Collaboration`
    ],
    overview: `Pass a sound round a small group, turning it first into a gesture and then into a texture.`,
    instructions: [
      `Everyone finds or shares a sound.`,
      `Listen to the sound from the person before you.`,
      `Invent a physical gesture that interprets it and describe the gesture in a sentence.`,
      `Staying with the same sound, decide what texture an object made from it would have.`
    ],
    reflection: [
      `Did the gesture come before or after you understood the sound?`,
      `How close was your texture to what the person who chose it expected?`,
      `Which sense translated the sound most easily?`
    ],
    examples: [
      `The sound was a zip being done up slowly. My gesture was dragging one finger up my forearm, quite hard. The texture I gave it was corduroy — ridged, and only rough in one direction.`
    ],
    description: `This multi-step activity works best with a small group, translating a single sound through several different senses in sequence. Step 1: each person finds or shares a sound. Step 2: everyone listens to the sound shared by the person before them (or one assigned to them) and comes up with a physical gesture that interprets it - a specific hand or body motion that captures something about the sound's rhythm, texture, or feeling - then writes a short description of that gesture. Step 3: sticking with the same sound, everyone comes up with a texture that would represent a physical object created from that sound, describing it in words or finding a reference image (rough, smooth, cold, cobblestone-like, shell-like, whatever fits). The activity is a structured way to move a single sound through multiple design lenses - motion, then material - surfacing associations that wouldn't come up if you only thought about a sound in the abstract.`
  },
  {
    id: `sonic-exquisite-corpse`,
    title: `Sonic Exquisite Corpse`,
    timeLabel: `20 min`,
    minutes: 20,
    setting: `group`,
    topics: [
      `Collaboration`,
      `Improvisation`
    ],
    overview: `Build a chain of sounds across a group where nobody ever hears more than the last link.`,
    instructions: [
      `Add your name to a column on a shared board and record a sound for a given prompt word.`,
      `Move one column across, listen to what's there, and record a response to it.`,
      `Move again and respond to the newest sound in that column.`,
      `Repeat for as many rounds as you have time for.`
    ],
    reflection: [
      `How far did your column travel from its prompt?`,
      `What were you responding to — the sound, or what you assumed it meant?`,
      `Could anyone have planned the result?`
    ],
    examples: [
      `The prompt word was 'metal'. Round one was keys. Round two responded with a hum, round three heard the hum as a drone and added breathing, and by round five it was someone singing. Nobody did anything wrong and it still ended up nowhere near metal.`
    ],
    description: `Borrowing the surrealist parlor game of the same name, this activity builds a chain of evolving sounds across a group. In Round 1, each person adds their name to a column on a shared board and records or uploads a sound responding to a given prompt word. In Round 2, everyone moves one column over, listens to the sound that's there, and records a new sound that responds to or extends it in some way. In Round 3, everyone moves over again, listens to the most recent sound in that column, and again records something that responds to or extends it. The group repeats this pattern for as many rounds as time allows. Because no one ever sees the full chain of a given column as it develops, and everyone is only ever responding to the single most recent sound, each column evolves into an unpredictable, collaboratively-built sound sequence that no individual person could have planned or anticipated.`
  },
  {
    id: `listen-describe-guess-respond`,
    title: `Listen, Describe, Guess, Respond`,
    timeLabel: `10 min`,
    minutes: 10,
    setting: `group`,
    topics: [
      `Deep Listening`,
      `Describing Sound`,
      `Improvisation`
    ],
    overview: `Four responses to one shared sound: how it felt, how you'd describe it, what it is, and a sound back.`,
    instructions: [
      `Someone plays a single sound for everyone.`,
      `Say how listening to it made you feel.`,
      `Describe it without naming what's making it.`,
      `Guess what it actually is, then record a sound of your own that answers it.`
    ],
    reflection: [
      `Did your feeling change once you knew the source?`,
      `Was describing or guessing harder?`,
      `What made your response feel like an answer rather than a new sound?`
    ],
    examples: [
      `Feeling: uneasy, like something was about to stop. Description: a fast irregular tapping with too much space between some of the taps. Guess: rain on a skylight. My response was me tapping the same rhythm on a desk but slowing it down until it stopped.`
    ],
    description: `The facilitator plays a single sound for the whole group. Everyone then responds to four separate prompts about it: how listening to the sound made them feel, how they'd describe the sound without naming what's making it, what they think it actually is or what made it, and finally, a recorded sound of their own that responds to the original sound in some way. The activity layers emotional reaction, careful description, source-guessing, and creative response into one sequence, moving participants from passive listening into active, generative engagement with a single shared sound.`
  }
];

const SETTING_LABELS = {
  solo: "By myself",
  pair: "With a partner",
  group: "With a group"
};

const TOPICS = [
  `AI & Sound`,
  `Audio Tools & Editing`,
  `Collaboration`,
  `Composition & Notation`,
  `Cross-Sensory`,
  `Deep Listening`,
  `Describing Sound`,
  `Environmental Sound`,
  `Field Recording`,
  `Icebreakers`,
  `Imagination`,
  `Improvisation`,
  `Reflection`,
  `Sketching & Ideation`,
  `Sound & Identity`,
  `Sound & Memory`,
  `Sound & Place`,
  `Sound Archives`,
  `Sound Design`,
  `Soundwalks`,
  `Storytelling`,
  `Visualising Sound`,
  `Vocal Play`,
  `Warm-up`
];
