# Contact Form - Google Apps Script Setup

This script receives contact form submissions from the StuffBits website and sends them to your email.

## Setup Steps

### 1. Create the script

1. Go to [script.google.com](https://script.google.com)
2. Click **New project**
3. Delete the default `function myFunction()` code
4. Copy the contents of `ContactForm.gs` into the editor
5. Update `RECIPIENT_EMAIL` in the script to your email (e.g. `contact@stuffbits.in`)
6. Save (Ctrl+S)

### 2. Authorize the script (required before deployment works)

1. In the script editor, select **authorizeMail** from the function dropdown (top toolbar)
2. Click **Run** (▶️)
3. When prompted, click **Review permissions** → choose your Google account
4. If you see "Google hasn't verified this app", click **Advanced** → **Go to [project name] (unsafe)**
5. Click **Allow** to grant email permission
6. You should receive a test email at RECIPIENT_EMAIL

Without this step, form submissions will fail with "You do not have permission to call MailApp.sendEmail".

### 3. Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → **Web app**
3. Set:
   - **Description:** Contact form handler
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorize the script when prompted (Google account access)
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec`)

### 4. Configure the website

Add the Web app URL to your `.env` file:

```
VITE_CONTACT_FORM_URL=https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
```

Restart the dev server if it's running.

## Testing

1. Submit the contact form on your website
2. Check the recipient email inbox
3. Reply directly to the sender (reply-to is set to their email)

## Customization

- **Logo:** Update `LOGO_URL` in the script if your site uses a different domain or logo path. The logo must be a publicly accessible URL (e.g. `https://yoursite.com/logo.png`). PNG works best for email clients.
- **Recipient:** Change `RECIPIENT_EMAIL` to receive inquiries at a different address.

## Troubleshooting

- **"You do not have permission to call MailApp.sendEmail":** Run the `authorizeMail` function once from the script editor (Step 2 above)
- **CORS error:** Ensure the request uses `Content-Type: text/plain;charset=utf-8` (the frontend is already configured for this)
- **No email received:** Check spam folder; verify `RECIPIENT_EMAIL` in the script
- **Script error:** Open the script in Apps Script → Executions to view logs
