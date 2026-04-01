import { useState } from 'react'
import { motion as Motion } from 'framer-motion'

// Client logos from stuffbits.in - same "They trusted us" clients as live site
// Replace 'Client 1', 'Client 2', etc. with actual company names (match logo order 1.png–20.png)
const STUFFBITS_CLIENTS_BASE = 'https://www.stuffbits.in/assets/img/clients'
const CLIENT_LOGOS = [
  // { src: `${STUFFBITS_CLIENTS_BASE}/1.png`, name: 'Essen' },
  { src: `${STUFFBITS_CLIENTS_BASE}/2.png`, name: 'Marjan Machinery' },
  { src: `${STUFFBITS_CLIENTS_BASE}/3.png`, name: 'Process Control Device' },
  { src: `${STUFFBITS_CLIENTS_BASE}/4.png`, name: 'Medister Infection Control Systems PVT LTD' },
  { src: `${STUFFBITS_CLIENTS_BASE}/5.png`, name: 'Medisys' },
  { src: `${STUFFBITS_CLIENTS_BASE}/6.png`, name: 'Sourcewell' },
  { src: `${STUFFBITS_CLIENTS_BASE}/7.png`, name: 'Sprylogic Technologies Ltd.' },
  // { src: `${STUFFBITS_CLIENTS_BASE}/8.png`, name: 'Tacit Industires' },
  { src: `${STUFFBITS_CLIENTS_BASE}/9.png`, name: 'Quantum Energy africa' },
  { src: `${STUFFBITS_CLIENTS_BASE}/10.png`, name: 'Aplab Limited' },
  { src: `${STUFFBITS_CLIENTS_BASE}/11.png`, name: 'Bhoomi Process Management Pvt. Ltd. ' },
  { src: `${STUFFBITS_CLIENTS_BASE}/12.png`, name: 'Clean Weather teach pvt ltd.' },
  { src: `${STUFFBITS_CLIENTS_BASE}/13.png`, name: 'Fauz Mechanics' },
  { src: `${STUFFBITS_CLIENTS_BASE}/14.png`, name: 'Leelavati Automation Pvt. Ltd' },
  { src: `${STUFFBITS_CLIENTS_BASE}/15.png`, name: 'FEV Europe GmbH' },
  { src: `${STUFFBITS_CLIENTS_BASE}/16.png`, name: 'Onward Technologies Limited' },
  { src: `${STUFFBITS_CLIENTS_BASE}/17.png`, name: 'S2 TECHNOLOGY GmbH' },
  { src: `${STUFFBITS_CLIENTS_BASE}/18.png`, name: 'Dwarpaal' },
  { src: `${STUFFBITS_CLIENTS_BASE}/19.png`, name: 'Encardio Rite' },
  { src: `${STUFFBITS_CLIENTS_BASE}/20.png`, name: 'Yelsons India Private Limited' },
  { src: '/images/clients/UrjaNXT_Logo_Login.png', name: 'UrjaNxt Technology' },
]

export default function ClientsTrusted() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]
  const getFallbackSrc = (client) => {
    if (client.fallbackSrc) return client.fallbackSrc
    const match = client.src.match(/(\d+)\.png/)
    return match ? `/images/clients/${match[1]}.png` : '/images/clients/1.png'
  }

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-container mx-auto px-6">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Clients
          </h2>
          <p className="text-slate-600 text-lg">They trusted us</p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <Motion.div
              className="flex shrink-0 gap-12 md:gap-20 px-4 py-12"
              animate={{ x: [0, '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 50,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedLogos.map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="relative flex items-center justify-center w-40 h-20 md:w-48 md:h-24 shrink-0 transition-all duration-300 group"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  title={client.name}
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className="max-h-14 md:max-h-20 w-auto object-contain"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = getFallbackSrc(client)
                    }}
                  />
                  {hoveredIndex === i && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md bg-navy text-white text-sm font-medium whitespace-nowrap shadow-lg z-20 pointer-events-none">
                      {client.name}
                    </div>
                  )}
                </div>
              ))}
            </Motion.div>
          </div>
        </Motion.div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Trusted by 50+ companies worldwide
        </p>
      </div>
    </section>
  )
}
