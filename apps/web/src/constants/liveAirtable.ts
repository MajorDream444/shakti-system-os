export const LIVE_AIRTABLE_BASE_ID = "appj3hDhI0HoulNrf";

export const LIVE_AIRTABLE_TABLE_IDS = {
  seekers: "tblKLBelhnhTaoS6o",
  libraryAssets: "tblAwFHIjlkzYG9zD",
  practices: "tblvUQpdVjz1VWkJr",
  initiationKeys: "tblAd4o2MPALUThgN",
  retreats: "tblClCsYwmXd3YX0T",
  retreatApplications: "tbluLkd1K3zV3nObM",
  environmentalMemory: "tblPSReXWjSawoiW1",
} as const;

export const LIVE_AIRTABLE_FIELDS = {
  practices: {
    practiceId: "fldRo2haNsWzb0v9b",
    title: "fldUuYcQ7VwsY4N6O",
    shortDescription: "fld0ig9WhXC9RtJhh",
    duration: "fldoTVsND7ZTKC3Lg",
    practiceType: "fldma4fsqFe1rfUUy",
    associatedGoddess: "fldMR6WxHCOM1YrU7",
    associatedMoonPhase: "fldTJ5FZx1RRHrVXI",
    accessLevel: "fldXyFeavAPqqolFD",
    audioUrl: "flde9XLBdFkRaV3MI",
    videoUrl: "fldTqvL1Ury93O5dA",
    worksheetUrl: "fldXnMXGs1Oa07HmX",
    status: "fld3nhYxWgtlfF5kh",
    notes: "fldD6jAQVJynZ94Uk",
  },
  initiationKeys: {
    keyId: "fldA9s8FME4fsnfjg",
    keyName: "fldQxCmMoMcwkNx26",
    accessLevelGranted: "fldpfYqeOHQKUMFx0",
    offeringAmount: "fldTVTEGBeY7IPTbU",
    paymentType: "fldhHeUt5z6UNWoES",
    physicalObjectIncluded: "fldZkYTgN5u9iOakx",
    description: "fld1nSmcUpZrFXvgH",
    eligibilityNotes: "fldSkfBNrtFu27BWq",
    stripeProductId: "fldTWE5UUOMMro9WM",
    stripePriceId: "fldoABe26hH6fYtRh",
    active: "fld4Wv1hNbSG2qvDa",
    notes: "fld0XVthqBuh71g03",
  },
} as const;
