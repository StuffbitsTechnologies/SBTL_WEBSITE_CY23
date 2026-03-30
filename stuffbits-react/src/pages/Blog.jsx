import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllPosts, getCategories } from '../lib/blogData'
import BlogCard from '../components/blog/BlogCard'
import BlogFilter from '../components/blog/BlogFilter'
import AmbientOrbs from '../components/AmbientOrbs'

const allPosts = getAllPosts()
const categories = getCategories()

export default function Blog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const filtered = useMemo(() => {
    let list = allPosts
    if (category) {
      list = list.filter((p) => p.data.category === category)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          (p.data.title || '').toLowerCase().includes(q) ||
          (p.data.excerpt || '').toLowerCase().includes(q) ||
          (p.data.tags || []).some((t) => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [search, category])

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        {/* <AmbientOrbs tone="dark" /> */}
        <div className="max-w-container mx-auto px-6 relative z-10">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-slate-400 mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Blog</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Blog & Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl"
          >
            Latest from our team on embedded systems, IoT, automotive, and industrial technology.
          </motion.p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 bg-slate-50 min-h-[50vh]">
        <div className="max-w-container mx-auto px-6">
          <div className="mb-10">
            <BlogFilter
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />
          </div>

          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-500 text-center py-16"
            >
              No posts match your search or filter. Try a different term or category.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
