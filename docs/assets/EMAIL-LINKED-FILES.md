# Files that emails link to

*This note lives in docs/ rather than in `public/`. Everything inside
`public/` is served on her domain, and an internal note explaining our
reasoning has no business being fetchable at srishaktishala.com.*

Anything an email references — an image, a PDF, a download — goes in this
folder and is served from the site root, permanently and free:

    apps/web/public/email/durga-devi.jpg
    →  https://www.srishaktishala.com/email/durga-devi.jpg

Drop the file in, commit, merge. Vercel deploys it with the next build. No
account, no plugin, no expiry.

## Why not Airtable attachments

Airtable attachment URLs are signed and **expire after roughly two hours**.
They work inside the base and break in an inbox — a woman who opens the email
the next morning sees a broken image. Never link an email to one.

## Why not here for video

This folder is for small static files. Video does not belong in a git repo:
it bloats every clone, Vercel has no streaming or adaptive bitrate, and the
bandwidth is billed as ordinary traffic. Practice videos go to Vimeo.

## Keep them small

These ship in the deployment. Compress before committing — an email image
should be well under 500KB and no wider than about 1200px.


## What is in there now

| File | URL | Used by |
|---|---|---|
| `durga-devi.jpg` | `https://www.srishaktishala.com/email/durga-devi.jpg` | Buyer welcome, Dancing with Durga Devi branch |

`durga-devi.jpg` is Sheetal's own file, supplied 27 September as `DURGA.jpeg`
from her Drive. **640×480, 64KB — that is the original, not a downsample.**
Her Drive copy is byte-identical, so there is no higher-resolution version to
fetch.

That size is fine for its one job: an email body is about 600px wide, so it
renders essentially 1:1. It will look soft on a retina screen and it is **not
suitable for a page hero or anything printed.** If it is ever wanted larger,
she needs to supply a bigger original.
