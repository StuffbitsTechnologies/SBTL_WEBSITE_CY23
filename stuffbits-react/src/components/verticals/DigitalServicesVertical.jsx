import { motion } from 'framer-motion'
import {
  Monitor,
  Smartphone,
  Settings,
  LayoutDashboard,
  Code,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DigitalServicesHeroBackground from './DigitalServicesHeroBackground'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

const SOLUTIONS = [
  {
    icon: Monitor,
    title: 'Website Development',
    description:
      'Responsive, modern websites — React, Node.js, and static sites. SEO, performance, and design that aligns with your brand and converts visitors.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform apps for Android and iOS. IoT companion apps, fleet dashboards, configuration tools, and customer-facing products.',
  },
  
  {
    icon: Code,
    title: 'Maintenance & Support',
    description:
      'Ongoing updates, hosting, bug fixes, and feature enhancements. We keep your websites and apps secure, fast, and aligned with your roadmap.',
  },
]

const TECH_STACK = [
  'React / Next.js',
  'Node.js',
  'Android / iOS',
  'REST / WebSocket',
  'AWS / Vercel',
  'Figma to Code',
  'SEO & Analytics',
]

const WHY_US = [
  'Full-stack digital plus embedded — we understand hardware and firmware integration',
  'Industrial protocol experience for calibration and configuration tools',
  'From MVP to production: responsive design, performance, and maintainable code',
  'Agile delivery with clear communication and documentation for your team',
]

const HERO_IMAGE = '/images/services/it-development.png'

export default function DigitalServicesVertical() {
  return (
    <>
      {/* Hero — Figma-style web + app mockup (no photo); overview still uses HERO_IMAGE */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden bg-[#151022]">
        <DigitalServicesHeroBackground />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #0d1220 0%, rgba(13,18,32,0.96) 14%, rgba(13,18,32,0.78) 38%, rgba(13,18,32,0.28) 68%, rgba(13,18,32,0.08) 85%, transparent 100%)',
          }}
        />
        <div className="max-w-container mx-auto px-6 relative z-10 w-full pb-12 md:pb-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium">
              <Monitor size={16} /> Software Development
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white max-w-3xl mb-4 leading-tight"
          >
            Web, Apps & Digital Tools for Your Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl"
          >
            Website development, mobile apps, configuration tools, dashboards, and ongoing maintenance — full-stack digital solutions that connect to your embedded systems.
          </motion.p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                Why Software Development at StuffBits
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Many embedded and industrial products need a digital face — a website, an app, or
                tools to configure and monitor devices. We build responsive websites, mobile apps,
                and software that integrate with your hardware and cloud.
              </p>
              <p className="text-slate-600 leading-relaxed">
                From company websites and product landing pages to IoT companion apps and
                calibration tools, we deliver modern, maintainable code. We also offer hosting,
                updates, and support so your digital assets stay secure and aligned with your
                roadmap.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-navy shadow-xl border border-slate-200">
                <img
                  src={HERO_IMAGE}
                  alt="IT and digital development"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions / Capabilities */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
              What We Deliver for Software Development
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              End-to-end digital capabilities — web, app, tools, and support.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-gold/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="text-gold" size={24} />
                  </div>
                  <h4 className="font-heading font-semibold text-navy mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Technologies & Tools
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto">
              We use modern, proven stacks for web, app, and tools development.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-slate-200 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose StuffBits */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h3 className="text-2xl font-heading font-bold text-navy mb-6">
              Why Digital Teams Work With Us
            </h3>
            <ul className="space-y-4">
              {WHY_US.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-navy px-8 py-12 md:px-14 md:py-14 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Ready to Build Your Next Web or App?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              From websites to software applications — let's discuss your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/services/it-development"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
              >
                Software Development Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
