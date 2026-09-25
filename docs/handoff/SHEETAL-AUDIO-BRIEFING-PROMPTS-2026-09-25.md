# Audio briefing for Sheetal — NotebookLM prompts

**Created:** 2026-09-25
**Purpose:** an audio summary Sheetal can listen to, so the agreements from the
25 September call stay in front of her without her having to read documents.

> She said it herself: *"Send me in a few lines, I need this, this, this… If
> there's too much, it's like, I don't know where to start."* Audio suits how
> she takes information in. She is on calls all day and goes to nature to
> recover; this is something she can hear on a walk.

---

## ⚠️ Read this before generating anything

The 25 September transcript contains material that **must not** end up in an
audio briefing she receives:

- Her account of past trauma with men, and trusting Major as an act of bravery
- The money conversation — how much she invested, where it came from, her
  anxiety about return
- The refund discussion and the option of handing the project to someone else
- A third party's suggestion that she had been scammed
- Personal asides unrelated to the work (visas, social plans, other people)

Two reasons. It is hers and she disclosed it in a private conversation, not for
playback. And an AI voice replaying her vulnerability back at her would land
badly no matter how warmly it was written.

**Either trim the transcript before uploading, or rely on the exclusions in the
prompt below — trimming is safer.** The prompt tells the hosts to avoid it, but
the reliable control is not giving them the material in the first place.

---

## 1. Notebook setup

**Name:** `Sri Shakti Shala — Where We Are, 25 September`

**Sources to add:**

| Source | Notes |
|---|---|
| The 25 Sept call transcript | **Trimmed** per the warning above |
| `docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md` | Her direction, in her own words |
| The status page / PDF sent 25 Sept | Finished / needs work / dates |

Do **not** add the engineering handover
(`HANDOVER-2026-09-25-CLAUDE-TO-CODEX.md`). It is written for Codex and will
drag the hosts into technical detail that is not hers to carry.

---

## 2. Notebook instruction prompt

Paste into the notebook's custom instructions, or use as the first question.

```
This notebook holds a conversation between Sheetal Kandola, who runs Sri
Shakti Shala, and Major, who is building her website and client system.

Sheetal is the audience for everything produced here. She is not technical,
does not want to be, and has said clearly that she needs information simple,
short and direct. She is a somatic practitioner who works with women on
trauma, shadow and embodiment, and she is in sessions most of the day.

When answering questions or generating summaries:

- Speak to her as a capable professional who has been let down by unclear
  communication, not as someone who needs things dumbed down.
- Use her own words wherever possible. She is precise about her work; the
  language in the transcript is hers and it is better than a paraphrase.
- Never use technical vocabulary. No deployments, repositories, components,
  routes or schemas. Say "the website", "the page", "the form", "the system
  that emails you".
- When something is waiting on her, say so plainly and say why it matters.
  Do not soften it into invisibility, and do not stack up requests.
- Never discuss money, refunds, the possibility of the project moving to
  someone else, or anything she said about trust, past relationships or
  personal history. Those are out of scope entirely.
- Keep the working relationship in a good place. The tone is two people
  who have just got aligned after a period of drift, not a post-mortem.
```

---

## 3. Audio Overview prompt

Paste into **Customise** before generating the Audio Overview.
Target length: **8–12 minutes**.

```
Create a warm, grounded audio briefing FOR Sheetal Kandola — she is the
listener, not the subject being analysed. Two hosts, conversational, calm.
No hype, no breathless podcast energy, no jokes at anyone's expense.

Think of it as a trusted friend catching her up on a meeting she was in, so
the agreements stay clear in her mind while she travels.

Cover, in this order:

1. WHAT SHE ASKED FOR — the heart of it. Her ten-second test: someone lands
   on the page and knows what this is, who it is for, and where to click,
   without scrolling. The name Sri Shakti Shala front and centre. Temple
   feeling, but simple and real at the front door, with the richer visuals
   deeper in for people who have already leaned in. And that it is not about
   her face — she said she is a vessel, and people should come for the vision
   and the goddess.

2. WHAT IS ALREADY DONE — briefly and concretely, so she knows it is moving.
   The Dancing with Durga page is working and taking registrations. The
   internal notes and repeated copy are gone. Text is no longer cut off. The
   site is shorter and the menu is simpler. Everything is now readable for
   older eyes.

3. THE PART SHE HAS NOT SEEN YET — this matters most. She said she still
   feels like she is doing everything herself. That has changed. When someone
   comes through the website now, she is emailed straight away with their
   name, what they are looking for, and everything they said. There is also a
   set of replies ready to go out in her name, so the person hears something
   back immediately instead of waiting for her. Those are written and waiting
   for her to read before they are switched on.

4. WHAT IS NEEDED FROM HER — exactly three things, said once, without
   pressure:
   - Read the three automated emails, because they go out with her name on
     them, and change anything that does not sound like her.
   - Get the photographs and videos organised into the upload folder, as JPEG
     or PNG, named with title, date and initials. The website can only be as
     good as the images it has. Note honestly that a strong photograph for
     the front page is the single thing most likely to hold this up.
   - Say which clients she could ask for a few words. The testimonials page
     cannot be finished by anyone else.

5. WHAT HAPPENS NEXT — a homepage design for her to look at on Sunday, and
   the whole thing finished and handed over within two weeks, before she
   leaves for India. She looks at the design, gives her thoughts in one go,
   one round of changes, then it gets built.

Close by naming what she already has that is working: the Dancing with Durga
dates are confirmed for the nine nights of 11 to 19 October, people are
registering, and the system now tells her the moment someone arrives.

Tone notes:
- Reference specific things she said. It should be obvious she was heard.
- Do not narrate her emotions or speculate about how she feels.
- Do not mention money, investment, refunds, or the project moving to
  someone else.
- Never suggest she has been difficult or slow. The drift was mutual and the
  call fixed it.
- End on momentum, not on a task list.
```

---

## 4. Two alternates

**If she only has three minutes** — change the target to 4 minutes and use:

```
Give Sheetal a short, calm catch-up. Only three things: what she asked for
in the meeting, the fact that she is now emailed the moment anyone comes
through the website, and the three things needed from her — read the
automated emails, organise the photographs, and think about which clients
to ask for testimonials. Warm, direct, no technical language, no pressure.
Under four minutes.
```

**A weekly version, if this becomes a rhythm** — regenerate with:

```
Update Sheetal on what has moved since the last briefing. Lead with what is
finished, then anything waiting on her, then what is next. Keep it under
five minutes. Do not repeat anything she has already acted on.
```

---

## 5. Before sending

- Listen to it first. If any sentence would make her wince, regenerate.
- Send it with one line, not a paragraph. Something like: *"Made you an audio
  version of yesterday so you don't have to read anything. About ten minutes."*
- Do not attach documents alongside it. Sending the audio *and* the PDF *and* a
  message is exactly the overload she described.
