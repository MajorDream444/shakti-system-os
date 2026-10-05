/* Build-time smoke test.

   WHY THIS EXISTS: on 1 October a font edit to index.html deleted
   </head>, <body> and <div id="root">. React had nothing to mount into and
   every page on the site rendered as a black screen. The site stayed broken
   for four days while women tried to register for Dancing with Durga Devi.

   Nothing caught it. `vite build` succeeded every time, because an HTML file
   with no root div is still valid HTML. The deploy went green. The only thing
   that would have caught it is loading the built site and looking at it —
   which is what this does.

   Checks the built output, not the source, because the source being right is
   not the same as the artifact being right. Runs headless, no network. */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const failures = [];

function check(label, ok, detail) {
  if (!ok) failures.push(detail ? `${label} — ${detail}` : label);
}

// 1. The artifact exists at all.
const indexPath = resolve(dist, "index.html");
check("dist/index.html exists", existsSync(indexPath));

if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, "utf8");

  // 2. THE BUG. React mounts into this; without it the site is blank.
  check('<div id="root"> present', /id=["']root["']/.test(html),
    "React has nothing to mount into — every page renders blank");

  // 3. The structural tags that went missing alongside it.
  check("</head> present", html.includes("</head>"));
  check("<body> present", /<body[\s>]/.test(html));
  check("</body> present", html.includes("</body>"));

  // 4. Exactly one body open and one close — a stray tag is what broke it.
  const opens = (html.match(/<body[\s>]/g) || []).length;
  const closes = (html.match(/<\/body>/g) || []).length;
  check("one <body>, one </body>", opens === 1 && closes === 1,
    `found ${opens} open, ${closes} close`);

  // 5. The entry script survived.
  check("module script present", /<script[^>]+type=["']module["']/.test(html));

  // 6. Fonts stay self-hosted — the GDPR fix that caused all this.
  //    Comments are stripped first: the file explains WHY not to use Google
  //    Fonts, and naive matching flags that prose as a violation.
  const markup = html.replace(/<!--[\s\S]*?-->/g, "");
  check("no Google Fonts request", !/fonts\.(googleapis|gstatic)\.com/.test(markup),
    "self-hosted fonts were reverted");
}

if (failures.length) {
  console.error("\n  SMOKE TEST FAILED — do not deploy\n");
  for (const f of failures) console.error(`   ✗ ${f}`);
  console.error("");
  process.exit(1);
}
console.log("  smoke: built page can mount, fonts self-hosted");
