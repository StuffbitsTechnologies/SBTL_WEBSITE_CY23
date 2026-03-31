import { useEffect, useRef } from 'react'

/** Figma-style canvas: mid-dark base so UI pops; colorful frames; bottom wash for hero contrast. */
export default function DigitalServicesHeroBackground() {
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
    let layout = {}

    const layerAccent = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ec4899', '#06b6d4', '#f97316', '#6366f1']

    function computeLayout(t = 0) {
      const s = Math.min(W, H) * 0.018
      const sidebarW = Math.max(52, Math.min(W * 0.12, 100))
      const driftX = Math.sin(t * 0.00015) * 4
      const driftY = Math.cos(t * 0.00012) * 3

      const deskW = Math.min(W * 0.46, 560)
      const deskH = Math.min(H * 0.58, deskW * 0.62)
      const deskX = sidebarW + s * 3 + driftX
      const deskY = H * 0.14 + driftY

      const phoneW = Math.max(100, Math.min(W * 0.14, 140))
      const phoneH = Math.min(H * 0.52, phoneW * 2.05)
      const phoneX = Math.min(W - phoneW - s * 2, deskX + deskW + s * 2) + driftX * 0.5
      const phoneY = deskY + (deskH - phoneH) * 0.35 + driftY

      layout = { sidebarW, deskX, deskY, deskW, deskH, phoneX, phoneY, phoneW, phoneH, s }
    }

    function resize() {
      const { clientWidth, clientHeight } = container
      W = canvas.width = Math.max(1, clientWidth)
      H = canvas.height = Math.max(1, clientHeight)
      computeLayout(0)
    }

    function drawBackground() {
      const g = ctx.createLinearGradient(0, 0, W, H)
      g.addColorStop(0, '#1a1733')
      g.addColorStop(0.38, '#1f1a3d')
      g.addColorStop(0.68, '#241835')
      g.addColorStop(1, '#152036')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      const blob1 = ctx.createRadialGradient(W * 0.85, H * 0.2, 0, W * 0.85, H * 0.25, W * 0.45)
      blob1.addColorStop(0, 'rgba(167, 139, 250, 0.28)')
      blob1.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)')
      blob1.addColorStop(1, 'transparent')
      ctx.fillStyle = blob1
      ctx.fillRect(0, 0, W, H)

      const blob2 = ctx.createRadialGradient(0, H * 0.85, 0, 0, H * 0.9, H * 0.55)
      blob2.addColorStop(0, 'rgba(236, 72, 153, 0.18)')
      blob2.addColorStop(1, 'transparent')
      ctx.fillStyle = blob2
      ctx.fillRect(0, 0, W, H)

      const blob3 = ctx.createRadialGradient(W * 0.35, H * 0.5, 0, W * 0.35, H * 0.55, W * 0.35)
      blob3.addColorStop(0, 'rgba(34, 211, 238, 0.14)')
      blob3.addColorStop(1, 'transparent')
      ctx.fillStyle = blob3
      ctx.fillRect(0, 0, W, H)
    }

    function drawFigmaDotGrid() {
      const step = 14
      ctx.fillStyle = 'rgba(226, 232, 240, 0.1)'
      const ox = (layout.sidebarW || 0) + 8
      for (let x = ox; x < W; x += step) {
        for (let y = step; y < H; y += step) {
          ctx.fillRect(x, y, 1.2, 1.2)
        }
      }
    }

    function drawSidebar() {
      const w = layout.sidebarW
      ctx.fillStyle = '#eceff6'
      ctx.fillRect(0, 0, w, H)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.42)'
      ctx.beginPath()
      ctx.moveTo(w, 0)
      ctx.lineTo(w, H)
      ctx.stroke()

      const rowH = 28
      let y = 24
      for (let i = 0; i < 8; i++) {
        const col = layerAccent[i % layerAccent.length]
        ctx.fillStyle = i === 2 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.72)'
        ctx.beginPath()
        ctx.roundRect(10, y, w - 20, 20, 4)
        ctx.fill()
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.roundRect(14, y + 6, 8, 8, 2)
        ctx.fill()
        if (i === 2) {
          ctx.strokeStyle = '#8b5cf6'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.roundRect(10, y, w - 20, 20, 4)
          ctx.stroke()
        }
        y += rowH
      }
    }

    function drawDesktopFrame(t) {
      const { deskX, deskY, deskW, deskH } = layout
      const r = 8
      const chromeH = 38
      const urlH = 28

      ctx.shadowColor = 'rgba(91, 33, 182, 0.12)'
      ctx.shadowBlur = 24
      ctx.shadowOffsetY = 8
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.25)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(deskX, deskY, deskW, deskH, r)
      ctx.fill()
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      const chromeFill = ctx.createLinearGradient(deskX, deskY, deskX + deskW, deskY)
      chromeFill.addColorStop(0, '#eef2ff')
      chromeFill.addColorStop(1, '#f5f3ff')
      ctx.fillStyle = chromeFill
      ctx.beginPath()
      ctx.roundRect(deskX, deskY, deskW, chromeH, r)
      ctx.fill()

      const dots = ['#ff5f57', '#febc2e', '#28c840']
      dots.forEach((c, i) => {
        ctx.fillStyle = c
        ctx.beginPath()
        ctx.arc(deskX + 16 + i * 14, deskY + chromeH * 0.5, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      const urlY = deskY + chromeH + 8
      const urlPad = 10
      ctx.fillStyle = '#f8fafc'
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(deskX + urlPad, urlY, deskW - urlPad * 2, urlH, 4)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#7c3aed'
      ctx.font = `${Math.max(10, deskW * 0.028)}px ui-sans-serif, system-ui, sans-serif`
      ctx.fillText('your-product.com / dashboard', deskX + urlPad + 10, urlY + urlH * 0.62)

      const contentY = urlY + urlH + 14
      const cx = deskX + 14
      const cw = deskW - 28

      const heroGrad = ctx.createLinearGradient(cx, contentY, cx + cw * 0.55, contentY + 36)
      heroGrad.addColorStop(0, '#fda4af')
      heroGrad.addColorStop(0.5, '#c084fc')
      heroGrad.addColorStop(1, '#818cf8')
      ctx.fillStyle = heroGrad
      ctx.beginPath()
      ctx.roundRect(cx, contentY, cw * 0.55, 36, 4)
      ctx.fill()

      ctx.fillStyle = 'rgba(148, 163, 184, 0.55)'
      ctx.beginPath()
      ctx.roundRect(cx, contentY + 46, cw * 0.88, 12, 3)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(cx, contentY + 66, cw * 0.72, 12, 3)
      ctx.fill()

      const cardY = Math.min(contentY + 88, deskY + deskH - 140)
      const gap = 8
      const cardH = Math.min(56, deskY + deskH - cardY - gap - 8)
      const cardW = (cw - gap) / 2
      const cardColors = [
        ['#bfdbfe', '#60a5fa'],
        ['#a7f3d0', '#34d399'],
        ['#fde68a', '#fbbf24'],
        ['#fbcfe8', '#ec4899'],
      ]
      if (cardH > 24) {
        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 2; col++) {
            const idx = row * 2 + col
            const [a, b] = cardColors[idx]
            const cg = ctx.createLinearGradient(
              cx + col * (cardW + gap),
              cardY,
              cx + col * (cardW + gap) + cardW,
              cardY + cardH,
            )
            cg.addColorStop(0, a)
            cg.addColorStop(1, b)
            ctx.fillStyle = cg
            ctx.beginPath()
            ctx.roundRect(cx + col * (cardW + gap), cardY + row * (cardH + gap), cardW, cardH, 6)
            ctx.fill()
            ctx.strokeStyle = 'rgba(255,255,255,0.6)'
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      const selPad = 6
      const sx = cx - selPad
      const sy = contentY - selPad
      const sw = cw * 0.55 + selPad * 2
      const sh = 36 + selPad * 2
      const pulse = 0.75 + 0.25 * Math.sin(t * 0.003)
      ctx.strokeStyle = `rgba(151, 71, 255, ${0.75 * pulse})`
      ctx.lineWidth = 2
      ctx.setLineDash([7, 5])
      ctx.lineDashOffset = -(t * 0.045)
      ctx.strokeRect(sx, sy, sw, sh)
      ctx.setLineDash([])
      ctx.lineDashOffset = 0

      const hx = sx + sw
      const hy = sy + sh
      const handle = 5
      ;[
        [hx, hy],
        [hx - sw, hy],
        [sx, hy - sh],
        [hx, hy - sh],
      ].forEach(([px, py]) => {
        ctx.fillStyle = '#ffffff'
        ctx.strokeStyle = '#9747ff'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.rect(px - 2.5, py - 2.5, handle, handle)
        ctx.fill()
        ctx.stroke()
      })
    }

    function drawPhoneFrame() {
      const { phoneX, phoneY, phoneW, phoneH } = layout
      const r = 18

      ctx.shadowColor = 'rgba(236, 72, 153, 0.2)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetY = 6
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(phoneX, phoneY, phoneW, phoneH, r)
      ctx.fill()
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      const barH = 22
      const barGrad = ctx.createLinearGradient(phoneX, phoneY, phoneX + phoneW, phoneY)
      barGrad.addColorStop(0, '#ddd6fe')
      barGrad.addColorStop(1, '#fbcfe8')
      ctx.fillStyle = barGrad
      ctx.beginPath()
      ctx.roundRect(phoneX + 2, phoneY + 2, phoneW - 4, barH, 6)
      ctx.fill()

      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)'
      const notchW = phoneW * 0.28
      ctx.beginPath()
      ctx.roundRect(phoneX + (phoneW - notchW) / 2, phoneY + 6, notchW, 5, 2)
      ctx.fill()

      let y = phoneY + barH + 12
      const px = phoneX + 12
      const pw = phoneW - 24
      const rowColors = ['#dbeafe', '#fef3c7', '#d1fae5', '#fce7f3', '#e0e7ff']
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = rowColors[i]
        ctx.strokeStyle = 'rgba(255,255,255,0.85)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(px, y, pw, 40, 6)
        ctx.fill()
        ctx.stroke()
        y += 48
      }
    }

    function drawTopTabs() {
      const tabY = 10
      const tabStyle = [
        { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
        { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
        { bg: '#fce7f3', text: '#be185d', border: '#f9a8d4' },
      ]
      let x = layout.sidebarW + layout.s * 2
      tabStyle.forEach((style, i) => {
        const tw = 68
        ctx.fillStyle = style.bg
        ctx.strokeStyle = style.border
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(x, tabY, tw, 26, 4)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = style.text
        ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif'
        const labels = ['Web', 'App', 'Mobile']
        ctx.fillText(labels[i], x + 16, tabY + 17)
        x += tw + 6
      })
    }

    function drawSoftFooterWash() {
      const g = ctx.createLinearGradient(0, H, 0, H * 0.45)
      g.addColorStop(0, 'rgba(13, 18, 32, 0.82)')
      g.addColorStop(0.42, 'rgba(13, 18, 32, 0.35)')
      g.addColorStop(0.78, 'rgba(13, 18, 32, 0.08)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, H * 0.32, W, H * 0.68)
    }

    function tick(t) {
      computeLayout(t)
      ctx.clearRect(0, 0, W, H)
      drawBackground()
      drawFigmaDotGrid()
      drawSidebar()
      drawTopTabs()
      drawDesktopFrame(t)
      drawPhoneFrame()
      drawSoftFooterWash()
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
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full z-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(160deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            linear-gradient(0deg, rgba(13, 18, 32, 0.35) 0%, transparent 40%)`,
        }}
      />
    </div>
  )
}
