/**
 * Careers - Google Apps Script (Unified)
 * ONE script, ONE Google Sheet with two tabs:
 *   - Jobs: Job listings (fetch by website)
 *   - Applications: Applicant submissions (POST from apply form)
 *
 * GET  ?action=jobs         → returns job listings (default if no action)
 * GET  ?action=getApplicants → returns applicant list
 * POST                      → submit job application (append to Applications, send emails)
 *
 * SETUP:
 * 1. Create/open a Google Sheet
 * 2. Get Sheet ID from URL: .../d/SHEET_ID/edit
 * 3. Update RECIPIENT_EMAIL and SPREADSHEET_ID below
 * 4. Run setupCareersSheet() once to create both tabs + headers
 * 5. Run authorizeMail() once
 * 6. Deploy as Web app (Execute as: Me, Who has access: Anyone)
 * 7. Set BOTH in .env:
 *    VITE_JOBS_API_URL=<web app url>
 *    VITE_JOB_APPLICATION_FORM_URL=<same web app url>
 */

const RECIPIENT_EMAIL = 'shubham.thete@stuffbits.in';
const SPREADSHEET_ID = '1mP6CR0NhDDWMXX8bHc5tWHsMmlvCyRa9Yri6dOdcGqg';
const WEBSITE_URL = 'https://stuffbits.in';
const LOGO_URL = 'https://stuffbits.in/assets/img/logo.png';

const SHEET_JOBS = 'Jobs';
const SHEET_APPLICATIONS = 'Applications';
const RESUME_FOLDER_NAME = 'Job Application Resumes';

// ─────────────────────────────────────────────
// Run ONCE to create both sheets with headers
// ─────────────────────────────────────────────
function setupCareersSheet() {
  if (!SPREADSHEET_ID) throw new Error('Set SPREADSHEET_ID first');
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // Jobs sheet
  let jobsSheet = ss.getSheetByName(SHEET_JOBS);
  if (!jobsSheet) jobsSheet = ss.insertSheet(SHEET_JOBS, 0);
  const jobsHeaders = ['id', 'title', 'location', 'department', 'workType', 'datePosted', 'summary', 'isOpen', 'tags'];
  jobsSheet.getRange(1, 1, 1, jobsHeaders.length).setValues([jobsHeaders]);
  jobsSheet.getRange(1, 1, 1, jobsHeaders.length).setFontWeight('bold');
  jobsSheet.setFrozenRows(1);

  // Applications sheet
  let appSheet = ss.getSheetByName(SHEET_APPLICATIONS);
  if (!appSheet) appSheet = ss.insertSheet(SHEET_APPLICATIONS, 1);
  const appHeaders = ['Timestamp', 'Job ID', 'Job Title', 'Name', 'Email', 'Phone', 'Resume URL', 'Cover Letter'];
  appSheet.getRange(1, 1, 1, appHeaders.length).setValues([appHeaders]);
  appSheet.getRange(1, 1, 1, appHeaders.length).setFontWeight('bold');
  appSheet.setFrozenRows(1);

  Logger.log('Careers sheet setup complete: Jobs + Applications');
}

// Legacy alias
function setupSheet() {
  setupCareersSheet();
}

// ─────────────────────────────────────────────
// Run ONCE to authorize MailApp and DriveApp
// ─────────────────────────────────────────────
function authorizeMail() {
  MailApp.sendEmail(RECIPIENT_EMAIL, 'Test – Careers Script', 'Authorization successful.');
}

function authorizeDrive() {
  var folder = getResumesFolder();
  Logger.log('Drive authorized. Resumes folder: ' + folder.getUrl());
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function richTextToHtml(richTextValue) {
  if (!richTextValue) return '';
  var text = richTextValue.getText();
  if (!text) return '';
  var runs = richTextValue.getRuns();
  // If no runs, treat as plain text
  if (!runs || runs.length === 0) {
    return escapeHtml(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '<br>');
  }
  var html = '';
  for (var i = 0; i < runs.length; i++) {
    var run = runs[i];
    var runText = run.getText() || '';
    var style = run.getTextStyle && run.getTextStyle();
    var isBold = style && style.isBold && style.isBold();
    var escaped = escapeHtml(runText).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '<br>');
    html += isBold ? '<strong>' + escaped + '</strong>' : escaped;
  }
  return html;
}

function createCorsResponse(content) {
  return ContentService.createTextOutput(content).setMimeType(ContentService.MimeType.JSON);
}

function getJobsSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_JOBS) || ss.getSheets()[0];
}

function getApplicationsSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_APPLICATIONS) || ss.getSheets()[1] || ss.getSheets()[0];
}

function getResumesFolder() {
  var folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(RESUME_FOLDER_NAME);
}

function saveResumeToDrive(base64Pdf, fileName, applicantName) {
  if (!base64Pdf || !fileName) return null;
  try {
    var blob = Utilities.newBlob(Utilities.base64Decode(base64Pdf), 'application/pdf', fileName);
    var folder = getResumesFolder();
    var safeName = (applicantName || 'Applicant').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
    var baseName = fileName.replace(/\.pdf$/i, '');
    var uniqueName = safeName + '_' + baseName + '_' + new Date().getTime() + '.pdf';
    var file = folder.createFile(blob.setName(uniqueName));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (e) {
    console.error('Resume save error:', e);
    return null;
  }
}

// ─────────────────────────────────────────────
// GET – Jobs (default) or Applicants
// ─────────────────────────────────────────────
function doGet(e) {
  var params = (e && e.parameter) ? e.parameter : {};
  var action = String(params.action || '').toLowerCase();
  if (action === 'getapplicants') {
    return getApplicantsResponse();
  }
  return getJobsResponse();
}

// ─────────────────────────────────────────────
// Parse concatenated string like "31-Jan-2026 Full-time Pune, On-site 1-2 years"
// ─────────────────────────────────────────────
function parseConcatenatedMeta(str) {
  if (!str || typeof str !== 'string') return {};
  var s = str.trim();
  var out = {};
  var dateMatch = s.match(/\d{1,2}-[A-Za-z]{3}-\d{2,4}/i);
  if (dateMatch) { out.dateposted = dateMatch[0]; }
  var workTypes = ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'On-site'];
  for (var w = 0; w < workTypes.length; w++) {
    if (s.indexOf(workTypes[w]) >= 0) { out.worktype = workTypes[w]; break; }
  }
  var cities = ['Pune', 'Bangalore', 'Mumbai', 'Chennai', 'Delhi', 'Hyderabad'];
  for (var c = 0; c < cities.length; c++) {
    if (s.indexOf(cities[c]) >= 0) {
      out.location = cities[c] + (s.indexOf('On-site') >= 0 ? ', On-site' : s.indexOf('Remote') >= 0 ? ', Remote' : s.indexOf('Hybrid') >= 0 ? ', Hybrid' : '');
      break;
    }
  }
  var expMatch = s.match(/\d+\s*-\s*\d+\s*years?/i) || s.match(/\d+\+\s*years?/i) || s.match(/\d+\s*years?/i);
  if (expMatch) out.experience = expMatch[0].trim();
  return out;
}

// ─────────────────────────────────────────────
// Fix misaligned row data (e.g. date in location, workType in department)
// Handles: swapped columns OR concatenated "date workType location experience" in one cell
// ─────────────────────────────────────────────
function fixJobRow(obj, row, headers) {
  var loc = String(obj.location || '');
  var dept = String(obj.department || '');
  var work = String(obj.worktype || obj.work_type || '');
  var posted = String(obj.dateposted || obj.date_posted || '');
  // Case 1: Concatenated in location column ("31-Jan-2026 Full-time Pune, On-site 1-2 years")
  if (loc.match(/\d{1,2}-[A-Za-z]{3}-\d{2,4}/i) && (loc.indexOf('Full-time') >= 0 || loc.indexOf('Pune') >= 0)) {
    var parsed = parseConcatenatedMeta(loc);
    if (parsed.dateposted) obj.dateposted = parsed.dateposted;
    if (parsed.worktype) obj.worktype = parsed.worktype;
    if (parsed.location) obj.location = parsed.location;
    if (parsed.experience) obj.experience = parsed.experience;
  }
  // Case 2: Swapped columns (location=date, department=workType, workType=location, datePosted=experience)
  else {
    var dateLike = /^\d{1,2}-[A-Za-z]{3}-\d{2,4}$/i.test(loc.trim());
    if (dateLike && (dept === 'Full-time' || dept === 'Part-time' || dept === 'Remote' || dept === 'Hybrid' || dept === 'On-site') && work.indexOf('Pune') >= 0) {
      obj.dateposted = loc;
      obj.worktype = dept;
      obj.location = work;
      obj.experience = posted || null;
      obj.department = obj.department || 'Engineering';
    }
  }
  // Column G (index 6) as summary if unlabeled or empty
  if (row.length > 6 && row[6] && (!obj.summary || obj.summary === '')) {
    obj.summary = String(row[6]).trim();
  }
  // Generate id from title if empty
  if (!obj.id || obj.id === '') {
    var t = obj.title || '';
    obj.id = t ? t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'job-' + Math.random().toString(36).slice(2, 8);
  }
  return obj;
}

// ─────────────────────────────────────────────
// Fetch jobs from Jobs sheet, return JSON for website
// Supports flexible column names; parses misaligned data; filters by isOpen
// Response: { jobs: [...] } (frontend also accepts data, rows)
// ─────────────────────────────────────────────
function getJobsResponse() {
  if (!SPREADSHEET_ID) {
    return createCorsResponse(JSON.stringify({ jobs: [], data: [], rows: [] }));
  }
  try {
    var sheet = getJobsSheet();
    if (!sheet) {
      return createCorsResponse(JSON.stringify({ jobs: [], data: [], rows: [] }));
    }
    var range = sheet.getDataRange();
    var data = range.getValues();
    if (!data || data.length < 2) {
      return createCorsResponse(JSON.stringify({ jobs: [], data: [], rows: [] }));
    }
    var headers = [];
    for (var h = 0; h < data[0].length; h++) {
      headers.push(String(data[0][h] || '').trim());
    }
    // Try to find summary column for rich text export
    var summaryColIdx = -1;
    for (var sh = 0; sh < headers.length; sh++) {
      if (String(headers[sh] || '').trim().toLowerCase() === 'summary') {
        summaryColIdx = sh;
        break;
      }
    }
    var jobs = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        if (headers[j]) {
          var key = headers[j].toLowerCase().replace(/\s+/g, '_');
          obj[key] = (row[j] != null && row[j] !== '') ? row[j] : null;
        }
      }
      // Preserve rich text formatting (bold) for summary when available
      if (summaryColIdx >= 0) {
        try {
          var rich = sheet.getRange(i + 1, summaryColIdx + 1).getRichTextValue();
          var summaryHtml = richTextToHtml(rich);
          if (summaryHtml) obj.summaryHtml = summaryHtml;
        } catch (e) {
          // Ignore rich text failures; fallback to plain summary
        }
      }
      // Fix misaligned columns
      obj = fixJobRow(obj, row, headers);
      // Skip closed jobs
      var isOpen = String(obj.isopen || obj.is_open || obj.open || obj.active || '').toLowerCase();
      if (isOpen === 'false' || isOpen === 'no' || isOpen === '0') continue;
      jobs.push(obj);
    }
    return createCorsResponse(JSON.stringify({ jobs: jobs, data: jobs, rows: jobs }));
  } catch (err) {
    console.error(err);
    return createCorsResponse(JSON.stringify({ jobs: [], data: [], rows: [], error: err.message }));
  }
}

// ─────────────────────────────────────────────
// Fetch applicants from Applications sheet
// ─────────────────────────────────────────────
function getApplicantsResponse() {
  if (!SPREADSHEET_ID) {
    return createCorsResponse(JSON.stringify({ applicants: [] }));
  }
  try {
    const sheet = getApplicationsSheet();
    const data = sheet.getDataRange().getValues();
    if (!data || data.length < 2) {
      return createCorsResponse(JSON.stringify({ applicants: [] }));
    }
    const headers = data[0];
    const applicants = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var h = String(headers[j] || '').trim();
        if (h) {
          var key = h.toLowerCase().replace(/\s+/g, '_');
          obj[key] = row[j] != null ? String(row[j]) : '';
        }
      }
      applicants.push(obj);
    }
    return createCorsResponse(JSON.stringify({ applicants: applicants.reverse() }));
  } catch (err) {
    console.error(err);
    return createCorsResponse(JSON.stringify({ applicants: [], error: err.message }));
  }
}

// ─────────────────────────────────────────────
// Append application to Applications sheet
// ─────────────────────────────────────────────
function appendApplication(data) {
  const sheet = getApplicationsSheet();
  const row = [
    new Date(),
    data.jobId || '',
    data.jobTitle || '',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.resumeUrl || '',
    (data.message || '').substring(0, 50000)
  ];
  sheet.appendRow(row);
}

// ─────────────────────────────────────────────
// HTML emails
// ─────────────────────────────────────────────
function escapeHtmlForEmail(str) {
  return escapeHtml(str || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '<br>');
}

function getCompanyEmailHtml(data) {
  var safeName = escapeHtml(data.name);
  var safeEmail = escapeHtml(data.email);
  var safePhone = escapeHtml(data.phone);
  var safeJob = escapeHtml(data.jobTitle || 'N/A');
  var safeResume = data.resumeUrl ? '<a href="' + escapeHtml(data.resumeUrl) + '">View Resume</a>' : 'Not provided';
  var safeMessage = escapeHtmlForEmail(data.message || 'No cover letter');
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="font-family:Arial,sans-serif;padding:20px;line-height:1.6;">' +
    '<h2 style="color:#1a237e;">New Job Application</h2>' +
    '<table style="border-collapse:collapse;"><tr><td style="padding:8px 0;font-weight:bold;width:140px;">Position</td><td>' + safeJob + '</td></tr>' +
    '<tr><td style="padding:8px 0;font-weight:bold;">Name</td><td>' + safeName + '</td></tr>' +
    '<tr><td style="padding:8px 0;font-weight:bold;">Email</td><td><a href="mailto:' + safeEmail + '">' + safeEmail + '</a></td></tr>' +
    '<tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td>' + safePhone + '</td></tr>' +
    '<tr><td style="padding:8px 0;font-weight:bold;">Resume</td><td>' + safeResume + '</td></tr></table>' +
    '<h3 style="margin-top:20px;">Cover Letter</h3><div style="background:#f8fafc;padding:16px;border-left:4px solid #d4af37;">' + safeMessage + '</div>' +
    '</body></html>';
}

function getApplicantConfirmationHtml(data) {
  var safeName = escapeHtml(data.name);
  var safeJob = escapeHtml(data.jobTitle || 'the position');
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="font-family:Arial,sans-serif;padding:20px;max-width:600px;">' +
    '<h2>Hi ' + safeName + ',</h2>' +
    '<p>Thank you for applying for <strong>' + safeJob + '</strong> at StuffBits Technologies.</p>' +
    '<p>We have received your application and will review it shortly.</p>' +
    '<p>Best regards,<br><strong>StuffBits Talent Team</strong></p></body></html>';
}

// ─────────────────────────────────────────────
// POST – Job application
// ─────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var name = String(data.name || '').trim();
    var email = String(data.email || '').trim();
    var phone = String(data.phone || '').trim();
    var message = String(data.message || '').trim();
    var resumePdf = data.resumePdf || '';
    var resumeFileName = String(data.resumeFileName || 'resume.pdf').trim();
    var resumeUrl = String(data.resumeUrl || '').trim();
    var jobId = String(data.jobId != null ? data.jobId : '').trim();
    var jobTitle = String(data.jobTitle != null ? data.jobTitle : '').trim();

    if (!name || !email) {
      return createCorsResponse(JSON.stringify({ status: 'error', message: 'Name and email are required' }));
    }

    if (resumePdf) {
      resumeUrl = saveResumeToDrive(resumePdf, resumeFileName || 'resume.pdf', name);
      if (!resumeUrl) {
        return createCorsResponse(JSON.stringify({ status: 'error', message: 'Failed to save resume. Please try again.' }));
      }
    } else if (!resumeUrl) {
      return createCorsResponse(JSON.stringify({ status: 'error', message: 'Resume (PDF) is required' }));
    }

    var payload = { name: name, email: email, phone: phone, message: message, resumeUrl: resumeUrl, jobId: jobId, jobTitle: jobTitle };

    appendApplication(payload);

    MailApp.sendEmail(RECIPIENT_EMAIL, 'Application: ' + (jobTitle || 'General') + ' – ' + name, '', {
      replyTo: email,
      name: name,
      htmlBody: getCompanyEmailHtml(payload)
    });

    MailApp.sendEmail(email, 'Application received – ' + (jobTitle || 'StuffBits Careers'), '', {
      name: 'StuffBits Technologies',
      htmlBody: getApplicantConfirmationHtml(payload)
    });

    return createCorsResponse(JSON.stringify({ status: 'success', message: 'Application submitted successfully' }));
  } catch (err) {
    console.error(err);
    return createCorsResponse(JSON.stringify({ status: 'error', message: err.message || 'Failed to submit' }));
  }
}
