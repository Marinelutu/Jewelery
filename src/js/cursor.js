/**
 * KOVA JEWELRY — cursor.js
 * ─────────────────────────────────────────────
 * Custom cursor: 8px dot + 40px lagging ring.
 * Includes magnetic button attraction logic.
 *
 * Public API:
 *   initCursor()         → bootstraps everything
 *   setCursorState(name) → 'default' | 'hover' | 'drag'
 *
 * DOM Elements:
 *   #cursor-dot   → sharp centre dot
 *   #cursor-ring  → lerped outer ring
 *
 * Technique:
 *   - Dot follows mouse with no lag (direct transform)
 *   - Ring uses gsap.quickTo for smooth lerp behind dot
 *   - Magnetic elements attract dot+ring within radius
 */

import gsap from 'gsap'

/* ── SHARED STATE ── */
let mouseX = 0
let mouseY = 0
let isTouch = false

/* ── ELEMENTS ── */
let dot, ring
let ringX, ringY  // gsap.quickTo instances for ring lerp

/* ── CONFIG ── */
const RING_LERP_DURATION = 0.5  // seconds — controls ring lag
const MAGNETIC_RADIUS    = 80   // px — pull zone distance
const MAGNETIC_STRENGTH  = 0.4  // 0–1, how far the magnet attracts

/**
 * Initialise cursor — call once from main.js
 */
export function initCursor() {
  // Skip on touch-only devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    isTouch = true
    return
  }

  dot  = document.getElementById('cursor-dot')
  ring = document.getElementById('cursor-ring')

  if (!dot || !ring) {
    console.warn('[cursor.js] Cursor DOM elements not found.')
    return
  }

  // ── Quick setters for performant ring lerp ──
  ringX = gsap.quickTo(ring, 'x', {
    duration:  RING_LERP_DURATION,
    ease:      'power3.out',
    modifiers: { x: val => `${parseFloat(val) - ring.offsetWidth  / 2}px` },
  })
  ringY = gsap.quickTo(ring, 'y', {
    duration:  RING_LERP_DURATION,
    ease:      'power3.out',
    modifiers: { y: val => `${parseFloat(val) - ring.offsetHeight / 2}px` },
  })

  // ── Event listeners ──
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave)

  // ── Bind interactive element hover states ──
  bindHoverTargets()

  // ── Bind magnetic elements ──
  bindMagneticElements()
}

/**
 * Mouse move handler — moves dot immediately, ring via quickTo lerp
 */
function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY

  // Dot: direct position (no lag)
  gsap.set(dot, {
    x: mouseX - dot.offsetWidth  / 2,
    y: mouseY - dot.offsetHeight / 2,
  })

  // Ring: lerped via quickTo
  ringX(mouseX)
  ringY(mouseY)
}

/**
 * Hide cursor when mouse leaves viewport
 */
function onMouseLeave() {
  gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 })
}

/**
 * Toggle named cursor state.
 * @param {'default'|'hover'|'drag'} state
 */
export function setCursorState(state) {
  if (isTouch) return

  ring.classList.remove('is-hovering', 'is-dragging')
  ring.removeAttribute('data-label')

  switch (state) {
    case 'hover':
      ring.classList.add('is-hovering')
      gsap.to(ring, {
        width:  'var(--cursor-ring-hover)',
        height: 'var(--cursor-ring-hover)',
        duration: 0.4,
        ease: 'power3.out',
      })
      break

    case 'drag':
      ring.classList.add('is-dragging')
      ring.setAttribute('data-label', 'DRAG')
      gsap.to(ring, {
        width:  'var(--cursor-ring-drag)',
        height: 'var(--cursor-ring-drag)',
        duration: 0.4,
        ease: 'power3.out',
      })
      break

    default: // 'default'
      gsap.to(ring, {
        width:  'var(--cursor-ring-size)',
        height: 'var(--cursor-ring-size)',
        duration: 0.4,
        ease: 'power3.out',
      })
  }
}

/**
 * Bind hover state to all appropriate interactive elements.
 * Uses event delegation for dynamically injected sections.
 */
function bindHoverTargets() {
  document.body.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, [data-cursor-hover], .btn')
    if (target) setCursorState('hover')
  })

  document.body.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, [data-cursor-hover], .btn')
    if (target) setCursorState('default')
  })
}

/**
 * Magnetic button effect.
 * Elements with data-magnetic attribute attract the cursor.
 * Call again after injecting new section HTML if needed.
 */
export function bindMagneticElements() {
  const magnetics = document.querySelectorAll('[data-magnetic]')

  magnetics.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect   = el.getBoundingClientRect()
      const elCX   = rect.left + rect.width  / 2
      const elCY   = rect.top  + rect.height / 2
      const dx     = e.clientX - elCX
      const dy     = e.clientY - elCY
      const dist   = Math.sqrt(dx * dx + dy * dy)

      if (dist < MAGNETIC_RADIUS) {
        const strength = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH
        gsap.to(el, {
          x:        dx * strength * 1.5,
          y:        dy * strength * 1.5,
          duration: 0.4,
          ease:     'power3.out',
        })
        // Pull ring toward button centre
        gsap.to(ring, {
          x: elCX + dx * strength - ring.offsetWidth  / 2,
          y: elCY + dy * strength - ring.offsetHeight / 2,
          duration: 0.2,
          ease: 'power3.out',
        })
      }
    })

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
      setCursorState('default')
    })

    el.addEventListener('mouseenter', () => {
      setCursorState('hover')
    })
  })
}
