import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Mail, Phone, MessageCircle, MapPin, ExternalLink, Instagram, Facebook } from 'lucide-react'
const FooterMap = lazy(() => import('./FooterMap'))

const SOCIAL_LINKS = [
  {
    href: 'https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/_stuffbits_',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/stuffbits',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://wa.me/911234567890',
    label: 'WhatsApp',
    icon: MessageCircle,
  },
]

export default function Footer() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false)
  const mapSectionRef = useRef(null)

  useEffect(() => {
    if (!mapSectionRef.current || shouldLoadMap) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(mapSectionRef.current)
    return () => observer.disconnect()
  }, [shouldLoadMap])

  return (
    <footer className="bg-navy-gradient text-white">
      <div className="h-1 bg-gold" />
      <div className="max-w-container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-white/100 border border-slate-700 px-3 py-2 mb-5"
            >
              <img src="/icon-1.svg" alt="StuffBits Technologies" className="h-7 opacity-100" />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Embedded electronics solutions — hardware, firmware, PCB design, IoT, and digital services.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-gold hover:text-gold hover:bg-gold/5"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-slate-300 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-gold transition-colors">Our Team</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
              <li><Link to="/verticals" className="hover:text-gold transition-colors">Verticals</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link to="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/news-and-events" className="hover:text-gold transition-colors">News &amp; Events</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="hover:text-gold transition-colors">Legal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li><Link to="/services/embedded-hardware" className="hover:text-gold transition-colors">Embedded Hardware</Link></li>
              <li><Link to="/services/embedded-firmware" className="hover:text-gold transition-colors">Embedded Firmware</Link></li>
              <li><Link to="/services/component-assembly" className="hover:text-gold transition-colors">Production</Link></li>
              <li><Link to="/services/it-development" className="hover:text-gold transition-colors">Software Development</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
            <address className="text-slate-300 text-sm not-italic leading-relaxed space-y-4">
              <p className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-gold/80" />
                <span>Hadapsar, Pune-411028, Maharashtra</span>
              </p>
              {/* <p className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-gold/80" />
                <span>WeWork Eleven West, Pancard Club Rd, Baner Gaon, Baner, Pune, Maharashtra 411069</span>
              </p>
              <p>
                <a href="tel:+911234567890" className="flex items-center gap-3 hover:text-gold transition-colors group">
                  <Phone size={18} className="flex-shrink-0 text-gold/80" />
                  <span>+91 1234567890</span>
                </a>
              </p>
              <p>
                <a href="mailto:contact@stuffbits.in" className="flex items-center gap-3 hover:text-gold transition-colors">
                  <Mail size={18} className="flex-shrink-0 text-gold/80" />
                  <span>contact@stuffbits.in</span>
                </a>
              </p> */}
            </address>
          </div>
        </div>

        {/* Live map with traffic - after address */}
        {/* <div className="mt-12" ref={mapSectionRef}>
          {shouldLoadMap ? (
            <Suspense fallback={<div className="w-full h-64 rounded-lg bg-navy-light/40" aria-hidden />}>
              <FooterMap />
            </Suspense>
          ) : (
            <div className="w-full h-64 rounded-lg bg-navy-light/40 border border-slate-700/60 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShouldLoadMap(true)}
                className="px-4 py-2 rounded-lg bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
              >
                Load Map
              </button>
            </div>
          )}
        </div> */}

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} StuffBits Technologies Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/legal#privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/legal#terms" className="hover:text-gold transition-colors">Terms of Use</Link>
            <Link to="/legal#cookies" className="hover:text-gold transition-colors">Cookie Policy</Link>
            <Link to="/legal#disclaimer" className="hover:text-gold transition-colors">Disclaimer</Link>
            <Link to="/legal#disclosures" className="hover:text-gold transition-colors">Statutory Disclosures</Link>
            <a href="https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-1">
              LinkedIn <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
