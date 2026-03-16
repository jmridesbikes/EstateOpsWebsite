# EstateOps

A lightweight, easy-to-use task management tool for trustees and caretakers. Think of it as the swiss army knife of maintenance management tools.

**This repository hosts the EstateOps landing page on GitHub Pages.**

## Deploy to GitHub Pages

1. **Push this repo to GitHub** (if not already)

2. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, choose **Deploy from a branch**
   - Select branch: **main** (or your default branch)
   - Select folder: **/ (root)**
   - Click **Save**

3. **Your site will be live at:**
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
   (e.g. `https://yourorg.github.io/EstateOpsWebsite/`)

## Collecting Sign-ups

The landing page includes a sign-up form. To receive submissions:

1. **Create a free Formspree account** at [formspree.io](https://formspree.io)
2. **Create a new form** and copy its form ID
3. **Edit `index.html`** – replace `YOUR_FORM_ID` with your Formspree form ID in the form `action`:
   ```html
   action="https://formspree.io/f/abc123xyz"
   ```
4. Submissions will appear in your Formspree dashboard and can be exported or connected to email, Slack, Google Sheets, etc.

## Local preview

Open `index.html` in a browser, or run a local server:

```bash
npx serve .
```

---

*EstateOps – Task management built for estates.*
