# EstateOps Waitlist – Google Apps Script Setup

Connect your waitlist form to a Google Sheet. Signups are appended to the sheet—no email sending, no Gmail authorization required.

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it something like "EstateOps Waitlist"
3. Add (or leave blank—the script will add them):
   - **Row 1:** `Email` | `Name` | `Signup Date`

## Step 2: Add the Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any default code in the editor
3. Copy everything from `WaitlistHandler.gs` into the editor
4. Update `SITE_URL` at the top to your actual website URL (e.g. `https://estateops.com`)

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set:
   - **Description:** Waitlist form handler
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. The first time, you’ll need to **Authorize access**—this only allows the script to edit your spreadsheet (no Gmail or other services)
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

## Step 4: Wire Up Your Form

1. Open `index.html` in your project
2. Replace the form `action` with your Web app URL:

```html
<form class="waitlist-form" action="YOUR_WEB_APP_URL_HERE" method="post" id="waitlist-form">
```

