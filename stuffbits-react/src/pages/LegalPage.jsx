import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Shield, Scale, Cookie, AlertTriangle, Building2 } from 'lucide-react'

const SECTION_NAV = [
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'terms', label: 'Terms of Use', icon: Scale },
  { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
  { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle },
  { id: 'disclosures', label: 'Statutory Disclosures', icon: Building2 },
]

export default function LegalPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return (
    <div>
      {/* Hero */}
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
            <span className="text-gold">Legal</span>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <FileText className="text-gold" size={40} />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Legal &amp; Policies
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 max-w-2xl"
          >
            Privacy, terms of use, cookies, disclaimer, and statutory disclosures for stuffbits.in. Governed by Indian law including DPDPA 2023, IT Act 2000, and IT Rules 2021.
          </motion.p>

          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Legal sections">
            {SECTION_NAV.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 text-slate-300 hover:bg-gold/20 hover:text-gold transition-colors text-sm"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-container mx-auto px-6 py-12 bg-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-0 h-20 md:h-24 bg-navy-gradient z-0 [clip-path:polygon(0%_0%,58%_0%,45%_100%,0%_100%)]"
        />
        <div className="prose max-w-none space-y-16 text-black relative z-10">
          {/* ─── Part I: Privacy Policy ─── */}
          <article id="privacy" className="scroll-mt-24">
            <h2 className="text-2xl font-heading font-bold text-black border-b border-slate-300 pb-3 mb-6 flex items-center gap-2">
              <Shield size={24} className="text-gold" />
              Privacy Policy
            </h2>

            <p className="text-black mb-6">
              StuffBits Technologies (&quot;we&quot;, &quot;us&quot;) operates stuffbits.in. We provide embedded electronics engineering services — hardware design, firmware, PCB layout, IoT solutions, and digital services. This policy describes how we collect, use, and protect your data.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">1. Data Fiduciary</h3>
            <p className="text-black">
              We are the <strong>Data Fiduciary</strong> under the Digital Personal Data Protection Act, 2023 (DPDPA 2023). We determine the purpose and means of processing your personal data.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">2. Data We Collect</h3>
            <p className="text-black">Through this website, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li><strong>Contact form:</strong> Name, email, phone, company, and message — submitted via Google Apps Script to our email for project inquiries and support.</li>
              <li><strong>Careers:</strong> Resume and application details when you apply to roles (e.g. via careers@stuffbits.in). Sensitive personal data, if shared, is processed with consent and in line with applicable rules.</li>
              <li><strong>Technical data:</strong> IP address, browser type, device type, pages visited — for security and site operation.</li>
            </ul>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">3. Your Rights (DPDPA 2023)</h3>
            <p className="text-black">You may:</p>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li>Access and obtain a summary of your personal data</li>
              <li>Request correction or erasure</li>
              <li>Withdraw consent where processing is consent-based</li>
              <li>Raise a grievance (see Grievance Officer below)</li>
            </ul>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">4. Data Retention</h3>
            <p className="text-black">
              We retain data only as long as needed for the stated purpose or as required by law. After that, it is securely deleted or anonymised.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">5. Security</h3>
            <p className="text-black">
              We use reasonable technical and organisational measures to protect your data, including encryption where appropriate, access controls, and secure development practices.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">6. Third-Party Services</h3>
            <p className="text-black">
              We use Google Apps Script (contact form and job listings on Careers) and Google Maps (map display). Their privacy policies apply to data they process. We do not sell your data.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">7. Grievance Officer</h3>
            <p className="text-black">
              For privacy-related complaints or requests, contact our Grievance Officer:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li><strong>Email:</strong> <a href="mailto:contact@stuffbits.in" className="text-gold hover:underline">contact@stuffbits.in</a></li>
              <li><strong>Subject line:</strong> &quot;Privacy / Grievance&quot;</li>
              <li><strong>Address:</strong> 1st Floor, Royal House, Near Gp Pradhan Garden Road, Bhosale Nagar, Hadapsar, Pune 411028, Maharashtra</li>
            </ul>
          </article>

          {/* ─── Part II: Terms of Use ─── */}
          <article id="terms" className="scroll-mt-24">
            <h2 className="text-2xl font-heading font-bold text-black border-b border-slate-300 pb-3 mb-6 flex items-center gap-2">
              <Scale size={24} className="text-gold" />
              Terms of Use
            </h2>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">1. Acceptance</h3>
            <p className="text-black">
              By using stuffbits.in, you agree to these terms. If you do not agree, please do not use the website.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">2. Use of Website</h3>
            <p className="text-black">
              This website is for information about StuffBits Technologies and our services. It is not an e-commerce site. Project inquiries, quotes, and contracts are handled separately and are subject to specific agreements.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">3. Intellectual Property</h3>
            <p className="text-black">
              All content — text, graphics, logos, images — is owned by or licensed to us and protected under the Copyright Act, 1957 and Trade Marks Act, 1999. You may not copy, modify, distribute, or create derivative works without our prior written consent.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">4. Permitted and Prohibited Conduct</h3>
            <p className="text-black"><strong>You agree to:</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li>Use the website only for lawful purposes</li>
              <li>Comply with the Information Technology Act, 2000 and rules thereunder</li>
            </ul>
            <p className="text-black mt-4"><strong>You must not:</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li>Upload or transmit unlawful, defamatory, or infringing content</li>
              <li>Attempt unauthorised access to our systems or networks</li>
            </ul>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">5. Disclaimers</h3>
            <p className="text-black">
              The website and content are provided &quot;as is&quot;. We do not warrant uninterrupted or error-free operation. Technical information on the site is for general awareness and does not constitute legal or professional advice.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">6. Limitation of Liability</h3>
            <p className="text-black">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">7. Governing Law and Disputes</h3>
            <p className="text-black">
              These terms are governed by the laws of India. Disputes shall be resolved by arbitration seated in Pune, Maharashtra, under the Arbitration and Conciliation Act, 1996.
            </p>
          </article>

          {/* ─── Part III: Cookie Policy ─── */}
          <article id="cookies" className="scroll-mt-24">
            <h2 className="text-2xl font-heading font-bold text-black border-b border-slate-300 pb-3 mb-6 flex items-center gap-2">
              <Cookie size={24} className="text-gold" />
              Cookie Policy
            </h2>

            <p className="text-black mb-6">
              We use cookies and similar technologies only where necessary for site operation and to improve your experience.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border border-slate-300 text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="p-3 border-b border-slate-300 font-semibold text-black">Cookie / Technology</th>
                    <th className="p-3 border-b border-slate-300 font-semibold text-black">Purpose</th>
                    <th className="p-3 border-b border-slate-300 font-semibold text-black">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-3 text-black">Session / essential</td>
                    <td className="p-3 text-black">Security, load balancing, basic site operation</td>
                    <td className="p-3 text-black">Session or short-term</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-3 text-black">Google Maps</td>
                    <td className="p-3 text-black">Map display on Contact and Footer</td>
                    <td className="p-3 text-black">As per Google&apos;s policy</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-3 text-black">Third-party embeds</td>
                    <td className="p-3 text-black">News &amp; Events may load LinkedIn or other widgets with their own cookies</td>
                    <td className="p-3 text-black">Per third-party policy</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-black">
              You can manage cookies via your browser settings. Disabling certain cookies may affect site functionality.
            </p>
          </article>

          {/* ─── Part IV: Disclaimer ─── */}
          <article id="disclaimer" className="scroll-mt-24">
            <h2 className="text-2xl font-heading font-bold text-black border-b border-slate-300 pb-3 mb-6 flex items-center gap-2">
              <AlertTriangle size={24} className="text-gold" />
              Disclaimer
            </h2>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">Technical Information</h3>
            <p className="text-black">
              Content about our services — embedded hardware, firmware, PCB design, IoT, and software development — is for general information. Suitability for your application, safety, or regulatory compliance must be verified by you. We do not warrant fitness for any specific purpose.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">Regulatory Compliance</h3>
            <p className="text-black">
              Depending on your product or sector, you may need to comply with WPC (wireless equipment), TEC (telecom equipment), SCOMET (export control), or other regulations. We do not guarantee that any design or deliverable meets all regulatory requirements in all jurisdictions. Obtain your own legal and technical advice.
            </p>
          </article>

          {/* ─── Part V: Statutory Disclosures ─── */}
          <article id="disclosures" className="scroll-mt-24">
            <h2 className="text-2xl font-heading font-bold text-black border-b border-slate-300 pb-3 mb-6 flex items-center gap-2">
              <Building2 size={24} className="text-gold" />
              Statutory Disclosures
            </h2>

            <p className="text-black mb-6">
              In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and applicable law:
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">Company Details</h3>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li><strong>Operating name:</strong> StuffBits Technologies</li>
              <li><strong>Registered address:</strong> 2nd Floor, Royal House, Near Gp Pradhan Garden Road, Bhosale Nagar, Hadapsar, Pune 411028, Maharashtra</li>
              <li><strong>Other office:</strong> WeWork Eleven West, Pancard Club Rd, Baner Gaon, Baner, Pune, Maharashtra 411069</li>
              <li><strong>Contact:</strong> <a href="mailto:contact@stuffbits.in" className="text-gold hover:underline">contact@stuffbits.in</a> | +91 1234567890</li>
              <li><strong>CIN / GSTIN / PAN:</strong> Available on request or as required by law. Update these when publishing to production.</li>
            </ul>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">Grievance Redressal</h3>
            <p className="text-black">
              For complaints relating to content or data protection, contact <a href="mailto:contact@stuffbits.in" className="text-gold hover:underline">contact@stuffbits.in</a> with subject &quot;Grievance&quot;. You may also approach the Data Protection Board of India under DPDPA 2023 when operational.
            </p>

            <h3 className="text-lg font-semibold text-black mt-6 mb-2">Escalation</h3>
            <ul className="list-disc pl-6 space-y-1 text-black">
              <li><strong>CERT-In:</strong> Indian Computer Emergency Response Team — <a href="https://www.cert-in.org.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">cert-in.org.in</a></li>
              <li><strong>Cyber Crime:</strong> National Cyber Crime Helpline <strong>1930</strong></li>
              <li><strong>Consumer Forum:</strong> For consumer disputes under the Consumer Protection Act</li>
            </ul>

            <p className="mt-6 text-slate-600 text-sm">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}. These policies may be updated; the current version will be posted on this page.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
