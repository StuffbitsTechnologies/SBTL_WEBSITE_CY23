import { useEffect, useRef } from 'react'

function rand(min, max) {
  return min + Math.random() * (max - min)
}

/** Scrolling waveforms + grid + tape marks — distinct from automotive node mesh. */
export default function IndustrialHeroBackground() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let markers = []

    const waves = [
      { amp: 0.07, freq: 0.012, speed: 0.0011, yN: 0.38, color: 'rgba(205, 160, 70, 0.42)', width: 1.25 },
      { amp: 0.05, freq: 0.018, speed: -0.00085, yN: 0.52, color: 'rgba(180, 120, 55, 0.35)', width: 1 },
      { amp: 0.055, freq: 0.009, speed: 0.00065, yN: 0.66, color: 'rgba(110, 155, 145, 0.32)', width: 1 },
    ]

    function build() {
      markers = Array.from({ length: Math.max(6, Math.floor((W * H) / 140000)) }, () => ({
        x: rand(W * 0.08, W * 0.92),
        phase: rand(0, Math.PI * 2),
        blink: rand(0.4, 1.2),
      }))
    }

    function resize() {
      const { clientWidth, clientHeight } = container
      W = canvas.width = Math.max(1, clientWidth)
      H = canvas.height = Math.max(1, clientHeight)
      build()
    }

    function drawBackground() {
      const g = ctx.createLinearGradient(0, 0, W, H * 0.9)
      g.addColorStop(0, '#0a0d11')
      g.addColorStop(0.5, '#0e141c')
      g.addColorStop(1, '#121a24')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }

    function drawGrid() {
      const stepX = 48
      const stepY = 44
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(180, 155, 110, 0.045)'
      for (let x = 0; x <= W; x += stepX) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y <= H; y += stepY) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }
    }

    function drawWaves(t) {
      const tSec = t * 0.001
      waves.forEach((w) => {
        ctx.beginPath()
        const baseY = H * w.yN
        for (let x = 0; x <= W; x += 3) {
          const phase = x * w.freq + tSec * 1000 * w.speed
          const y =
            baseY +
            Math.sin(phase) * H * w.amp +
            Math.sin(phase * 0.47 + 1.2) * H * w.amp * 0.35
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = w.color
        ctx.lineWidth = w.width
        ctx.stroke()
      })
    }

    function drawTapeMarks(t) {
      const y = H * 0.82
      ctx.strokeStyle = 'rgba(160, 130, 80, 0.12)'
      ctx.lineWidth = 1
      const dash = 10
      const gap = 7
      const scroll = (t * 0.022) % (dash + gap)
      for (let x = -scroll; x < W + 40; x += dash + gap) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + dash, y)
        ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(140, 115, 75, 0.08)'
      for (let x = 0; x < W; x += 120) {
        ctx.beginPath()
        ctx.moveTo(x, y - 6)
        ctx.lineTo(x, y + 6)
        ctx.stroke()
      }
    }

    function drawMarkers(t) {
      const tSec = t * 0.001
      markers.forEach((m) => {
        const a = 0.25 + 0.55 * Math.sin(tSec * m.blink + m.phase) ** 2
        ctx.globalAlpha = a
        ctx.fillStyle = '#d4a84b'
        ctx.fillRect(m.x - 1.5, H * 0.22, 3, 3)
        ctx.fillStyle = '#8b7355'
        ctx.fillRect(m.x - 0.75, H * 0.22 + 6, 1.5, 4)
        ctx.globalAlpha = 1
      })
    }

    function drawVignette() {
      const rg = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.75)
      rg.addColorStop(0, 'rgba(200, 160, 90, 0.04)')
      rg.addColorStop(0.55, 'transparent')
      rg.addColorStop(1, 'rgba(0,0,0,0.22)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, W, H)
    }

    function tick(t) {
      ctx.clearRect(0, 0, W, H)
      drawBackground()
      drawGrid()
      drawWaves(t)
      drawTapeMarks(t)
      drawMarkers(t)
      drawVignette()
      raf = requestAnimationFrame(tick)
    }

    let raf = 0
    const ro = new ResizeObserver(() => resize())

    resize()
    ro.observe(container)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full z-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            rgba(255,255,255,0.012) 1px,
            rgba(255,255,255,0.012) 2px
          )`,
        }}
      />
    </div>
  )
}
