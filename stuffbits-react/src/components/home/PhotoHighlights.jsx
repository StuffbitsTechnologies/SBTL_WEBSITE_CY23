import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'

const AUTO_ADVANCE_MS = 5200

export default function PhotoHighlights({ className = '' }) {
  const sectionRef = useRef(null)
  const thumbStripRef = useRef(null)
  const activeThumbRef = useRef(null)
  const dragX = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState(null)
  const [autoplayPaused, setAutoplayPaused] = useState(false)

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : ['6%', '-6%'])

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
      'Image (1).jfif',
      'Image (2).jfif',
      'Image (3).jfif',
      'Image (6).jfif',
      'Image (7).jfif',
      'Image (15).jfif',
      'Image (16).jfif',
      'Image (19).jfif',
      'Image (25).jfif',
      'Image (26).jfif',
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

  const goTo = useCallback((next) => {
    setActiveIndex(((next % items.length) + items.length) % items.length)
  }, [items.length])

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
    if (reduceMotion || autoplayPaused || previewIndex !== null) return
    const id = window.setInterval(goNext, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, autoplayPaused, previewIndex, goNext, activeIndex])

  // keep drag position settled after a swipe
  useEffect(() => {
    const controls = animate(dragX, 0, {
      type: 'spring',
      stiffness: 240,
      damping: 28,
      mass: 1,
    })
    return () => controls.stop()
  }, [activeIndex, dragX])

  // Scroll only the horizontal thumb strip — never use scrollIntoView on thumbs,
  // or the page scroll jumps (e.g. overrides scroll-to-top after navigating home via the logo).
  useEffect(() => {
    const strip = thumbStripRef.current
    const thumb = activeThumbRef.current
    if (!strip || !thumb) return
    const targetLeft =
      thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2
    const maxLeft = Math.max(0, strip.scrollWidth - strip.clientWidth)
    strip.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxLeft)),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [activeIndex, reduceMotion])

  const shownIndex = previewIndex ?? activeIndex

  return (
    <section
      ref={sectionRef}
      className={['relative bg-white', className].filter(Boolean).join(' ')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.header
          className="flex items-end justify-between gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              What&apos;s happening
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              See the latest from StuffBits.
            </p>
          </div>

          <div
            className="hidden sm:flex items-center gap-2"
            role="group"
            aria-label="Carousel navigation"
          >
            <button
              type="button"
              onClick={goPrev}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition"
              aria-label="Previous slide"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition"
              aria-label="Next slide"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </motion.header>

        <div
          className="relative mt-8"
          onMouseEnter={() => setAutoplayPaused(true)}
          onMouseLeave={() => setAutoplayPaused(false)}
        >
          <motion.div
            className="space-y-4 lg:space-y-5"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1], delay: 0.06 }}
          >
            <div className="relative aspect-[4/3] max-h-[min(34.375rem,90vh)] mx-auto w-[90%] max-w-full">
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
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
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={items[shownIndex]?.src}
                      src={items[shownIndex]?.src}
                      alt={items[shownIndex]?.alt ?? 'Highlight'}
                      className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
                      style={{
                        y: parallaxY,
                        scale: reduceMotion ? 1 : 1.08,
                      }}
                      loading="eager"
                      decoding="async"
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(6px)' }}
                      transition={{
                        duration: 0.34,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    />
                  </AnimatePresence>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-[1]" />
              </motion.div>
            </div>

            <div
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-2 sm:p-3"
              onMouseLeave={() => setPreviewIndex(null)}
            >
              <p className="sr-only" id="photo-highlights-thumbs-label">
                Select a photo
              </p>
              <div
                ref={thumbStripRef}
                className="flex gap-2 sm:gap-3 overflow-x-auto px-0.5 pb-1 pt-0.5 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:thin]"
                role="tablist"
                aria-labelledby="photo-highlights-thumbs-label"
              >
                {items.map((it, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <motion.button
                      key={it.src}
                      ref={isActive ? activeThumbRef : null}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => goTo(idx)}
                      onMouseEnter={() => setPreviewIndex(idx)}
                      className={[
                        'relative shrink-0 w-[76px] sm:w-[88px] md:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 bg-slate-100 snap-start transition-colors',
                        isActive
                          ? 'border-slate-900 shadow-md ring-2 ring-slate-900/10'
                          : 'border-slate-200/90 opacity-90 hover:border-slate-300 hover:opacity-100',
                      ].join(' ')}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)' }
                      }
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      aria-label={`Photo ${idx + 1}${isActive ? ', current' : ''}`}
                    >
                      <img
                        src={it.src}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <div
            className="sm:hidden mt-4 flex items-center justify-center gap-2"
            role="group"
            aria-label="Carousel navigation"
          >
            <button
              type="button"
              onClick={goPrev}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition"
              aria-label="Previous slide"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition"
              aria-label="Next slide"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

