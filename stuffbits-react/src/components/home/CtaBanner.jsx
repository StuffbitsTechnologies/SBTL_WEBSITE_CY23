import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section id="contact" className="py-20 bg-navy">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30 px-8 py-14 md:px-14 md:py-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Build?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Whether you need embedded hardware, firmware, PCB design, or IT development — we're here to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              Get a Free Consultation <ArrowRight size={18} />
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
  )
}
