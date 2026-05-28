import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ProductDetailContent from '../components/products/ProductDetailContent'
import { getProductBySlug } from '../lib/productsData'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : null

  if (!product) {
    return <Navigate to="/products" replace />
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-10 md:py-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-container px-6">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/products"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-gold"
            >
              <ArrowLeft size={18} aria-hidden />
              Back to all products
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-sm text-slate-400"
          >
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="transition-colors hover:text-gold">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{product.name}</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-3 font-heading text-3xl font-bold text-white md:text-4xl"
          >
            {product.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="max-w-2xl text-lg text-slate-300"
          >
            {product.tagline}
          </motion.p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-container px-6">
          <ProductDetailContent product={product} />
        </div>
      </section>
    </div>
  )
}
