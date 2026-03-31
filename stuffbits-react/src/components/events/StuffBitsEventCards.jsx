import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Calendar, MapPin, ArrowRight } from 'lucide-react'
// import { STUFFBITS_EVENTS } from '../../lib/eventsNewsData'
import EventStoryModal from './EventStoryModal'

const headerFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
}

const gridItem = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 24, stiffness: 260 },
  },
}

export default function StuffBitsEventCards() {
  const [active, setActive] = useState(null)

  return (
    // <section className="py-14 md:py-20 bg-slate-100">
      <EventStoryModal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title}
        category={active?.type}
        subtitle={active ? `${active.dateLabel} · ${active.venue}` : ''}
        image={active?.image}
        paragraphs={active?.detail || []}
        primaryAction={
          active?.cta
            ? { label: active.cta.label, href: active.cta.href, external: active.cta.external }
            : null
        }
      />
    // </section>
  )
}
