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

## 3. Audio Overview prompt — v3

> **v1 was generated and reviewed on 2026-09-25. It was good, and one section
> was wrong.** Both hosts explained that the website has "antennas constantly
> listening" to her Google Drive, that tagging a file *"literally programs the
> website to update itself tomorrow"*, and that seasonal offerings *"rotate
> automatically onto the page."*
>
> **None of that is built.** `DriveService.listLibraryAssets()` returns an
> empty array and is never called by any component; images reach the site as
> static imports committed to the repo. If she tags files and waits for the
> site to change, nothing happens — which is precisely the overpromise that
> produced *"I'm not sure what I have in my hand for a system."*
>
> The ask survives, the reason changes: naming and tagging is what makes an
> asset **findable**. That is true today and worth her time today. v2 below
> says so, and names the automation as not yet built.
>
> Two other drifts v2 corrects: v1's three asks were all asset organisation
> and quietly dropped *read the automated emails*, which matters most because
> they carry her name; and v1 implied the replies were already going out when
> they are written and switched off.

Paste into **Customise** before generating. Target length: **10–14 minutes**.

```
Create a warm, grounded audio briefing FOR Sheetal Kandola — she is the
listener, not a subject being analysed. Two hosts, conversational and calm.
No hype, no breathless podcast energy, no jokes at anyone's expense.

NAME HANDLING — important. Address her as "you" throughout. Do not say her
name in the body of the briefing at all. Use it exactly twice: once in the
opening greeting and once in the closing line. Both times it is "Sheetal",
pronounced SHEE-tuhl. Never Sheetha, Sheethal, Yoshito, Chital or Cheadle.
Everywhere else, say "you".

Do not cite studies, research or statistics. Make every argument from her own
experience and from what she said, not from invented authority.

Think of it as a trusted friend catching her up on a meeting she was in, so
the agreements stay clear while she travels.

Cover, in this order:

1. WHAT SHE ASKED FOR — the heart of it. Her ten-second test: someone lands
   on the page and knows what this is, who it is for, and where to click,
   without scrolling. The name Sri Shakti Shala front and centre. A temple
   feeling, but simple and real at the front door, with the richer visuals
   deeper in for people who have already leaned in. And that it is not about
   her face — she said she is a vessel, and people should come for the vision
   and for the goddess, not for a personal profile.

   Make the point that in an attention economy, clarity works as a filter.
   A woman arriving at her door may be dysregulated or overwhelmed; a clean,
   quiet page is a visual breath, and it signals safety before she reads a
   single word.

2. WHAT IS ALREADY DONE — briefly and concretely, so she knows it is moving.
   The Dancing with Durga page is working and taking registrations, with the
   dates confirmed for the nine nights of 11 to 19 October. The internal
   notes and the repeated copy are gone. Text is no longer cut off. The site
   is shorter, the menu is simpler, and everything is now readable for older
   eyes. The new homepage she chose is built.

3. THE PART SHE HAS NOT SEEN YET — this matters most, because she said she
   still feels like she is doing everything herself.

   When someone comes through the website now, she is emailed straight away
   with their name, what they are looking for, and everything they said. That
   is live.

   There is also a set of replies written in her voice, so the person hears
   something back immediately instead of waiting for her. Be precise: those
   are WRITTEN AND WAITING, deliberately switched off until she has read
   them, because they go out with her name on them. Nothing has been sent.

   And the filtering. She raised men booking directly onto her calendar and
   having to cancel them herself. That is not an administrative annoyance,
   it is a breach of a space meant for women's trauma and embodiment work.
   Routing people through the website puts a real boundary in front of her
   calendar instead of a sentence in a bio asking politely.

4. WHAT IS NEEDED FROM HER — exactly three things, said once, without
   stacking pressure:

   FIRST, read the three automated emails. They go out signed with her name
   to women she has not met. If a single sentence does not sound like her,
   she says so and it changes in a minute. Nothing is switched on until she
   has read them. This is the one that unlocks the rest.

   SECOND, get the photographs and videos organised. Three parts: they must
   be JPEG or PNG, because the Apple HEIC format phones produce cannot be
   read by web systems; they go in the one folder called "upload everything
   here" rather than scattered across email, messages and the desktop; and
   they need a title, a date and initials in the filename, plus tags.

   Explain WHY the naming matters, carefully and honestly:

     Right now, finding the right photograph for a page means scrolling
     through hundreds of files called IMG_4927. A name and a tag make an
     asset findable in seconds instead of an afternoon. That is the whole
     benefit, and it is real today.

     Be explicit that the website does NOT currently watch her Drive and
     update itself. That automation is not built. It may be built later, and
     it could not be built at all on files nobody can identify — but do not
     describe it as though it exists. Do not say the site is "listening" for
     tags, and do not say tagging makes offerings rotate onto the page by
     themselves.

   Say plainly that one strong photograph for the front page is the single
   thing most likely to hold the homepage up. It is the highest-value item
   on the whole list.

   THIRD, think about which clients she could ask for a few words. The
   testimonials page cannot be finished by anyone else, and even two would
   turn it from a promise into proof.

5. WHAT HAPPENS NEXT — a homepage for her to look at on Sunday, and the whole
   thing finished and handed over within two weeks, before she leaves for
   India. She looks at it, gives her thoughts in one go, one round of
   changes, then it gets built.

ANTICIPATE HER OBJECTION, do not dodge it. Someone whose work is intuitive,
fluid and body-centred will hear "rename every file, tag them, convert the
formats" as trading one kind of busy work for another. Name that out loud and
answer it: the system has enormous capacity to move things around but no
intuition at all. It cannot look at IMG_4927 and know it is from Navratri. She
is giving it the context it does not have. The short friction buys back her
time every week after.

CLOSE on this. She spends her life helping women find safety in their own
bodies, and that work needs a regulated nervous system. A disorganised drive,
manual replies and strangers landing on her calendar behave like a
dysregulated digital nervous system, sending stress signals back to her all
day. What she is doing here is regulating it. Then leave her with a question
rather than a task list: when the boundaries are being held for her, what
does she get to bring to her sessions that she cannot right now?

Tone notes:
- Reference specific things she said. It should be obvious she was heard.
- Do not narrate her emotions or speculate about how she feels.
- Do not mention money, investment, refunds, or the project moving to
  someone else.
- Never suggest she has been difficult or slow. The drift was mutual and the
  call fixed it.
- Never describe a capability as working when it is not. If something is
  written but not switched on, say so. Overstating what is built is the
  thing that caused this conversation in the first place.
- Say "Major" rather than "the technical team". There is no team; there is
  one person she already knows, and pretending otherwise is its own small
  overstatement.
```

> **Why v3.** v2 fixed the substance — the Drive claim, the missing email ask,
> the switched-off replies — and then mangled her name four times, including
> "Yoshito". A pronunciation instruction did not hold, so v3 removes the
> surface area instead: her name is said twice, at the top and the bottom, and
> everywhere else the hosts say "you". v2 also asserted that "studies in user
> psychology show generous negative space physically lowers the viewer's heart
> rate", which neither of us can source — the same overstatement habit wearing
> an academic coat. v3 forbids citations outright.

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
