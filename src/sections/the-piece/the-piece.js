import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function initThePiece() {
  const section = document.querySelector('#the-piece')
  if (!section) return

  const stickyEl = section.querySelector('.piece-sticky')
  const blocks = gsap.utils.toArray(section.querySelectorAll('.copy-block'))
  const img = section.querySelector('.piece-img')

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    gsap.set(blocks, { autoAlpha: 1 })
    return
  }

  // 1. Pin the jewelry image to the center of the viewport
  // It will unpin once the bottom of `#the-piece` hits the bottom of the viewport
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    pin: stickyEl,
    scrub: true,
    anticipatePin: 1,
  })

  // 2. Slow rotation of the jewellery image across the section's scroll
  gsap.fromTo(img, 
    { rotation: 0 },
    {
      rotation: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5 // slight lag for breathing feel
      }
    }
  )

  // 3. Fade in/out for each copy block as it enters the centre vertical area
  blocks.forEach((block) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      }
    })

    // Fade in and slide up
    tl.fromTo(block, 
      { autoAlpha: 0, y: 50 }, 
      { autoAlpha: 1, y: 0, duration: 0.3 }
    )
    // Hold visibility
    .to(block, { autoAlpha: 1, duration: 0.4 })
    // Fade out and slide up further
    .to(block, { autoAlpha: 0, y: -50, duration: 0.3 })
  })
}
