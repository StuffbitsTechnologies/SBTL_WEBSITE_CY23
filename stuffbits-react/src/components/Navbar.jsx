import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  Cpu,
  Code2,
  Package,
  Monitor,
  Car,
  Factory,
  Wifi,
  Users,
  Info,
  Newspaper,
  Sparkles,
  Search,
} from 'lucide-react'

const navLinks = [
  // { to: '/', label: 'Home' },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      {
        to: '/services/embedded-hardware',
        label: 'Embedded Hardware',
        desc: 'Hardware design + PCB routing, DFM & fabrication support',
        icon: Cpu,
        iconBg: 'bg-cyan-500/10 group-hover/item:bg-cyan-500/15',
        iconColor: 'text-cyan-600',
      },
      {
        to: '/services/embedded-firmware',
        label: 'Embedded Firmware',
        desc: 'RTOS, AUTOSAR, safety & MISRA-C',
        icon: Code2,
        iconBg: 'bg-emerald-500/10 group-hover/item:bg-emerald-500/15',
        iconColor: 'text-emerald-600',
      },
      {
        to: '/services/component-assembly',
        label: 'Production',
        desc: 'Prototype builds to volume production support',
        icon: Package,
        iconBg: 'bg-amber-500/10 group-hover/item:bg-amber-500/15',
        iconColor: 'text-amber-600',
      },
      {
        to: '/services/it-development',
        label: 'Software Development',
        desc: 'Web, mobile & connected platforms',
        icon: Monitor,
        iconBg: 'bg-blue-500/10 group-hover/item:bg-blue-500/15',
        iconColor: 'text-blue-600',
      },
    ],
  },
  {
    label: 'Verticals',
    to: '/verticals',
    dropdown: [
      {
        to: '/verticals/automotive',
        label: 'Automotive',
        desc: 'Embedded intelligence for mobility',
        icon: Car,
        iconBg: 'bg-rose-500/10 group-hover/item:bg-rose-500/15',
        iconColor: 'text-rose-600',
      },
      {
        to: '/verticals/industrial',
        label: 'Industrial',
        desc: 'Rugged systems for factories & plants',
        icon: Factory,
        iconBg: 'bg-orange-500/10 group-hover/item:bg-orange-500/15',
        iconColor: 'text-orange-600',
      },
      {
        to: '/verticals/iot',
        label: 'IIoT',
        desc: 'Connectivity, telemetry & monitoring',
        icon: Wifi,
        iconBg: 'bg-sky-500/10 group-hover/item:bg-sky-500/15',
        iconColor: 'text-sky-600',
      },
      {
        to: '/verticals/digital-services',
        label: 'Software Development',
        desc: 'Digital products & platforms',
        icon: Monitor,
        iconBg: 'bg-indigo-500/10 group-hover/item:bg-indigo-500/15',
        iconColor: 'text-indigo-600',
      },
    ],
  },
  { to: '/portfolio', label: 'Portfolio' },
  {
    label: 'About',
    dropdown: [
      {
        to: '/about',
        label: 'About Us',
        desc: 'Our story & approach',
        icon: Info,
        iconBg: 'bg-slate-500/10 group-hover/item:bg-slate-500/15',
        iconColor: 'text-slate-600',
      },
      {
        to: '/team',
        label: 'Our Team',
        desc: 'Leadership & team profiles',
        icon: Users,
        iconBg: 'bg-teal-500/10 group-hover/item:bg-teal-500/15',
        iconColor: 'text-teal-600',
      },
    ],
  },
  { to: '/careers', label: 'Careers' },
  {
    label: 'Resources',
    dropdown: [
      {
        to: '/blog',
        label: 'Blog',
        desc: 'Engineering insights & guides',
        icon: Newspaper,
        iconBg: 'bg-fuchsia-500/10 group-hover/item:bg-fuchsia-500/15',
        iconColor: 'text-fuchsia-600',
      },
      {
        to: '/news-and-events',
        label: 'News & Events',
        desc: 'Updates, launches & stories',
        icon: Sparkles,
        iconBg: 'bg-gold/10 group-hover/item:bg-gold/15',
        iconColor: 'text-gold',
      },
    ],
  },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const closeDropdownTimerRef = useRef(null)
  const [isOverHero, setIsOverHero] = useState(() =>
    typeof window !== 'undefined' &&
    window.location.pathname === '/' &&
    window.scrollY < window.innerHeight
  )
  const [navSearch, setNavSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const submitNavSearch = (e) => {
    e.preventDefault()
    const q = navSearch.trim()
    navigate(q ? `/blog?search=${encodeURIComponent(q)}` : '/blog')
    setMobileOpen(false)
  }

  useEffect(() => {
    const checkScroll = () => {
      if (location.pathname !== '/') {
        setIsOverHero(false)
        return
      }
      setIsOverHero(window.scrollY < window.innerHeight)
    }
    checkScroll()
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [location.pathname])

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to))
  const isAboutSection = () => location.pathname === '/about' || location.pathname === '/team'
  const isServicesSection = () => location.pathname.startsWith('/services')
  const isVerticalsSection = () => location.pathname.startsWith('/verticals')
  const isResourcesSection = () =>
    location.pathname.startsWith('/blog') || location.pathname.startsWith('/news-and-events')

  const textClasses = isOverHero ? 'text-white hover:text-gold' : 'text-slate-700 hover:text-gold'
  const activeClasses = 'text-gold border-b-2 border-gold'

  const openDropdownMenu = (label) => {
    if (closeDropdownTimerRef.current) {
      window.clearTimeout(closeDropdownTimerRef.current)
      closeDropdownTimerRef.current = null
    }
    setOpenDropdown(label)
  }

  const scheduleCloseDropdown = () => {
    if (closeDropdownTimerRef.current) window.clearTimeout(closeDropdownTimerRef.current)
    closeDropdownTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null)
    }, 140)
  }

  useEffect(() => {
    return () => {
      if (closeDropdownTimerRef.current) window.clearTimeout(closeDropdownTimerRef.current)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isOverHero ? 'bg-white/10' : 'bg-white/90 shadow-sm'
      }`}
    >
      <nav className="max-w-container mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/icon-1.svg" alt="StuffBits" className="h-6" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="relative group"
              onMouseEnter={() => (item.dropdown ? openDropdownMenu(item.label) : openDropdownMenu(null))}
              onMouseLeave={() => (item.dropdown ? scheduleCloseDropdown() : undefined)}
            >
              {item.dropdown ? (
                item.to ? (
                  <Link
                    to={item.to}
                    className={`px-4 py-1.5 font-medium transition-colors flex items-center gap-1.5 group/btn ${
                      (isAboutSection() && item.label === 'About') ||
                      (isServicesSection() && item.label === 'Services') ||
                      (isVerticalsSection() && item.label === 'Verticals') ||
                      (isResourcesSection() && item.label === 'Resources')
                        ? activeClasses
                        : textClasses
                    }`}
                    onFocus={() => openDropdownMenu(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-300 ease-out group-hover/btn:translate-y-0.5 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-1.5 font-medium transition-colors flex items-center gap-1.5 group/btn ${
                      (isAboutSection() && item.label === 'About') ||
                      (isServicesSection() && item.label === 'Services') ||
                      (isVerticalsSection() && item.label === 'Verticals') ||
                      (isResourcesSection() && item.label === 'Resources')
                        ? activeClasses
                        : textClasses
                    }`}
                    onFocus={() => openDropdownMenu(item.label)}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-300 ease-out group-hover/btn:translate-y-0.5 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive: active }) =>
                    `px-4 py-1.5 font-medium transition-colors block ${active ? activeClasses : textClasses}`
                  }
                >
                  {item.label}
                </NavLink>
              )}
              {item.dropdown && openDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-3 w-[22rem] p-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200"
                  onMouseEnter={() => openDropdownMenu(item.label)}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  {item.dropdown.map((d) => {
                    const Icon = d.icon
                    const iconBg = d.iconBg ?? 'bg-gold/10 group-hover/item:bg-gold/20'
                    const iconColor = d.iconColor ?? 'text-gold'
                    return (
                      <Link
                        key={d.label}
                        to={d.to}
                        className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {Icon && (
                          <span
                            className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${iconBg}`}
                          >
                            <Icon size={18} className={iconColor} />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block text-[0.95rem] font-semibold leading-5 text-navy group-hover/item:text-gold transition-colors">
                            {d.label}
                          </span>
                          {d.desc && (
                            <span className="block text-[0.82rem] text-slate-500 leading-snug mt-0.5">
                              {d.desc}
                            </span>
                          )}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex sb-btn-primary px-5 py-2 rounded-xl"
        >
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${isOverHero ? 'text-white' : 'text-slate-700'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-14 left-0 right-0 bg-white border-t border-slate-200 shadow-lg max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <ul className="px-6 py-4 space-y-1">
            {navLinks.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  <div className="py-2">
                    {item.to ? (
                      <Link
                        to={item.to}
                        className={`block font-medium mb-2 ${isActive(item.to) ? 'text-gold' : 'text-slate-700 hover:text-gold'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p className="font-medium text-slate-700 mb-2">{item.label}</p>
                    )}
                    <ul className="pl-4 space-y-1">
                      {item.dropdown.map((d) => {
                        const Icon = d.icon
                        return (
                          <li key={d.label}>
                            <Link
                              to={d.to}
                              className="flex items-center gap-3 py-1 text-slate-600 hover:text-gold"
                              onClick={() => setMobileOpen(false)}
                            >
                              {Icon && <Icon size={18} className="text-gold shrink-0" />}
                              {d.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`block py-2 font-medium ${isActive(item.to) ? 'text-gold' : 'text-slate-700 hover:text-gold'}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-4">
              <form onSubmit={submitNavSearch} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="search"
                    placeholder="Search posts..."
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="block w-full py-3 text-center bg-gold text-navy font-semibold rounded hover:bg-gold-light transition-colors"
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
