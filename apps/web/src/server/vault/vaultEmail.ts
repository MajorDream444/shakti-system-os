/* The sign-in letter.

   Kept here rather than in the shared emailTemplates.ts because that file
   holds Sheetal's founder-written copy for the lead path and the buyer
   welcome, and more than one agent edits it. This is a utility message, not
   her voice, and it should not be mistaken for it later.

   The wording is plain on purpose. A sign-in email is read in a hurry, often
   on a phone, sometimes by someone who did not ask for it — so it says what
   it is, how long it lasts, and what to do if it was not her. */

export function buildVaultSignInEmail(input: {
  url: string;
  expiresInMinutes: number;
}): { subject: string; text: string } {
  return {
    subject: "Your link to the Sri Shakti Shala vault",
    text: [
      "Namaste,",
      "",
      "Here is your link into the vault:",
      "",
      input.url,
      "",
      `It opens once and lasts ${input.expiresInMinutes} minutes. After that it stops working and you can ask for another.`,
      "",
      "If you did not ask for this, nothing has happened and nothing has been opened. You can ignore this message, or write to sheetalkandola@gmail.com and we will look into it.",
      "",
      "With love,",
      "Sri Shakti Shala",
    ].join("\n"),
  };
}
