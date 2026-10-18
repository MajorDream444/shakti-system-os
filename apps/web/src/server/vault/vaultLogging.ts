/* How a delivery is attributed in the log without writing down who she is.

   TWO THINGS IN TENSION. A leaked file is only traceable if the log records
   who received it — that is the whole reason /api/guide logs a recipient.
   But a Vault log is a long-lived, widely-readable record, and the people in
   it came to Sheetal for somatic and sexual healing. A plaintext list of
   their addresses beside the titles of what they opened is a disclosure in
   its own right, whoever reads the log later.

   The resolution: log a stable FINGERPRINT rather than the address. It is an
   HMAC of the lowercased email under a server secret, truncated. It is the
   same every time for the same woman, so "this file was leaked, who had it"
   is still answerable — Sheetal's side runs the same HMAC over the Seekers
   list and matches. It is not reversible by anyone who only has the log.

   A masked address rides alongside it, because a fingerprint alone makes an
   incident impossible to read at a glance and a log nobody can read is a log
   nobody checks. The mask keeps the domain and one character, which narrows
   a search without naming anyone. */

import { createHmac } from "node:crypto";

export function fingerprintSubject(subject: string, secret: string | undefined): string {
  if (!secret) return "unfingerprinted";
  return createHmac("sha256", secret)
    .update(`vault.subject:${subject.trim().toLowerCase()}`, "utf8")
    .digest("hex")
    .slice(0, 16);
}

export function maskAddress(subject: string): string {
  const value = subject.trim().toLowerCase();
  const at = value.indexOf("@");
  if (at <= 0) return "***";
  return `${value.slice(0, 1)}***@${value.slice(at + 1)}`;
}

export function describeViewer(subject: string, secret: string | undefined) {
  return { viewer: fingerprintSubject(subject, secret), address: maskAddress(subject) };
}
