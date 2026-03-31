import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cpu, Code, Package, Monitor, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Cpu,
    title: 'Embedded Hardware',
    description:
      'Custom hardware design plus production-ready PCB layout — schematics, routing, high-speed considerations, and DFM.',
    link: '/services/embedded-hardware',
  },
  {
    icon: Code,
    title: 'Embedded Firmware',
    description: 'Real-time firmware development — bare-metal, RTOS, AUTOSAR — with MISRA-C and safety-critical expertise.',
    link: '/services/embedded-firmware',
  },
  {
    icon: Package,
    title: 'Production',
    description: 'Assembly, testing, and integration — from prototype builds to volume production support.',
    link: '/services/component-assembly',
  },
  {
    icon: Monitor,
    title: 'Software Development',
    description: 'Websites and mobile apps that pair with your embedded product — plus backends, dashboards, and maintenance.',
    link: '/services/it-development',
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="sb-section bg-slate-50">
      <div className="sb-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="sb-kicker mb-3">Our Solutions</p>
          <h2 className="sb-h2 mb-4">What We Do</h2>
          <p className="sb-lead max-w-2xl mx-auto">
            We provide end-to-end engineering for embedded systems and connected products — hardware, firmware, PCB, production, and the companion website and/or mobile app when needed.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, title, description, link }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={link}
                className="block h-full p-6 sb-card sb-card-hover group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="text-gold" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                  {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{description}</p>
                <span className="inline-flex items-center gap-1 text-gold font-medium text-sm">
                  Explore More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            className="sb-btn-secondary"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
