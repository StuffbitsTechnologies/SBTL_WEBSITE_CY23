import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { getCategoryStyle } from '../../lib/categoryGradients'

export default function BlogFilter({ search, onSearchChange, category, onCategoryChange, categories }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isAll = cat === 'All'
          const isActive = isAll ? !category : category === cat
          const style = isAll ? null : getCategoryStyle(cat)
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(isAll ? '' : cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? style
                    ? `text-white shadow-md ${style.badge}`
                    : 'bg-navy text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
