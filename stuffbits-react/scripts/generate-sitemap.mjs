import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://stuffbits.in'

const staticRoutes = [
  '/',
  '/about',
  '/team',
  '/services',
  '/services/embedded-hardware',
  '/services/embedded-firmware',
  '/services/component-assembly',
  '/services/it-development',
  '/verticals',
  // Vertical detail slugs are data-driven; add when stable.
  '/portfolio',
  '/careers',
  '/blog',
  '/news-and-events',
  '/contact',
  '/legal',
]

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function getBlogRoutes(repoRoot) {
  const blogsDir = path.join(repoRoot, 'src', 'content', 'blogs')
  const entries = await fs.readdir(blogsDir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => `/blog/${e.name.replace(/\.md$/, '')}`)
}

async function getPortfolioRoutes(repoRoot) {
  const portfolioDataPath = path.join(repoRoot, 'src', 'lib', 'portfolioData.js')
  const mod = await import(`file://${portfolioDataPath}`)
  const ids = (mod.PORTFOLIO_PROJECTS || []).map((p) => p.id).filter(Boolean)
  return ids.map((id) => `/portfolio/${id}`)
}

async function main() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const repoRoot = path.resolve(__dirname, '..')
  const outDir = path.join(repoRoot, 'public')
  const outFile = path.join(outDir, 'sitemap.xml')

  const routes = new Set(staticRoutes)
  ;(await getBlogRoutes(repoRoot)).forEach((r) => routes.add(r))
  ;(await getPortfolioRoutes(repoRoot)).forEach((r) => routes.add(r))

  const urls = Array.from(routes)
    .sort((a, b) => a.localeCompare(b))
    .map((route) => `${SITE_URL}${route === '/' ? '' : route}`)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${escapeXml(u)}</loc></url>`).join('\n') +
    `\n</urlset>\n`

  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(outFile, xml, 'utf8')
  console.log(`Generated ${urls.length} URLs -> ${outFile}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

