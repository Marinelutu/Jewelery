/**
 * KOVA JEWELRY — philosophy.js
 * ─────────────────────────────────────────────
 * Phase 3: scroll storytelling.
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { splitReveal, bgColorTween } from '../../js/utils.js'

export function initPhilosophy() {
  const section = document.getElementById('philosophy')
  if (!section) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* 1. BACKGROUND TWEEN */
  // It transitions the global --bg-color and --text-color
  bgColorTween(
    { bg: '#0c0c12', text: '#f0ede5' }, // from: Obsidian bg, Cream text
    { bg: '#f0ede5', text: '#0c0c12' }, // to:   Cream bg, Obsidian text
    { 
      trigger: '#philosophy', 
      start: 'top 60%', 
      end: 'top 20%', 
      scrub: true 
    }
  )

  /* 2. PARALLAX TEXT REVEAL */
  splitReveal('.philosophy-title', {
    trigger: '.philosophy-title',
    start: 'top 85%'
  })

  splitReveal('.philosophy-p', {
    trigger: '.philosophy-copy',
    start: 'top 75%'
  }, { stagger: 0.2, delay: 0.1 })

  /* 3. BACKGROUND ARTIFACT PARALLAX */
  if (!prefersReducedMotion) {
    gsap.fromTo('.philosophy-artifact', 
      { y: -30 },
      {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#philosophy',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    )
  }
}
