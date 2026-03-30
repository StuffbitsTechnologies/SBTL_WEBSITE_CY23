import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cpu, Code, Package, Monitor, ArrowRight } from 'lucide-react'
import TechStackByService from '../components/home/TechStackByService'

const SERVICES = [
  {
    slug: 'embedded-hardware',
    label: 'Embedded Hardware',
    icon: Cpu,
    description:
      'Custom hardware design plus production-ready PCB layout — schematics, routing, high-speed considerations, and DFM.',
  },
  {
    slug: 'embedded-firmware',
    label: 'Embedded Firmware',
    icon: Code,
    description: 'Real-time firmware development — bare-metal, RTOS, AUTOSAR — with MISRA-C and safety-critical expertise.',
  },
  {
    slug: 'component-assembly',
    label: 'Production',
    icon: Package,
    description: 'Assembly, testing, and integration — from prototype builds to volume production support.',
  },
  {
    slug: 'it-development',
    label: 'Software Development',
    icon: Monitor,
    description: 'Companion websites and mobile apps for your embedded system — plus backends, dashboards, and maintenance.',
  },
]

export default function ServicesPage() {
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
            <span className="text-gold">Services</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl"
          >
           From schematic to shelf, StuffBits covers every bit of your embedded product.<br></br> Hardware, firmware, PCB, assembly, and the companion website and/or mobile app — all under one roof, built to ship.
          </motion.p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {SERVICES.map(({ slug, label, icon: Icon, description }, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/services/${slug}`}
                  className="block h-full p-6 rounded-xl bg-white border border-slate-200 hover:border-gold/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="text-gold" size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                    {label}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{description}</p>
                  <span className="inline-flex items-center gap-1 text-gold font-medium text-sm">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechStackByService />

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
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              From concept to deployment — let's discuss how we can bring your embedded or digital
              project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
