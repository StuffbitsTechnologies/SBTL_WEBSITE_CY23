import { motion } from 'framer-motion'

export default function AmbientOrbs({ tone = 'dark' }) {
  const isDark = tone === 'dark'

  const orbA = isDark ? 'rgba(212,175,55,0.22)' : 'rgba(232,197,71,0.26)'
  const orbB = isDark ? 'rgba(26,35,126,0.30)' : 'rgba(10,102,194,0.22)'
  const orbC = isDark ? 'rgba(124,58,237,0.20)' : 'rgba(124,58,237,0.18)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute rounded-full blur-3xl opacity-70"
        style={{ width: 520, height: 520, backgroundColor: orbA, left: '-10%', top: '-20%' }}
        animate={{ x: [0, 24, 0], y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute rounded-full blur-3xl opacity-60"
        style={{ width: 360, height: 360, backgroundColor: orbB, right: '-10%', top: '10%' }}
        animate={{ x: [0, -18, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute rounded-full blur-3xl opacity-55"
        style={{ width: 300, height: 300, backgroundColor: orbC, left: '35%', bottom: '-25%' }}
        animate={{ x: [0, 14, 0], y: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

