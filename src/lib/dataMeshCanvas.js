/**
 * Flowing dot-mesh wave (reference-style data visualization).
 */
export function initDataMeshCanvas(canvas) {
  const parent = canvas.parentElement
  if (!parent) return () => {}

  const ctx = canvas.getContext('2d')
  let width = 0
  let height = 0
  let dpr = 1
  let t = 0
  let animId = 0
  let running = false

  const rows = 32
  const cols = 44

  function resize() {
    const rect = parent.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = rect.width
    height = rect.height
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function draw() {
    ctx.clearRect(0, 0, width, height)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const u = col / (cols - 1)
        const v = row / (rows - 1)

        const wave1 = Math.sin(u * Math.PI * 3.2 + t * 0.9 + v * 1.8) * 0.14
        const wave2 = Math.cos(u * Math.PI * 2.4 - t * 0.55 + v * 2.6) * 0.1
        const wave3 = Math.sin((u + v) * Math.PI * 4 + t * 0.35) * 0.06

        const x = width * (0.08 + u * 0.88) + wave2 * width * 0.04
        const y =
          height * (0.12 + v * 0.78) +
          (wave1 + wave3) * height * 0.38 +
          Math.sin(u * Math.PI) * height * 0.04

        const depth =
          Math.sin(u * 5 + v * 3 + t) * 0.5 +
          Math.cos(u * 2 - v * 4 + t * 0.6) * 0.3 +
          0.5

        const r = 1.1 + depth * 2.4
        const alpha = 0.28 + depth * 0.62

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15, 23, 42, ${alpha})`
        ctx.fill()
      }
    }

    t += 0.014
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
      }
    },
    { threshold: 0.05 },
  )

  observer.observe(parent)
  resize()

  const onResize = () => resize()
  window.addEventListener('resize', onResize)
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
  ro?.observe(parent)

  return () => {
    running = false
    cancelAnimationFrame(animId)
    observer.disconnect()
    ro?.disconnect()
    window.removeEventListener('resize', onResize)
  }
}
