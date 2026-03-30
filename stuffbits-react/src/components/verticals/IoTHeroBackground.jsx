import { useEffect, useRef } from 'react'

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function quadPoint(x0, y0, cx, cy, x2, y2, t) {
  const u = 1 - t
  return {
    x: u * u * x0 + 2 * u * t * cx + t * t * x2,
    y: u * u * y0 + 2 * u * t * cy + t * t * y2,
  }
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function curveForDevice(d, W, H) {
  const x0 = d.xN * W
  const y0 = d.yN * H
  const x2 = d.txN * W
  const y2 = d.tyN * H
  const midX = (x0 + x2) * 0.5
  const midY = Math.min(y0, y2) - Math.abs(x2 - x0) * 0.22 - H * 0.06
  return { x0, y0, midX, midY, x2, y2 }
}

/** Edge → cloud IIoT scene: GPS grid, BLE/cellular paths, traveling packets, retina-sharp canvas. */
export default function IoTHeroBackground() {
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
    let dpr = 1
    let edgeDevices = []
    let uplinkParticles = []
    let dataPackets = []
    let lastT = 0

    function build() {
      const count = Math.max(16, Math.min(34, Math.floor(W / 42)))
      edgeDevices = Array.from({ length: count }, (_, i) => ({
        xN: rand(0.05, 0.95),
        yN: rand(0.56, 0.93),
        kind: Math.random() < 0.42 ? 'asset' : 'sensor',
        ripple: rand(0, Math.PI * 2),
        dashPhase: rand(0, 60),
        cellular: Math.random() < 0.5,
        txN: Math.min(0.92, Math.max(0.08, 0.22 + ((i * 0.618) % 1) * 0.56 + rand(-0.04, 0.04))),
        tyN: rand(0.05, 0.13),
        gateway: false,
      }))

      edgeDevices.forEach((d) => {
        if (d.cellular && Math.random() < 0.38) d.gateway = true
      })

      uplinkParticles = Array.from({ length: Math.max(18, Math.floor((W * H) / 42000)) }, () => ({
        x: rand(0, W),
        y: rand(H * 0.35, H * 0.98),
        vy: rand(-0.52, -0.16),
        w: rand(1, 2.2),
        alpha: rand(0.1, 0.38),
      }))

      const nPack = Math.max(9, Math.min(20, Math.floor(count * 0.5)))
      const order = shuffleInPlace(edgeDevices.map((_, i) => i))
      dataPackets = order.slice(0, nPack).map((deviceIndex) => ({
        deviceIndex,
        progress: rand(0, 1),
        speed: rand(0.09, 0.2),
      }))
    }

    function resize() {
      const { clientWidth, clientHeight } = container
      W = Math.max(1, clientWidth)
      H = Math.max(1, clientHeight)
      dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function drawBackground() {
      const g = ctx.createLinearGradient(0, H, 0, 0)
      g.addColorStop(0, '#04070e')
      g.addColorStop(0.32, '#0a111c')
      g.addColorStop(0.62, '#0c1729')
      g.addColorStop(1, '#0f1f36')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      const horizon = ctx.createLinearGradient(0, H * 0.5, 0, H * 0.92)
      horizon.addColorStop(0, 'transparent')
      horizon.addColorStop(1, 'rgba(6, 12, 22, 0.55)')
      ctx.fillStyle = horizon
      ctx.fillRect(0, H * 0.5, W, H * 0.5)
    }

    function drawCloudLayer(t) {
      const tSec = t * 0.00022
      const blobs = [
        { x: 0.22, y: 0.07, rx: 0.42, ry: 0.11 },
        { x: 0.55, y: 0.05, rx: 0.38, ry: 0.1 },
        { x: 0.78, y: 0.09, rx: 0.34, ry: 0.09 },
      ]
      blobs.forEach((b, i) => {
        const ox = Math.sin(tSec + i * 1.7) * W * 0.02
        const oy = Math.cos(tSec * 0.75 + i) * H * 0.009
        const cx = b.x * W + ox
        const cy = b.y * H + oy
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * b.rx)
        rg.addColorStop(0, 'rgba(186, 200, 255, 0.11)')
        rg.addColorStop(0.35, 'rgba(96, 165, 250, 0.06)')
        rg.addColorStop(1, 'transparent')
        ctx.fillStyle = rg
        ctx.beginPath()
        ctx.ellipse(cx, cy, W * b.rx, H * b.ry, 0, 0, Math.PI * 2)
        ctx.fill()
      })

      const cx = W * 0.5
      const cy = H * 0.06
      const conv = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.42)
      conv.addColorStop(0, 'rgba(129, 140, 248, 0.08)')
      conv.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)')
      conv.addColorStop(1, 'transparent')
      ctx.fillStyle = conv
      ctx.fillRect(0, 0, W, H * 0.35)

      ctx.strokeStyle = 'rgba(147, 197, 253, 0.085)'
      ctx.lineWidth = 1
      for (let i = 0; i < 2; i++) {
        const arcY = H * (0.1 + i * 0.04)
        const arcR = W * (0.55 + i * 0.08)
        ctx.beginPath()
        ctx.arc(W * 0.5, arcY + arcR * 0.85, arcR, Math.PI * 1.12, Math.PI * 1.88)
        ctx.stroke()
      }
    }

    function drawGPSGrid() {
      const y0 = H * 0.38
      ctx.strokeStyle = 'rgba(45, 212, 165, 0.035)'
      ctx.lineWidth = 1
      const step = Math.max(36, Math.floor(Math.min(W, H) / 14))
      for (let x = 0; x <= W; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, y0)
        ctx.lineTo(x, H + 2)
        ctx.stroke()
      }
      for (let y = y0; y <= H; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.065)'
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.moveTo(W * 0.5, y0)
      ctx.lineTo(W * 0.5, H * 0.88)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(W * 0.08, H * 0.72)
      ctx.lineTo(W * 0.92, H * 0.72)
      ctx.stroke()
      ctx.setLineDash([])
    }

    function drawBleRipples(t, x, y, phase) {
      const tSec = t * 0.001
      for (let k = 0; k < 2; k++) {
        const u = (tSec * 1.65 + phase + k * 0.9) % 1.55
        const r = 5 + u * 36
        const a = (1 - u / 1.55) * 0.18
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(45, 212, 232, ${a})`
        ctx.lineWidth = 0.65
        ctx.stroke()
      }
    }

    function drawCellularLinkRipple(t, x, y, phase) {
      const tSec = t * 0.00085
      const u = (tSec + phase) % 2.4
      const r = 15 + u * 72
      const a = (1 - u / 2.4) * 0.1
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(129, 140, 248, ${a})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    function drawEdgeToCloudLinks(t) {
      const dashShort = [4, 7]
      const dashLong = [7, 11]

      edgeDevices.forEach((d, idx) => {
        const c = curveForDevice(d, W, H)

        ctx.setLineDash([])
        ctx.strokeStyle = d.cellular ? 'rgba(129, 140, 248, 0.06)' : 'rgba(34, 211, 238, 0.05)'
        ctx.lineWidth = d.cellular ? 4 : 3
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(c.x0, c.y0)
        ctx.quadraticCurveTo(c.midX, c.midY, c.x2, c.y2)
        ctx.stroke()

        ctx.setLineDash(d.cellular ? dashLong : dashShort)
        ctx.lineWidth = d.cellular ? 0.8 : 0.62
        ctx.strokeStyle = d.cellular ? 'rgba(129, 140, 248, 0.26)' : 'rgba(34, 211, 238, 0.2)'
        ctx.lineDashOffset = -(t * (d.cellular ? 0.052 : 0.068) + d.dashPhase + idx)

        ctx.beginPath()
        ctx.moveTo(c.x0, c.y0)
        ctx.quadraticCurveTo(c.midX, c.midY, c.x2, c.y2)
        ctx.stroke()
      })

      ctx.setLineDash([])
      ctx.lineDashOffset = 0
    }

    function drawGateways(t) {
      const tSec = t * 0.001
      edgeDevices.forEach((d) => {
        if (!d.gateway) return
        const c = curveForDevice(d, W, H)
        const p = quadPoint(c.x0, c.y0, c.midX, c.midY, c.x2, c.y2, 0.48)
        const rot = tSec * 0.4 + d.ripple
        const s = 5 + Math.sin(tSec * 2.2 + d.ripple) * 0.8
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(rot)
        ctx.strokeStyle = 'rgba(196, 181, 253, 0.55)'
        ctx.lineWidth = 0.9
        ctx.strokeRect(-s * 0.5, -s * 0.5, s, s)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.12)'
        ctx.fillRect(-s * 0.5, -s * 0.5, s, s)
        ctx.restore()
      })
    }

    function drawDataPackets(dt) {
      const sec = dt / 1000
      dataPackets.forEach((pkt) => {
        pkt.progress += pkt.speed * sec
        if (pkt.progress > 1) pkt.progress -= 1

        const d = edgeDevices[pkt.deviceIndex]
        if (!d) return
        const c = curveForDevice(d, W, H)
        const pos = quadPoint(c.x0, c.y0, c.midX, c.midY, c.x2, c.y2, pkt.progress)
        const col = d.cellular ? 'rgba(199, 210, 254, 0.95)' : 'rgba(165, 243, 252, 0.92)'

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = d.cellular ? 'rgba(129, 140, 248, 0.22)' : 'rgba(34, 211, 238, 0.2)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 2.3, 0, Math.PI * 2)
        ctx.fillStyle = col
        ctx.fill()
      })
    }

    function drawCloudAnchors(t) {
      const tSec = t * 0.0012
      edgeDevices.forEach((d, i) => {
        if (i % 4 !== 0) return
        const x = d.txN * W
        const y = d.tyN * H
        const w = 0.65 + 0.35 * Math.sin(tSec + d.ripple)
        ctx.globalAlpha = 0.2 * w
        ctx.fillStyle = '#93c5fd'
        ctx.beginPath()
        ctx.arc(x, y, 1.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })
    }

    function drawEdgeDevices(t) {
      const tSec = t * 0.001
      edgeDevices.forEach((d) => {
        const x = d.xN * W
        const y = d.yN * H
        if (!d.cellular) drawBleRipples(t, x, y, d.ripple)
        else drawCellularLinkRipple(t, x, y, d.ripple)

        if (d.kind === 'asset') {
          const s = 4 + Math.sin(tSec * 2 + d.ripple) * 0.55
          ctx.fillStyle = 'rgba(191, 219, 254, 0.82)'
          ctx.fillRect(x - s * 0.5, y - s * 0.5, s, s)
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.35)'
          ctx.lineWidth = 0.5
          ctx.strokeRect(x - s * 0.5, y - s * 0.5, s, s)
        } else {
          ctx.fillStyle = 'rgba(165, 243, 252, 0.92)'
          ctx.beginPath()
          ctx.arc(x, y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    }

    function drawUplink(t) {
      uplinkParticles.forEach((p, i) => {
        p.y += p.vy
        if (p.y < H * 0.1) {
          p.y = H + rand(0, 55)
          p.x = rand(0, W)
        }
        const drift = Math.sin(t * 0.00105 + p.x * 0.007) * 0.4
        ctx.globalAlpha = p.alpha * (0.62 + 0.38 * Math.sin(t * 0.0023 + p.y * 0.035))
        ctx.fillStyle = i % 3 === 0 ? '#c4b5fd' : '#7dd3fc'
        ctx.fillRect(p.x + drift, p.y, p.w, p.w * 2.3)
        ctx.globalAlpha = 1
      })
    }

    function drawVignette() {
      const rg = ctx.createRadialGradient(W * 0.5, H * 0.72, 0, W * 0.5, H * 0.58, Math.max(W, H) * 0.92)
      rg.addColorStop(0, 'transparent')
      rg.addColorStop(1, 'rgba(2, 6, 14, 0.42)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, W, H)

      const topClear = ctx.createLinearGradient(0, 0, 0, H * 0.32)
      topClear.addColorStop(0, 'rgba(12, 24, 42, 0.12)')
      topClear.addColorStop(1, 'transparent')
      ctx.fillStyle = topClear
      ctx.fillRect(0, 0, W, H * 0.32)
    }

    function tick(t) {
      const dt = lastT ? Math.min(48, t - lastT) : 16
      lastT = t

      ctx.clearRect(0, 0, W, H)
      drawBackground()
      drawGPSGrid()
      drawCloudLayer(t)
      drawEdgeToCloudLinks(t)
      drawDataPackets(dt)
      drawGateways(t)
      drawCloudAnchors(t)
      drawEdgeDevices(t)
      drawUplink(t)
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
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(180deg, rgba(99, 102, 241, 0.07) 0%, transparent 24%, transparent 100%)`,
        }}
      />
    </div>
  )
}
