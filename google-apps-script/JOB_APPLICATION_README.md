# Careers - Unified Google Apps Script

**One script, one Google Sheet** for both job listings and applications.

| Tab           | Purpose                                      |
|---------------|----------------------------------------------|
| **Jobs**      | Job listings (fetched by website)            |
| **Applications** | Applicant submissions (from Apply form)   |

## Endpoints

| Method | Action            | Description                            |
|--------|-------------------|----------------------------------------|
| GET    | (default)         | Returns job listings                   |
| GET    | `?action=getApplicants` | Returns applicant list          |
| POST   | —                 | Submit job application                 |

## Setup Steps

### 1. Create or open a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet (or use existing)
3. Copy the **Sheet ID** from the URL: `.../d/SHEET_ID/edit`

### 2. Create the script

1. Go to [script.google.com](https://script.google.com)
2. Create a **new project**
3. Delete the default `myFunction()` code
4. Copy the contents of `JobApplication.gs` into the editor
5. Update:
   - `RECIPIENT_EMAIL` – where application emails are sent
   - `SPREADSHEET_ID` – your Sheet ID from step 1
6. Save (Ctrl+S)

### 3. Run setup (one-time)

1. Select **setupCareersSheet** → Run – creates Jobs and Applications tabs with headers
2. Select **authorizeMail** → Run – approve email permissions
3. Select **authorizeDrive** → Run – approve Drive permissions (for PDF resume uploads)

### 4. Deploy as Web App

1. **Deploy** → **New deployment** → **Web app**
2. Execute as: **Me** | Who has access: **Anyone**
3. Deploy and copy the **Web app URL**

### 5. Configure the website

Add the **same** Web app URL to both env variables in `.env`:

```
VITE_JOBS_API_URL=https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
VITE_JOB_APPLICATION_FORM_URL=https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
```

Restart the dev server.

## Jobs Sheet Columns

| Column     | Example                          |
|------------|----------------------------------|
| id         | job-1                            |
| title      | Senior Embedded Engineer         |
| location   | Pune                             |
| department | Engineering                      |
| workType   | Full-time / Remote / Hybrid      |
| datePosted | 2025-01-15                       |
| summary    | Job description text             |
| isOpen     | true (or leave empty)            |
| tags       | C, RTOS, Embedded (comma-separated) |

## Applications Sheet

Auto-created with: Timestamp, Job ID, Job Title, Name, Email, Phone, Resume URL, Cover Letter.

**Resume (PDF)**: Applicants upload a PDF (required, max 5MB). The script saves it to a folder **"Job Application Resumes"** in the script owner's Google Drive, creates a shareable link, and stores that in the sheet. The company email includes a "View Resume" link.

## Migrating from separate scripts

If you had jobs in a different spreadsheet, copy that data into the **Jobs** tab. The script will replace your old Jobs API and Application form scripts with a single deployment.
