/**
 * KOVA JEWELRY — process.js
 * ─────────────────────────────────────────────
 * Phase 9A: "The Process" — Sketch → Cast → Finish
 *
 * Animation sequence:
 *  1. Section title reveals via masked stagger
 *  2. Gold connecting line draws from scaleX:0 → 1
 *  3. Each step's image wipes in L→R via clip-path
 *  4. Step copy staggers in after image completes
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitReveal, fadeIn } from '../../js/utils.js';

export function initProcess() {
  const section = document.querySelector('.process-section');
  if (!section) return;

  // 1. Title masked stagger
  splitReveal('.process-title');
  splitReveal('.process-subtitle', {}, { delay: 0.2 });

  // 2. Gold connecting line
  const line = section.querySelector('.process-line');
  if (line) {
    const isMobile = window.innerWidth <= 900;
    gsap.to(line, {
      [isMobile ? 'scaleY' : 'scaleX']: 1,
      duration: 1.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.process-steps',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }

  // 3. Step image clip-path wipes (left → right)
  const steps = section.querySelectorAll('.process-step');
  steps.forEach((step, i) => {
    const imgWrap = step.querySelector('.step-img-wrap');
    if (!imgWrap) return;

    // Clip-path wipe: inset(0 100% 0 0) → inset(0 0% 0 0)
    gsap.to(imgWrap, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
      delay: i * 0.25,
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // 4. Step copy stagger after image
    const label = step.querySelector('.step-label');
    const title = step.querySelector('.step-title');
    const desc  = step.querySelector('.step-desc');
    const numberEl = step.querySelector('.step-number');

    // Number badge fade
    if (numberEl) {
      gsap.from(numberEl, {
        autoAlpha: 0,
        scale: 0.6,
        duration: 0.8,
        ease: 'back.out(2)',
        delay: i * 0.25,
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
        },
      });
    }

    // Text reveals — using splitReveal for consistency
    if (label) {
      splitReveal(label, { trigger: step, start: 'top 70%' }, { delay: 0.4 + i * 0.2 });
    }
    if (title) {
      splitReveal(title, { trigger: step, start: 'top 70%' }, { delay: 0.5 + i * 0.2 });
    }
    if (desc) {
      splitReveal(desc, { trigger: step, start: 'top 70%' }, { delay: 0.6 + i * 0.2 });
    }
  });

  // Background color transition: champagne → obsidian
  ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    onEnter: () => {
      gsap.to(document.documentElement, {
        '--bg-color': 'var(--obsidian)',
        '--text-color': 'var(--cream)',
        duration: 1.4,
        ease: 'power2.inOut',
      });
    },
    onEnterBack: () => {
      gsap.to(document.documentElement, {
        '--bg-color': 'var(--obsidian)',
        '--text-color': 'var(--cream)',
        duration: 1.4,
        ease: 'power2.inOut',
      });
    },
  });
}
