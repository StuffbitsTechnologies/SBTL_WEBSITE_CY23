import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Target,
  Eye,
  Award,
  Zap,
  Handshake,
  Lightbulb,
  Shield,
  Leaf,
  Cpu,
  Layout,
  Code2,
  PenTool,
  Wifi,
  CheckCircle2,
} from 'lucide-react'
import AmbientOrbs from '../components/AmbientOrbs'

const CORE_VALUES = [
  {
    icon: Award,
    title: 'Quality',
    description: 'Certified, tested, and field-proven — we hold our deliverables to the highest standards, from PCB design through to final deployment.',
  },
  {
    icon: Zap,
    title: 'Agility',
    description: 'Structured, milestone-driven development that adapts to your timeline — without compromising on reliability or technical rigour.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'We work as an extension of your team — invested in your outcomes, not just the deliverable. Long-term relationships are how we measure success.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'From OTA firmware upgrades to encrypted PKI architectures, we continuously adopt modern technologies to future-proof every solution we build.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Honest timelines, transparent communication, and delivering exactly what we commit to — on every project, without exception.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Embedded systems leave no room for error. We engineer to exact specifications — whether it\'s a fuel dispenser certification or a cleanroom compliance standard.',
  },
]

const CERTIFICATIONS = [
  // { label: 'CDAC Certified', desc: 'Fuel Dispenser Compliance' },
  // { label: 'IP65 Rated', desc: 'Enclosure & Hardware Design' },
  // { label: 'RoHS Compliant', desc: 'Component Selection' },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
}

export default function AboutPage() {
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
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Who We Are</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Who We Are
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl"
          >
            At Stuffbits, we turn complex engineering challenges into reliable, production-ready embedded solutions — from initial circuit design and firmware development to full-scale deployment.
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-0 h-20 md:h-24 bg-navy-gradient z-0 [clip-path:polygon(0%_0%,58%_0%,45%_100%,0%_100%)]"
        />
        <div className="max-w-container mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-8">
                Who We Are
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We engineer the technology that powers the products of tomorrow.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Stuffbits is a specialized embedded electronics engineering firm delivering end-to-end hardware and software solutions — spanning PCB design, firmware development, and full-stack digital applications. We serve clients across the Automotive, Industrial, IoT, and Instrumentation sectors, partnering with product teams who demand more than a service provider — they need a dedicated technical partner invested in their success.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Whether you are bringing a new concept to market, scaling from prototype to production, or resolving a critical engineering challenge, we bring deep domain expertise, a structured development process, and a proven track record of delivering reliable, production-grade solutions — on time and to specification.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Ready to build something exceptional?{' '}
                <Link to="/contact" className="text-gold font-semibold hover:text-gold-light transition-colors">
                  Schedule a free consultation
                </Link>{' '}
                or{' '}
                <Link to="/services" className="text-gold font-semibold hover:text-gold-light transition-colors">
                  explore our services
                </Link>{' '}
                to discover how Stuffbits can accelerate your next project.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <img
                  src="/images/highlights/Image%20(3).jfif"
                  alt="Stuffbits team at an event booth"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Vision & Mission
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The beliefs and commitments that drive every decision we make — from the first schematic to the final deployment.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              {...fadeUp}
              className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <Eye className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-navy mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be a globally recognized leader in providing cutting-edge embedded solutions that empower businesses and individuals to achieve their technological aspirations.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <Target className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-navy mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to design, develop, and deliver innovative embedded systems and software solutions that enhance productivity, efficiency, and connectivity across various industries. We strive to exceed customer expectations by leveraging our expertise in hardware design, firmware development, and system integration to create reliable, scalable, and future-proof solutions. Through our dedication to quality, collaboration, and continuous improvement, we aim to contribute to the advancement of embedded technology and drive positive change in the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Core Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles we hold ourselves accountable to — on every project, with every client, at every stage of delivery.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-xl border border-slate-200 hover:border-gold/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="text-gold" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-10">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
            >
              Meet Our Team <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Certifications & Tools */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-2">
              Standards & Certifications
            </h2>
            <p className="text-slate-600">
              Our solutions are built and verified against the compliance requirements of the industries we serve.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {CERTIFICATIONS.map(({ label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-6 py-3 rounded-lg bg-slate-50 border border-slate-200"
              >
                <CheckCircle2 className="text-gold" size={24} />
                <div>
                  <span className="font-mono font-semibold text-navy">{label}</span>
                  <span className="text-slate-500 text-sm ml-2">— {desc}</span>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-slate-500"
          >
            {[
              { icon: Cpu, label: 'STM32 · U-blox · Quectel' },
              { icon: Code2, label: 'FreeRTOS · Bare Metal C' },
              { icon: Wifi, label: 'CAN Bus · Modbus · MQTT' },
              { icon: PenTool, label: 'Windows Apps · Embedded UI' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon size={18} className="text-gold" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sustainability */}
      {/* <section className="py-16 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
              <Leaf className="text-gold" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-navy mb-2">
                Our Commitment to Sustainability
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We design with responsibility in mind: <strong>RoHS-compliant</strong> components, <strong>energy-efficient firmware</strong> for battery and low-power devices, and adherence to responsible <strong>e-waste practices</strong>. Every design we deliver considers its environmental impact.
              </p>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-20 bg-navy-gradient">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30 px-8 py-14 md:px-14 md:py-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Let's Build Something That Works.
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              Whether you have a fully defined brief or just an idea on a napkin — our engineers are ready to take it from concept to certified, production-ready hardware.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
