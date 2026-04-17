/**
 * KOVA JEWELRY — sections/index.js
 * ─────────────────────────────────────────────
 * Section registry. Each section module is
 * imported and initialised here in order.
 *
 * Phase 1: Preloader + Nav
 * Phase 2: Hero (full-screen cinematic video)
 * Phase 3: Philosophy (scroll storytelling)
 * ... etc
 */

import { initPreloader }  from './preloader/preloader.js'
import { initNav }        from './nav/nav.js'
import { initHero }       from './hero/hero.js'
import { initPhilosophy } from './philosophy/philosophy.js'
import { initThePiece }   from './the-piece/the-piece.js'
import { initFeaturedPiece } from './featured-piece/featured-piece.js'
import { initCollections } from './collections/collections.js'

export function initSections() {
  initPreloader()
  initNav()
  initHero()
  initPhilosophy()
  initThePiece()
  initFeaturedPiece()
  initCollections()
  console.log('[sections] Phase 6 & 7 ✓ — Collections Carousels registered')
}
