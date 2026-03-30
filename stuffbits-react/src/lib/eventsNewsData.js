/**
 * News & Events — StuffBits-only event cards + optional LinkedIn embeds.
 *
 * Canonical company page: StuffBits Tech Solutions Pvt Ltd
 * https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd
 *
 * LinkedIn does not expose a public API to “fetch” company feeds in the browser.
 * LINKEDIN_PAGE_UPDATES = manually synced highlights (edit when you post).
 * For auto-updates: VITE_LINKEDIN_EVENTS_FEED_IFRAME_SRC or LINKEDIN_POST_EMBEDS.
 */

/** Official company LinkedIn (Pvt Ltd) */
export const LINKEDIN_COMPANY_URL =
  'https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd'

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

/**
 * Recent public updates — each needs image + detail for on-page story modal.
 * @type {{ id: string, category: string, timeLabel: string, title: string, excerpt: string, image: string, detail: string[] }[]}
 */
export const LINKEDIN_PAGE_UPDATES = [
  {
    id: 'u1',
    category: 'Culture',
    timeLabel: 'Recent',
    title: 'Happy Holi',
    image: '/images/services/component-assembly.png',
    excerpt:
      'Wishing everyone a colourful Holi — positivity, joy, and teamwork at work and beyond.',
    detail: [
      'We celebrated Holi with the StuffBits team—colour, laughter, and a reminder that great engineering is built on trust and collaboration.',
      'Moments like these keep our culture inclusive and energised as we take on complex hardware and firmware challenges together.',
    ],
  },
  {
    id: 'u2',
    category: 'Well-being',
    timeLabel: 'Recent',
    title: 'Workplace health check-up camp',
    image: '/images/about/team-data-center.png',
    excerpt:
      'Employee health matters. Thank you to Healthians and everyone who joined our on-site health camp.',
    detail: [
      'We organised a health check-up camp at our workplace with support from Healthians. A healthy team is core to sustainable delivery and focus.',
      'Thank you to everyone who participated and to our partners for a smooth camp experience.',
    ],
  },
  {
    id: 'u3',
    category: 'Team',
    timeLabel: 'Recent',
    title: 'Welcome new engineers',
    image: '/images/hero/embedded-technology.png',
    excerpt:
      'Welcoming Shubham Thete (Junior Software Engineer) and Vijay Morbale (Junior Embedded Engineer) to the team.',
    detail: [
      'We welcomed Shubham Thete as Junior Software Engineer and Vijay Morbale as Junior Embedded Engineer.',
      'Their skills and enthusiasm strengthen our firmware, software, and hardware practices. We are excited to grow together on upcoming programs.',
    ],
  },
  {
    id: 'u4',
    category: 'Learning',
    timeLabel: 'Recent',
    title: 'EV & embedded session with DIYguru',
    image: '/images/hero/automotive.png',
    excerpt:
      'Kumar Sawant on embedded decisions that shape EV quality — session with DIYguru on real-world EV systems.',
    detail: [
      'Our Founder Kumar Sawant led a session on how EV reliability is shaped early in embedded architecture—not only in hardware bring-up.',
      'Hosted with DIYguru, the talk connected EV safety, performance, faster launches, and career paths in embedded and EV engineering.',
    ],
  },
  {
    id: 'u5',
    category: 'Leadership',
    timeLabel: 'Recent',
    title: 'ICT Academy Thought Leaders Talk',
    image: '/images/services/it-development.png',
    excerpt:
      'Kumar Sawant speaking on smart manufacturing careers — Industry 4.0, digital skills, and leadership.',
    detail: [
      'Kumar Sawant joined ICT Academy’s Thought Leaders Talk Series on smart manufacturing careers—technical, digital, and managerial skills for Industry 4.0.',
      'The session explored integrated skill development, digital-first manufacturing mindset, and leadership in a transforming industrial landscape.',
    ],
  },
  {
    id: 'u6',
    category: 'Milestone',
    timeLabel: 'Recent',
    title: 'One year as Private Limited',
    image: '/images/about/team-data-center.png',
    excerpt:
      'Celebrating a year as StuffBits Tech Solutions Pvt Ltd — team outing, togetherness, and momentum ahead.',
    detail: [
      'We marked one year as StuffBits Tech Solutions Pvt Ltd with a team outing—celebrating growth, milestones, and the people behind our delivery.',
      'Recharged and aligned, we are focused on the next phase of embedded product work with clients and partners.',
    ],
  },
  {
    id: 'u7',
    category: 'Hiring',
    timeLabel: 'Recent',
    title: 'Junior Embedded Engineer — Pune',
    image: '/images/services/embedded-firmware.png',
    excerpt:
      '1–3 years embedded experience, work from office Pune. Share your CV at hr@stuffbits.in.',
    detail: [
      'We are hiring a Junior Embedded Engineer (1–3 years) for our Pune office, work from office. Immediate to 15-day joiners preferred.',
      'Share your resume at hr@stuffbits.in. Full details and updates are posted on our LinkedIn company page.',
    ],
  },
]

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
