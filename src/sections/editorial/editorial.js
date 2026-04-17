import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitReveal } from '../../js/utils.js';

export function initEditorialGrid() {
  // 1. Reveal section title
  splitReveal('.editorial-title');

  // 2. Handle Image Reveal & Parallax
  const items = document.querySelectorAll('.editorial-item');
  
  items.forEach(item => {
    const wrap = item.querySelector('.editorial-img-wrap');
    if (!wrap) return;

    const speed = parseFloat(item.dataset.parallaxSpeed || '0.15');

    // Reveal: autoAlpha: 0, scale: 1.08 -> autoAlpha: 1, scale: 1.0
    gsap.to(wrap, {
      autoAlpha: 1,
      scale: 1.0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: wrap,
        start: 'top 85%', // reveals when ~15% crosses viewport bottom
      }
    });

    // Parallax effect
    gsap.fromTo(item, 
      { y: 0 },
      {
        y: () => -(window.innerHeight * speed),
        ease: 'none',
        scrollTrigger: {
          trigger: '.editorial-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );
  });

  // Background color transition
  const section = document.querySelector('.editorial-section');
  if (section) {
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%", // Change color when section is coming into view
      onEnter: () => {
        gsap.to(document.documentElement, {
          '--bg-color': 'var(--champagne)',
          duration: 1.4,
          ease: 'power2.inOut'
        });
      },
      onEnterBack: () => {
        gsap.to(document.documentElement, {
          '--bg-color': 'var(--champagne)',
          duration: 1.4,
          ease: 'power2.inOut'
        });
      }
    });
  }
}
