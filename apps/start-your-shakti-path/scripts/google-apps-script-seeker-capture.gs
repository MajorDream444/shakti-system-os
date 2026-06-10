/**
 * Start Your Shakti Path — Seeker Capture + Google Form Sync
 * Version: 3.0
 *
 * Supports three entry flows:
 *
 *   type: "site_handoff"
 *   → Short threshold capture from the deployed Start Your Shakti Path site
 *   → Appends normalized row to SEEKERS (human review queue)
 *
 *   type: "google_form_sync"
 *   → Deeper 12-question application / self-audit submitted via Google Form
 *   → Appends raw row to Self-Audit / Form Responses
 *   → Also appends normalized summary to SEEKERS
 *
 *   Installable trigger: onFormSubmit
 *   → Called automatically when a new Google Form response is submitted
 *   → Normalizes named values and writes to both tabs
 *
 * SEEKERS is the human review queue.
 * Self-Audit / Form Responses is the raw disclosure archive.
 * These are deliberately separate layers.
 *
 * The deployed site asks a short threshold set of questions only.
 * The Google Form holds the deeper 12-question disclosure/application.
 * Do not collapse these into one flow.
 *
 * SETUP:
 * 1. Open the Google Sheet that holds your SEEKERS tab
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire script, replacing any existing code
 * 4. Deploy > New deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. In Vercel > Environment Variables, add:
 *    VITE_SHEET_ENDPOINT = <your Web App URL>
 * 7. Redeploy the Vercel project
 * 8. To auto-sync Google Form responses:
 *    Left sidebar > Triggers > Add Trigger
 *    Function: onFormSubmit
 *    Event source: From spreadsheet
 *    Event type: On form submit
 */

const SEEKERS_SHEET        = 'SEEKERS';
const FORM_RESPONSES_SHEET = 'Self-Audit / Form Responses';

const SEEKERS_HEADERS = [
  'Created Date',
  'First Name',
  'Last Name',
  'Email',
  'WhatsApp',
  'City',
  'Recommended Pathway',
  'Reflection',
  'Source',
  'Status',
  'Assigned To',
  'Last Contact Date',
  'Notes'
];

const FORM_HEADERS = [
  'Timestamp',
  'Name',
  'Location',
  'Email',
  'How She Spends Her Days',
  'What Brought Her Here',
  'Practices / Paths Explored',
  'What Has Hit Its Limit',
  'What Feels Alive',
  'Capacity & Constraints',
  'Current Support',
  'Container Preference',
  'Investment Capacity',
  'Final Note'
];

// ── Entry points ──────────────────────────────────────────────────────────────

function doGet() {
  return jsonResponse_({
    ok: true,
    message: 'Start Your Shakti Path capture endpoint is live.',
    routes: ['site_handoff', 'google_form_sync']
  });
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const type = payload.type || detectPayloadType_(payload);

    if (type === 'google_form_sync') {
      appendFormResponseRaw_(payload);
      appendGoogleFormToSeekers_(payload);
      return jsonResponse_({
        ok: true,
        type: 'google_form_sync',
        message: 'Form response written to Self-Audit / Form Responses and SEEKERS.'
      });
    }

    appendSiteHandoffToSeekers_(payload);
    return jsonResponse_({
      ok: true,
      type: 'site_handoff',
      message: 'Website handoff captured into SEEKERS.'
    });

  } catch (error) {
    return jsonResponse_({ ok: false, error: error.message });
  }
}

/**
 * Installable trigger — add via Apps Script > Triggers:
 * Function: onFormSubmit | Event source: From spreadsheet | Event type: On form submit
 */
function onFormSubmit(e) {
  const namedValues = e && e.namedValues ? e.namedValues : {};
  const payload = normalizeNamedValues_(namedValues);
  payload.type = 'google_form_sync';
  appendFormResponseRaw_(payload);
  appendGoogleFormToSeekers_(payload);
}

// ── Site handoff ──────────────────────────────────────────────────────────────

function appendSiteHandoffToSeekers_(payload) {
  const sheet = getOrRequireSheet_(SEEKERS_SHEET);
  ensureSeekersHeaders_(sheet);

  const parsedName = splitName_(payload.name || payload.firstName || '');
  const firstName  = payload.firstName || parsedName.firstName || '';
  const lastName   = payload.lastName  || parsedName.lastName  || '';

  const reflection = [
    payload.reflection || '',
    payload.longings   ? 'Longings: ' + arrayToString_(payload.longings) : ''
  ].filter(Boolean).join('\n\n');

  const notes = [
    payload.pathwayKey  ? 'Pathway key: '   + payload.pathwayKey  : '',
    payload.pageUrl     ? 'Page URL: '       + payload.pageUrl     : '',
    collectUtmNotes_(payload)
  ].filter(Boolean).join('\n');

  sheet.appendRow([
    new Date(),
    firstName,
    lastName,
    payload.email    || '',
    payload.whatsapp || '',
    payload.city     || payload.location || '',
    payload.recommendedPathway || payload.pathway || '',
    reflection,
    payload.source   || 'Start Your Shakti Path — Website',
    payload.status   || 'New',
    '',
    '',
    notes
  ]);
}

// ── Google Form: raw archive ──────────────────────────────────────────────────

function appendFormResponseRaw_(payload) {
  const sheet = getOrCreateSheet_(FORM_RESPONSES_SHEET, FORM_HEADERS);

  sheet.appendRow([
    new Date(),
    payload.q1Name        || payload.name        || '',
    payload.q2Location    || payload.location     || '',
    payload.emailAddress  || payload.email        || '',
    payload.q3Days        || '',
    payload.q4WhatBroughtYou || '',
    payload.q5Practices   || '',
    payload.q6Limit       || '',
    payload.q7Alive       || '',
    payload.q8Constraints || '',
    payload.q9Support     || '',
    payload.q10Container  || payload.containerPreference || '',
    payload.q11Investment || payload.investmentCapacity  || '',
    payload.q12FinalNote  || payload.finalNote           || ''
  ]);
}

// ── Google Form: normalized SEEKERS summary ───────────────────────────────────

function appendGoogleFormToSeekers_(payload) {
  const sheet = getOrRequireSheet_(SEEKERS_SHEET);
  ensureSeekersHeaders_(sheet);

  const parsedName = splitName_(payload.q1Name || payload.name || '');

  const containerPref      = payload.q10Container || payload.containerPreference || '';
  const recommendedPathway = mapContainerToPathway_(containerPref);

  const reflection = [
    payload.q4WhatBroughtYou ? 'What brought her here:\n'        + payload.q4WhatBroughtYou : '',
    payload.q5Practices      ? 'Paths explored:\n'               + payload.q5Practices      : '',
    payload.q6Limit          ? 'What has hit its limit:\n'        + payload.q6Limit          : '',
    payload.q7Alive          ? 'What feels alive:\n'              + payload.q7Alive          : '',
    payload.q8Constraints    ? 'Capacity & constraints:\n'        + payload.q8Constraints    : '',
    payload.q9Support        ? 'Current support:\n'               + payload.q9Support        : '',
    payload.q11Investment    ? 'Investment capacity:\n'           + payload.q11Investment    : '',
    payload.q12FinalNote     ? 'Final note:\n'                    + payload.q12FinalNote     : ''
  ].filter(Boolean).join('\n\n');

  const notes = [
    payload.q3Days       ? 'How she spends her days: ' + payload.q3Days   : '',
    containerPref        ? 'Container preference: '    + containerPref     : '',
    payload.rawTimestamp ? 'Form timestamp: '          + payload.rawTimestamp : ''
  ].filter(Boolean).join('\n');

  sheet.appendRow([
    new Date(),
    parsedName.firstName,
    parsedName.lastName,
    payload.emailAddress || payload.email || '',
    '',
    payload.q2Location || payload.location || '',
    recommendedPathway,
    reflection,
    'Google Form — Self-Audit / Application',
    'New — Form Response',
    '',
    '',
    notes + (notes ? '\n' : '') + 'See Self-Audit / Form Responses tab for full disclosure.'
  ]);
}

// ── Google Form: normalize installable trigger namedValues ────────────────────

function normalizeNamedValues_(namedValues) {
  function get() {
    for (var i = 0; i < arguments.length; i++) {
      var value = namedValues[arguments[i]];
      if (value) {
        return Array.isArray(value) ? value.join(', ') : String(value);
      }
    }
    return '';
  }

  return {
    rawTimestamp:     get('Timestamp'),
    q1Name:           get('Q1: Your Name', 'Your name', 'Name'),
    q2Location:       get('Q2: Where are you in the world right now?', 'Where are you in the world right now?'),
    q3Days:           get('Q3: How do you spend your days?', 'How do you spend your days?'),
    q4WhatBroughtYou: get('Q4: What has been circling for you — what brought you to this form?', 'What has been circling for you — what brought you to this form?'),
    q5Practices:      get('Q5: What practices, paths, or containers have you already been through?', 'What practices, paths, or containers have you already been through?'),
    q6Limit:          get("Q6: What has hit its limit — or what hasn't been enough?", "What has hit its limit — or what hasn't been enough?"),
    q7Alive:          get('Q7: What feels most alive for you right now — what are you most ready to move toward?', 'What feels most alive for you right now — what are you most ready to move toward?'),
    q8Constraints:    get('Q8: Is there anything — practical, logistical, emotional — that might make it harder to show up fully for deeper work right now?', 'Is there anything — practical, logistical, emotional — that might make it harder to show up fully for deeper work right now?'),
    q9Support:        get('Q9: Are you currently working with a therapist, somatic practitioner, or other healing support?', 'Are you currently working with a therapist, somatic practitioner, or other healing support?'),
    emailAddress:     get('Email Address', 'Email'),
    q10Container:     get('Q10: What kind of container are you drawn to right now?', 'What kind of container are you drawn to right now?'),
    q11Investment:    get('Q11: What is your honest capacity for investment — in time and financially — right now?', 'What is your honest capacity for investment — in time and financially — right now?'),
    q12FinalNote:     get('Q12: Is there anything you want Sheetal to know before she reads this?', 'Is there anything you want Sheetal to know before she reads this?')
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function detectPayloadType_(payload) {
  var hasFormShape = payload.q1Name || payload.q4WhatBroughtYou || payload.q10Container || payload.emailAddress;
  return hasFormShape ? 'google_form_sync' : 'site_handoff';
}

function mapContainerToPathway_(value) {
  var v = String(value || '').toLowerCase();
  if (v.includes('1:1') || v.includes('sheetal'))                              return '1:1 Somatic / Shadow Support';
  if (v.includes('circle') || v.includes('group'))                             return 'Weekly Shakti Circle';
  if (v.includes('retreat') || v.includes('bali') || v.includes('immersion')) return 'Retreat Readiness Pathway';
  if (v.includes('container') || v.includes('program') || v.includes('course')) return '9-Session Shakti Shadow & Somatics Container';
  return 'Needs Human Discernment';
}

function ensureSeekersHeaders_(sheet) {
  var firstCell = sheet.getRange(1, 1).getValue();
  if (!firstCell) {
    sheet.getRange(1, 1, 1, SEEKERS_HEADERS.length).setValues([SEEKERS_HEADERS]);
    sheet.getRange(1, 1, 1, SEEKERS_HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#1a1a1a')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
}

function getOrRequireSheet_(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error('Missing required sheet tab: ' + name);
  return sheet;
}

function getOrCreateSheet_(name, headers) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#1a1a1a')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function splitName_(fullName) {
  var parts     = String(fullName || '').trim().split(/\s+/);
  var firstName = parts.shift() || '';
  var lastName  = parts.join(' ');
  return { firstName: firstName, lastName: lastName };
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try { return JSON.parse(e.postData.contents); } catch (_) { return e.parameter || {}; }
}

function arrayToString_(value) {
  return Array.isArray(value) ? value.join(', ') : (value || '');
}

function collectUtmNotes_(payload) {
  var parts = [
    payload.utmSource   ? 'utm_source='   + payload.utmSource   : '',
    payload.utmMedium   ? 'utm_medium='   + payload.utmMedium   : '',
    payload.utmCampaign ? 'utm_campaign=' + payload.utmCampaign : ''
  ].filter(Boolean);
  return parts.length ? 'UTM: ' + parts.join('&') : '';
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Manual test functions ─────────────────────────────────────────────────────

function testSheetAccess() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Sheet: ' + ss.getName());
  Logger.log('Tabs: ' + ss.getSheets().map(function(s) { return s.getName(); }).join(', '));
}

function testSiteHandoff() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        type: 'site_handoff',
        name: 'Test Seeker',
        email: 'test@example.com',
        whatsapp: '+44 7900 000000',
        pathwayKey: 'CIRCLE',
        recommendedPathway: 'Weekly Shakti Circle',
        longings: ['rhythm', 'grounding', 'community'],
        reflection: 'I feel called to slow down and find my rhythm.',
        source: 'Start Your Shakti Path',
        pageUrl: 'https://shakti-system-os.vercel.app/',
        utmSource: 'instagram',
        utmMedium: 'bio',
        utmCampaign: 'june-2026'
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}

function testGoogleFormSync() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        type: 'google_form_sync',
        q1Name: 'Priya Sharma',
        q2Location: 'London, UK',
        q3Days: 'I work in tech, lead a team, care for my mother.',
        q4WhatBroughtYou: 'I have been circling around burnout for two years.',
        q5Practices: 'Yoga nidra, some breathwork, one therapy container.',
        q6Limit: 'Surface-level practices. I need to go deeper.',
        q7Alive: 'Creativity. Embodiment. Reclaiming something I lost.',
        q8Constraints: 'Time is tight. I need something held and paced.',
        q9Support: 'I see a therapist monthly.',
        emailAddress: 'priya@example.com',
        q10Container: 'A structured container with Sheetal over multiple months',
        q11Investment: 'I can commit 2-3 hours per week and invest meaningfully if the alignment is clear.',
        q12FinalNote: 'I am ready for something real.'
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}
