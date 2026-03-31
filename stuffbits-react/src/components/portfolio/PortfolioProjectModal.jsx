import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PORTFOLIO_CATEGORIES } from '../../lib/portfolioData'
import { getPortfolioImageSources } from '../../lib/portfolioImageSources'

const getCategoryLabel = (id) =>
  PORTFOLIO_CATEGORIES.find((c) => c.id === id)?.label || id

export default function PortfolioProjectModal({
  open,
  onClose,
  project,
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

  if (typeof document === 'undefined' || !project) return null

  const paragraphs = Array.isArray(project.description) ? project.description : [project.description].filter(Boolean)

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-project-title"
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
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
            <div className="relative h-44 sm:h-56 md:h-64 shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
              {(() => {
                const img = getPortfolioImageSources(project.image)
                return (
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(min-width: 768px) 768px, 100vw"
                width={img.width}
                height={img.height}
                alt={project.title}
                loading="eager"
                decoding="async"
                className="sb-portfolio-img w-full h-full object-contain"
              />
                )
              })()}
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
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold text-navy mb-3">
                  {getCategoryLabel(project.category)}
                </span>
                <h2
                  id="portfolio-project-title"
                  className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg"
                >
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 sm:px-10 py-8">
              <div className="prose prose-slate max-w-none">
                {paragraphs.map((p, i) => (
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

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-slate-200">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:brightness-110 transition-all"
                >
                  Discuss a Similar Project
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
