import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Syncs Lenis scroll with GSAP ScrollTrigger.
 * @param {import('lenis').default} lenis
 */
export function initGSAP(lenis) {
  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP's high-performance ticker to drive Lenis's RAF loop
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable lag smoothing to prevent visual jumps during high CPU loads
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger }
