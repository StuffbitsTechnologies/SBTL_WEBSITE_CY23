// Vite: glob all .md files and import as raw strings (query appends ?raw to each import)
const blogModules = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function slugFromPath(path) {
  const base = path.split('/').pop() || ''
  return base.replace(/\.md(\?raw)?$/, '')
}

/** Browser-safe frontmatter parse (no Buffer/Node deps). Returns { data, content }. */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const [, front, content] = match
  const data = {}
  for (const line of front.split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
      value = value.slice(1, -1)
    if (value.startsWith('[')) {
      try {
        data[key] = JSON.parse(value)
      } catch {
        data[key] = value
      }
    } else {
      data[key] = value
    }
  }
  return { data, content: content.trim() }
}

/**
 * @returns {Array<{ slug: string, data: object, content: string }>}
 */
export function getAllPosts() {
  const posts = []
  for (const [path, rawOrModule] of Object.entries(blogModules)) {
    const raw = typeof rawOrModule === 'string' ? rawOrModule : rawOrModule?.default
    if (typeof raw !== 'string') continue
    const { data, content } = parseFrontmatter(raw)
    const slug = slugFromPath(path)
    posts.push({
      slug,
      data: { ...data, slug },
      content,
    })
  }
  // Sort by date descending
  posts.sort((a, b) => {
    const d1 = new Date(a.data.date || 0)
    const d2 = new Date(b.data.date || 0)
    return d2 - d1
  })
  return posts
}

/**
 * @param {string} slug
 * @returns {{ slug: string, data: object, content: string } | null}
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}

/**
 * @param {string} slug
 * @param {number} limit
 * @returns {Array<{ slug: string, data: object }>}
 */
export function getRelatedPosts(slug, limit = 3) {
  const all = getAllPosts()
  const current = all.find((p) => p.slug === slug)
  if (!current) return []

  const category = current.data.category
  const related = all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const sameCatA = a.data.category === category ? 1 : 0
      const sameCatB = b.data.category === category ? 1 : 0
      if (sameCatB !== sameCatA) return sameCatB - sameCatA
      return new Date(b.data.date) - new Date(a.data.date)
    })
    .slice(0, limit)
    .map((p) => ({ slug: p.slug, data: p.data }))

  return related
}

/**
 * @returns {string[]} unique categories
 */
export function getCategories() {
  const posts = getAllPosts()
  const cats = new Set(posts.map((p) => p.data.category).filter(Boolean))
  return ['All', ...Array.from(cats).sort()]
}
