import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function initNav() {
  const nav = document.querySelector('.site-nav')
  if (!nav) return

  // Transparent initial state, background/blur on scroll > 80px
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.isActive && !nav.classList.contains('is-scrolled')) {
        nav.classList.add('is-scrolled')
      } else if (!self.isActive && nav.classList.contains('is-scrolled')) {
        nav.classList.remove('is-scrolled')
      }
    }
  })
}
