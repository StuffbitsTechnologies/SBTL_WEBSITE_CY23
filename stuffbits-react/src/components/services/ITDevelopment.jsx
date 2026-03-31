import { motion } from 'framer-motion'
import { Monitor, CheckCircle2, Globe } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
}

const CAPABILITIES = [
  {
    title: 'Website development',
    desc: 'Modern, responsive websites built with React, Node.js, and industry-standard stacks. Company sites, product portals, and web applications that showcase your brand and products.',
  },
  {
    title: 'Mobile apps (iOS, Android, cross-platform)',
    desc: 'Native or cross-platform mobile apps for configuration, monitoring, and control of your embedded products. Connect users to their devices via smartphones and tablets.',
  },
  {
    title: 'Cloud and backend services',
    desc: 'APIs, databases, and cloud infrastructure for connected products. Data ingestion, storage, analytics, and user authentication — built to scale with your product.',
  },
  {
    title: 'API design and system integration',
    desc: 'RESTful APIs, WebSockets, MQTT — we design interfaces that let your embedded devices talk to web and mobile apps. We integrate with third-party services and platforms.',
  },
  {
    title: 'Ongoing maintenance and support',
    desc: 'Bug fixes, security patches, feature updates, and hosting management. We keep your digital products running smoothly long after launch.',
  },
  {
    title: 'Deployment and DevOps',
    desc: 'CI/CD pipelines, cloud deployment and monitoring. We ensure your applications are deployed reliably and can be updated without downtime.',
  },
]

export default function ITDevelopment({ id = 'digital' }) {
  return (
    <section id={id} className="py-12 bg-white scroll-mt-24">
      <div className="max-w-container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Image */}
          <motion.div {...fadeUp} className="lg:sticky lg:top-24">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
              <img
                src="/images/services/it-development.png"
                alt="Software Development - web, apps, and digital solutions"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp}>
            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <Monitor className="text-gold" size={22} />
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">
              <strong>What it is:</strong> Software Development covers the software layer beyond embedded firmware —
              websites, mobile apps, cloud backends, and tools. These solutions let users
              interact with your hardware, view data, configure devices, and manage operations remotely.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              We build modern websites and mobile apps that integrate seamlessly with your embedded systems.
              From corporate websites to industrial applications, we deliver full-stack digital solutions with ongoing maintenance support.
            </p>

            <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2 text-lg">
              <Globe className="text-gold" size={18} />
              What We Deliver
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {CAPABILITIES.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-medium text-slate-800 text-sm">{item.title}</span>
                    <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
