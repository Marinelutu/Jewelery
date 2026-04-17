/**
 * KOVA JEWELRY — email-capture.js
 * ─────────────────────────────────────────────
 * Phase 9B: Email Capture — Newsletter subscribe
 *
 * Animations:
 *  1. Section container: clip-path: inset(8% 4%) → inset(0%)
 *     on scroll entry (same pattern as Featured Piece)
 *  2. Title + description: masked line stagger
 *  3. Form elements: fade in with y offset
 *  4. Background remains obsidian
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitReveal, fadeIn } from '../../js/utils.js';

export function initEmailCapture() {
  const section = document.querySelector('.email-section');
  if (!section) return;

  // 1. Clip-path reveal on scroll entry
  gsap.to(section, {
    clipPath: 'inset(0% 0%)',
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // 2. Title masked stagger
  splitReveal('.email-title', { trigger: section, start: 'top 70%' }, { delay: 0.3 });

  // 3. Description stagger
  splitReveal('.email-desc', { trigger: section, start: 'top 70%' }, { delay: 0.5 });

  // 4. Form: fade in after copy reveals
  fadeIn('.email-form', { trigger: section, start: 'top 65%' }, { delay: 0.7, y: 30 });

  // 5. Privacy note: subtle fade
  fadeIn('.email-privacy', { trigger: section, start: 'top 60%' }, { delay: 0.9, y: 15 });

  // 6. Basic form submission handler (prevent default, show confirmation)
  const form = section.querySelector('.email-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.email-input');
      const btn   = form.querySelector('.email-submit');

      if (input && input.value) {
        // Animate a "success" state
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            btn.textContent = 'Subscribed ✓';
            btn.style.pointerEvents = 'none';
            input.value = '';
            input.blur();

            // Gold flash on button
            gsap.fromTo(btn,
              { background: 'var(--gold-bright)' },
              { background: 'var(--gold)', duration: 0.8, ease: 'power2.out' }
            );
          },
        });
      }
    });
  }
}
