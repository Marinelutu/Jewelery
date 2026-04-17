/**
 * KOVA JEWELRY — sections/index.js
 * ─────────────────────────────────────────────
 * Section registry. Each section module is
 * imported and initialised here in order.
 *
 * Phases add entries to this file:
 *
 * Phase 1:  import { initPreloader } from './preloader/preloader.js'
 * Phase 2:  import { initHero }      from './hero/hero.js'
 * Phase 3:  import { initPhilosophy } from './philosophy/philosophy.js'
 * ... etc
 *
 * This file is imported by main.js once it's needed.
 * For Phase 0, it's a stub.
 */

import { initPreloader } from './preloader/preloader.js'
import { initNav } from './nav/nav.js'

export function initSections() {
  initPreloader()
  initNav()
  console.log('[sections] Registry initialised')
}
