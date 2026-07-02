import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import ProductImageGallery from './ProductImageGallery'
import { getProductImages } from '../../lib/productsData'

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-5 sm:px-8">
      <h2 className="font-heading text-xl font-semibold text-navy sm:text-2xl">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
    </div>
  )
}

export default function ProductDetailContent({ product }) {
  const images = getProductImages(product)

  const sectionNav = [
    { id: 'overview', label: 'Overview' },
    product.features?.length ? { id: 'features', label: 'Features' } : null,
    product.applications?.length ? { id: 'applications', label: 'Applications' } : null,
    product.specs?.length ? { id: 'specifications', label: 'Specifications' } : null,
  ].filter(Boolean)

  return (
    <div className="space-y-8">
      <nav
        aria-label="Product sections"
        className="sticky top-14 z-20 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur-md"
      >
        {sectionNav.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-gold/10 hover:text-navy"
          >
            {label}
          </a>
        ))}
      </nav>

      <motion.section
        id="overview"
        {...sectionMotion}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <SectionHeader title="Overview" subtitle={product.tagline} />
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-slate-200 lg:border-b-0 lg:border-r lg:border-slate-200">
            <ProductImageGallery images={images} />
          </div>
          <div className="p-6 sm:p-8">
            <p className="sb-lead mb-4">{product.description}</p>
            {product.paragraphs?.map((para) => (
              <p key={para.slice(0, 48)} className="mb-3 text-sm leading-relaxed text-slate-600">
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.section>

      {product.features?.length > 0 ? (
        <motion.section
          id="features"
          {...sectionMotion}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <SectionHeader
            title="Features"
            subtitle="Core capabilities and operator-facing functionality"
          />
          <ul className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={18} aria-hidden />
                <span className="text-sm leading-relaxed text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      ) : null}

      {product.applications?.length > 0 ? (
        <motion.section
          id="applications"
          {...sectionMotion}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <SectionHeader
            title="Applications"
            subtitle="Industries and environments where this product is deployed"
          />
          <ul className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
            {product.applications.map((app) => (
              <li
                key={app}
                className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-navy shadow-sm transition-colors hover:border-gold/30"
              >
                {app}
              </li>
            ))}
          </ul>
        </motion.section>
      ) : null}

      {product.specs?.length > 0 ? (
        <motion.section
          id="specifications"
          {...sectionMotion}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <SectionHeader
            title="Specifications"
            subtitle="Technical parameters and physical construction"
          />
          <dl className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
            {product.specs.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-medium leading-snug text-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.section>
      ) : null}
    </div>
  )
}
