# Sheetal's Direction — 25 September 2026

**Source:** recorded call, Major and Sheetal, 25 September 2026 (135 minutes)
**Status:** Canonical. This supersedes earlier assumptions about the public site.
**Audience:** anyone building on Sri Shakti Shala

> This document exists because the site was built to a specification nobody had
> written down in the client's own words. Quotations are hers, from the
> recording. Where something is inference rather than her words, it says so.

---

## 0. The sentence that governs everything

> *"In ten seconds, like, okay, this is what it's about. This is where I can
> click, this is where I can go."*

If a stranger cannot answer **what is this, who is it for, where do I go** without
scrolling, the page has failed regardless of how it looks.

---

## 1. What she actually asked for

### 1.1 The first fold

> *"The first, this first fold needs to be like, Shakti Shala, Living Temple
> Space, boom, boom, boom."*

> *"It should just be Sri Shakti Shala, temple space… a big title in subtext,
> and like, what is here for you."*

Name. What it is. Who it is for. Where to click. Nothing else above the fold.

**She is factually right about the current page.** The eyebrow reads
`SRI SHAKTI SHALA · LIVING SCHOOL` while the `h1` reads
`Shakti Shadow & Somatics`. The name is the small text and a different phrase is
the big text.

> *"Shakti Shala is here twice, it should be like front and center."*

### 1.2 Not about her

> *"I don't care about people coming because of me, they should come because of
> the vision, because of what it stands for, because they want to work with the
> goddess… I'm just a vessel right now that's sharing this."*

> *"These pictures are beautiful of me… but it's not super important."*

The home page currently opens with four photographs of her. **This is a brief
mismatch, not a taste disagreement.** Her face belongs deeper in the site, and
on her personal page.

### 1.3 Temple, and real before stylised

> *"I want this to feel like a temple space."*

But explicitly **not** the fantasy render on the front page:

> *"If you're some random person, no idea about Shakti, that Tantra, that first
> page should be simple and realistic. This should come after… then they're
> getting more the essence of feeling the flavor."*

> *"The more you put in, the more you get."*

**Progressive disclosure.** Plain and legible at the door. Atmosphere and
richness deeper in, for people who have already decided they are interested.
The stylised temple imagery belongs at the Shala threshold, not the homepage.

### 1.4 A magnet, not a funnel

> *"I'm not trying to manipulate you, but I'm magnetizing the right people to
> me. I want to be a magnet."*

> *"I'm not for everyone, I'm not trying to be for everyone."*

Filtering is a feature. Making it obvious who this is *not* for is as valuable
as making it obvious who it is for.

### 1.5 Simple, for her too

> *"I am someone who is very simple. Send me in a few lines, I need this, this,
> this… If there's too much, it's like, I don't know where to start."*

This applies to how she is communicated with, not only to the site. Long
documents and multi-option messages cost her energy she does not have.

---

## 2. Reference sites she named

| Site | What she values in it |
|---|---|
| **shaktitemplearts.com** | The one she singled out. *"School of Feminine Embodied Awakening. I know exactly who it's for."* |
| **athousandsunsacademy.com** | Her teacher. Large serif promise, one subline, one free-entry CTA, video. |
| **yogawithkaya.com** | *"She has more of the aesthetics. I really just love her aesthetics."* |

### The Shakti Temple Arts pattern
Observed from the site, not stated by her:

```
[ Name, large, centred, script serif ]
[ School Of Feminine Embodied Awakening  ← what it is, gold small caps ]
[ Do You Yearn To Live More Deeply?      ← a question, italic ]
        over a real photograph of carved temple stone
```

Name → what it is → a question. Over a **real photograph**, not a render. This
maps almost exactly onto what she asked for, and it is the recommended structure.

---

## 3. The deeper objection — it was never only the website

> *"I think when I came into this, I was like I thought we're building a system.
> And so far, it's like I'm not sure what I have in my hand for a system to
> really work because it's like I'm still doing everything myself. I'm still
> responding to clients. I'm still emailing them."*

> *"In order for me to be successful, I need to be scalable. In order for me to
> be scalable, I need to have a system."*

What she means by *system*:

1. **Finds** the right people
2. **Filters** them — *"keeps the creeps out"*
3. **Routes** them to the right doorway without her deciding each time
4. **Responds** so she is not the first reply
5. **Archives** her work so it accumulates rather than evaporating

**As of 25 September, 1, 4 and part of 5 are now real** — enquiries write to
Airtable, she is emailed instantly, and an automated reply sequence exists
awaiting her review. *She does not know this yet.* Showing her is the single
most direct answer to this objection.

### A live leak she named
> *"There's people that aren't being filtered… they're booking on my calendar
> and I have to cancel them."*

Her Calendly link sits in her Instagram bio and says "women only" as text. Men
book anyway. Agreed fix: remove the direct link, route through Begin so there is
an actual filter rather than a request.

---

## 4. Commitments made on the call

| Who | What | When |
|---|---|---|
| Major | New homepage mock-up for review | **Sunday 28 September** |
| Major | One consolidated list of required assets | With the mock-up |
| Sheetal | Organise and upload all media | Ongoing |
| Both | Full completion and handoff | **Two weeks** — before India for Navratri |

**Review discipline, agreed explicitly:** mock-up first, not deployed. She sits
with it, gives consolidated feedback, one round of revisions, then it is built.

> *"I don't want any dribble. I don't want any drips."*

Dancing with Durga dates are **confirmed**: nine nights, 11–19 October.

---

## 5. Asset conventions she agreed to

These are requirements, not preferences — the system cannot organise what it
cannot read.

- **JPEG or PNG only.** HEIC files do not convert and will be rejected.
- **Everything goes to the `upload everything here` folder first.** That is the
  entry point; sorting happens after.
- **Naming:** `[Title]_[Date]_[Sender initials]` — e.g. `MaKali_20Sept_SK`
- **Tags** for filtering: `root`, `earth`, `video`, `November`, element names,
  goddess names. Multiple tags per file.
- **Quality matters.** Low-resolution source cannot be rescued by the page. If
  it must be used it has to be upscaled first, which costs time.

---

## 6. What this means for the build

Inference from the above, not her words — but it follows directly.

1. **The home page is a door, not a brochure.** Its job is comprehension and
   routing. Everything explanatory moves behind the door.
2. **Sections must be justified, not invented.** The previous home page carried
   four sections that repeated other sections. Adding a section should require
   saying what it does that nothing else does.
3. **A small type and colour system, held.** The site had 46 distinct strings
   below 16px and text at 2.56:1 on photography because every section made its
   own choices. Constraint is what prevents the drift she reacted to.
4. **Her face is not the hero.** She said this plainly and more than once.
5. **Seasonal containers rotate.** Dancing with Durga is not permanent
   furniture; the system should surface whatever is current.

---

## 7. Relationship context

Recorded because it bears on how this work should be conducted, not as gossip.

She invested more in this than in anything else supporting her business, from
money she earned directly through client work. She raised, as one of two
options, a partial refund and handing the project to someone else. Major
declined the refund and committed to finishing.

> *"I trust you because I also trust you that we just have to communicate and
> we'll iron out."*

> *"This is my life, you know, Major. This is what I've dedicated my life to."*

The standard is not "technically complete." It is **she is confident enough to
send people to it.** As of 25 September she is not:

> *"I don't feel comfortable opening Shakti Shala in this state… it doesn't feel
> ready, it feels like we're still under construction."*
