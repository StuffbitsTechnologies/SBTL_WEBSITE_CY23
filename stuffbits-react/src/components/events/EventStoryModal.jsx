import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Linkedin, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Full-page overlay detail view (corporate event / news pattern).
 */
export default function EventStoryModal({
  open,
  onClose,
  title,
  subtitle,
  category,
  timeLabel,
  image,
  paragraphs = [],
  primaryAction,
  linkedinUrl,
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  const paras = Array.isArray(paragraphs) ? paragraphs : [paragraphs].filter(Boolean)

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-story-title"
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop — PDSL-style dim + blur */}
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-[rgba(9,12,41,0.85)] backdrop-blur-md cursor-default border-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80"
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.85 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero image strip */}
            <div className="relative h-44 sm:h-56 md:h-64 shrink-0 overflow-hidden">
              <img
                src={image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg hover:bg-gold hover:text-navy transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                {category && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold text-navy mb-3">
                    {category}
                  </span>
                )}
                <h2
                  id="event-story-title"
                  className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg"
                >
                  {title}
                </h2>
                {(timeLabel || subtitle) && (
                  <p className="text-slate-200 text-sm mt-2 font-medium">
                    {[timeLabel, subtitle].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 sm:px-10 py-8">
              <div className="prose prose-slate max-w-none">
                {paras.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    className="text-slate-600 leading-relaxed mb-4 last:mb-0 text-base"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-slate-200">
                {primaryAction &&
                  (primaryAction.external ? (
                    <a
                      href={primaryAction.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-gradient text-white font-semibold hover:brightness-110 transition-all"
                    >
                      {primaryAction.label}
                      <ExternalLink size={18} />
                    </a>
                  ) : (
                    <Link
                      to={primaryAction.href}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-gradient text-white font-semibold hover:brightness-110 transition-all"
                    >
                      {primaryAction.label}
                    </Link>
                  ))}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#0A66C2] text-[#0A66C2] font-semibold hover:bg-[#0A66C2] hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                    Open original post
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
