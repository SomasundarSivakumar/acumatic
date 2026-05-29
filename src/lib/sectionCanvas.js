/**
 * Lightweight particle-network canvas with cursor interaction.
 */
export function initSectionCanvas(canvas, options = {}) {
  const {
    particleCount = 42,
    color = '5, 198, 197',
    linkDistance = 110,
    speed = 0.28,
    dotOpacity = 0.35,
    cursorRadius = 130,
    cursorForce = 0.55,
    cursorLinkDistance = 150,
  } = options

  const parent = canvas.parentElement
  if (!parent) return () => {}

  const ctx = canvas.getContext('2d')
  let width = 0
  let height = 0
  let particles = []
  let animId = 0
  let running = false

  const mouse = { x: -9999, y: -9999, active: false }
  const smoothMouse = { x: -9999, y: -9999 }

  function initParticles() {
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: 1.2 + Math.random() * 2.2,
      dir: Math.random() > 0.55 ? 1 : -1, // 2-way: push or pull
    }))
  }

  function resize() {
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (!w || !h) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    width = w
    height = h
    if (!particles.length) initParticles()
  }

  function updateMouseFromEvent(e) {
    const rect = parent.getBoundingClientRect()
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom

    if (inside) {
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    } else {
      mouse.active = false
    }
  }

  function applyCursorForce(p) {
    if (!mouse.active) return

    const dx = p.x - smoothMouse.x
    const dy = p.y - smoothMouse.y
    const dist = Math.hypot(dx, dy)
    if (dist > cursorRadius || dist < 1) return

    const forceDir = p.dir || 1
    const push = ((cursorRadius - dist) / cursorRadius) * cursorForce * forceDir
    p.vx += (dx / dist) * push
    p.vy += (dy / dist) * push
  }

  function draw() {
    if (mouse.active) {
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.18
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.18
    }

    ctx.clearRect(0, 0, width, height)

    const maxSpeed = speed * 4

    for (const p of particles) {
      applyCursorForce(p)

      p.vx *= 0.985
      p.vy *= 0.985

      const vel = Math.hypot(p.vx, p.vy)
      if (vel > maxSpeed) {
        p.vx = (p.vx / vel) * maxSpeed
        p.vy = (p.vy / vel) * maxSpeed
      }

      p.x += p.vx
      p.y += p.vy

      if (p.x <= 0 || p.x >= width) p.vx *= -1
      if (p.y <= 0 || p.y >= height) p.vy *= -1
      p.x = Math.max(0, Math.min(width, p.x))
      p.y = Math.max(0, Math.min(height, p.y))

      let dotAlpha = dotOpacity
      if (mouse.active) {
        const distToCursor = Math.hypot(p.x - smoothMouse.x, p.y - smoothMouse.y)
        if (distToCursor < cursorRadius) {
          dotAlpha = dotOpacity + (1 - distToCursor / cursorRadius) * 0.35
        }
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color}, ${dotAlpha})`
      ctx.fill()
    }

    // Particle ↔ particle links
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (dist < linkDistance) {
          const alpha = 0.14 * (1 - dist / linkDistance)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${color}, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    // Cursor ↔ nearby particle links
    if (mouse.active) {
      for (const p of particles) {
        const dist = Math.hypot(p.x - smoothMouse.x, p.y - smoothMouse.y)
        if (dist < cursorLinkDistance) {
          const alpha = 0.22 * (1 - dist / cursorLinkDistance)
          ctx.beginPath()
          ctx.moveTo(smoothMouse.x, smoothMouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `rgba(${color}, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Soft cursor glow
      const glow = ctx.createRadialGradient(
        smoothMouse.x,
        smoothMouse.y,
        0,
        smoothMouse.x,
        smoothMouse.y,
        cursorRadius * 0.65,
      )
      glow.addColorStop(0, `rgba(${color}, 0.12)`)
      glow.addColorStop(1, `rgba(${color}, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(smoothMouse.x, smoothMouse.y, cursorRadius * 0.65, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function loop() {
    if (!running) return
    draw()
    animId = requestAnimationFrame(loop)
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      running = entry.isIntersecting
      if (running) {
        resize()
        loop()
      } else {
        cancelAnimationFrame(animId)
        mouse.active = false
      }
    },
    { threshold: 0.05 },
  )

  observer.observe(parent)
  resize()

  const onResize = () => resize()
  const onPointerMove = e => updateMouseFromEvent(e)

  window.addEventListener('resize', onResize)
  document.addEventListener('pointermove', onPointerMove, { passive: true })

  const resizeObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => resize())
      : null
  resizeObserver?.observe(parent)

  return () => {
    running = false
    cancelAnimationFrame(animId)
    observer.disconnect()
    resizeObserver?.disconnect()
    window.removeEventListener('resize', onResize)
    document.removeEventListener('pointermove', onPointerMove)
  }
}

export function initSectionCanvases() {
  const themes = {
    why: {
      particleCount: 55,
      color: '2, 132, 199',
      linkDistance: 120,
      speed: 0.32,
      dotOpacity: 0.45,
      cursorRadius: 140,
      cursorForce: 0.6,
    },
    industries: {
      particleCount: 44,
      color: '5, 198, 197',
      linkDistance: 105,
      speed: 0.26,
      dotOpacity: 0.42,
      cursorRadius: 130,
      cursorForce: 0.55,
    },
    cta: {
      particleCount: 65,
      color: '5, 198, 197',
      linkDistance: 125,
      speed: 0.15,
      dotOpacity: 0.5,
      cursorRadius: 150,
      cursorForce: 0.12,
      cursorLinkDistance: 160,
    },
  }

  return [...document.querySelectorAll('.section-canvas')].map(canvas => {
    const theme = canvas.dataset.canvasTheme
    return initSectionCanvas(canvas, themes[theme] || themes.industries)
  })
}
