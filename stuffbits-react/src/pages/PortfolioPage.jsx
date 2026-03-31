import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FolderOpen, ChevronDown, Search } from 'lucide-react'
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../lib/portfolioData'
import { getPortfolioImageSources } from '../lib/portfolioImageSources'
import {
  getProjectImpact,
  getProjectRecommendedService,
  getProjectTechStack,
} from '../lib/portfolioProjectContent'

const INITIAL_SHOW = 8
const LOAD_MORE_COUNT = 8

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsToShow, setItemsToShow] = useState(INITIAL_SHOW)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    return PORTFOLIO_PROJECTS.filter((project) => {
      const matchesCategory = activeFilter === 'all' || project.category === activeFilter
      if (!matchesCategory) return false
      if (!normalizedQuery) return true

      const searchable = [
        project.title,
        project.excerpt,
        ...(Array.isArray(project.description) ? project.description : []),
        ...(Array.isArray(project.tags) ? project.tags : []),
        getProjectImpact(project),
      ]
        .join(' ')
        .toLowerCase()

      return searchable.includes(normalizedQuery)
    })
  }, [activeFilter, searchQuery])

  const displayedProjects = useMemo(
    () => filteredProjects.slice(0, itemsToShow),
    [filteredProjects, itemsToShow]
  )
  const hasMore = filteredProjects.length > itemsToShow

  return (
    <div>
      {/* Page Hero */}
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative">
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
            <span className="text-gold">Portfolio</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl"
          >
            Precision-Built Solutions Across Industries
            Explore our portfolio of embedded and digital systems — rigorously designed, field-deployed, and proven across sectors including energy, manufacturing, logistics, and smart infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 py-4">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-2xl mx-auto mb-4">
            <label htmlFor="portfolio-search" className="sr-only">
              Search projects
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="portfolio-search"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setItemsToShow(INITIAL_SHOW)
                }}
                placeholder="Search by keyword (e.g. pressure, RTOS, automotive)"
                className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id)
                  setItemsToShow(INITIAL_SHOW)
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeFilter === cat.id
                    ? 'bg-gold text-navy shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <FolderOpen className="text-slate-300 mb-4" size={64} />
                <p className="text-slate-500 text-lg">No projects match the current filter and search.</p>
                <button
                  onClick={() => {
                    setActiveFilter('all')
                    setSearchQuery('')
                  }}
                  className="mt-4 text-gold font-medium hover:underline"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              <>
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {displayedProjects.map((project, i) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-gold/40 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center">
                      {(() => {
                        const img = getPortfolioImageSources(project.image)
                        return (
                      <img
                        src={img.src}
                        srcSet={img.srcSet}
                        sizes={img.sizes}
                        width={img.width}
                        height={img.height}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="sb-portfolio-img w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                        )
                      })()}
                      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link
                          to={`/portfolio/${project.id}`}
                          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-gold/90 text-navy">
                        {PORTFOLIO_CATEGORIES.find((c) => c.id === project.category)?.label ?? project.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-gold transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {project.excerpt}
                      </p>
                      <p className="text-sm text-slate-700 mb-3 line-clamp-2">
                        <span className="font-semibold text-navy">Impact:</span> {getProjectImpact(project)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getProjectTechStack(project).slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-1 text-gold font-semibold text-sm hover:gap-2 transition-all"
                      >
                        Read more <ArrowRight size={14} />
                      </Link>
                      <div className="mt-3">
                        <Link
                          to={`/contact?service=${encodeURIComponent(getProjectRecommendedService(project))}&contactType=${encodeURIComponent('Start a Project')}&project=${encodeURIComponent(project.title)}`}
                          className="inline-flex items-center gap-1 text-navy font-medium text-sm hover:text-gold transition-colors"
                        >
                          Build something similar <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setItemsToShow((n) => n + LOAD_MORE_COUNT)}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-navy text-white font-semibold hover:brightness-110 transition-all shadow-lg hover:shadow-xl"
                  >
                    Load More <ChevronDown size={20} />
                  </button>
                </div>
              )}
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-navy px-8 py-14 md:px-14 md:py-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Have a Similar Project in Mind?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              From instrumentation to IoT — we design, develop, and deliver embedded and digital solutions tailored to your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
