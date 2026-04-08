import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useInView } from 'framer-motion'

const STATS = [
  { value: 50, suffix: '+', label: 'Clients Worldwide' },
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 4, suffix: '+', label: 'Industry Verticals' },
]

function AnimatedNumber({ value, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-navy py-14">
      <div className="max-w-container mx-auto px-6">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-bold text-gold mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="text-slate-400 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}
