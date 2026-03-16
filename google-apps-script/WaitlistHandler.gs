/**
 * EstateOps Waitlist Handler
 *
 * This script runs inside your Google Sheet. When someone joins the waitlist,
 * their email and name are appended to the sheet.
 *
 * SETUP:
 * 1. Create a Google Sheet for your waitlist
 * 2. Add header row: Email | Name | Signup Date (or leave blank—script will add them)
 * 3. Go to Extensions > Apps Script, paste this code
 * 4. Update SITE_URL below to your website URL
 * 5. Deploy as Web App: Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and put it in your form's action attribute
 */

// ----- CONFIGURATION -----
const SITE_URL = 'https://estateops.co.za';  // Your website URL for redirect after signup

/**
 * Handles form POST when someone joins the waitlist
 */
function doPost(e) {
  try {
    const params = e.parameter || {};
    const email = (params.email || '').trim();
    const name = (params.name || '').trim();

    if (!email) {
      return htmlResponse('Error', 'Please provide your email address.', false);
    }

    // 1. Append to Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const headers = sheet.getRange(1, 1, 1, 3).getValues()[0];
    
    // Add headers if sheet is empty
    if (!headers[0]) {
      sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Name', 'Signup Date']]);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    const timestamp = new Date();
    sheet.appendRow([email, name || '', timestamp]);

    return htmlResponse(
      'You\'re on the list!',
      'Thanks for signing up! We look forward to working with you.',
      true
    );

  } catch (err) {
    Logger.log('Waitlist error: ' + err.toString());
    return htmlResponse('Something went wrong', 'Please try again later.', false);
  }
}

/**
 * Returns an HTML page, with optional redirect back to the site
 */
function htmlResponse(title, message, success) {
  const redirectMeta = success
    ? '<meta http-equiv="refresh" content="3;url=' + SITE_URL + '?joined=1">'
    : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${redirectMeta}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: #f9fafb; color: #111; }
    .card { max-width: 440px; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.08); text-align: center; }
    h1 { font-size: 1.25rem; margin-bottom: 1rem; }
    p { color: #6b7280; line-height: 1.5; }
    a { color: #5034ff; font-weight: 600; text-decoration: none; margin-top: 1rem; display: inline-block; }
    a:hover { text-decoration: underline; }
    .success { color: #059669; }
    .error { color: #dc2626; }
  </style>
</head>
<body>
  <div class="card">
    <h1 class="${success ? 'success' : 'error'}">${title}</h1>
    <p>${message}</p>
    <a href="${SITE_URL}">← Return to EstateOps</a>
  </div>
</body>
</html>
  `;

  return ContentService.createHtmlOutput(html);
}
