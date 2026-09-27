# Files that emails link to

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
