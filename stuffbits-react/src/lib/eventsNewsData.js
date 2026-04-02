/**
 * News & Events — StuffBits-only event cards + optional LinkedIn embeds.
 *
 * Canonical company page: StuffBits Tech Solutions Pvt Ltd
 * https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd
 *
 * LinkedIn does not expose a public API to “fetch” company feeds in the browser.
 * For feed UI: VITE_LINKEDIN_EVENTS_FEED_IFRAME_SRC, VITE_ELFSIGHT_LINKEDIN_APP_ID, or LINKEDIN_POST_EMBEDS.
 */

/** Official company LinkedIn (Pvt Ltd) */
export const LINKEDIN_COMPANY_URL =
  // 'https://in.linkedin.com/company/stuffbits-technosolutions-pvt-ltd'
  'https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd/'

/**
 * Featured events — edit titles, images, and CTAs. Shown as large cards on /news-and-events.
 * @type {{ id: string, title: string, dateLabel: string, venue: string, type: string, description: string, image: string, cta: { label: string, href: string, external?: boolean } }[]}
 */
export const STUFFBITS_EVENTS = [
  {
    id: 'e1',
    title: 'Campus hiring & internship drives',
    dateLabel: 'Year-round',
    venue: 'Pune · Remote options',
    type: 'Careers',
    description:
      'We connect with campuses and early-career engineers in embedded systems, firmware, PCB design, and IoT. Explore open roles and internships.',
    image: '/images/hero/embedded-technology.png',
    detail: [
      'StuffBits engages with engineering institutes and early-career talent across embedded systems, firmware, PCB layout, and IoT.',
      'We run campus connects, internship programs, and hiring drives throughout the year. Roles span hardware design, embedded software, validation, and digital services.',
      'If you are a student or recent graduate, check our Careers page for open positions and internship windows.',
    ],
    cta: { label: 'View careers', href: '/careers' },
  },
  {
    id: 'e2',
    title: 'Webinars & tech talks',
    dateLabel: 'Seasonal',
    venue: 'Online',
    type: 'Learning',
    description:
      'Sessions on embedded firmware, hardware bring-up, automotive stacks, and industrial IoT. Dates and registration are announced on LinkedIn.',
    image: '/images/hero/automotive.png',
    detail: [
      'We host and participate in webinars and tech talks on embedded firmware, automotive (including AUTOSAR and EV systems), industrial IoT, and product engineering.',
      'Session dates, registration links, and replays are announced on our LinkedIn company page—follow us so you do not miss upcoming events.',
      'Past themes include EV embedded decisions, smart manufacturing, and hands-on hardware/firmware practice.',
    ],
    cta: { label: 'Follow on LinkedIn', href: LINKEDIN_COMPANY_URL, external: true },
  },
  {
    id: 'e3',
    title: 'Engineering workshops with clients',
    dateLabel: 'Ongoing',
    venue: 'Hadapsar · Baner, Pune',
    type: 'Collaboration',
    description:
      'Design reviews, sprint demos, and integration support for teams building embedded and connected products.',
    image: '/images/services/embedded-hardware-hero.png',
    detail: [
      'We work shoulder-to-shoulder with client teams on architecture, schematic and PCB design, firmware, bring-up, and system integration.',
      'Typical touchpoints include design reviews, sprint demos, test strategy, and factory or field support—aligned to your release milestones.',
      'Reach out via Contact to discuss scope, timeline, and how we can plug into your product roadmap.',
    ],
    cta: { label: 'Start a project', href: '/contact' },
  },
]

/**
 * Native LinkedIn post embeds — iframe `src` only (⋮ → Embed this post).
 * @type {{ id: string, embedSrc: string }[]}
 */
export const LINKEDIN_POST_EMBEDS = []

/** @deprecated use LINKEDIN_COMPANY_URL */
export const LINKEDIN_EVENTS_URL = LINKEDIN_COMPANY_URL

/** @type {{ id: string, title: string, excerpt: string, dateLabel: string, href: string, external?: boolean }[]} */
export const COMPANY_NEWS = [
  {
    id: 'n1',
    title: 'Global engineering partnerships',
    excerpt:
      'We work with product companies worldwide on embedded hardware, firmware, and full product integration—from concept to production.',
    dateLabel: 'Company',
    href: '/about',
    external: false,
  },
  {
    id: 'n2',
    title: 'IIoT and industrial connectivity',
    excerpt: 'How industrial IoT improves visibility, uptime, and data-driven decisions on the plant floor.',
    dateLabel: 'Blog',
    href: '/blog/iiot',
    external: false,
  },
  {
    id: 'n3',
    title: 'AUTOSAR and automotive embedded',
    excerpt: 'Automotive software architecture and embedded practice for on-road and off-road applications.',
    dateLabel: 'Blog',
    href: '/blog/autosar',
    external: false,
  },
]
