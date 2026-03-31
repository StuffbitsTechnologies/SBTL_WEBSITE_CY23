// Category → gradient classes and badge colors for blog
export const CATEGORY_STYLES = {
  Automotive: {
    badge: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white',
    card: 'from-orange-500/10 to-amber-500/5',
    border: 'hover:border-orange-400/50',
  },
  IoT: {
    badge: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    card: 'from-blue-500/10 to-cyan-500/5',
    border: 'hover:border-blue-400/50',
  },
  Industrial: {
    badge: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    card: 'from-emerald-500/10 to-teal-500/5',
    border: 'hover:border-emerald-400/50',
  },
  'Digital Services': {
    badge: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
    card: 'from-violet-500/10 to-purple-500/5',
    border: 'hover:border-violet-400/50',
  },
  Firmware: {
    badge: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white',
    card: 'from-rose-500/10 to-pink-500/5',
    border: 'hover:border-rose-400/50',
  },
}

const DEFAULT_STYLE = {
  badge: 'bg-gradient-to-r from-gold to-gold-light text-navy',
  card: 'from-gold/10 to-gold/5',
  border: 'hover:border-gold/50',
}

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || DEFAULT_STYLE
}
