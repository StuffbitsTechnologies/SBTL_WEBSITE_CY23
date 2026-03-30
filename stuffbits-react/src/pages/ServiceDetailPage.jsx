import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard } from 'lucide-react'
import EmbeddedHardware from '../components/services/EmbeddedHardware'
import EmbeddedFirmware from '../components/services/EmbeddedFirmware'
import ComponentAssembly from '../components/services/ComponentAssembly'
import ITDevelopment from '../components/services/ITDevelopment'

const SERVICES = {
  'embedded-hardware': {
    title: 'Embedded Hardware',
    subtitle:
      'Custom hardware design with production-ready PCB layout — from system architecture and schematics to high-speed routing and DFM.',
    component: EmbeddedHardware,
  },
  'embedded-firmware': {
    title: 'Embedded Firmware',
    subtitle: 'Real-time firmware development — bare-metal, RTOS, AUTOSAR — with MISRA-C and safety-critical expertise.',
    component: EmbeddedFirmware,
  },
  'pcb-layout': {
    title: 'Embedded Hardware',
    subtitle:
      'Custom hardware design with production-ready PCB layout — from system architecture and schematics to high-speed routing and DFM.',
    component: EmbeddedHardware,
  },
  'component-assembly': {
    title: 'Production',
    subtitle: 'Assembly, testing, and integration — from prototype builds to volume production support.',
    component: ComponentAssembly,
  },
  'it-development': {
    title: 'Software Development',
    subtitle: 'Companion websites and mobile apps for your embedded system — plus backends, dashboards, and ongoing maintenance.',
    component: ITDevelopment,
  },
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? SERVICES[slug] : null

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const ServiceComponent = service.component

  return (
    <div className="pb-0">
      {/* Page Hero */}
      <section className="bg-navy-gradient py-10 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-slate-400 mb-4"
          >
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{service.title}</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl md:text-4xl font-heading font-bold text-white mb-3"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg text-slate-300 max-w-2xl"
          >
            {service.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Service Content */}
      <ServiceComponent />

      {/* Explore Other Services */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-container mx-auto px-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-gold font-medium text-sm transition-colors"
          >
            <LayoutDashboard size={18} />
            View all services
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-navy-gradient">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30 px-6 py-10 md:px-12 md:py-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm md:text-base">
              From concept to deployment — let's discuss how we can bring your embedded or digital project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors text-sm"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
