import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://www.stuffbits.in'
const DEFAULT_OG_IMAGE = `${SITE_URL}/Company_logo1.png`

const DEFAULT_SEO = {
  title: 'StuffBits Technologies | Embedded Electronics & IoT Solutions',
  description:
    'StuffBits Technologies delivers embedded hardware, firmware, PCB design, IoT connectivity, and software development services for automotive, industrial, and connected products.',
  type: 'website',
}

const ROUTE_SEO = [
  {
    match: (path) => path === '/',
    title: 'StuffBits Technologies | Embedded Electronics & IoT Solutions',
    description:
      'End-to-end embedded engineering for hardware, firmware, PCB, and connected digital platforms.',
  },
  {
    match: (path) => path.startsWith('/services'),
    title: 'Services | StuffBits Technologies',
    description:
      'Explore StuffBits services: embedded hardware, embedded firmware, production, and software development.',
  },
  {
    match: (path) => path.startsWith('/verticals'),
    title: 'Industries | StuffBits Technologies',
    description:
      'Embedded and software engineering solutions for automotive, industrial, IIoT, and digital product teams.',
  },
  {
    match: (path) => path === '/about' || path === '/team',
    title: 'About StuffBits | Engineering Team and Company',
    description:
      'Learn about StuffBits Technologies, our engineering approach, and the team building reliable embedded systems.',
  },
  {
    match: (path) => path.startsWith('/blog'),
    title: 'Blog | StuffBits Technologies',
    description:
      'Read StuffBits insights on embedded systems, firmware, IoT, automotive software, and industrial technology.',
    type: 'article',
  },
  {
    match: (path) => path === '/contact',
    title: 'Contact StuffBits | Start Your Project',
    description:
      'Contact StuffBits Technologies for embedded product development, firmware, PCB design, and software services.',
  },
  {
    match: (path) => path.startsWith('/portfolio/'),
    title: 'Project Case Study | StuffBits Technologies',
    description:
      'Explore detailed StuffBits project case studies with client context, solution approach, technology stack, and measurable outcomes.',
    type: 'article',
  },
]

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StuffBits Technologies Pvt. Ltd.',
  url: SITE_URL,
  logo: `${SITE_URL}/Company_logo1.png`,
  email: 'contact@stuffbits.in',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-1234567890',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      '2nd Floor, Royal House, Near Gp Pradhan Garden Road, Bhosale Nagar, Hadapsar',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411028',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/stuffbits-technosolutions-pvt-ltd',
    'https://www.instagram.com/_stuffbits_',
    'https://www.facebook.com/stuffbits.technologies',
  ],
}

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    document.head.appendChild(node)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value)
  })
}

function upsertCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export default function SeoManager() {
  const { pathname } = useLocation()

  const routeSeo = useMemo(
    () => ROUTE_SEO.find((item) => item.match(pathname)) ?? DEFAULT_SEO,
    [pathname]
  )

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname}`
    const title = routeSeo.title || DEFAULT_SEO.title
    const description = routeSeo.description || DEFAULT_SEO.description
    const type = routeSeo.type || DEFAULT_SEO.type

    document.title = title
    upsertCanonical(canonicalUrl)

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' })

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: DEFAULT_OG_IMAGE,
    })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: DEFAULT_OG_IMAGE,
    })

    let schema = document.getElementById('organization-schema')
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'organization-schema'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify(ORGANIZATION_SCHEMA)
  }, [pathname, routeSeo])

  return null
}
