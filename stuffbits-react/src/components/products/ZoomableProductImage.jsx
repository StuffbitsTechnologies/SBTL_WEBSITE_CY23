import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ZoomIn, ZoomOut, X, RotateCcw } from 'lucide-react'

const MIN_SCALE = 1
const MAX_SCALE = 3
const SCALE_STEP = 0.25

export default function ZoomableProductImage({
  src,
  alt,
  className = 'h-full w-full object-contain object-center p-6 sm:p-10',
  containerClassName = 'relative flex h-full w-full min-h-[12rem] cursor-zoom-in items-center justify-center',
}) {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const viewportRef = useRef(null)

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, Math.round((s + SCALE_STEP) * 100) / 100))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(MIN_SCALE, Math.round((s - SCALE_STEP) * 100) / 100))
  }, [])

  const resetZoom = useCallback(() => setScale(1), [])

  const close = useCallback(() => {
    setOpen(false)
    setScale(1)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    const el = viewportRef.current
    if (!open || !el) return undefined
    const onWheel = (e) => {
      e.preventDefault()
      if (e.deltaY < 0) zoomIn()
      else zoomOut()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open, zoomIn, zoomOut])

  const percent = Math.round(scale * 100)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${containerClassName} group block w-full border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2`}
        aria-label={`${alt}. Click to zoom`}
      >
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity group-hover:opacity-95`}
          loading="eager"
          decoding="async"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-navy/75 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:opacity-100">
          <ZoomIn size={14} aria-hidden />
          Click to zoom
        </span>
      </button>

      {createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${alt} — zoom view`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex flex-col bg-black/90"
              onClick={close}
            >
              <div
                className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="truncate text-sm text-white/80">{alt}</p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="hidden text-xs text-white/60 sm:inline">{percent}%</span>
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={scale <= MIN_SCALE}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={scale >= MAX_SCALE}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={resetZoom}
                    disabled={scale === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
                    aria-label="Close"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div
                ref={viewportRef}
                className="relative flex min-h-0 flex-1 cursor-zoom-out items-center justify-center overflow-hidden p-4 sm:p-8"
                onClick={close}
              >
                <motion.img
                  src={src}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="max-h-full max-w-full cursor-default select-none object-contain"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  animate={{ scale }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <p
                className="shrink-0 pb-4 text-center text-xs text-white/50"
                onClick={close}
              >
                + / − to zoom · scroll in viewer · click outside image to close
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
