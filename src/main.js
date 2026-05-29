import './style.css'
import { initLenis } from './lib/lenis.js'
import { initGSAP, gsap, ScrollTrigger } from './lib/gsap.js'
import { initSectionCanvases } from './lib/sectionCanvas.js'
import { initAISynapseCanvas } from './lib/aiSynapseCanvas.js'

// Bootstrap smooth scrolling & sync with GSAP ScrollTrigger
const lenis = initLenis()
initGSAP(lenis)
initSectionCanvases()

// Bootstrap animated AI Synaptic Web background in the contact us section
const aiSynapseCanvas = document.querySelector('#ai-synapse-canvas')
if (aiSynapseCanvas) {
  initAISynapseCanvas(aiSynapseCanvas)
}

// CTA Banner — entrance animation
const ctaInner = document.querySelector('.cta-banner-inner')
if (ctaInner) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ctaInner,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    })
    .from('.cta-banner-badge', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
    .from('.cta-banner-title', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' }, '-=0.65')
    .from('.cta-banner-desc', { opacity: 0, y: 25, duration: 0.85, ease: 'power3.out' }, '-=0.6')
    .from('.cta-banner-btn', { opacity: 0, y: 20, scale: 0.98, duration: 0.8, ease: 'power3.out' }, '-=0.55')
}

// ─── Header Scroll Background Toggle + Hide on Scroll Down ───────────────────
const header = document.querySelector('header')
const heroSection = document.querySelector('main > section:first-child')

if (header && heroSection) {
  // ScrollTrigger is already synced with Lenis via initGSAP() — most reliable approach
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'bottom top+=80',   // 80px before hero bottom hits the top
    onLeave: () => {
      // Hero has scrolled out → show glass
      header.classList.add('header-glass')
      header.classList.remove('header-transparent')
    },
    onEnterBack: () => {
      // Scrolled back into hero → hide glass
      header.classList.remove('header-glass')
      header.classList.add('header-transparent')
    },
  })
}

// ─── Hide header on scroll down, reveal on scroll up ─────────────────────────
let lastScrollY = 0
let headerHidden = false

lenis.on('scroll', ({ scroll }) => {
  const currentScrollY = scroll

  // Only trigger hide/show after scrolling past 80px from top
  if (currentScrollY > 80) {
    if (currentScrollY > lastScrollY && !headerHidden) {
      // Scrolling DOWN → hide header
      header.classList.add('header-hidden')
      headerHidden = true
    } else if (currentScrollY < lastScrollY && headerHidden) {
      // Scrolling UP → reveal header
      header.classList.remove('header-hidden')
      headerHidden = false
    }
  } else {
    // Near the top → always show header
    header.classList.remove('header-hidden')
    headerHidden = false
  }

  lastScrollY = currentScrollY
})

// ─── GSAP Animations ──────────────────────────────────────────────────────────

// 1. Hero Reveal Timelines
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } })
heroTl
  .from('.hero-title', { opacity: 0, y: 30, duration: 1.2, delay: 0.2 })
  .from('.hero-desc', { opacity: 0, y: 20, duration: 1 }, '-=0.8')
  .from('.hero-cta', { opacity: 0, y: 15, scale: 0.98, duration: 0.8, stagger: 0.1 }, '-=0.6')

// 2. ScrollTrigger: Card Revelations (Staggered Fade & Slide In)
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.features-grid',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out',
})

// 3. ScrollTrigger: Horizontal Slider Showcase Section
const horizontalSection = document.querySelector('.horizontal-scroll-section')
if (horizontalSection) {
  const scrollWidth = horizontalSection.scrollWidth - window.innerWidth
  gsap.to(horizontalSection, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-wrapper',
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      invalidateOnRefresh: true,
    },
  })
}

// 4. ScrollTrigger: Interactive Parallax Banner
gsap.to('.parallax-bg', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
})

// 5. ScrollTrigger: Counter statistics incrementing on scroll
const stats = document.querySelectorAll('.stat-number')
stats.forEach((stat) => {
  const target = parseInt(stat.getAttribute('data-target'), 10)
  gsap.to(stat, {
    scrollTrigger: {
      trigger: stat,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    innerHTML: target,
    duration: 2,
    snap: { innerHTML: 1 },
    ease: 'power2.out',
  })
})

// 6. Smooth anchor link scrolling driven by Lenis
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href')
    if (targetId === '#') return // Safe fallback for empty/placeholder links

    e.preventDefault()
    try {
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    } catch (error) {
      console.warn('Invalid scroll target:', targetId)
    }
  })
})

// 7. ScrollTrigger: Pinned Cinematic Services Showcase
const logoStackSection = document.querySelector('.logo-stack-section')
if (logoStackSection) {
  const l1 = document.querySelector('.logo-layer-1')
  const l2 = document.querySelector('.logo-layer-2')
  const l3 = document.querySelector('.logo-layer-3')
  const l4 = document.querySelector('.logo-layer-4')
  const l5 = document.querySelector('.logo-layer-5')
  const logoSvg = document.querySelector('.logo-stack-svg')
  const servicesTitle = document.querySelector('.services-title')
  const servicesGrid = document.querySelector('.services-grid-container')
  const cards = document.querySelectorAll('.service-card-new')

  // Set initial states
  gsap.set(l1, { x: -150, opacity: 0 })
  gsap.set(l2, { x: 150, opacity: 0 })
  gsap.set(l3, { x: -150, opacity: 0 })
  gsap.set(l4, { x: 150, opacity: 0 })
  gsap.set(l5, { x: -150, opacity: 0 })
  gsap.set(logoSvg, { scale: 1, opacity: 1 })
  gsap.set(servicesTitle, { scale: 3, opacity: 0, x: 0, y: 0 })
  gsap.set(servicesGrid, { opacity: 0, y: 50 })
  gsap.set('.service-slide-2', { opacity: 0, y: 50 })
  gsap.set('.service-slide-3', { opacity: 0, y: 50 })
  gsap.set('.service-slide-4', { opacity: 0, y: 50 })
  gsap.set('.service-slide-5', { opacity: 0, y: 50 })
  gsap.set('.service-slide-6', { opacity: 0, y: 50 })
  gsap.set('.service-slide-7', { opacity: 0, y: 50 })
  gsap.set('.service-slide-8', { opacity: 0, y: 50 })
  gsap.set('.service-slide-9', { opacity: 0, y: 50 })
  gsap.set('.service-slide-10', { opacity: 0, y: 50 })

  // Pinned Scrub Timeline
  const cinematicTl = gsap.timeline({
    scrollTrigger: {
      trigger: logoStackSection,
      start: 'top top',
      end: '+=12000', // Expanded pins for all 10 slides
      pin: true,
      scrub: 1.2,
      invalidateOnRefresh: true,
      onRefresh: () => {
        // Paint the GSAP-injected pin spacer so the white body never shows
        const spacer = logoStackSection.parentElement
        if (spacer && spacer.classList.contains('gsap-pin-spacer')) {
          spacer.style.backgroundColor = '#ffffff'
        }
      },
    }
  })

  // Also paint immediately after first refresh (covers race conditions)
  ScrollTrigger.addEventListener('refresh', () => {
    const spacer = logoStackSection.parentElement
    if (spacer && spacer.classList.contains('gsap-pin-spacer')) {
      spacer.style.backgroundColor = '#ffffff'
    }
  }, { once: true })

  cinematicTl
    // Phase 1: Logo layer-by-layer assembly
    .to(l1, { x: 0, opacity: 1, duration: 1 })
    .to(l2, { x: 0, opacity: 1, duration: 1 })
    .to(l3, { x: 0, opacity: 1, duration: 1 })
    .to(l4, { x: 0, opacity: 1, duration: 1 })
    .to(l5, { x: 0, opacity: 1, duration: 1 })

    // Phase 2: Logo zooms in (scales up) and fades out/hides
    .to(logoSvg, { scale: 3, opacity: 0, duration: 1.5, ease: 'power2.in' })

    // Phase 3: "Our Services" title zooms in to the center
    .to(servicesTitle, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=0.5')

    // Phase 4: Title zooms out (scales down) and glides smoothly to the top-left corner
    .to(servicesTitle, {
      x: '-35vw',
      y: '-38vh',
      scale: 0.5,
      duration: 1.8,
      ease: 'power3.inOut'
    })

    // Phase 5: Reveal grid of services container (fade in & slide up)
    .to(servicesGrid, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      onStart: () => servicesGrid.classList.add('interactive'),
      onReverseComplete: () => servicesGrid.classList.remove('interactive')
    }, '-=0.8')

    // Phase 6: Slide 1 -> Slide 2 Transition
    .to('.service-slide-1', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-1');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-1');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-2', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-2');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-2');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 7: Slide 2 -> Slide 3 Transition
    .to('.service-slide-2', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-2');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-2');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-3', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-3');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-3');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 8: Slide 3 -> Slide 4 Transition
    .to('.service-slide-3', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-3');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-3');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-4', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-4');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-4');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 9: Slide 4 -> Slide 5 Transition
    .to('.service-slide-4', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-4');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-4');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-5', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-5');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-5');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 10: Slide 5 -> Slide 6 Transition
    .to('.service-slide-5', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-5');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-5');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-6', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-6');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-6');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 11: Slide 6 -> Slide 7 Transition
    .to('.service-slide-6', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-6');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-6');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-7', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-7');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-7');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 12: Slide 7 -> Slide 8 Transition
    .to('.service-slide-7', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-7');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-7');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-8', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-8');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-8');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 13: Slide 8 -> Slide 9 Transition
    .to('.service-slide-8', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-8');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-8');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-9', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-9');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-9');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')

    // Phase 14: Slide 9 -> Slide 10 Transition
    .to('.service-slide-9', {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        const slide = document.querySelector('.service-slide-9');
        if (slide) slide.classList.add('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-9');
        if (slide) slide.classList.remove('pointer-events-none');
      }
    }, '+=0.5')
    .to('.service-slide-10', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        const slide = document.querySelector('.service-slide-10');
        if (slide) slide.classList.remove('pointer-events-none');
      },
      onReverseComplete: () => {
        const slide = document.querySelector('.service-slide-10');
        if (slide) slide.classList.add('pointer-events-none');
      }
    }, '-=0.5')
}
// ─── GSAP ScrollTrigger: Why Choose Acumatic Winding Timeline ──────────────────
const whyChooseUsSection = document.querySelector('.why-choose-us-section')
if (whyChooseUsSection) {
  const animatedPath = document.querySelector('.why-animated-path')
  const mobileProgress = document.querySelector('.why-mobile-progress')

  if (animatedPath) {
    const pathLength = animatedPath.getTotalLength()
    
    // Set initial dash states
    gsap.set(animatedPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    })

    // Draw the winding SVG path on scroll
    gsap.to(animatedPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.why-choose-us-section',
        start: 'top 30%',
        end: 'bottom 70%',
        scrub: 0.8,
        onUpdate: (self) => {
          // Sync the mobile progress bar height too!
          if (mobileProgress) {
            mobileProgress.style.height = `${self.progress * 100}%`
          }
        }
      }
    })
  }

  // Stagger reveal of all 10 timeline items
  const whyItems = gsap.utils.toArray('.why-item')
  whyItems.forEach((item, index) => {
    const card = item.querySelector('.why-card')
    const dot = item.querySelector('.why-node-dot')
    const core = item.querySelector('.why-dot-core')
    const line = item.querySelector('.why-connect-line')

    if (card && dot && core) {
      const isLeft = index % 2 === 0
      
      // Set initial states: cards shifted left/right and invisible, nodes scaled down
      gsap.set(card, { opacity: 0, x: isLeft ? -50 : 50 })
      gsap.set(dot, { scale: 0, borderColor: 'rgba(15, 23, 42, 0.08)' })
      gsap.set(core, { opacity: 0, scale: 0 })
      if (line) {
        gsap.set(line, { scaleX: 0 })
      }
      
      // Card reveal animation
      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      // Connecting line scale-draw animation
      if (line) {
        gsap.to(line, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Dot glow and zoom animation (styled for light theme)
      gsap.to(dot, {
        scale: 1,
        borderColor: 'rgba(226, 232, 240, 1)',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(5, 198, 197, 0.35)',
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })

      // Active core glow dot reveal
      gsap.to(core, {
        opacity: 1,
        scale: 1.3,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
    }
  })
}

// ─── Our Approach — Pinned scroll steps + SVG transforms ─────────────────────
const processSection = document.querySelector('#process-section')
if (processSection) {
  const processSteps = gsap.utils.toArray('.process-step')
  const processVisuals = gsap.utils.toArray('.process-visual')
  const progressFill = processSection.querySelector('.process-progress-fill')
  const stepCount = processSteps.length

  const setActiveStep = index => {
    processSteps.forEach((s, i) => s.classList.toggle('is-active', i === index))
  }

  const prepDrawPaths = () => {
    processSection.querySelectorAll('.proc-draw, .proc-orbit').forEach(path => {
      const len = path.getTotalLength?.() ?? 100
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    })
  }

  const animateDrawPaths = (visual, tl, position) => {
    visual?.querySelectorAll('.proc-draw, .proc-orbit').forEach(path => {
      const len = path.getTotalLength?.() ?? 100
      tl.to(path, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, position)
    })
  }

  prepDrawPaths()

  const processSvgWrap = processSection.querySelector('.process-svg-wrap')
  const processSvg = processSection.querySelector('.process-svg')

  ScrollTrigger.matchMedia({
    '(min-width: 768px)': () => {
      gsap.set(processSvgWrap, { transformPerspective: 1000 })
      gsap.set(processSvg, { rotateX: 12, rotateY: -8 })
      gsap.set(processVisuals, {
        opacity: 0,
        scale: 0.85,
        rotation: -8,
        rotateX: 18,
        z: -30,
      })
      gsap.set(processVisuals[0], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        rotateX: 0,
        rotateY: 0,
        z: 50,
      })
      gsap.set(processSteps, { opacity: 0.35, y: 20 })
      gsap.set(processSteps[0], { opacity: 1, y: 0 })
      setActiveStep(0)

      processVisuals.forEach((visual, idx) => {
        if (idx === 0) return
        visual.querySelectorAll('.proc-iso-block, .proc-iso-layer, .proc-iso-bar').forEach(b => {
          gsap.set(b, { scale: 0.6, opacity: 0, transformOrigin: 'center' })
        })
      })

      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: processSection,
          start: 'top top',
          end: `+=${stepCount * 700}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const idx = Math.min(stepCount - 1, Math.floor(self.progress * stepCount))
            setActiveStep(idx)
            if (progressFill) progressFill.style.height = `${self.progress * 100}%`
          },
          onRefresh: () => {
            const spacer = processSection.parentElement
            if (spacer?.classList.contains('gsap-pin-spacer')) {
              spacer.style.backgroundColor = '#03000a'
            }
          },
        },
      })

      animateDrawPaths(processVisuals[0], processTl, 0)

      for (let i = 1; i < stepCount; i++) {
        const t = i
        processTl
          .to(
            processVisuals[i - 1],
            {
              opacity: 0,
              scale: 0.78,
              rotation: 14,
              rotateX: -22,
              rotateY: 18,
              z: -40,
              duration: 0.5,
              ease: 'power2.in',
            },
            t,
          )
          .to(
            processVisuals[i],
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              rotateX: 0,
              rotateY: 0,
              z: 50,
              duration: 0.55,
              ease: 'power3.out',
            },
            t + 0.06,
          )
          .to(processSteps[i - 1], { opacity: 0.35, y: -14, duration: 0.4, ease: 'power2.in' }, t)
          .to(processSteps[i], { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, t + 0.06)

        animateDrawPaths(processVisuals[i], processTl, t + 0.12)

        // Stagger 3D blocks / bars pop-in
        const blocks = processVisuals[i].querySelectorAll('.proc-iso-block, .proc-iso-layer, .proc-iso-bar')
        if (blocks.length) {
          gsap.set(blocks, { scale: 0.6, opacity: 0, transformOrigin: 'center' })
          processTl.to(
            blocks,
            { scale: 1, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.6)' },
            t + 0.15,
          )
        }
      }

      const onProcessMove = e => {
        if (!processSvgWrap || !processSvg) return
        const rect = processSvgWrap.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(processSvg, {
          rotateX: 12 + y * -10,
          rotateY: -8 + x * 14,
          duration: 0.7,
          ease: 'power2.out',
        })
      }
      const onProcessLeave = () => {
        gsap.to(processSvg, { rotateX: 12, rotateY: -8, duration: 0.85, ease: 'power2.out' })
      }
      processSvgWrap?.addEventListener('mousemove', onProcessMove)
      processSvgWrap?.addEventListener('mouseleave', onProcessLeave)

      return () => {
        processSvgWrap?.removeEventListener('mousemove', onProcessMove)
        processSvgWrap?.removeEventListener('mouseleave', onProcessLeave)
        gsap.set([...processVisuals, ...processSteps, processSvg, processSvgWrap], { clearProps: 'all' })
        processSteps.forEach(s => s.classList.remove('is-active'))
        processSteps[0]?.classList.add('is-active')
      }
    },

    '(max-width: 767px)': () => {
      gsap.set(processVisuals, { opacity: 0, scale: 0.92 })
      gsap.set(processVisuals[0], { opacity: 1, scale: 1 })

      processSteps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 82%',
          onEnter: () => {
            setActiveStep(i)
            processVisuals.forEach((v, idx) => {
              gsap.to(v, { opacity: idx === i ? 1 : 0, scale: idx === i ? 1 : 0.9, duration: 0.4 })
            })
            gsap.to(processSteps, { opacity: 0.4, y: 0, duration: 0.3 })
            gsap.to(step, { opacity: 1, duration: 0.3 })
          },
          onEnterBack: () => {
            setActiveStep(i)
            processVisuals.forEach((v, idx) => {
              gsap.set(v, { opacity: idx === i ? 1 : 0, scale: idx === i ? 1 : 0.9 })
            })
          },
        })
      })

      return () => gsap.set([...processVisuals, ...processSteps], { clearProps: 'all' })
    },
  })
}

// ─── Industries We Serve – Center → Spread Scroll Animation ───────────────────
{
  const indSection = document.querySelector('#industries')
  if (indSection) {

  const hub = indSection.querySelector('.ind-hub')
  const orbitWrap = indSection.querySelector('.ind-orbit-wrap')
  const lines = indSection.querySelectorAll('.ind-line')
  const items = indSection.querySelectorAll('.ind-item')
  const labels = indSection.querySelectorAll('.ind-label')

  const mm = gsap.matchMedia()

  // Per-icon 3D tilt from orbital position (sphere-like layout)
  const getItem3D = (left, top) => ({
    rotateY: (left - 50) * 0.52,
    rotateX: (top - 50) * -0.4,
    z:
      8 +
      Math.cos(((left - 50) / 50) * (Math.PI / 2)) * 10 +
      Math.sin(((top - 50) / 50) * (Math.PI / 2)) * 6,
  })

  const scene3d = indSection.querySelector('.ind-orbit-3d-scene')

  // Desktop: pin section, stack all industries at center, scrub outward on scroll
  mm.add('(min-width: 768px)', () => {
    const itemTargets = Array.from(items).map(item => {
      const left = parseFloat(item.style.left) || 50
      const top = parseFloat(item.style.top) || 50
      return { el: item, left, top, ...getItem3D(left, top) }
    })

    orbitWrap?.classList.add('ind-items-behind-hub')
    orbitWrap?.classList.remove('ind-orbit-preload')

    gsap.set(orbitWrap, {
      rotateX: 14,
      rotateY: 0,
      transformPerspective: 1100,
      transformStyle: 'preserve-3d',
    })

    lines.forEach(line => {
      const length = line.getTotalLength?.() ?? 50
      line.style.strokeDasharray = `${length}`
      line.style.strokeDashoffset = `${length}`
    })

    gsap.set(hub, { scale: 0.5, opacity: 0, zIndex: 30 })
    gsap.set(labels, { opacity: 0, y: 10 })
    gsap.set(lines, { opacity: 0 })

    itemTargets.forEach(({ el }) => {
      gsap.set(el, {
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 0.7,
        opacity: 1,
        zIndex: 1,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        transformPerspective: 1100,
      })
    })

    const pinTarget = indSection.querySelector('.ind-orbit-pin') || orbitWrap

    const spreadTl = gsap.timeline({
      scrollTrigger: {
        trigger: pinTarget,
        start: 'top 18%',
        end: '+=480',
        pin: pinTarget,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          const spacer = pinTarget.parentElement
          if (spacer?.classList.contains('gsap-pin-spacer')) {
            spacer.style.background =
              'linear-gradient(180deg, #f4fbfb 0%, #ffffff 50%, #f5fcfb 100%)'
          }
        },
      },
    })

    spreadTl.to(hub, {
      scale: 1,
      opacity: 1,
      z: 24,
      rotateX: -6,
      duration: 0.12,
      ease: 'back.out(1.7)',
      immediateRender: false,
    })

    itemTargets.forEach(({ el, left, top, rotateX, rotateY, z }, i) => {
      spreadTl.to(
        el,
        {
          left: `${left}%`,
          top: `${top}%`,
          scale: 1.08,
          zIndex: 10,
          rotateX,
          rotateY,
          z,
          duration: 0.5,
          ease: 'power2.inOut',
          immediateRender: false,
        },
        0.12 + i * 0.04,
      )
    })

    lines.forEach((line, i) => {
      const length = line.getTotalLength?.() ?? 50
      spreadTl.to(
        line,
        {
          strokeDashoffset: 0,
          opacity: 0.3,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.28 + i * 0.03,
      )
    })

    spreadTl.to(
      labels,
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
        stagger: 0.02,
      },
      0.72,
    )

    spreadTl.call(
      () => {
        orbitWrap?.classList.remove('ind-items-behind-hub')
        orbitWrap?.querySelectorAll('.ind-label').forEach(l => {
          l.style.visibility = 'visible'
        })
        orbitWrap?.querySelector('.ind-connectors')?.style.removeProperty('visibility')
      },
      null,
      0.55,
    )

    requestAnimationFrame(() => ScrollTrigger.refresh())

    const onSceneMove = e => {
      if (!scene3d || !orbitWrap) return
      const rect = scene3d.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(orbitWrap, {
        rotateX: 14 + y * -8,
        rotateY: x * 12,
        duration: 0.65,
        ease: 'power2.out',
      })
    }

    const onSceneLeave = () => {
      if (!orbitWrap) return
      gsap.to(orbitWrap, { rotateX: 14, rotateY: 0, duration: 0.85, ease: 'power2.out' })
    }

    scene3d?.addEventListener('mousemove', onSceneMove)
    scene3d?.addEventListener('mouseleave', onSceneLeave)

    return () => {
      scene3d?.removeEventListener('mousemove', onSceneMove)
      scene3d?.removeEventListener('mouseleave', onSceneLeave)
      orbitWrap?.classList.remove('ind-items-behind-hub', 'ind-orbit-preload')
      itemTargets.forEach(({ el, left, top }) => {
        gsap.set(el, { clearProps: 'left,top,scale,opacity,zIndex,transform' })
        el.style.left = `${left}%`
        el.style.top = `${top}%`
      })
      gsap.set([hub, orbitWrap, ...lines, ...labels], { clearProps: 'all' })
    }
  })

  // Mobile: simple staggered fade-in (grid layout, no orbital spread)
  mm.add('(max-width: 767px)', () => {
    gsap.set(items, { opacity: 0, y: 24 })
    gsap.set(labels, { opacity: 0 })

    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: indSection,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    mobileTl
      .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' })
      .to(labels, { opacity: 1, duration: 0.35, stagger: 0.04 }, '-=0.25')

    return () => gsap.set([...items, ...labels], { clearProps: 'all' })
  })
  }
}

// ─── ScrollTrigger: About Us column entrances ────────────────────────────────
gsap.from('.about-content-left', {
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: -60,
  duration: 1.2,
  ease: 'power3.out',
})

gsap.from('.about-image-right', {
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: 60,
  duration: 1.2,
  ease: 'power3.out',
})

// ─── ScrollTrigger: Vision column entrances ──────────────────────────────────
gsap.from('.vision-content-right', {
  scrollTrigger: {
    trigger: '#vision',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: 60,
  duration: 1.2,
  ease: 'power3.out',
})

gsap.from('.vision-graphic-left', {
  scrollTrigger: {
    trigger: '#vision',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: -60,
  duration: 1.2,
  ease: 'power3.out',
})

// ─── ScrollTrigger: Mission column entrances ──────────────────────────────────
gsap.from('.mission-content-left', {
  scrollTrigger: {
    trigger: '#mission',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: -60,
  duration: 1.2,
  ease: 'power3.out',
})

gsap.from('.mission-graphic-right', {
  scrollTrigger: {
    trigger: '#mission',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: 60,
  duration: 1.2,
  ease: 'power3.out',
})

// ─── ScrollTrigger: General Section Headings Reveal ──────────────────────────
const revealHeadings = gsap.utils.toArray('.scroll-reveal-heading')
revealHeadings.forEach((heading) => {
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 35,
    duration: 1.0,
    ease: 'power3.out',
  })
})

// ─── ScrollTrigger: Contact Section columns slide-in ─────────────────────────
gsap.from('.contact-cards-left', {
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: -60,
  duration: 1.2,
  ease: 'power3.out',
})

gsap.from('.contact-form-right', {
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 75%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: 60,
  duration: 1.2,
  ease: 'power3.out',
})

// Force ScrollTrigger to refresh all calculation coordinates once the layout is fully rendered
window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 150)
})
