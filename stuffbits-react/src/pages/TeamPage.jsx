import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Linkedin, MapPin } from 'lucide-react'

const COMPANY_LINKEDIN = 'https://in.linkedin.com/company/stuffbits-technosolutions-pvt-ltd'

// Experience levels: Leadership | Senior | Mid | Junior (for ordering & badges)
const FALLBACK_IMAGE = '/images/about/team-data-center.png'

const TEAM_BY_DEPARTMENT = [
  {
    department: 'Leadership',
    description: 'Owners & executives',
    members: [
      { name: 'Kumar Sawant', role: 'Director and Founder', experience: 'Leadership', location: 'Pune', image: '/images/about/kumar_sir.png', linkedin: 'https://in.linkedin.com/in/kumarsawantk?trk=org-employees' },
      { name: 'Nasreen Shaikh', role: 'Director & co-founder', experience: 'Leadership', location: 'Pune', image: '/images/about/nasreen_mam.png', linkedin: 'https://in.linkedin.com/in/nasreen-shaikh-stuffbits?trk=public_post_feed-actor-name' },
      { name: 'Mr. Kranthi Puppala', role: 'Director', experience: 'Leadership', location: 'Uk London', image: '/images/about/kranthi_sir.png', linkedin: 'https://uk.linkedin.com/in/kranthipdsl' },
    ],
  },
]

// const EXPERIENCE_STYLES = {
//   Leadership: 'bg-gold/20 text-gold border-gold/40',
// }

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
}

export default function TeamPage() {
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
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/about" className="hover:text-gold transition-colors">About</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Our Team</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Leadership Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl"
          >
            Meet the founders and core leadership team guiding StuffBits across embedded engineering, hardware, software and operations.
          </motion.p>
        </div>
      </section>

      {/* Team by Department */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
              Strategic leaders who define our vision, culture and technical direction while working closely with customers and internal teams.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {/* <span
                className={`inline-flex items-center px-3 py-1 rounded-full border ${EXPERIENCE_STYLES.Leadership}`}
              >
                Leadership
              </span> */}
            </div>
          </motion.div>
          {TEAM_BY_DEPARTMENT.map((dept, deptIndex) => (
            <motion.div
              key={dept.department}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: deptIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <div className="mb-6 pb-2 border-b-2 border-gold/30">
                <h3 className="text-xl font-heading font-semibold text-navy">{dept.department}</h3>
                {dept.description && (
                  <p className="text-slate-500 text-sm mt-1">{dept.description}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {dept.members.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: (deptIndex * 0.05) + (i * 0.05) }}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="w-full max-w-[280px] aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-gold/20 mb-4 shrink-0 mx-auto">
                      <img
                        src={member.image || FALLBACK_IMAGE}
                        alt={member.name}
                        className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE }}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-1 w-full">
                      <h4 className="font-heading font-semibold text-navy">{member.name}</h4>
                      {/* <span
                        className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded border ${EXPERIENCE_STYLES[member.experience] || EXPERIENCE_STYLES.Mid}`}
                      >
                        {member.experience}
                      </span> */}
                    </div>
                    <p className="text-gold text-sm font-medium mb-1">{member.role}</p>
                    {member.location && (
                      <p className="text-slate-500 text-xs flex items-center justify-center gap-1 mb-2">
                        <MapPin size={12} /> {member.location}
                      </p>
                    )}
                    <a
                      href={member.linkedin || COMPANY_LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gold hover:text-gold-light transition-colors"
                      aria-label={member.linkedin ? `View ${member.name} on LinkedIn` : 'View StuffBits on LinkedIn'}
                    >
                      <Linkedin size={18} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.div
            {...fadeUp}
            className="text-center mt-14"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
            >
              <ArrowRight size={18} className="rotate-180" /> Back to About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-gradient">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30 px-8 py-14 md:px-14 md:py-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              We're always looking for talented engineers. Check out our open positions.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              View Careers <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
