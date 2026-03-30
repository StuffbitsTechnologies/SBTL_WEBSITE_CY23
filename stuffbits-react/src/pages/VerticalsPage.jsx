import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Factory, Wifi, Monitor, ArrowRight } from 'lucide-react'

const VERTICALS = [
  {
    slug: 'automotive',
    icon: Car,
    title: 'Automotive',
    description:
      'ECU development, AUTOSAR, EV electronics, diagnostics, and connected vehicle solutions for OEMs and Tier-1 suppliers.',
    highlights: ['ECU Development', 'AUTOSAR', 'EV Electronics', 'Diagnostics', 'V2X'],
    image: '/assets/blog/automotive-software-vr.png',
    ready: true,
  },
  {
    slug: 'industrial',
    icon: Factory,
    title: 'Industrial',
    description:
      'Process measurement, instrumentation, and smart manufacturing. Rugged embedded systems for harsh industrial environments.',
    highlights: ['Industrial IoT', 'Process Control', 'Instrumentation', 'Industry 4.0'],
    image: '/images/hero/embedded-technology.png',
    ready: true,
  },
  {
    slug: 'iot',
    icon: Wifi,
    title: 'IIOT',
    description:
      'IIOT solutions for industrial automation, process control, and IoT-based systems.',
    highlights: ['IIOT Solutions', 'Industrial Automation', 'Process Control', 'IoT-Based Systems'],
    image: '/images/hero/embedded-technology.png',
    ready: true,
  },
  {
    slug: 'digital-services',
    icon: Monitor,
    title: 'Software Development',
    description:
      'Websites, mobile apps, and ongoing maintenance — full-stack digital solutions that pair with your embedded products.',
    highlights: ['Web & App Development', 'Maintenance & Support', 'Dashboards'],
    image: '/images/services/it-development.png',
    ready: true,
  },
]

export default function VerticalsPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-navy-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-slate-400 mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Verticals</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Industries We Serve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl"
          >
            Embedded and digital solutions across Automotive, Industrial, IoT, and Software Development.
          </motion.p>
        </div>
      </section>

      {/* Vertical Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {VERTICALS.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/verticals/${v.slug}`}
                    className="block h-full p-6 md:p-8 rounded-xl bg-white border border-slate-200 hover:border-gold/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon className="text-gold" size={28} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy text-xl group-hover:text-gold transition-colors">
                          {v.title}
                        </h3>
                        {v.ready && (
                          <span className="inline-block mt-1 text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded">
                            Full page available
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{v.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {v.highlights.slice(0, 4).map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                      Explore {v.title} <ArrowRight size={16} className="group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-navy-gradient px-8 py-14 md:px-14 md:py-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Not Sure Which Vertical Fits?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              Tell us about your project — we'll match you with the right expertise and services.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
