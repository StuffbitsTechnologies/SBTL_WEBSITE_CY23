import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, ArrowRight } from 'lucide-react'
import AutomotiveVertical from '../components/verticals/AutomotiveVertical'
import IndustrialVertical from '../components/verticals/IndustrialVertical'
import IoTVertical from '../components/verticals/IoTVertical'
import DigitalServicesVertical from '../components/verticals/DigitalServicesVertical'

const VERTICALS = {
  automotive: {
    title: 'Automotive',
    subtitle:
      'Embedded solutions for ECUs, AUTOSAR, EV electronics, and connected vehicle applications.',
    component: AutomotiveVertical,
  },
  industrial: {
    title: 'Industrial',
    subtitle:
      'Process measurement, instrumentation, and smart manufacturing. Rugged embedded systems for industrial environments.',
    component: IndustrialVertical,
  },
  iot: {
    title: 'IIoT',
    subtitle:
      'GPS tracking, asset monitoring, BLE and cellular connectivity, and cloud-integrated devices.',
    component: IoTVertical,
  },
  'digital-services': {
    title: 'Software Development',
    subtitle:
    'Companion websites and mobile apps for embedded products, plus ongoing maintenance.',
    component: DigitalServicesVertical,
  },
}

export default function VerticalDetailPage() {
  const { slug } = useParams()
  const vertical = slug ? VERTICALS[slug] : null

  if (!vertical) {
    return <Navigate to="/verticals" replace />
  }

  const VerticalComponent = vertical.component

  return (
    <div className="pb-0">
      {/* Breadcrumb only when we have dedicated content (e.g. Automotive) */}
      {VerticalComponent && (
        <section className="bg-navy py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-container mx-auto px-6 relative">
            <motion.nav
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-slate-400"
            >
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/verticals" className="hover:text-gold transition-colors">
                Verticals
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{vertical.title}</span>
            </motion.nav>
          </div>
        </section>
      )}

      {VerticalComponent ? (
        <VerticalComponent />
      ) : (
        <>
          {/* Placeholder hero for verticals not yet built */}
          <section className="bg-navy py-16">
            <div className="max-w-container mx-auto px-6">
              <motion.nav
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-slate-400 mb-4"
              >
                <Link to="/" className="hover:text-gold">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/verticals" className="hover:text-gold">Verticals</Link>
                <span className="mx-2">/</span>
                <span className="text-gold">{vertical.title}</span>
              </motion.nav>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-heading font-bold text-white mb-3"
              >
                {vertical.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-300 max-w-2xl"
              >
                {vertical.subtitle}
              </motion.p>
            </div>
          </section>
          <section className="py-16 bg-slate-50">
            <div className="max-w-container mx-auto px-6 text-center">
              <p className="text-slate-600 mb-6">
                Detailed content for this vertical is coming soon. In the meantime, explore our
                Automotive vertical or get in touch to discuss your requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/verticals/automotive"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  View Automotive <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Explore other verticals */}
      <section className={`py-8 border-t border-slate-200 ${VerticalComponent ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="max-w-container mx-auto px-6">
          <Link
            to="/verticals"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-gold font-medium text-sm transition-colors"
          >
            <LayoutDashboard size={18} />
            View all verticals
          </Link>
        </div>
      </section>
    </div>
  )
}
