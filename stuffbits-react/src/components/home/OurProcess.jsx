import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, PenTool, Code2, Truck, Headphones, ArrowRight } from 'lucide-react'

const STEPS = [
  { icon: Search, title: 'Discover', description: 'We understand your requirements, constraints, and goals.' },
  { icon: PenTool, title: 'Design', description: 'System architecture, schematics, and PCB layout.' },
  { icon: Code2, title: 'Develop', description: 'Firmware, software, and integration testing.' },
  { icon: Truck, title: 'Deliver', description: 'Prototypes, documentation, and handover.' },
  { icon: Headphones, title: 'Support', description: 'Ongoing maintenance and scaling support.' },
]

export default function OurProcess() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Our Process
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            From discovery to delivery — a structured approach that ensures quality and clarity.
          </p>
        </motion.div>
        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200" style={{ marginLeft: '10%', marginRight: '10%' }} />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative text-center"
              >
                <div className="inline-flex w-24 h-24 rounded-full bg-white border-2 border-gold/30 items-center justify-center mb-4 shadow-sm relative z-10">
                  <Icon className="text-gold" size={28} />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
