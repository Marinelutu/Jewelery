/**
 * KOVA JEWELRY — sections/hero/hero.js
 * ─────────────────────────────────────────────
 * Phase 2 — Full-Screen Cinematic Hero
 *
 * Flow:
 *  1. On `preloader:complete` event:
 *     a. Tagline lines slide up via masked stagger (power4.out)
 *     b. Subtitle fades in (0.3s after tagline starts)
 *     c. CTA button fades in (0.5s after tagline starts)
 *     d. Scroll hint fades in last
 *
 *  2. ScrollTrigger scrubs:
 *     - `.hero-video-wrap` scale: 1.1 → 1.0 over the first 100vh
 *     - Parallax feel without pinning
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export function initHero() {
  const hero = document.getElementById('hero')
  if (!hero) return

  const videoWrap  = hero.querySelector('.hero-video-wrap')
  const tagline    = hero.querySelector('.hero-tagline')
  const subtitle   = hero.querySelector('.hero-subtitle')
  const cta        = hero.querySelector('.hero-cta')
  const scrollHint = hero.querySelector('.hero-scroll-hint')

  /* ── Prefers-reduced-motion guard ── */
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (noMotion) {
    if (tagline)    tagline.style.visibility = 'visible'
    if (subtitle)   gsap.set(subtitle,   { opacity: 1 })
    if (cta)        gsap.set(cta,        { opacity: 1 })
    if (scrollHint) gsap.set(scrollHint, { opacity: 1 })
    return
  }

  /* ── 1. Set initial video scale (will be animated on scroll) ── */
  if (videoWrap) {
    gsap.set(videoWrap, { scale: 1.1 })
  }

  /* ── 2. Split tagline into lines for masked stagger ── */
  let split = null
  if (tagline) {
    split = new SplitType(tagline, { types: 'lines' })

    // Wrap each line in an overflow:hidden mask
    split.lines.forEach((line) => {
      const mask = document.createElement('div')
      mask.style.overflow = 'hidden'
      mask.style.display  = 'block'
      line.parentNode.insertBefore(mask, line)
      mask.appendChild(line)
    })

    // Start lines pushed down out of their masks
    gsap.set(split.lines, { yPercent: 110 })
    tagline.style.visibility = 'visible'
  }

  /* ── 3. Entrance timeline — fires on preloader:complete ── */
  function playHeroEntrance() {
    const tl = gsap.timeline()

    // Tagline: each line slides up
    if (split?.lines?.length) {
      tl.to(split.lines, {
        yPercent:  0,
        duration:  1.2,
        ease:      'power4.out',
        stagger:   0.12,
      }, 0)
    }

    // Subtitle fades in
    if (subtitle) {
      tl.to(subtitle, {
        opacity:  1,
        y:        0,
        duration: 0.9,
        ease:     'power3.out',
      }, 0.3)
    }

    // CTA fades in
    if (cta) {
      tl.to(cta, {
        opacity:  1,
        y:        0,
        duration: 0.9,
        ease:     'power3.out',
      }, 0.5)
    }

    // Scroll hint appears last
    if (scrollHint) {
      tl.to(scrollHint, {
        opacity:  1,
        duration: 0.7,
        ease:     'power2.out',
      }, 0.9)
    }
  }

  /* Listen for preloader finish */
  document.addEventListener('preloader:complete', playHeroEntrance, { once: true })

  /* ── 4. Scroll-scrubbed video scale (parallax zoom-out) ── */
  if (videoWrap) {
    ScrollTrigger.create({
      trigger:            hero,
      start:              'top top',
      end:                'bottom top',
      scrub:              1.5,
      invalidateOnRefresh: true,
      onUpdate(self) {
        // Interpolate scale from 1.1 → 1.0 as user scrolls past hero
        const scale = gsap.utils.interpolate(1.1, 1.0, self.progress)
        gsap.set(videoWrap, { scale })
      },
    })
  }
}
