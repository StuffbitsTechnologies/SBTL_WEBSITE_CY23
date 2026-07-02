import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Gauge } from 'lucide-react'
import { getAllProducts } from '../lib/productsData'

export default function ProductsPage() {
  const products = getAllProducts()

  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-container px-6">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-sm text-slate-400"
          >
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Products</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-xl text-slate-300"
          >
            Production-ready embedded devices for regulated environments — cleanroom monitoring,
            environmental sensing, and BMS-ready field instrumentation.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-container px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block h-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
                >
                  <div className="flex aspect-[16/10] items-center justify-center border-b border-slate-100 bg-white p-6">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.imageAlt || product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <Gauge className="text-gold/40" size={48} aria-hidden />
                    )}
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="mb-3 font-heading text-xl font-bold text-navy transition-colors group-hover:text-gold">
                      {product.name}
                    </h2>
                    <p className="mb-1 text-sm font-medium text-gold">{product.tagline}</p>
                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                      {product.cardSummary || product.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {product.features.slice(0, 4).map((f) => (
                        <span
                          key={f}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-all group-hover:gap-2">
                      View product <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-navy px-8 py-14 text-center md:px-14 md:py-16"
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
              Need a Custom Product?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-slate-300">
              We design and build embedded hardware and firmware for your environment — from
              concept through production.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 font-semibold text-navy transition-colors hover:bg-gold-light"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
