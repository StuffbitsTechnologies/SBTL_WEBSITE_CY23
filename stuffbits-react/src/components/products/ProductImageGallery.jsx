import { useState } from 'react'
import ZoomableProductImage from './ZoomableProductImage'

/**
 * @param {{ images: { src: string, alt: string, label?: string }[] }} props
 */
export default function ProductImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images?.length) return null

  const active = images[activeIndex] ?? images[0]
  const hasMultiple = images.length > 1

  return (
    <div className="flex h-full min-h-[16rem] flex-col bg-white lg:min-h-[22rem]">
      <div className="relative min-h-[14rem] flex-1 border-b border-slate-100">
        <ZoomableProductImage
          key={active.src}
          src={active.src}
          alt={active.alt}
          containerClassName="relative flex h-full w-full min-h-[14rem] cursor-zoom-in items-center justify-center"
          className="h-full max-h-[20rem] w-full object-contain object-center p-4 sm:max-h-[24rem] sm:p-8"
        />
        {hasMultiple ? (
          <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {active.label ?? `View ${activeIndex + 1} of ${images.length}`}
          </p>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="shrink-0 border-t border-slate-100 bg-slate-50/50 p-3 sm:p-4">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            All views
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {images.map((img, index) => {
              const selected = index === activeIndex
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all sm:h-20 sm:w-20 ${
                    selected
                      ? 'border-gold shadow-md ring-2 ring-gold/25'
                      : 'border-slate-200 opacity-80 hover:border-gold/50 hover:opacity-100'
                  }`}
                  aria-label={img.label || `Show image ${index + 1}`}
                  aria-pressed={selected}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="h-full w-full object-contain p-1"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
