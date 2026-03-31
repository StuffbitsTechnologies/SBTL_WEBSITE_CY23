const PORTFOLIO_RE = /\/images\/portfolio\/(\d+)\.jpg$/i

export function getPortfolioImageSources(imagePath) {
  const m = String(imagePath || '').match(PORTFOLIO_RE)
  if (!m) {
    return {
      src: imagePath,
      srcSet: undefined,
      width: undefined,
      height: undefined,
      sizes: undefined,
    }
  }

  const id = m[1]
  const base = `/images/portfolio-hd/${id}`

  // Use the 1200px asset as the default `src` to ensure crispness on most screens.
  // Provide 800/1200/1600 via srcSet for responsive selection.
  return {
    src: `${base}-1200.jpg`,
    srcSet: `${base}-800.jpg 800w, ${base}-1200.jpg 1200w, ${base}-1600.jpg 1600w`,
    width: 1200,
    height: 900,
    // Grid cards are 4-col at xl (~320px wide), 3-col at lg (~340px), 2-col at sm (~360px), full width on mobile.
    sizes:
      '(min-width: 1280px) 320px, (min-width: 1024px) 340px, (min-width: 640px) 360px, 92vw',
  }
}

