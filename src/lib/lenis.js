import Lenis from 'lenis'

/**
 * Initialises Lenis smooth-scroll and returns the instance.
 * Relies on Lenis's built-in auto-RAF loop for maximum compatibility and performance.
 * @returns {Lenis}
 */
export function initLenis() {
  const lenis = new Lenis({
    duration: 0.8, // Snappy response
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.2, // Fast wheel scrolling feel
    touchMultiplier: 1.5, // Standard responsive touch feel
    infinite: false,
    autoRaf: false, // Driven by GSAP Ticker for perfect synchronization
  })

  return lenis
}
