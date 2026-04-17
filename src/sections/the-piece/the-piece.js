/**
 * KOVA JEWELRY — the-piece.js
 * ─────────────────────────────────────────────
 * Phase 4 Overhaul: Video pinned showcase.
 * alternating copy blocks (Right -> Left -> Right)
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { splitReveal, bgColorTween } from '../../js/utils.js'

export function initThePiece() {
  const section = document.querySelector('#the-piece')
  if (!section) return

  const videoWrap = section.querySelector('.piece-video-wrap')
  const video = section.querySelector('.piece-video')
  const blocks = gsap.utils.toArray(section.querySelectorAll('.copy-block'))

  /* ─────────────────────────────────────────────
     1. COLOR TRANSITION (Cream -> Obsidian)
     Smoothly darkens the background as we enter the section.
     ───────────────────────────────────────────── */
  bgColorTween(
    { bg: '#f0ede5', text: '#0c0c12' }, // from Philosophy (Cream)
    { bg: '#0c0c12', text: '#f0ede5' }, // to The Piece (Obsidian)
    { 
      trigger: section, 
      start: 'top 80%', 
      end: 'top 20%', 
      scrub: true 
    }
  )

  /* ─────────────────────────────────────────────
     2. PINNING & SCROLL LOGIC
     Pins the video background while text scrolls over.
     ───────────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    pin: videoWrap,
    scrub: true,
    anticipatePin: 1
  })

  // Play/Pause video based on viewport visibility for performance
  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => video.play(),
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause()
  })

  /* ─────────────────────────────────────────────
     3. TEXT REVEALS (Alternating)
     Staggered masked line reveals.
     ───────────────────────────────────────────── */
  blocks.forEach((block, i) => {
    // 3.1 Fade in/out the block container
    gsap.fromTo(block, 
      { autoAlpha: 0, y: 100 },
      { 
        autoAlpha: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          toggleActions: 'play reverse play reverse'
        }
      }
    )

    // 3.2 Masked line staggers for the text inside
    // Using splitReveal helper from utils.js
    const title = block.querySelector('.copy-title')
    const text = block.querySelector('.copy-text')

    if (title) {
      splitReveal(title, {
        trigger: block,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      })
    }

    if (text) {
      splitReveal(text, {
        trigger: block,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }, { delay: 0.1 })
    }
  })
}
