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
}

export { gsap, ScrollTrigger }
