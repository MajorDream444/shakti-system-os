// ============================================================
// Shakti System OS — Google Apps Script Web App
// Receives POST from Start Your Shakti Path handoff form
// Appends seeker record to the SEEKERS tab
//
// SETUP:
// 1. Paste this entire script into Apps Script editor
// 2. Click Deploy > New deployment
// 3. Type: Web App
// 4. Execute as: Me
// 5. Who has access: Anyone
// 6. Click Deploy, copy the Web App URL
// 7. Paste the URL into Handoff.tsx as GOOGLE_SHEET_ENDPOINT
// ============================================================

const SHEET_NAME = 'SEEKERS';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create SEEKERS tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Email',
        'WhatsApp',
        'Pathway',
        'Longings',
        'Reflection',
        'Source'
      ]);
    }

    // If sheet exists but has no header, add it
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Email',
        'WhatsApp',
        'Pathway',
        'Longings',
        'Reflection',
        'Source'
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.whatsapp || '',
      data.pathway || '',
      (data.longings || []).join(', '),
      data.reflection || '',
      'Start Your Shakti Path — shakti-system-os.vercel.app'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify sheet access
function testSheetAccess() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Sheet name: ' + ss.getName());
  Logger.log('Sheets: ' + ss.getSheets().map(s => s.getName()).join(', '));
}
