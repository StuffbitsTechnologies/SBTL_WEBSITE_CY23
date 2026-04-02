import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, ArrowRight } from 'lucide-react'
import {
  LINKEDIN_POST_EMBEDS,
  LINKEDIN_COMPANY_URL,
  LINKEDIN_PAGE_UPDATES,
} from '../../lib/eventsNewsData'
import EventStoryModal from './EventStoryModal'

const FEED_IFRAME_SRC = import.meta.env.VITE_LINKEDIN_EVENTS_FEED_IFRAME_SRC?.trim() || ''
const FEED_IFRAME_HEIGHT = Number(import.meta.env.VITE_LINKEDIN_EVENTS_FEED_IFRAME_HEIGHT) || 920
const ELFSIGHT_APP_ID = import.meta.env.VITE_ELFSIGHT_LINKEDIN_APP_ID?.trim() || ''

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const gridItem = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 22, stiffness: 280 },
  },
}

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

function LinkedInImageCard({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      variants={gridItem}
      onClick={() => onOpen(item)}
      className="group relative text-left w-full min-h-[300px] sm:min-h-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/50"
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      <img
        src={item.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/20 opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
      {/* subtle shine on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative h-full min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-7">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-gold text-navy">
            {item.category}
          </span>
          <span className="text-xs text-white/70 font-medium">{item.timeLabel}</span>
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight mb-3 drop-shadow-md group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-white/90 text-[13px] sm:text-sm line-clamp-3 leading-relaxed mb-5">
          {item.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 text-gold font-bold text-xs sm:text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
          Read story
          <ArrowRight size={18} className="shrink-0" />
        </span>
      </div>
    </motion.button>
  )
}

export default function LinkedInEventsSection() {
  const [story, setStory] = useState(null)
  const hasFeedIframe = Boolean(FEED_IFRAME_SRC)
  const hasElfsight = Boolean(ELFSIGHT_APP_ID)
  const postEmbeds = LINKEDIN_POST_EMBEDS.filter((p) => p?.embedSrc?.includes('linkedin.com/embed'))
  const hasAnyEmbed = hasFeedIframe || hasElfsight || postEmbeds.length > 0
  const hasManualHighlights = LINKEDIN_PAGE_UPDATES.length > 0

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

        {hasManualHighlights && (
          <>
            {hasAnyEmbed && (
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-navy">Highlights</h3>
                  <p className="text-slate-600 text-sm md:text-base">
                    Quick highlights we pin here—useful when LinkedIn widgets are delayed.
                  </p>
                </div>
                <a
                  href={LINKEDIN_COMPANY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-navy font-semibold hover:border-gold/50 hover:text-gold transition-colors shrink-0"
                >
                  <Linkedin size={18} />
                  View on LinkedIn
                </a>
              </div>
            )}

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {LINKEDIN_PAGE_UPDATES.map((item, i) => (
                <LinkedInImageCard key={item.id} item={item} index={i} onOpen={setStory} />
              ))}
            </motion.div>

            {!hasAnyEmbed && (
              <div className="flex justify-center mt-10">
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  href={LINKEDIN_COMPANY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:brightness-110 transition-all"
                >
                  Open all posts on LinkedIn
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            )}
          </>
        )}

        {!hasAnyEmbed && LINKEDIN_PAGE_UPDATES.length === 0 && (
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

      <EventStoryModal
        open={Boolean(story)}
        onClose={() => setStory(null)}
        title={story?.title}
        category={story?.category}
        timeLabel={story?.timeLabel}
        image={story?.image}
        paragraphs={story?.detail || []}
      />
    </section>
  )
}
