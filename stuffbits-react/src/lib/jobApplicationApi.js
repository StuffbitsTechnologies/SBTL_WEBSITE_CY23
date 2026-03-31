/**
 * Job Application API - Submit applications and fetch applicants
 * VITE_JOB_APPLICATION_FORM_URL - for POST (same URL)
 * VITE_APPLICANTS_API_URL - for GET (?action=getApplicants)
 * Can use same URL for both; GET with action=getApplicants returns applicants.
 */
const FORM_URL = import.meta.env.VITE_JOB_APPLICATION_FORM_URL
const APPLICANTS_URL = import.meta.env.VITE_APPLICANTS_API_URL || FORM_URL

/** Append ?action=getApplicants if using same URL */
function getApplicantsEndpoint() {
  if (!APPLICANTS_URL) return null
  if (APPLICANTS_URL === FORM_URL) {
    const sep = APPLICANTS_URL.includes('?') ? '&' : '?'
    return `${APPLICANTS_URL}${sep}action=getApplicants`
  }
  return APPLICANTS_URL
}

export async function fetchApplicants() {
  const url = getApplicantsEndpoint()
  if (!url) {
    return { applicants: [], error: 'Applicants API not configured' }
  }

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`API responded with ${res.status}`)
    const data = await res.json()
    const applicants = Array.isArray(data.applicants) ? data.applicants : []
    return { applicants, error: data.error || null }
  } catch (err) {
    console.error('Failed to fetch applicants', err)
    return { applicants: [], error: err.message || 'Failed to load applicants' }
  }
}
