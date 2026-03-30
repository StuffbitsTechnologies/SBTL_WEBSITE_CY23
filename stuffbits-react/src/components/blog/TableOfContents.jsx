import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          On this page
        </p>
        <ul className="space-y-1.5">
          {headings.map(({ level, text, id }) => (
            <li
              key={id}
              style={{ paddingLeft: level === 3 ? '1rem' : 0 }}
              className="text-sm"
            >
              <a
                href={`#${id}`}
                className={`block py-1 rounded-md transition-colors ${
                  activeId === id
                    ? 'text-gold font-medium bg-gold/10'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  )
}

export function extractHeadings(markdown) {
  const lines = markdown.split('\n')
  const headings = []
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)
    if (h2) headings.push({ level: 2, text: h2[1].trim(), id: slugify(h2[1]) })
    if (h3) headings.push({ level: 3, text: h3[1].trim(), id: slugify(h3[1]) })
  }
  return headings
}

export { slugify }
