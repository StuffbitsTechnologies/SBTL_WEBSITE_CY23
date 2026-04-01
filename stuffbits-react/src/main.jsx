import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Canonical host redirect: enforce `www` for consistent SEO/canonicals.
// (GitHub Pages cannot do server-side redirects for custom apex -> www.)
if (typeof window !== 'undefined') {
  const CANONICAL_HOST = 'www.stuffbits.in'
  if (window.location.hostname === 'stuffbits.in') {
    const { pathname, search, hash } = window.location
    window.location.replace(`https://${CANONICAL_HOST}${pathname}${search}${hash}`)
  }
}

// GitHub Pages SPA deep-link restore.
// If we landed on `/?p=/contact&q=...&h=...` (from `public/404.html`),
// rewrite the URL back to the intended client-side route before React mounts.
if (typeof window !== 'undefined') {
  const url = new URL(window.location.href)
  const p = url.searchParams.get('p')
  if (p) {
    const q = url.searchParams.get('q') || ''
    const h = url.searchParams.get('h') || ''
    const next = `${p}${q ? `?${q}` : ''}${h ? `#${h}` : ''}`
    window.history.replaceState(null, '', next)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
