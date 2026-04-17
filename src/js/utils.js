/**
 * KOVA JEWELRY — utils.js
 * ─────────────────────────────────────────────
 * Reusable GSAP animation helpers used by all
 * section modules.
 *
 * Functions exported:
 *   splitReveal(targets, scrollTriggerConfig)
 *     → Splits text by lines using SplitType,
 *       wraps each in overflow:hidden mask,
 *       animates y: 110% → 0 on scroll entry.
 *
 *   imageReveal(targets, scrollTriggerConfig)
 *     → Animates images from clip-path: inset(100% 0 0 0)
 *       to inset(0%) with optional scale effect.
 *
 *   fadeIn(targets, scrollTriggerConfig)
 *     → Simple autoAlpha + y fade (fallback for
 *       elements that cannot use clip/split masks).
 *
 *   bgColorTween(fromColor, toColor, scrollTrigger)
 *     → Tweens --bg-color and --text-color CSS
 *       custom properties on :root.
 *
 * All functions respect prefers-reduced-motion.
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

/* ── MOTION PREFERENCE ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ─────────────────────────────────────────────
   SPLIT REVEAL
   Masked stagger line-by-line text reveal.

   Usage:
     splitReveal('.hero-title', {
       trigger: '.hero-title',
       start: 'top 85%',
     })

   Options (all optional with defaults):
     stagger    : 0.1   — delay between lines
     duration   : 1.1   — tween duration
     ease       : power4.out
     yPercent   : -110  — start position (negative = slide up)
     delay      : 0     — delay before animation starts
   ───────────────────────────────────────────── */
export function splitReveal(targets, stConfig = {}, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(targets, { autoAlpha: 1 })
    return
  }

  const els = gsap.utils.toArray(targets)
  if (!els.length) return

  const {
    stagger  = 0.1,
    duration = 1.1,
    ease     = 'power4.out',
    yPercent = 110,
    delay    = 0,
  } = options

  els.forEach((el) => {
    // Split by lines — SplitType returns lines array
    const split = new SplitType(el, { types: 'lines' })

    // Wrap each line in a mask div
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display  = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    // Animate
    gsap.from(split.lines, {
      yPercent,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger:             stConfig.trigger || el,
        start:               stConfig.start   || 'top 88%',
        end:                 stConfig.end,
        toggleActions:       stConfig.toggleActions || 'play none none none',
        invalidateOnRefresh: true,
        ...stConfig,
      },
    })
  })
}


/* ─────────────────────────────────────────────
   IMAGE REVEAL
   clip-path wipe from bottom + optional scale.

   Usage:
     imageReveal('.hero-img', { trigger: '.hero-section' })

   Options:
     duration : 1.4
     ease     : expo.out
     scale    : 1.15  — starting scale (zoomed in)
   ───────────────────────────────────────────── */
export function imageReveal(targets, stConfig = {}, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(targets, { autoAlpha: 1 })
    return
  }

  const els = gsap.utils.toArray(targets)
  if (!els.length) return

  const {
    duration = 1.4,
    ease     = 'expo.out',
    scale    = 1.12,
    delay    = 0,
  } = options

  els.forEach((el) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:             stConfig.trigger || el,
        start:               stConfig.start   || 'top 88%',
        end:                 stConfig.end,
        toggleActions:       stConfig.toggleActions || 'play none none none',
        invalidateOnRefresh: true,
        ...stConfig,
      },
    })

    tl.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      scale,
      duration,
      ease,
      delay,
    })
    .to(el, {
      scale: 1,
      duration,
      ease,
    }, '<')
  })
}


/* ─────────────────────────────────────────────
   FADE IN
   Simple autoAlpha + y offset fade.
   Used as a fallback only — prefer splitReveal
   or imageReveal per the KOVA DNA rules.

   Usage:
     fadeIn('.nav-links', { trigger: 'nav' })
   ───────────────────────────────────────────── */
export function fadeIn(targets, stConfig = {}, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(targets, { autoAlpha: 1 })
    return
  }

  const {
    duration = 0.8,
    ease     = 'power3.out',
    y        = 24,
    stagger  = 0.08,
    delay    = 0,
  } = options

  gsap.from(gsap.utils.toArray(targets), {
    autoAlpha: 0,
    y,
    duration,
    ease,
    stagger,
    delay,
    scrollTrigger: {
      trigger:             stConfig.trigger,
      start:               stConfig.start || 'top 90%',
      toggleActions:       stConfig.toggleActions || 'play none none none',
      invalidateOnRefresh: true,
      ...stConfig,
    },
  })
}


/* ─────────────────────────────────────────────
   BACKGROUND COLOR TWEEN
   Tweens --bg-color and --text-color on :root.
   Used by Philosophy (obsidian → cream) and
   other sections that swap the global palette.

   Usage:
     bgColorTween(
       { bg: '#0c0c12', text: '#f0ede5' },
       { bg: '#f0ede5', text: '#0c0c12' },
       { trigger: '#philosophy', start: 'center center', end: 'bottom center', scrub: 1.5 }
     )
   ───────────────────────────────────────────── */
export function bgColorTween(fromColors, toColors, stConfig = {}) {
  if (prefersReducedMotion) return

  const root = document.documentElement

  ScrollTrigger.create({
    trigger:             stConfig.trigger,
    start:               stConfig.start  || 'top center',
    end:                 stConfig.end    || 'bottom center',
    scrub:               stConfig.scrub  ?? 1.5,
    invalidateOnRefresh: true,
    onUpdate(self) {
      const p = self.progress
      gsap.to(root, {
        '--bg-color':   interpolateColor(fromColors.bg,   toColors.bg,   p),
        '--text-color': interpolateColor(fromColors.text, toColors.text, p),
        duration:       0, // Instant; scrub handles timing
        overwrite:      true,
      })
    },
  })
}


/* ── INTERNAL: Hex color interpolation ── */
function interpolateColor(hex1, hex2, t) {
  const r1 = parseInt(hex1.slice(1, 3), 16)
  const g1 = parseInt(hex1.slice(3, 5), 16)
  const b1 = parseInt(hex1.slice(5, 7), 16)
  const r2 = parseInt(hex2.slice(1, 3), 16)
  const g2 = parseInt(hex2.slice(3, 5), 16)
  const b2 = parseInt(hex2.slice(5, 7), 16)
  const r  = Math.round(r1 + (r2 - r1) * t)
  const g  = Math.round(g1 + (g2 - g1) * t)
  const b  = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}
