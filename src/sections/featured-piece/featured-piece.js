/**
 * KOVA JEWELRY — featured-piece.js
 * ─────────────────────────────────────────────
 * Phase 5: Featured Piece Product Expand Card
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { bgColorTween, splitReveal } from '../../js/utils.js'

export function initFeaturedPiece() {
  const section = document.getElementById('featured-piece')
  if (!section) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* 1. BACKGROUND TWEEN */
  // It transitions the global --bg-color back to Obsidian
  bgColorTween(
    { bg: '#f0ede5', text: '#0c0c12' }, // from: Cream
    { bg: '#0c0c12', text: '#f0ede5' }, // to: Obsidian
    { 
      trigger: '#featured-piece', 
      start: 'top 70%', 
      end: 'top 30%', 
      scrub: true 
    }
  )

  if (prefersReducedMotion) {
    gsap.set('.featured-card', { clipPath: 'inset(0% 0%)' })
    return
  }

  /* 2. CONTAINER REVEAL */
  gsap.to('.featured-card', {
    clipPath: 'inset(0% 0%)',
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#featured-piece',
      start: 'top 80%',
    }
  })

  /* 3. INNER PARALLAX */
  gsap.fromTo('.featured-img',
    { y: -40 },
    {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#featured-piece',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  )

  /* 4. MASKED TEXT STAGGER */
  // 0.4s delay for product name
  splitReveal('.featured-title', {
    trigger: '#featured-piece',
    start: 'top 60%',
  }, { delay: 0.4, ease: 'power4.out' })

  // Meta details (price, material) stagger
  splitReveal('.meta-item', {
    trigger: '#featured-piece',
    start: 'top 60%',
  }, { delay: 0.6, stagger: 0.1, ease: 'power4.out' })
  
  // CTA fade in with slight slide
  gsap.from('.featured-cta', {
    autoAlpha: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.8,
    scrollTrigger: {
      trigger: '#featured-piece',
      start: 'top 60%'
    }
  })
}
