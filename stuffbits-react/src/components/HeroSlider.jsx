import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_INTERVAL_MS = 5500

const SLIDES = [
  {
    id: 0,
    tagline: 'Embedded Technology',
    title: 'Custom Embedded Solutions. Built for the Real World.',
    subtitle: 'StuffBits engineers precision hardware, firmware, and PCB solutions for Automotive, Industrial, IoT, and Digital sectors — from prototype to production, worldwide.',
    cta: 'Get a Free Consultation',
    ctaLink: '/contact',
    ctaSecondary: 'View Our Work',
    ctaSecondaryLink: '/portfolio',
    video: '/videos/embedded-iot-hero.mp4',
    durationMs: 10000, // first slide (video) stays longer
  },
  {
    id: 1,
    tagline: 'Automotive',
    title: 'Engineering the Road Ahead',
    subtitle: 'From EV powertrains to connected vehicle platforms — we build the embedded intelligence that drives the next generation of automotive innovation.',
    cta: 'Explore Automotive',
    ctaLink: '/verticals',
    video: '/videos/automotive-embedded-tech.mp4',
    durationMs: 10000,
  },
  {
    id: 2,
    tagline: 'Industrial',
    title: 'The Backbone of Next-Generation Manufacturing',
    subtitle: 'We engineer rugged embedded solutions that connect machines, eliminate downtime, and unlock the full potential of modern manufacturing.',
    cta: 'View Our Work',
    ctaLink: '/portfolio',
    image: '/images/hero/industrial-smart-manufacturing.png',
  },
  {
    id: 3,
    tagline: 'IoT & Connectivity',
    title: 'Every Asset. Always Connected.',
    subtitle: 'We engineer end-to-end IoT solutions — GPS tracking, BLE asset monitoring, and cloud-ready embedded hardware — so your operations run smarter, faster, and without blind spots.',
    cta: 'Explore IoT',
    ctaLink: '/verticals',
    // video: '/videos/iot-video.mp4',
    image: '/images/hero/iot-connectivity.png',
    durationMs: 10000, // IoT slide (video) stays longer
  },
  {
    id: 4,
    tagline: 'Software Development',
    title: 'Digital Products Built to Perform',
    subtitle: 'From sleek web interfaces to robust mobile apps — StuffBits delivers end-to-end software development and maintenance solutions that bring your digital vision to life.',
    cta: 'Explore Software Development',
    ctaLink: '/services#digital',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=85',
  },
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 1.05,
    filter: 'blur(12px) brightness(0.9)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 1.02,
    filter: 'blur(12px) brightness(0.9)',
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1],
    },
  }),
}

// Keep the overall text swap smooth, but animate content more intentionally inside.
const textVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
  },
}

const revealVariants = {
  enter: { opacity: 0, y: 18, filter: 'blur(6px)' },
  center: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1],
      delay,
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(6px)',
    transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
  },
}

const wordVariants = {
  enter: { opacity: 0, y: 22, filter: 'blur(10px)' },
  center: (wordIndex = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.32, 0.72, 0, 1],
      // Base delay staggers the title after the tagline.
      delay: 0.12 + wordIndex * 0.02,
    },
  }),
  exit: { opacity: 0, y: -10, filter: 'blur(8px)', transition: { duration: 0.18 } },
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
    setProgress(0)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % SLIDES.length)
    setProgress(0)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
    setProgress(0)
  }, [])

  const slide = SLIDES[current]
  const intervalMs = slide.durationMs ?? AUTOPLAY_INTERVAL_MS

  useEffect(() => {
    const timer = setInterval(next, intervalMs)
    return () => clearInterval(timer)
  }, [next, intervalMs])

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / intervalMs) * 100)
      setProgress(pct)
    }, 50)
    return () => clearInterval(interval)
  }, [current, intervalMs])

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy -mt-14">
      {/* Slide images - AnimatePresence handles enter/exit animations */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 origin-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Ken Burns / video-like motion effect */}
            <motion.div
              className="absolute inset-[-5%] w-[110%] h-[110%]"
              animate={{
                scale: [1, 1.06, 1],
                x: ['0%', '2%', '0%'],
                y: ['0%', '1%', '0%'],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {slide.video ? (
                <video
                  src={slide.video}
                  poster={slide.image}
                  className="h-full w-full object-cover object-center"
                  autoPlay={!reduceMotion}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              ) : (
                <img
                  src={slide.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  loading={current === 0 ? 'eager' : 'lazy'}
                  fetchPriority={current === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              )}
            </motion.div>
            {/* PDSL-style animated overlay - glowing lines & pulsing elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
              {/* Animated glowing lines - connect points like PDSL */}
              <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M 0 35% Q 25% 30%, 50% 40% T 100% 35%"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="200 400"
                  filter="url(#glow)"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -600 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M 0 65% Q 40% 70%, 80% 60% T 100% 65%"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="150 300"
                  filter="url(#glow)"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: 450 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M 20% 0 L 30% 50% L 20% 100%"
                  fill="none"
                  stroke="rgba(212,175,55,0.3)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="100 200"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -300 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
              {/* Pulsing circles - PDSL-style data flow nodes */}
              {[
                { x: '15%', y: '45%', delay: 0 },
                { x: '35%', y: '30%', delay: 0.5 },
                { x: '55%', y: '55%', delay: 1 },
                { x: '75%', y: '40%', delay: 1.5 },
                { x: '90%', y: '60%', delay: 2 },
                { x: '25%', y: '70%', delay: 0.3 },
                { x: '65%', y: '25%', delay: 1.2 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full border-2 border-gold/60"
                  style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.9, 0.4],
                    boxShadow: ['0 0 8px rgba(212,175,55,0.3)', '0 0 20px rgba(212,175,55,0.6)', '0 0 8px rgba(212,175,55,0.3)'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: pos.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              {/* Floating orb - subtle ambient movement */}
              <motion.div
                className="absolute w-64 h-64 rounded-full bg-gold/5 blur-3xl"
                style={{ right: '10%', top: '30%' }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Subtle gradient - light left tint for text, fades to transparent (not dark) */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/8 to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content overlay - separate AnimatePresence for staggered text animation */}
      <div className="relative z-10 flex min-h-screen items-center pt-20">
        <div className="max-w-container mx-auto px-8 md:px-10 lg:pl-16 w-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-2xl"
            >
              <motion.p
                className="sb-kicker mb-3"
                variants={revealVariants}
                custom={0}
              >
                {slide.tagline}
              </motion.p>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white mb-4 leading-[1.07] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              >
                {slide.title.trim().split(/\s+/).map((word, idx, arr) => (
                  <motion.span
                    // Using word + index keeps keys stable even with repeated words.
                    key={`${word}-${idx}`}
                    className="inline-block"
                    variants={wordVariants}
                    custom={idx}
                  >
                    {word}
                    {idx < arr.length - 1 ? '\u00A0' : ''}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                variants={revealVariants}
                custom={0.45}
              >
                {slide.subtitle}
              </motion.p>
              <motion.div variants={revealVariants} custom={0.6} className="flex flex-wrap gap-4">
                <Link
                  to={slide.ctaLink}
                  className="sb-btn-primary"
                >
                  {slide.cta}
                </Link>
                {slide.ctaSecondary && (
                  <Link
                    to={slide.ctaSecondaryLink}
                    className="sb-btn-secondary"
                  >
                    {slide.ctaSecondary}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-gold hover:text-navy"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-gold hover:text-navy"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* PDSL-style progress bar pagination */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="group flex items-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === current ? (
              <span className="flex h-1 w-16 overflow-hidden rounded-full bg-white/30">
                <span
                  className="h-full rounded-full bg-gold transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </span>
            ) : (
              <span className="h-1 w-4 rounded-full bg-white/50 transition-colors group-hover:bg-white/80" />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
