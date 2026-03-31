import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Mail,
  Search,
  X,
  Send,
  Calendar,
} from 'lucide-react'
import { fetchOpenRoles } from '../lib/jobsApi'
import { mapApiRoleToJob, jobSlug, formatJobDate } from '../lib/jobsUtils'
import AmbientOrbs from '../components/AmbientOrbs'

const JOBS_PER_PAGE = 10
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'recent', label: 'Most Recent' },
]

const DEPARTMENT_CATEGORIES = [
  'All',
  // 'Technology & Engineering',
  // 'Digital',
  // 'Embedded Systems',
  // 'Business Processes',
  // 'IT Infrastructure',
]

const HIRING_STEPS = [
  { title: 'Apply', description: 'Share your resume and a brief note on why you want to work with StuffBits.' },
  { title: 'Initial Screen', description: 'We review your profile for role fit and alignment with our culture and tech stack.' },
  { title: 'Technical Discussion', description: 'Deep dive into your experience, problem-solving approach, and real project scenarios.' },
  { title: 'Offer & Onboarding', description: 'If we are a mutual fit, we move quickly with an offer and onboarding plan.' },
]

/** Cognizant-style job card: links to detail page */
function JobCard({ job }) {
  const descPreview = job.description?.slice(0, 120) + (job.description?.length > 120 ? '...' : '')
  const to = `/careers/jobs/${job.id}/${jobSlug(job.title)}`

  return (
    <Link
      to={to}
      className="group block w-full text-left p-5 md:p-6 bg-white border-b border-slate-100 transition-all hover:bg-slate-50/80 hover:border-l-gold border-l-4 border-l-transparent"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-navy text-lg mb-1.5 group-hover:text-gold transition-colors">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 mb-2">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold shrink-0" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-gold shrink-0" />
              {job.department}
            </span>
            {job.datePosted && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gold shrink-0" />
                {formatJobDate(job.datePosted)}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {descPreview}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded">
            {job.workType}
          </span>
          <ArrowRight size={20} className="text-slate-300 group-hover:text-gold transition-colors shrink-0" />
        </div>
      </div>
    </Link>
  )
}

/** Cognizant-style talent community CTA */
function TalentCommunityCTA() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-4">
            Join our talent community
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Haven&apos;t found the right opportunity yet? Receive the latest updates on job opportunities,
            recruitment events and company news tailored just for you.
          </p>
          <a
            href="mailto:careers@stuffbits.in?subject=Join%20Talent%20Community%20-%20StuffBits"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Sign up <Send size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function CareersPage() {
  const [roles, setRoles] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)

  const hasApiRoles = Array.isArray(roles) && roles.length > 0
  const jobs = hasApiRoles ? roles.map(mapApiRoleToJob) : []

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const matchesText = !searchText.trim() ||
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.department.toLowerCase().includes(searchText.toLowerCase())
      const matchesLocation = !searchLocation.trim() ||
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      const matchesDept = departmentFilter === 'All' ||
        job.department.toLowerCase().includes(departmentFilter.toLowerCase())
      return matchesText && matchesLocation && matchesDept
    })
    if (sortBy === 'recent') {
      result = [...result].sort((a, b) => (b.datePosted || '').localeCompare(a.datePosted || ''))
    }
    return result
  }, [jobs, searchText, searchLocation, departmentFilter, sortBy])

  const totalFiltered = filteredJobs.length
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE
    return filteredJobs.slice(start, start + JOBS_PER_PAGE)
  }, [filteredJobs, currentPage])

  const totalPages = Math.ceil(totalFiltered / JOBS_PER_PAGE) || 1
  const displayStart = totalFiltered === 0 ? 0 : (currentPage - 1) * JOBS_PER_PAGE + 1
  const displayEnd = Math.min(currentPage * JOBS_PER_PAGE, totalFiltered)

  useEffect(() => {
    let isMounted = true
    async function loadRoles() {
      setLoading(true)
      setApiError(null)
      const { roles: apiRoles, error } = await fetchOpenRoles()
      if (!isMounted) return
      setRoles(apiRoles ?? [])
      setApiError(error || null)
      setLoading(false)
    }
    loadRoles()
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText, searchLocation, departmentFilter, sortBy])

  return (
    <div>
      {/* Hero - Cognizant-style: bold tagline */}
      <section className="bg-navy py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-slate-400 mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Careers</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 max-w-3xl leading-tight"
          >
            Your first role at StuffBits is just the beginning of your journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl"
          >
            Build real embedded and digital products that ship to the field. Work across hardware, firmware,
            and software with a team that loves engineering.
          </motion.p>
        </div>
      </section>

      {/* Search & filters - clean bar */}
      <section className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by job title or keyword"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
              </div>
              <div className="relative flex-1 sm:max-w-[220px]">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location (e.g. Pune, India)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                />
                {searchLocation && (
                  <button
                    type="button"
                    onClick={() => setSearchLocation('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear location"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Department filter pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {DEPARTMENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setDepartmentFilter(cat)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  departmentFilter === cat
                    ? 'bg-gold text-navy'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results bar - "Displaying X to Y of Z matching jobs" + sort */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-slate-600 text-sm md:text-base">
              {loading ? (
                'Loading...'
              ) : totalFiltered === 0 ? (
                'No matching jobs'
              ) : (
                <>
                  Displaying <span className="font-semibold text-navy">{displayStart}</span> to{' '}
                  <span className="font-semibold text-navy">{displayEnd}</span> of{' '}
                  <span className="font-semibold text-navy">{totalFiltered}</span> matching{' '}
                  {totalFiltered === 1 ? 'job' : 'jobs'}
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job list - full width, each card links to detail page (Cognizant style) */}
      <section className="min-h-[400px] bg-white">
        <div className="max-w-container mx-auto">
          {loading ? (
            <div className="p-6 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-5 bg-slate-50 rounded animate-pulse">
                  <div className="h-5 w-3/4 bg-slate-200 mb-2 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 mb-2 rounded" />
                  <div className="h-3 w-full bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : paginatedJobs.length > 0 ? (
            <>
              <div>
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gold transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gold transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center">
              <Briefcase size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-slate-600 font-medium">
                {apiError
                  ? 'Could not load jobs'
                  : jobs.length === 0
                    ? 'No open positions at the moment.'
                    : 'No jobs match your search.'}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {apiError ? apiError : 'Try adjusting your filters or join our talent community for updates.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Talent Community - Cognizant-style CTA */}
      <TalentCommunityCTA />

      {/* Hiring Process */}
      {/* <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-3">
              Our Hiring Process
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We keep things transparent and simple. Expect clear communication, relevant discussions,
              and respect for your time.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {HIRING_STEPS.map((step, index) => (
              <div key={step.title} className="p-6 border border-slate-200 rounded-xl hover:border-gold/30 transition-colors">
                <span className="inline-flex h-9 w-9 items-center justify-center text-sm font-semibold text-navy bg-gold rounded-lg mb-4">
                  {index + 1}
                </span>
                <h3 className="text-base font-heading font-semibold text-navy mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-navy">
        <AmbientOrbs tone="dark" />
        <div className="max-w-container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30 px-8 py-12 md:px-14 md:py-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Build With Us?
            </h2>
            <p className="text-slate-200 max-w-2xl mx-auto mb-8">
              Whether you&apos;re an experienced engineer or just getting started, if you care about
              embedded systems and building reliable products, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:careers@stuffbits.in?subject=Careers%20at%20StuffBits"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded hover:bg-gold-light transition-colors"
              >
                Email Your Resume <Mail size={18} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded hover:bg-gold hover:text-navy transition-colors"
              >
                Talk to Our Team <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
