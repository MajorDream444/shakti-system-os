# Shakti Shala OS — Airtable Schema Draft

## Purpose

This schema prepares the Shakti Shala Vault and Living Mountain app for real content, seeker readiness, access keys, retreat preparation, and environmental memory.

Airtable is the operational backend.

Google Drive remains the source file library.

GitHub remains the application and documentation source.

---

# Base Name

```text
Shakti System OS
```

or

```text
Shakti Shala Vault
```

---

# Table 01 — Seekers

Purpose:

Track people moving through the Shakti pathway.

Fields:

```text
Seeker ID
Full Name
Email
Phone
Location
Timezone
Current Access Level
Current Readiness Stage
Current Pathway
Pathway Day
Community Status
Retreat Interest
Retreat Readiness Score
Last Active Date
Notes
Human Review Needed
Created At
Updated At
```

Access Level options:

```text
Visitor
Seeker
Practitioner
Initiate
Temple Circle
Guide
Teacher
```

Readiness Stage options:

```text
Exploring
Oriented
Practicing
Ready for Circle
Retreat Interested
Retreat Applicant
Accepted
Preparing
Integrated
```

---

# Table 02 — Library Assets

Purpose:

Metadata layer for all source content in the Temple Library.

Fields:

```text
Asset ID
Title
Description
Drive URL
Source Folder
Media Type
File Type
Creator
Owner
Date Created
Date Uploaded
Theme
Keywords
Goddess / Archetype
Moon Phase
Practice Type
Container / Offer
Access Level
Readiness Level
Retreat Relevance
Transcript Status
AI Summary Status
Publishing Status
Confidentiality
Usage Rights
Related Assets
Related Practice
Related Pathway
Related Retreat
Notes
```

Media Type options:

```text
PDF
Audio
Video
Image
Document
Slide Deck
Transcript
Worksheet
Journal Prompt
Ceremony Guide
Retreat Guide
Other
```

Publishing Status options:

```text
Raw
Needs Review
Needs Transcript
Needs Summary
Ready To Tag
Approved
Published
Archived
```

---

# Table 03 — Practices

Purpose:

Track practices that appear inside the app.

Fields:

```text
Practice ID
Title
Short Description
Full Description
Duration
Practice Type
Associated Goddess
Associated Moon Phase
Access Level
Readiness Level
Audio URL
Video URL
Worksheet URL
Transcript URL
Related Library Assets
Completion Prompt
Integration Prompt
Status
Notes
```

Practice Type options:

```text
Somatic
Breath
Meditation
Shadow Work
Journal
Ceremony
Kriya
Pranayama
Grounding
Integration
Retreat Prep
```

---

# Table 04 — Goddess Pathways

Purpose:

Map each chamber and its associated teachings, practices, and access rules.

Fields:

```text
Pathway ID
Goddess / Archetype
Display Name
Core Theme
Energetic Blueprint
Recommended Practices
Recommended Journal Prompts
Access Level
Readiness Notes
Moon Phase Alignment
Retreat Alignment
Visual Atmosphere Notes
Status
```

---

# Table 05 — Initiation Keys

Purpose:

Track access products, credentials, and symbolic passage.

Fields:

```text
Key ID
Key Name
Access Level Granted
Offering Amount
Payment Type
Physical Object Included
Description
Eligibility Notes
Stripe Product ID
Stripe Price ID
Active
Notes
```

Key examples:

```text
Seeker Key
Practitioner Key
Initiate Key
Temple Circle Key
Retreat Passage Key
Guide Key
Teacher Key
```

Payment Type options:

```text
Free
One-Time Offering
Monthly Stewardship
Annual Stewardship
Retreat Deposit
Invitation Only
Manual Approval
```

---

# Table 06 — Offerings

Purpose:

Track payments, pledges, access purchases, and stewardship events.

Fields:

```text
Offering ID
Seeker
Key / Access Item
Amount
Currency
Payment Status
Stripe Payment ID
Stripe Customer ID
Date
Access Granted
Notes
```

Payment Status options:

```text
Pending
Completed
Failed
Refunded
Manually Approved
```

---

# Table 07 — Environmental Memory

Purpose:

Future cloud-sync layer for sanctuary memory.

Fields:

```text
Memory ID
Seeker
Memory Type
Room
Value
Date Created
Last Updated
Related Practice
Related Offering
Related Journal Entry
Notes
```

Memory Type options:

```text
Prayer Lamp
Prayer Flag
Daily Offering
Cedar Growth
Lotus Bloom
Bird Returned
Lantern Cycle
Stillness Hours
Fire Intention
Moon Star
```

Important:

This should not expose sensitive journal content by default.

---

# Table 08 — Retreats

Purpose:

Track retreat opportunities, applications, readiness, and preparation.

Fields:

```text
Retreat ID
Retreat Name
Location
Start Date
End Date
Capacity
Status
Application URL
Deposit Amount
Full Price
Preparation Start Date
Required Practices
Required Materials
Notes
```

Status options:

```text
Idea
Planning
Open Interest
Applications Open
Reviewing
Confirmed
Full
Completed
Archived
```

---

# Table 09 — Retreat Applications

Purpose:

Human-reviewed retreat readiness pipeline.

Fields:

```text
Application ID
Seeker
Retreat
Application Date
Readiness Score
Body Readiness
Emotional Readiness
Logistics Readiness
Financial Readiness
Review Status
Reviewer Notes
Accepted Date
Deposit Status
Preparation Status
```

Review Status options:

```text
Submitted
Needs Review
Follow Up Needed
Accepted
Waitlisted
Not Yet
Declined
```

---

# Table 10 — Content Queue

Purpose:

Turn Vault material into publishable content without losing lineage sensitivity.

Fields:

```text
Content ID
Title
Source Asset
Content Type
Platform
Theme
Audience
Status
Draft URL
Published URL
Review Needed
Lineage Sensitivity Notes
Publish Date
Owner
```

Status options:

```text
Idea
Drafting
Needs Review
Approved
Scheduled
Published
Archived
```

---

# Initial Build Priority

Create these first:

```text
Seekers
Library Assets
Practices
Initiation Keys
Retreats
Retreat Applications
Environmental Memory
```

Then add:

```text
Goddess Pathways
Offerings
Content Queue
```

---

# Integration Logic

## Google Drive → Airtable

A source file enters Drive.

A metadata record is created in Airtable.

Airtable stores:

- what it is
- where it belongs
- who can access it
- whether it is ready
- what it relates to

## Airtable → App

The app eventually reads approved records only.

Do not expose raw source material or private notes.

## App → Airtable

The app may eventually send:

- seeker profile data
- access status
- retreat interest
- environmental memory
- practice completion

Journal content requires stricter privacy decisions before syncing.

---

# Privacy / Sensitivity Rule

Sheetal's work is relational, embodied, and trust-based.

Do not automatically expose intimate reflection, application material, or somatic history to unnecessary tables or dashboards.

Human discernment remains part of the system.
