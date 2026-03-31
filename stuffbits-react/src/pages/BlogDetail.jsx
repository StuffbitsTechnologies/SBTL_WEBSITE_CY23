import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Highlight, themes } from 'prism-react-renderer'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '../lib/blogData'
import { getCategoryStyle } from '../lib/categoryGradients'
import TableOfContents, { extractHeadings, slugify } from '../components/blog/TableOfContents'
import BlogCard from '../components/blog/BlogCard'

function CodeBlock({ node, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')
  if (match) {
    return (
      <Highlight theme={themes.vsDark} code={code} language={match[1]}>
        {({ className: preClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${preClass} rounded-xl p-4 overflow-x-auto my-4 text-sm`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  }
  return (
    <code className={`rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm ${className || ''}`} {...props}>
      {children}
    </code>
  )
}

function Heading({ level, children, ...props }) {
  const text = typeof children?.[0] === 'string' ? children[0] : ''
  const id = slugify(text)
  const Tag = `h${level}`
  return (
    <Tag id={id} className="scroll-mt-24 font-heading font-bold text-navy" {...props}>
      {children}
    </Tag>
  )
}

export default function BlogDetail() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { data, content } = post
  const headings = extractHeadings(content)
  const style = getCategoryStyle(data.category)
  const cover = data.coverImage || '/images/hero/embedded-technology.png'

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const related = getRelatedPosts(slug, 3)

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden min-h-[420px] md:min-h-[700px] py-20 md:py-28 flex items-end"
        style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-navy/30 pointer-events-none" />
        <div className="max-w-container mx-auto px-6 relative w-full pb-2">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-slate-400 mb-6"
          >
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gold line-clamp-1">{data.title}</span>
          </motion.nav>
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-4 ${style.badge}`}
            >
              {data.category || 'Blog'}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-heading font-bold text-white mb-6"
            >
              {data.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-slate-400 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <User size={16} />
                {data.author || 'StuffBits Team'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                {data.date ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
              </span>
              {data.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {data.readTime}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content + ToC */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_minmax(0,15rem)] gap-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="min-w-0"
            >
              <article className="blog-article max-w-none bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...p }) => <Heading level={2} {...p}>{children}</Heading>,
                    h3: ({ children, ...p }) => <Heading level={3} {...p}>{children}</Heading>,
                    code: ({ node, className, children, ...props }) => (
                      <CodeBlock node={node} className={className} {...props}>{children}</CodeBlock>
                    ),
                    pre: ({ children, ...p }) => <pre className="!bg-slate-900 !text-slate-100 rounded-xl p-4 overflow-x-auto my-4" {...p}>{children}</pre>,
                    a: ({ href, children }) => (
                      <a href={href} className="text-gold hover:text-gold-light underline font-medium">
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="bg-slate-100 border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-navy">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-600">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>

              {/* Prev / Next */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-gold/40 hover:shadow-md transition-all group"
                  >
                    <ChevronLeft className="text-gold flex-shrink-0" size={20} />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Previous</p>
                      <p className="font-semibold text-navy truncate group-hover:text-gold">{prevPost.data.title}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-gold/40 hover:shadow-md transition-all group text-right sm:flex-row-reverse"
                  >
                    <ChevronRight className="text-gold flex-shrink-0" size={20} />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Next</p>
                      <p className="font-semibold text-navy truncate group-hover:text-gold">{nextPost.data.title}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </motion.div>

            {/* ToC - desktop only */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-heading font-bold text-navy mb-8"
            >
              Related Posts
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={{ slug: p.slug, data: p.data }} index={i} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
              >
                View all posts <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
