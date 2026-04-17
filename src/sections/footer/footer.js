/**
 * KOVA JEWELRY — footer.js
 * ─────────────────────────────────────────────
 * Phase 9C: Footer — Curtain Reveal
 *
 * Mechanism:
 *  - Footer is position:fixed; bottom:0; z-index:-1
 *    (it sits BEHIND the email section).
 *  - A ScrollTrigger on the footer-spacer div drives
 *    the email section's y translation upward,
 *    revealing the footer like a curtain lifting.
 *  - Once the footer is 50%+ visible, the footer
 *    links stagger in with autoAlpha + y offset.
 *  - Logo pulses infinitely via CSS (keyframes).
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitReveal } from '../../js/utils.js';

export function initFooter() {
  const footer  = document.querySelector('.site-footer');
  const spacer  = document.querySelector('.footer-spacer');
  const emailSection = document.querySelector('.email-section');

  if (!footer || !spacer || !emailSection) return;

  // 1. Curtain reveal — email section lifts up to reveal footer
  // Ensure we move it enough even if content is tall
  ScrollTrigger.create({
    trigger: spacer,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      const moveAmount = emailSection.offsetHeight;
      gsap.set(emailSection, {
        y: -self.progress * moveAmount,
        overwrite: 'auto'
      });
    },
  });

  // 2. Footer Logo Reveal
  const logo = footer.querySelector('.footer-logo');
  if (logo) {
    gsap.fromTo(logo, 
      { autoAlpha: 0, y: 30, scale: 0.95 },
      {
        autoAlpha: 1, y: 0, scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: spacer,
          start: '40% bottom',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 3. Navigation Links Reveal
  const links = footer.querySelectorAll('.footer-link');
  if (links.length) {
    gsap.fromTo(links,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1, y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: spacer,
          start: '50% bottom',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 4. Divider Line
  const divider = footer.querySelector('.footer-divider');
  if (divider) {
    gsap.fromTo(divider,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: spacer,
          start: '60% bottom',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 5. Social & Copyright
  const socialItems = footer.querySelectorAll('.footer-social-link, .footer-copy');
  if (socialItems.length) {
    gsap.fromTo(socialItems,
      { autoAlpha: 0, y: 15 },
      {
        autoAlpha: 1, y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: spacer,
          start: '70% bottom',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
