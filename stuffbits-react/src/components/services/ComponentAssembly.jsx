import { motion } from 'framer-motion'
import { Package, CheckCircle2, Wrench } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
}

const CAPABILITIES = [
  {
    title: 'Prototype and low-volume assembly',
    desc: 'We assemble small batches (1–100 units) for prototypes and pilot runs. Quick turnaround so you can validate designs before committing to high-volume production.',
  },
  {
    title: 'SMT and through-hole placement',
    desc: 'Surface-mount (SMT) and through-hole components — we work with your BOM and assembly partners to place, solder, and inspect boards to specification.',
  },
  {
    title: 'In-circuit testing (ICT) and functional testing',
    desc: 'ICT verifies component presence and basic connectivity. Functional testing runs your firmware and validates behavior. We design test procedures and fixtures.',
  },
  {
    title: 'Enclosure and cable assembly',
    desc: 'We integrate assembled boards into enclosures, add connectors, cables, and labels — delivering a finished unit ready for field deployment.',
  },
  {
    title: 'Production and supply chain support',
    desc: 'For volume production, we coordinate with assembly houses, manage component sourcing, and ensure smooth handoff from prototype to manufacturing.',
  },
  {
    title: 'Quality control and documentation',
    desc: 'Test reports, assembly drawings, traceability — we document everything so you have a clear record for quality audits and field support.',
  },
  {
    title: 'Scaling from prototype to production',
    desc: 'We help you transition from hand-built prototypes to automated assembly — optimizing for volume, cost, and lead time.',
  },
]

export default function ComponentAssembly({ id = 'component' }) {
  return (
    <section id={id} className="py-12 bg-slate-50 scroll-mt-24">
      <div className="max-w-container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Content */}
          <motion.div {...fadeUp}>
            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <Package className="text-gold" size={22} />
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">
              <strong>What it is:</strong> Production is the process of building your electronics into finished,
              test-validated units — PCB assembly, inspection, functional testing, and integration into an enclosure.
              We manage this end-to-end.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              We coordinate with trusted assembly partners and oversee quality, testing, and documentation.
              From a few prototypes to volume production support, we ensure your product is built correctly
              and ready for deployment.
            </p>

            <h3 className="font-heading font-semibold text-navy mb-3 flex items-center gap-2 text-lg">
              <Wrench className="text-gold" size={18} />
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

          {/* Image */}
          <motion.div {...fadeUp} className="lg:sticky lg:top-24">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
              <img
                src="/images/services/component-assembly.png"
                alt="PCB assembly and component integration"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
