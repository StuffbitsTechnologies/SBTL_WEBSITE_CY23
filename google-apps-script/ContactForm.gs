/**
 * Contact Form Handler - Google Apps Script
 * Receives form submissions from the StuffBits website and sends them via email.
 *
 * SETUP:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default Code.gs with this file
 * 4. Update RECIPIENT_EMAIL below with your email
 * 5. Deploy: Deploy > New deployment > Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL and set it as VITE_CONTACT_FORM_URL in .env
 */

const RECIPIENT_EMAIL = 'shubham.thete@stuffbits.in';
const LOGO_URL        = 'https://www.stuffbits.in/assets/img/logo.png';
const WEBSITE_URL     = 'https://www.stuffbits.in';

// ─────────────────────────────────────────────
// Run this ONCE to authorize MailApp.
// Select authorizeMail from dropdown → Run → Approve permissions.
// ─────────────────────────────────────────────
function authorizeMail() {
  MailApp.sendEmail(
    RECIPIENT_EMAIL,
    'Test – StuffBits Contact Form Authorization',
    '',
    {
      htmlBody: `
        <div style="font-family:Arial,sans-serif; padding:20px;">
          <h2 style="color:#2563eb;">&#9989; Authorization Successful!</h2>
          <p>Your StuffBits contact form is authorized and ready to receive submissions.</p>
        </div>
      `
    }
  );
}

// ─────────────────────────────────────────────
// Prevents XSS — sanitizes user input before
// inserting into HTML email body.
// ─────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

// ─────────────────────────────────────────────
// HTML Email Template
// Table-based layout for maximum email client
// compatibility (Gmail, Outlook, Apple Mail, etc.)
// ─────────────────────────────────────────────
function getEmailTemplate(data) {
  const { name, email, phone, company, contactType, service, message } = data;

  const safeName        = escapeHtml(name);
  const safeEmail       = escapeHtml(email);
  const displayPhone    = phone   && phone   !== 'Not provided' ? escapeHtml(phone)   : '—';
  const displayCompany  = company && company !== 'Not provided' ? escapeHtml(company) : '—';
  const safeContactType = escapeHtml(contactType);
  const safeService     = escapeHtml(service);
  const safeMessage     = escapeHtml(message);
  const year            = new Date().getFullYear();

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StuffBits – New Inquiry</title>
</head>
<body style="margin:0; padding:0; background-color:#e2e8f0;
             font-family:Arial,Helvetica,'Helvetica Neue',sans-serif; line-height:1.6;">

  <!-- ── Outer wrapper ── -->
  <table role="presentation" cellpadding="0" cellspacing="0"
         width="100%" style="background-color:#e2e8f0; padding:40px 20px;">
    <tr>
      <td align="center">

        <!-- ── Email card ── -->
        <table role="presentation" cellpadding="0" cellspacing="0"
               width="600" style="max-width:600px; width:100%;
                                  background-color:#ffffff;
                                  border-radius:12px;
                                  overflow:hidden;">

          <!-- HEADER (navy-gradient from website: 270deg, rgb(9,12,41) → rgb(26,35,126)) -->
          <tr>
            <td align="center"
                style="background-color:#1a237e;
                       background-image:linear-gradient(270deg, rgb(9, 12, 41), rgb(26, 35, 126));
                       padding:40px 32px;">
              <a href="${WEBSITE_URL}" target="_blank" style="text-decoration:none;">
                <img
                  src="${LOGO_URL}"
                  alt="StuffBits Technologies"
                  width="160"
                  style="display:block; margin:0 auto 20px; border:0; outline:none;"
                />
              </a>
              <h1 style="margin:0 0 8px; color:#d4af37;
                          font-size:26px; font-weight:700;
                          font-family:Arial,sans-serif;">
                Congratulations
              </h1>
              <p style="margin:0; color:#94a3b8; font-size:14px;
                         font-family:Arial,sans-serif;">
                You have a new inquiry from your website
              </p>
              <!-- Badge -->
              <table cellpadding="0" cellspacing="0" border="0"
                     style="margin:14px auto 0;">
                <tr>
                  <td style="background-color:#2563eb; color:#ffffff;
                              font-size:12px; font-family:Arial,sans-serif;
                              padding:4px 18px; border-radius:20px;
                              letter-spacing:0.5px;">
                    ${safeContactType}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DETAILS SECTION -->
          <tr>
            <td style="padding:36px 40px 0 40px;">
              <p style="margin:0 0 16px; font-size:12px; font-weight:bold;
                          color:#6b7280; text-transform:uppercase;
                          letter-spacing:1px; font-family:Arial,sans-serif;
                          padding-bottom:8px; border-bottom:2px solid #e2e8f0;">
                Contact Details
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0"
                     width="100%" style="border-collapse:collapse;">

                <!-- Name -->
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:13px; font-weight:bold; color:#0d1220;
                              width:140px; font-family:Arial,sans-serif;
                              vertical-align:top;">
                    Name
                  </td>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:14px; color:#475569;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    ${safeName}
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:13px; font-weight:bold; color:#0d1220;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    Email
                  </td>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:14px; font-family:Arial,sans-serif;
                              vertical-align:top;">
                    <a href="mailto:${safeEmail}"
                       style="color:#2563eb; text-decoration:none;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:13px; font-weight:bold; color:#0d1220;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    Phone
                  </td>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:14px; color:#475569;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    ${displayPhone}
                  </td>
                </tr>

                <!-- Company -->
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:13px; font-weight:bold; color:#0d1220;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    Company
                  </td>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:14px; color:#475569;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    ${displayCompany}
                  </td>
                </tr>

                <!-- Service -->
                <tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:13px; font-weight:bold; color:#0d1220;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    Service
                  </td>
                  <td style="padding:14px 0; border-bottom:1px solid #f1f5f9;
                              font-size:14px; color:#475569;
                              font-family:Arial,sans-serif; vertical-align:top;">
                    ${safeService}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- MESSAGE SECTION -->
          <tr>
            <td style="padding:24px 40px 0 40px;">
              <p style="margin:0 0 12px; font-size:12px; font-weight:bold;
                          color:#6b7280; text-transform:uppercase;
                          letter-spacing:1px; font-family:Arial,sans-serif;
                          padding-bottom:8px; border-bottom:2px solid #e2e8f0;">
                Message
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0"
                     width="100%">
                <tr>
                  <td style="background-color:#f8fafc;
                              border-left:4px solid #2563eb;
                              padding:16px 18px; border-radius:6px;
                              font-size:14px; color:#334155;
                              font-family:Arial,sans-serif;
                              line-height:1.8; white-space:pre-wrap;">
                    ${safeMessage}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- REPLY BUTTON -->
          <tr>
            <td style="padding:28px 40px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#d4af37; border-radius:8px;">
                    <a href="mailto:${safeEmail}"
                       style="display:inline-block; padding:13px 28px;
                               color:#0d1220; font-size:14px; font-weight:700;
                               font-family:Arial,sans-serif;
                               text-decoration:none;">
                      &#9993; Reply to ${safeName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SOCIAL LINKS -->
          <tr>
            <td align="center"
                style="padding:0 40px 28px; border-top:1px solid #f1f5f9;">
              <p style="margin:20px 0 10px; color:#94a3b8; font-size:12px;
                          font-family:Arial,sans-serif;">
                Follow us
              </p>
              <a href="https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd"
                 style="color:#2563eb; font-size:13px; font-family:Arial,sans-serif;
                         text-decoration:none; margin:0 6px;">LinkedIn</a>
              <span style="color:#cbd5e1;">|</span>
              <a href="https://www.instagram.com/_stuffbits_"
                 style="color:#2563eb; font-size:13px; font-family:Arial,sans-serif;
                         text-decoration:none; margin:0 6px;">Instagram</a>
              <span style="color:#cbd5e1;">|</span>
              <a href="https://www.facebook.com/stuffbits"
                 style="color:#2563eb; font-size:13px; font-family:Arial,sans-serif;
                         text-decoration:none; margin:0 6px;">Facebook</a>
              <span style="color:#cbd5e1;">|</span>
              <a href="https://wa.me/919860999078"
                 style="color:#2563eb; font-size:13px; font-family:Arial,sans-serif;
                         text-decoration:none; margin:0 6px;">WhatsApp</a>
            </td>
          </tr>

        </table>
        <!-- End email card -->

        <!-- FOOTER (outside card) -->
        <table role="presentation" cellpadding="0" cellspacing="0"
               width="600" style="max-width:600px; margin-top:20px;">
          <tr>
            <td style="padding:0 10px;">
              <table role="presentation" cellpadding="0" cellspacing="0"
                     width="100%">
                <tr>
                  <td style="color:#94a3b8; font-size:12px;
                              font-family:Arial,sans-serif;">
                    &copy; ${year} StuffBits Technologies Pvt. Ltd.
                  </td>
                  <td align="right"
                      style="color:#94a3b8; font-size:12px;
                              font-family:Arial,sans-serif;">
                    Powered by StuffBits Technologies
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

// ─────────────────────────────────────────────
// GET — health check (browser / preflight)
// ─────────────────────────────────────────────
function doGet(e) {
  return createCorsResponse(JSON.stringify({ status: 'ok' }));
}

// ─────────────────────────────────────────────
// POST — receives contact form submission
// ─────────────────────────────────────────────
function doPost(e) {
  try {
    const data        = JSON.parse(e.postData.contents);
    const name        = data.name        || 'Not provided';
    const email       = data.email       || 'Not provided';
    const phone       = data.phone       || 'Not provided';
    const company     = data.company     || 'Not provided';
    const contactType = data.contactType || 'General';
    const service     = data.service     || 'N/A';
    const message     = data.message     || 'No message';

    const subject  = `New Contact Form Submission – ${contactType}`;
    const htmlBody = getEmailTemplate({ name, email, phone, company, contactType, service, message });

    MailApp.sendEmail(RECIPIENT_EMAIL, subject, '', {
      replyTo:  email,
      name:     name,
      htmlBody: htmlBody
    });

    return createCorsResponse(JSON.stringify({
      status:  'success',
      message: 'Thank you for your message!'
    }));

  } catch (err) {
    console.error(err);
    return createCorsResponse(JSON.stringify({
      status:  'error',
      message: err.message || 'Failed to send message'
    }));
  }
}

// ─────────────────────────────────────────────
// Helper — returns JSON response
// ─────────────────────────────────────────────
function createCorsResponse(content) {
  return ContentService.createTextOutput(content)
    .setMimeType(ContentService.MimeType.JSON);
}