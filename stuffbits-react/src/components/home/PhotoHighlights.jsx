import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTO_ADVANCE_MS = 2200

export default function PhotoHighlights({ className = '' }) {
  const dragX = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const items = useMemo(() => {
    const filenames = [
      'IMG_5874.JPG',
      'IMG_5877.JPG',
      'IMG_5881.JPG',
      'IMG_5924.JPG',
      'IMG_5926.JPG',
      'IMG_5927.JPG',
      'IMG_5929.JPG',
      'IMG_5963.JPG',
      'IMG_5988.JPG',
      'IMG_5999.JPG',
      'Image (2).jfif',
      'Image (3).jfif',
      'Image (6).jfif',
      'Image (15).jfif',
      'Image (16).jfif',
      'Image (19).jfif',
      'Image (25).jfif',
      'Image (37).jfif',
      'Image (38).jfif',
      'Image (40).jfif',
      'Image (44).jfif',
      'Image (45).jfif',
      'Image (47).jfif',
      'Image (61).jfif',
      'Image (62).jfif',
    ]

    return filenames.map((name, i) => {
      const base = {
        src: `/images/highlights/${encodeURIComponent(name)}`,
        alt: `StuffBits highlights photo ${i + 1}`,
      }
      if (i === 0) {
        return {
          ...base,
          title: 'Automation Expo 2025 — team moments',
          subtitle: 'A glimpse of our presence, demos, and customer conversations at the expo.',
          ctaLabel: 'View gallery',
          href: '/about',
        }
      }
      return base
    })
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev - 1
      return ((next % items.length) + items.length) % items.length
    })
  }, [items.length])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (reduceMotion || autoplayPaused) return
    const id = window.setInterval(goNext, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, autoplayPaused, goNext])

  useEffect(() => {
    const controls = animate(dragX, 0, {
      type: 'spring',
      stiffness: 240,
      damping: 28,
      mass: 1,
    })
    return () => controls.stop()
  }, [activeIndex, dragX])

  const current = items[activeIndex]

  return (
    <section
      className={['relative bg-white', className].filter(Boolean).join(' ')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.header
          className="text-center sm:text-left"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            What&apos;s happening
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto sm:mx-0">
            See the latest from StuffBits.
          </p>
        </motion.header>

        <div
          className="relative mt-8"
          onMouseEnter={() => setAutoplayPaused(true)}
          onMouseLeave={() => setAutoplayPaused(false)}
        >
          <motion.div
            className="relative aspect-[4/3] max-h-[min(34.375rem,90vh)] mx-auto w-full max-w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1], delay: 0.06 }}
          >
            <motion.div
              className="absolute inset-0 z-0 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.06}
              dragMomentum={false}
              style={{ x: dragX }}
              onDragEnd={(_e, info) => {
                const movedEnough = Math.abs(info.offset.x) > 90
                if (!movedEnough) return
                if (info.offset.x < 0) goNext()
                else goPrev()
              }}
            >
              <div className="absolute inset-0 overflow-hidden bg-slate-900">
                <AnimatePresence initial={false} mode="sync">
                  <motion.img
                    key={current?.src}
                    src={current?.src}
                    alt={current?.alt ?? 'Highlight'}
                    className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
                    style={{
                      scale: reduceMotion ? 1 : 1.02,
                    }}
                    loading="eager"
                    decoding="async"
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  />
                </AnimatePresence>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-[1]" />
            </motion.div>

            <div
              className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 sm:px-3"
              role="group"
              aria-label="Carousel navigation"
            >
              <button
                type="button"
                onClick={goPrev}
                className="pointer-events-auto flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="pointer-events-auto flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
