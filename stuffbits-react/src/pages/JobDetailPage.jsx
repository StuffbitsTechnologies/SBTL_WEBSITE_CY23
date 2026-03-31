import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Briefcase,
  Send,
} from 'lucide-react'
import { fetchOpenRoles } from '../lib/jobsApi'
import { mapApiRoleToJob, formatJobDate } from '../lib/jobsUtils'
import JobApplicationFormModal from '../components/careers/JobApplicationFormModal'

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError(null)
      const { roles, error: apiError } = await fetchOpenRoles()
      if (!isMounted) return
      if (apiError) {
        setJob(null)
        setError(apiError)
      } else if (roles?.length) {
        const jobs = roles.map(mapApiRoleToJob)
        const found = jobs.find((j) => String(j.id) === String(id))
        setJob(found || null)
        setError(found ? null : 'Job not found')
      } else {
        setJob(null)
        setError('No jobs available')
      }
      setLoading(false)
    }
    load()
    return () => { isMounted = false }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <p className="text-slate-600 mb-4">{error || 'Job not found'}</p>
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-gold font-medium hover:text-gold-light"
        >
          <ArrowLeft size={18} /> Back to careers
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb bar - Cognizant style */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/careers" className="hover:text-gold transition-colors">Careers</Link>
            <span>/</span>
            <Link to="/careers" className="hover:text-gold transition-colors">Jobs</Link>
            <span>/</span>
            <span className="text-navy font-medium">{job.title}</span>
          </nav>
        </div>
      </section>

      {/* Job header - Cognizant style: title, meta row */}
      <section className="bg-white py-8 md:py-10">
        <div className="max-w-container mx-auto px-6">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-gold mb-6 transition-colors"
          >
            <ArrowLeft size={18} /> Back to job search
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-2">{job.title}</h1>
          <p className="text-slate-500 text-sm mb-6">{job.id}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-600 mb-6">
            <a
              href="mailto:careers@stuffbits.in?subject=Join%20Talent%20Community%20-%20StuffBits"
              className="text-gold hover:text-gold-light font-medium"
            >
              Join our talent community
            </a>
            <span>Date published {formatJobDate(job.datePosted)}</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-gold shrink-0" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={16} className="text-gold shrink-0" />
              {job.department}
            </span>
            <span>Work model {job.workType}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowApplyModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Apply now <ArrowRight size={18} />
          </button>

          <JobApplicationFormModal
            job={job}
            isOpen={showApplyModal}
            onClose={() => setShowApplyModal(false)}
          />
        </div>
      </section>

      {/* Job content */}
      <section className="bg-slate-50 py-10 md:py-12">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-heading font-semibold text-navy mb-4">Job Summary</h2>
            {job.descriptionHtml ? (
              <div
                className="text-slate-600 leading-relaxed mb-10"
                dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
              />
            ) : (
              <div className="text-slate-600 leading-relaxed whitespace-pre-line mb-10">
                {job.description}
              </div>
            )}

            {/* Company / culture block - Cognizant style */}
            <div className="border-t border-slate-200 pt-10">
              <h2 className="text-xl font-heading font-semibold text-navy mb-4">The StuffBits community</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We are a team who appreciate and support one another. Our people uphold an energetic,
                collaborative and inclusive workplace where everyone can thrive.
              </p>
              <ul className="text-slate-600 space-y-2 mb-6">
                <li>• StuffBits works on real embedded and digital products that ship to the field.</li>
                <li>• We don&apos;t just dream of a better way – we build it.</li>
                <li>• We foster an innovative environment where you can grow your career.</li>
              </ul>
              <p className="text-slate-600 text-sm">
                StuffBits is an equal opportunity employer. Your application will not be considered based on
                race, color, sex, religion, national origin, disability, or any other characteristic protected by law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Talent community CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-navy mb-4">
              Join our talent community
            </h2>
            <p className="text-slate-600 mb-6">
              Haven&apos;t found the right opportunity yet? Receive the latest updates on job opportunities
              and company news tailored just for you.
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
    </div>
  )
}
