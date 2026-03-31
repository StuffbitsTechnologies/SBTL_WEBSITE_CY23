import { lazy, Suspense, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Instagram,
  Facebook,
  Loader2,
} from 'lucide-react'
const FooterMap = lazy(() => import('../components/layout/FooterMap'))

const CONTACT_TYPES = [
  { value: 'technical', label: 'Technical Question', desc: 'Pre-sales or support' },
  { value: 'project', label: 'Start a Project', desc: 'New embedded or digital project' },
  
  // { value: 'careers', label: 'Join the Team', desc: 'Careers and hiring' },
]

const SERVICES = [
  'Embedded Hardware',
  'Embedded Firmware',
  'Production',
  'Software Development',
  'General Inquiry',
]

const LOCATION = {
  plusCode: 'GW4M+2GQ',
  address: '1st Floor, Royal House, Near Gp Pradhan Garden Road, Bhosale Nagar, Hadapsar, Pune 411028, Maharashtra',
}
// Use fixed coords so Google drops the marker at the exact pin.
// (These coords are the same ones used by `FooterMap` for Hadapsar.)
const HADAPSAR_COORDS = { lat: 18.50577344399995, lng: 73.93404613969308 }
const MAP_QUERY = `${HADAPSAR_COORDS.lat},${HADAPSAR_COORDS.lng}`
// Using `/maps?q=` (not `/maps/search/?api=1&query=`) tends to keep the marker on the exact coordinate.
const MAP_LINK = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17`

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.instagram.com/_stuffbits_', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/stuffbits.technologies', label: 'Facebook', icon: Facebook },
  { href: 'https://wa.me/911234567890', label: 'WhatsApp', icon: MessageCircle },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
}

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const formEndpoint = import.meta.env.VITE_CONTACT_FORM_URL
  const requestedService = searchParams.get('service') || ''
  const requestedContactType = searchParams.get('contactType') || ''
  const requestedProject = searchParams.get('project') || ''

  const prefilledService = useMemo(
    () => (SERVICES.includes(requestedService) ? requestedService : ''),
    [requestedService]
  )
  const prefilledContactType = useMemo(() => {
    const validLabels = CONTACT_TYPES.map((item) => item.label)
    return validLabels.includes(requestedContactType) ? requestedContactType : 'Start a Project'
  }, [requestedContactType])
  const prefilledMessage = requestedProject
    ? `I'm interested in building something similar to "${requestedProject}". Please share scope, timeline, and next steps.`
    : ''

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formEndpoint) {
      setStatus('error')
      setErrorMessage('Contact form is not configured. Please set VITE_CONTACT_FORM_URL in .env')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const form = e.target
    const formData = new FormData(form)
    const payload = {
      contactType: formData.get('contactType') || 'Inquiry',
      service: formData.get('service') || 'General Inquiry',
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      company: formData.get('company') || '',
      message: formData.get('message') || '',
    }

    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.status === 'success') {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (_err) {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div>
      {/* Page Hero */}
      <section className="bg-navy py-16 relative overflow-hidden">
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
            <span className="text-gold">Contact</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-300 mt-3 text-lg max-w-2xl"
          >
            Ready to build your next embedded product? Start a project, ask a technical question, or join our team.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Details */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-0 h-20 md:h-24 bg-navy z-0 [clip-path:polygon(0%_0%,58%_0%,45%_100%,0%_100%)]"
        />
        <div className="max-w-container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form - takes 3 cols on large screens */}
            <motion.div
              {...fadeUp}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 md:p-10">
                <h2 className="text-xl font-heading font-semibold text-navy mb-6">Send us a message</h2>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={22} />
                    <div>
                      <p className="font-medium text-emerald-800">Thank you!</p>
                      <p className="text-emerald-700 text-sm mt-1">We&apos;ll get back to you within 1 business day.</p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3"
                  >
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={22} />
                    <div>
                      <p className="font-medium text-red-800">Submission failed</p>
                      <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact type selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">I want to</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CONTACT_TYPES.map(({ value, label, desc }) => (
                        <label
                          key={value}
                          className="relative flex cursor-pointer rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-gold/50 has-[input:checked]:border-gold has-[input:checked]:ring-2 has-[input:checked]:ring-gold/20 focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2"
                        >
                          <input
                            type="radio"
                            name="contactType"
                            value={label}
                            defaultChecked={label === prefilledContactType || (value === 'project' && !requestedContactType)}
                            className="sr-only"
                          />
                          <span className="flex flex-col">
                            <span className="font-medium text-slate-900">{label}</span>
                            <span className="text-xs text-slate-500 mt-0.5">{desc}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Service of interest *</label>
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue={prefilledService}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      defaultValue={prefilledMessage}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project or question..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact details - 2 cols */}
            <motion.div
              {...fadeUp}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-xl font-heading font-semibold text-navy mb-6">Contact details</h2>
                <div className="space-y-6">
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 text-slate-600 hover:text-gold transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold flex-shrink-0 group-hover:bg-none group-hover:bg-gold group-hover:text-navy transition-colors">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Hadapsar Office</p>
                      <p>Hadapsar, Pune-411028, Maharashtra</p>
                    </div>
                  </a>
                  {/* <a
                    href="https://www.google.com/maps/search/?api=1&query=WeWork+Eleven+West+Pancard+Club+Rd+Baner+Pune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 text-slate-600 hover:text-gold transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold flex-shrink-0 group-hover:bg-none group-hover:bg-gold group-hover:text-navy transition-colors">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Baner Office</p>
                      <p>WeWork Eleven West, Pancard Club Rd, Baner Gaon, Baner, Pune, Maharashtra 411069</p>
                    </div>
                  </a> */}
                  <a
                    href="mailto:contact@stuffbits.in"
                    className="flex gap-4 text-slate-600 hover:text-gold transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold flex-shrink-0 group-hover:bg-none group-hover:bg-gold group-hover:text-navy transition-colors">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Email</p>
                      <p>contact@stuffbits.in</p>
                    </div>
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex gap-4 text-slate-600 hover:text-gold transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold flex-shrink-0 group-hover:bg-none group-hover:bg-gold group-hover:text-navy transition-colors">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Phone</p>
                      <p>+91 1234567890</p>
                    </div>
                  </a>
                  {/* <a
                    href="https://wa.me/911234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 text-slate-600 hover:text-gold transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold flex-shrink-0 group-hover:bg-none group-hover:bg-gold group-hover:text-navy transition-colors">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">WhatsApp</p>
                      <p>+91 1234567890</p>
                    </div>
                  </a> */}
                  <div className="flex gap-4 text-slate-600">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold flex-shrink-0">
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Business hours</p>
                      <p>Mon – Fri: 9:00 AM – 6:00 PM IST</p>
                      <p className="text-slate-500 text-sm mt-1">Sat by appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-slate-800 mb-4">Connect with us</h3>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-200 text-slate-600 hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-navy text-white">
                <p className="font-heading font-semibold text-gold mb-2">Prefer a quick call?</p>
                <p className="text-slate-300 text-sm mb-4">
                  Schedule a free 15-minute consultation to discuss your embedded or digital project.
                </p>
                <a
                  href="https://wa.me/911234567890?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20StuffBits."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <section className="py-12 md:py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-container mx-auto px-6">
          <motion.h2
            {...fadeUp}
            className="text-xl font-heading font-semibold text-navy mb-6"
          >
            Hadapsar office
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white [&_iframe]:w-full [&_iframe]:h-80 [&_iframe]:md:h-96 [&_iframe]:rounded-none"
          >
            <Suspense
              fallback={(
                <div
                  className="w-full h-80 md:h-96 rounded-lg bg-slate-200 animate-pulse"
                  aria-hidden
                />
              )}
            >
              <FooterMap />
            </Suspense>
          </motion.div>
        </div>
      </section> */}
    </div>
  )
}
