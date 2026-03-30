import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import { getCategoryStyle } from '../../lib/categoryGradients'

export default function BlogCard({ post, index = 0 }) {
  const { slug, data } = post
  const style = getCategoryStyle(data.category)
  const cover = data.coverImage || '/images/hero/embedded-technology.png'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/blog/${slug}`}
        className={`group block h-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${style.border}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${style.card} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md ${style.badge}`}>
            {data.category || 'Blog'}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-heading font-bold text-navy text-lg mb-2 line-clamp-2 group-hover:text-gold transition-colors">
            {data.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
            {data.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <User size={12} />
              {data.author || 'StuffBits Team'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {data.date ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
            </span>
            {data.readTime && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {data.readTime}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
