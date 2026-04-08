import { motion as Motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'StuffBits helped us move from prototype to a production-ready embedded system with clear milestones, strong communication, and reliable delivery.',
    name: 'Engineering Lead',
    title: 'Industrial IoT',
  },
  {
    quote:
      'Their firmware and hardware teams work like one unit. The result was a stable release and a clean handover with documentation we could actually use.',
    name: 'Project Manager',
    title: 'Automotive',
  },
  {
    quote:
      'Fast turnarounds without cutting corners. The integration support post-delivery was a big reason we kept working with them.',
    name: 'CTO',
    title: 'Product Company',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-6">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="sb-kicker mb-3">Testimonials</p>
          <h2 className="sb-h2">What Clients Say</h2>
        </Motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Motion.figure
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50"
            >
              <div className="flex items-center gap-2 text-gold mb-3">
                <Quote size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">Verified</span>
              </div>
              <blockquote className="text-slate-700 leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-slate-200">
                <p className="font-heading font-semibold text-navy">{t.name}</p>
                <p className="text-sm text-slate-500">{t.title}</p>
              </figcaption>
            </Motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

