/**
 * KOVA JEWELRY — sections/index.js
 * ─────────────────────────────────────────────
 * Section registry. Each section module is
 * imported and initialised here in order.
 *
 * Phase 1: Preloader + Nav
 * Phase 2: Hero (full-screen cinematic video)
 * Phase 3: Philosophy (scroll storytelling)
 * Phase 4: The Piece (pinned showcase)
 * Phase 5: Featured Piece (product expand card)
 * Phase 6–7: Collections Carousels
 * Phase 8: Editorial Grid
 * Phase 9: Process + Email Capture + Footer
 */

import { initPreloader }  from './preloader/preloader.js'
import { initNav }        from './nav/nav.js'
import { initHero }       from './hero/hero.js'
import { initPhilosophy } from './philosophy/philosophy.js'
import { initThePiece }   from './the-piece/the-piece.js'
import { initFeaturedPiece } from './featured-piece/featured-piece.js'
import { initCollections } from './collections/collections.js'
import { initEditorialGrid } from './editorial/editorial.js'
import { initProcess }     from './process/process.js'
import { initEmailCapture } from './email-capture/email-capture.js'
import { initFooter }      from './footer/footer.js'

export function initSections() {
  initPreloader()
  initNav()
  initHero()
  initPhilosophy()
  initThePiece()
  initFeaturedPiece()
  initCollections()
  initEditorialGrid()
  initProcess()
  initEmailCapture()
  initFooter()
  console.log('[sections] Phase 9 ✓ — Process + Email Capture + Footer registered')
}
