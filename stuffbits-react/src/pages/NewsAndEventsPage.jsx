import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Newspaper, ArrowRight, Linkedin, Mail } from 'lucide-react'
import StuffBitsEventCards from '../components/events/StuffBitsEventCards'
import LinkedInEventsSection from '../components/events/LinkedInEventsSection'
import { COMPANY_NEWS, LINKEDIN_COMPANY_URL } from '../lib/eventsNewsData'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

function NewsCard({ item, index }) {
  const inner = (
    <>
      <span className="text-xs font-semibold text-gold uppercase tracking-wider">
        {item.dateLabel}
      </span>
      <h3 className="font-heading text-lg font-bold text-navy mt-2 mb-2 group-hover:text-gold transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
      <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm mt-4">
        Read more
        <ArrowRight size={16} />
      </span>
    </>
  )

  return (
    <motion.div
    role="article"
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.06 }}
      className="group"
    >
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-slate-50 rounded-xl border border-slate-200 p-6 h-full hover:border-gold/40 hover:bg-white hover:shadow-md transition-all"
        >
          {inner}
        </a>
      ) : (
        <Link
          to={item.href}
          className="block bg-slate-50 rounded-xl border border-slate-200 p-6 h-full hover:border-gold/40 hover:bg-white hover:shadow-md transition-all"
        >
          {inner}
        </Link>
      )}
    </motion.div>
  )
}

export default function NewsAndEventsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-blue-900/20 pointer-events-none" />
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
            <span className="text-gold">News &amp; Events</span>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Sparkles className="text-gold" size={36} />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Events
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 max-w-3xl"
          >
            What&apos;s happening at StuffBits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            Explore our events and touchpoints below—then catch day-to-day updates on LinkedIn and our blog.
          </motion.p>
        </div>
      </section>

      {/* StuffBits event cards (main visual — your brand, your imagery) */}
      <StuffBitsEventCards />

      {/* LinkedIn feed / embeds (optional) */}
      <LinkedInEventsSection />

      {/* News & highlights */}
      <section className="py-14 md:py-16 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-10">
            <Newspaper className="text-navy" size={28} />
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy">
                News &amp; highlights
              </h2>
              <p className="text-slate-600 mt-1">
                Company updates and technical articles from our team.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMPANY_NEWS.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              View all blog articles
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy text-white">
        <div className="max-w-container mx-auto px-6 text-center">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-heading font-bold mb-4"
          >
            Want to work with us or join the team?
          </motion.h2>
          <motion.p {...fadeUp} className="text-slate-300 max-w-xl mx-auto mb-8">
            Reach out for services, or explore open roles and internships on Careers.
          </motion.p>
          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              <Mail size={18} />
              Contact us
            </Link>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Careers
            </Link>
            <a
              href={LINKEDIN_COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-slate-500 text-slate-200 font-semibold rounded-lg hover:border-gold hover:text-gold transition-colors"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
