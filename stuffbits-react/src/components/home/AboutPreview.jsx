import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Layers, Shield } from 'lucide-react'


export default function AboutPreview() {
  return (
    <section id="about" className="sb-section bg-white relative overflow-hidden">
      {/* <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-20 md:h-24 bg-navy z-0 [clip-path:polygon(0%_0%,58%_0%,45%_100%,0%_100%)]"
      /> */}
      <div className="sb-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <p className="sb-kicker mb-3">About StuffBits</p>
            <h2 className="sb-h2 mb-6">Who We Are</h2>
            <p className="sb-lead mb-6">
              Great products are built on great engineering. That's where StuffBits comes in.
            </p>
            <p className="sb-lead mb-6">
              We are an embedded electronics engineering firm with a proven track record across Automotive, Industrial, Pharmaceutical, and IoT sectors. From PCB design and firmware development to protocol integration and connected device deployment — we deliver the full embedded stack, so you can focus on your product, not the complexity behind it.
            </p>
            <p className="sb-lead mb-8">
              Whether you are validating a prototype or scaling to production, StuffBits brings deep technical expertise, structured delivery, and a commitment to production-grade quality that moves your project forward — on time and to specification.
            </p>
           
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
            >
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet="/images/highlights/Image%20(3).jfif"
                  />
                  <img
                    src="/images/highlights/Image%20(3).jfif"
                    alt="Stuffbits team at an event booth"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
