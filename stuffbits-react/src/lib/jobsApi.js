/** Detect and fix swapped columns (id↔title, title↔date, location↔workType, department↔location) */
function fixSwappedJobRow(row) {
  const r = { ...row }
  const titleStr = String(r.title || '').trim()
  const idStr = String(r.id || '').trim()
  const dateLike = /^\d{4}-\d{2}-\d{2}/.test(titleStr) || /^\d{1,2}-[A-Za-z]{3}-\d{2,4}/i.test(titleStr)
  const titleLike = idStr.length > 3 && !/^\d+$/.test(idStr)
  const deptHasLocation = (r.department || '').match(/Pune|Bangalore|Mumbai|On-site|Remote|Hybrid/i)
  const locIsWorkType = (r.location || '').match(/^Full-time|Part-time|Remote|Hybrid|On-site$/i)
  const origWorkType = r.workType
  if (dateLike && titleLike && (deptHasLocation || locIsWorkType)) {
    r.title = idStr
    r.id = idStr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `job-${idStr}`
    if (titleStr) r.datePosted = titleStr
    if (locIsWorkType) r.workType = r.location
    if (deptHasLocation) r.location = r.department
    if (origWorkType && /^\d{4}-\d{2}-\d{2}/.test(origWorkType)) r.applyBy = origWorkType
  }
  return r
}

/**
 * Fetches open roles from Google Apps Script (or any JSON API).
 * Expects VITE_JOBS_API_URL to point to a script like:
 *   https://script.google.com/macros/s/.../exec
 * Returns array of role objects with normalized fields.
 */
export async function fetchOpenRoles() {
  const url = import.meta.env.VITE_JOBS_API_URL?.trim()

  if (!url) {
    return { roles: [], error: 'VITE_JOBS_API_URL is not set in .env' }
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      mode: 'cors',
    })

    if (!res.ok) {
      throw new Error(`Jobs API responded with status ${res.status}`)
    }

    const data = await res.json()

    // Support: array, { data: [...] }, { rows: [...] }, { jobs: [...] }
    const rows = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.rows)
          ? data.rows
          : Array.isArray(data?.jobs)
            ? data.jobs
            : []

    const roles = rows
      .filter((row) => {
        // Some sheets store "Open" as a string (not true/yes/1). Treat anything
        // that's not explicitly closed as open.
        const raw = row.isOpen ?? row.isopen ?? row.open ?? row.active ?? ''
        const s = String(raw).trim().toLowerCase()
        if (!s) return true
        return !['false', 'no', 'n', '0', 'closed', 'inactive'].includes(s)
      })
      .map((row, index) => {
        // Fix swapped columns (e.g. id=title, title=date, location=workType, department=location)
        const fixed = fixSwappedJobRow(row)
        const tags = fixed.tags || fixed.skills || fixed.popularSkills || fixed.popularskills || ''
        let location = (fixed.location || fixed.city || 'Pune').trim()
        location = location.replace(/,?\s*(On-site|Remote|Hybrid)\s*$/gi, '').trim() || location
        return {
          id: fixed.id || fixed.jobId || fixed.job_id || `job-${index}`,
          title: fixed.title || fixed.role || fixed.position || 'Open Position',
          type: fixed.type || fixed.employmentType || fixed.jobType || fixed.workType || fixed.worktype || 'Full-time',
          location,
          department: fixed.department || 'Engineering',
          experience: fixed.experience,
          workType: fixed.workType || fixed.work_type || fixed.worktype,
          datePosted: fixed.datePosted || fixed.dateposted || fixed.date_posted || fixed.posted || fixed.date || fixed.Date,
          applyBy: fixed.applyBy || fixed.apply_by || fixed.deadline,
          summary:
            fixed.summary || fixed.description || fixed.desc || fixed.details ||
            'Join our engineering team to work on real embedded and digital products.',
          summaryHtml: fixed.summaryHtml || fixed.summary_html || null,
          tags: typeof tags === 'string'
            ? tags.split(',').map((t) => t.trim()).filter(Boolean)
            : Array.isArray(tags) ? tags : [],
        }
      })

    return { roles, error: null }
  } catch (error) {
    const msg = error.message || 'Failed to load open roles'
    console.error('Failed to load open roles from script:', msg)
    // "Failed to fetch" = network/CORS; ensure script is deployed and URL is correct
    if (msg.includes('fetch') || msg.includes('NetworkError')) {
      return {
        roles: [],
        error: 'Cannot reach jobs API. Check that VITE_JOBS_API_URL points to your deployed Apps Script and the script is deployed as Web app (Anyone).',
      }
    }
    return { roles: [], error: msg }
  }
}

