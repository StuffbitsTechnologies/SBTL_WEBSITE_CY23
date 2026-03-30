import { useEffect, useRef } from 'react'

function rand(min, max) {
  return min + Math.random() * (max - min)
}

export default function AutomotiveHeroBackground() {
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
    let nodes = []

    function build() {
      const N = Math.max(12, Math.floor((W * H) / 16000))
      nodes = Array.from({ length: N }, () => ({
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.12, 0.12),
        r: rand(1.2, 2.6),
        alpha: rand(0.3, 0.9),
        pulse: rand(0, Math.PI * 2),
        type: Math.random() < 0.18 ? 'square' : 'circle',
      }))
    }

    function resize() {
      const { clientWidth, clientHeight } = container
      W = canvas.width = Math.max(1, clientWidth)
      H = canvas.height = Math.max(1, clientHeight)
      build()
    }

    function drawNode(n, t) {
      const a = n.alpha * (0.6 + 0.4 * Math.sin(n.pulse + t * 0.0012))
      ctx.globalAlpha = a
      if (n.type === 'square') {
        const s = n.r * 2.2
        ctx.fillStyle = '#00e5c8'
        ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s)
      } else {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = '#00c8ff'
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function drawEdges() {
      const maxDist = 130
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxDist) {
            const fade = 1 - d / maxDist
            ctx.globalAlpha = fade * 0.22
            ctx.strokeStyle = '#00aadd'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
    }

    function drawTraces() {
      ctx.lineWidth = 0.5
      const segs = [
        [0.1, 0.2, 0.4, 0.2],
        [0.4, 0.2, 0.4, 0.5],
        [0.6, 0.1, 0.85, 0.1],
        [0.85, 0.1, 0.85, 0.35],
        [0.05, 0.75, 0.3, 0.75],
        [0.3, 0.75, 0.3, 0.9],
        [0.55, 0.6, 0.78, 0.6],
        [0.78, 0.6, 0.78, 0.82],
        [0.15, 0.45, 0.35, 0.45],
        [0.62, 0.3, 0.75, 0.3],
      ]
      segs.forEach(([x1, y1, x2, y2]) => {
        ctx.globalAlpha = 0.08
        ctx.strokeStyle = '#00e5ff'
        ctx.beginPath()
        ctx.moveTo(x1 * W, y1 * H)
        ctx.lineTo(x2 * W, y2 * H)
        ctx.stroke()
        ctx.globalAlpha = 1

        const px = x2 * W
        const py = y2 * H
        ctx.globalAlpha = 0.14
        ctx.fillStyle = '#00e5c8'
        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })
    }

    function tick(t) {
      ctx.clearRect(0, 0, W, H)

      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, '#050c14')
      grad.addColorStop(1, '#061018')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      drawTraces()
      drawEdges()
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -10) n.x = W + 10
        if (n.x > W + 10) n.x = -10
        if (n.y < -10) n.y = H + 10
        if (n.y > H + 10) n.y = -10
        drawNode(n, t)
      })

      raf = requestAnimationFrame(tick)
    }

    let raf = 0

    const ro = new ResizeObserver(() => {
      resize()
    })

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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full z-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute rounded-full z-[1] -top-[180px] -left-[180px] w-[700px] h-[700px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full z-[1] -bottom-[100px] -right-[100px] w-[500px] h-[500px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,160,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.06) 3px,
            rgba(0,0,0,0.06) 4px
          )`,
        }}
      />
    </div>
  )
}
