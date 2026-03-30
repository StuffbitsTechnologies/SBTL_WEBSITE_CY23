/**
 * Shared job mapping and helpers for Careers pages.
 */
export function mapApiRoleToJob(role, index) {
  const typeStr = role.type || role.jobType || 'Full Time'
  const workType = role.workType || (typeStr?.toLowerCase().includes('remote') ? 'Remote' : typeStr?.toLowerCase().includes('hybrid') ? 'Hybrid' : 'On-site')
  return {
    id: role.id || `SB-API-${index}`,
    title: role.title || 'Open Position',
    location: role.location || 'Pune',
    department: role.department || 'Engineering',
    company: 'StuffBits',
    workType,
    jobType: typeStr,
    datePosted: role.datePosted || 'Recently',
    applyBy: role.applyBy || 'Soon',
    description: role.summary || 'Join our engineering team to work on real embedded and digital products.',
    descriptionHtml: role.summaryHtml || null,
    popularSkills: Array.isArray(role.tags) && role.tags.length > 0 ? role.tags : [],
  }
}

/** Generate URL slug from job title (e.g. "SAP VIM" -> "sap-vim") */
export function jobSlug(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Format job date for display. Handles ISO timestamps (with timezone) and
 * Excel-style strings (e.g. "31-Jan-2026"). Uses local timezone so
 * 2026-01-30T18:30:00.000Z (midnight IST) shows as "31 Jan 2026".
 */
export function formatJobDate(value) {
  if (!value || value === 'Recently') return value
  const str = String(value).trim()
  const d = new Date(str)
  if (Number.isNaN(d.getTime())) return str
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
