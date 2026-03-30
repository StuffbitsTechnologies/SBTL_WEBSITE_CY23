import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../lib/portfolioData'
import { getPortfolioImageSources } from '../lib/portfolioImageSources'
import {
  getProjectClientType,
  getProjectImpact,
  getProjectKeyResults,
  getProjectProblem,
  getProjectRecommendedService,
  getProjectSolution,
  getProjectTechStack,
} from '../lib/portfolioProjectContent'

export default function PortfolioProjectPage() {
  const { id } = useParams()
  const project = PORTFOLIO_PROJECTS.find((item) => item.id === id)

  if (!project) return <Navigate to="/portfolio" replace />

  const categoryLabel =
    PORTFOLIO_CATEGORIES.find((c) => c.id === project.category)?.label ?? project.category
  const image = getPortfolioImageSources(project.image)
  const solutionPoints = getProjectSolution(project)
  const keyResults = getProjectKeyResults(project)
  const service = getProjectRecommendedService(project)

  return (
    <div>
      <section className="bg-navy-gradient py-16 relative overflow-hidden">
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
            <Link to="/portfolio" className="hover:text-gold transition-colors">
              Portfolio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{project.title}</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gold text-navy">
              {categoryLabel}
            </span>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200">
              Client Type: {getProjectClientType(project)}
            </span>
          </motion.div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-8">
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={image.sizes}
                  width={image.width}
                  height={image.height}
                  alt={project.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              <article className="space-y-8">
                <section>
                  <h2 className="text-2xl font-heading font-bold text-navy mb-3">Problem</h2>
                  <p className="text-slate-700 leading-relaxed">{getProjectProblem(project)}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-bold text-navy mb-3">Solution</h2>
                  <div className="space-y-3">
                    {solutionPoints.map((point) => (
                      <p key={point} className="text-slate-700 leading-relaxed">
                        {point}
                      </p>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-bold text-navy mb-3">Key Results</h2>
                  <ul className="space-y-2">
                    {keyResults.map((result) => (
                      <li key={result} className="text-slate-700">
                        - {result}
                      </li>
                    ))}
                  </ul>
                </section>
              </article>
            </div>

            <aside className="lg:col-span-2">
              <div className="sticky top-24 bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {getProjectTechStack(project).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-sm font-medium text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-heading font-bold text-navy mb-2">Impact</h3>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">{getProjectImpact(project)}</p>

                <Link
                  to={`/contact?service=${encodeURIComponent(service)}&contactType=${encodeURIComponent('Start a Project')}&project=${encodeURIComponent(project.title)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
                >
                  Request a similar project <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
