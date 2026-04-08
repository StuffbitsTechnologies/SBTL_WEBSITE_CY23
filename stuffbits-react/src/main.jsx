import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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
