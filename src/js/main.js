/**
 * KOVA JEWELRY — main.js
 * ─────────────────────────────────────────────
 * The application entry point.
 *
 * Responsibilities:
 *  1. Import and configure Lenis smooth scroll
 *  2. Register GSAP plugins (ScrollTrigger, SplitText)
 *  3. Wire up the unified requestAnimationFrame loop
 *     (Lenis + GSAP ticker in lockstep — the KOVA DNA)
 *  4. Initialise the custom cursor module
 *  5. Export a shared `lenis` instance for use in
 *     section-level modules that need scroll events
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { initCursor } from './cursor.js'
import { initSections } from '../sections/index.js'

/* ─────────────────────────────────────────────
   1. REGISTER GSAP PLUGINS
   SplitText is a Club GSAP plugin; if you don't
   have a licence, SplitType (from split-type npm)
   is used as a drop-in replacement in utils.js.
   ───────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   2. LENIS SMOOTH SCROLL — GLOBAL INSTANCE
   lerp: 0.08   → heavy, prestigious momentum
   duration: 1.2 → slow deceleration
   ───────────────────────────────────────────── */
export const lenis = new Lenis({
  lerp:           0.08,
  duration:       1.2,
  smoothWheel:    true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite:       false,
  orientation:    'vertical',
  gestureOrientation: 'vertical',
  normalizeWheel: false,
})

/* ─────────────────────────────────────────────
   3. UNIFIED RAF LOOP
   Lenis must tick inside GSAP's ticker so that
   ScrollTrigger positions are always in sync
   with the Lenis virtual scroll position.

   Order:
   a) gsap.ticker.add  → runs on every GSAP frame
   b) Lenis.raf        → advances Lenis internally
   c) Lenis 'scroll'   → triggers ScrollTrigger.update

   lagSmoothing(0) disables GSAP's built-in lag
   compensation — Lenis handles this itself.
   ───────────────────────────────────────────── */
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/* ─────────────────────────────────────────────
   4. SCROLLTRIGGER GLOBAL DEFAULTS
   ───────────────────────────────────────────── */
ScrollTrigger.defaults({
  invalidateOnRefresh: true, // Recompute on window resize
})

/* ─────────────────────────────────────────────
   5. CUSTOM CURSOR
   ───────────────────────────────────────────── */
initCursor()
initSections()

/* ─────────────────────────────────────────────
   6. DEV LOG — confirms stack is running
   ───────────────────────────────────────────── */
if (import.meta.env.DEV) {
  console.log(
    '%cKOVA%c Design System — Phase 0 ✓',
    'color:#c9a84c; font-family:serif; font-size:20px; font-weight:300; letter-spacing:0.2em;',
    'color:#e8d5b0; font-size:12px; font-weight:400; letter-spacing:0.1em;'
  )
  console.table({
    'Lenis lerp':     lenis.options.lerp,
    'GSAP version':   gsap.version,
    'ScrollTrigger':  'registered ✓',
    'Cursor':         'init ✓',
  })
}
