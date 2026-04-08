import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { LINKEDIN_POST_EMBEDS, LINKEDIN_COMPANY_URL } from '../../lib/eventsNewsData'

const FEED_IFRAME_SRC = import.meta.env.VITE_LINKEDIN_EVENTS_FEED_IFRAME_SRC?.trim() || ''
const FEED_IFRAME_HEIGHT = Number(import.meta.env.VITE_LINKEDIN_EVENTS_FEED_IFRAME_HEIGHT) || 920
const ELFSIGHT_APP_ID = import.meta.env.VITE_ELFSIGHT_LINKEDIN_APP_ID?.trim() || ''

function ElfsightFeed({ appId }) {
  useEffect(() => {
    if (!appId) return
    const src = 'https://elfsightcdn.com/platform.js'
    if (document.querySelector(`script[src="${src}"]`)) return
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
  }, [appId])

  return (
    <div
      className={`elfsight-app-${appId} rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm min-h-[400px]`}
    />
  )
}

function PostEmbedCard({ embedSrc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="flex justify-center"
    >
      <div className="w-full max-w-[504px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <iframe
          src={embedSrc}
          title="LinkedIn post"
          height={598}
          width={504}
          className="w-full max-w-full border-0"
          style={{ maxWidth: '100%', minHeight: 420 }}
          loading={index < 2 ? 'eager' : 'lazy'}
          allowFullScreen
        />
      </div>
    </motion.div>
  )
}

export default function LinkedInEventsSection() {
  const hasFeedIframe = Boolean(FEED_IFRAME_SRC)
  const hasElfsight = Boolean(ELFSIGHT_APP_ID)
  const postEmbeds = LINKEDIN_POST_EMBEDS.filter((p) => p?.embedSrc?.includes('linkedin.com/embed'))
  const hasAnyEmbed = hasFeedIframe || hasElfsight || postEmbeds.length > 0

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-start justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            >
              <Linkedin className="text-[#0A66C2]" size={36} aria-hidden />
            </motion.div>
            <div>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-navy tracking-tight">
                Latest on LinkedIn
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl text-base md:text-lg">
                Tap a card for the full story—then open LinkedIn for the original post.
              </p>
            </div>
          </div>
          <motion.a
            href={LINKEDIN_COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl shadow-lg shadow-[#0A66C2]/25 hover:bg-[#004182] transition-colors shrink-0"
          >
            <Linkedin size={22} />
            Follow StuffBits
          </motion.a>
        </motion.div>

        {hasFeedIframe && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md mb-10"
          >
            <iframe
              src={FEED_IFRAME_SRC}
              title="LinkedIn company feed"
              className="w-full border-0 block"
              style={{ height: FEED_IFRAME_HEIGHT, minHeight: 560 }}
              loading="lazy"
            />
          </motion.div>
        )}

        {!hasFeedIframe && hasElfsight && (
          <div className="mb-10">
            <ElfsightFeed appId={ELFSIGHT_APP_ID} />
          </div>
        )}

        {!hasFeedIframe && !hasElfsight && postEmbeds.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10">
            {postEmbeds.map((p, i) => (
              <PostEmbedCard key={p.id || i} embedSrc={p.embedSrc} index={i} />
            ))}
          </div>
        )}

        {!hasAnyEmbed && (
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-10 text-center">
            <a
              href={LINKEDIN_COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg"
            >
              <Linkedin size={22} />
              StuffBits on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
