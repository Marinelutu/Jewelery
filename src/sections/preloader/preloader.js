import gsap from 'gsap'

export function initPreloader() {
  const preloader = document.getElementById('preloader')
  if (!preloader) return

  const paths = preloader.querySelectorAll('.pre-logo path, .pre-logo ellipse')
  
  // Prepare paths for drawing
  paths.forEach(p => {
    const len = p.getTotalLength()
    p.style.strokeDasharray = len
    p.style.strokeDashoffset = len
  })

  // Set initial Y offset for fade up
  gsap.set('.pre-logo', { autoAlpha: 0, y: 20 })

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = 'none'
      // Trigger Hero entrance
      document.dispatchEvent(new Event('preloader:complete'))
    }
  })

  // 1. Logo SVG paths draw in
  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.inOut'
  })
  // 2. Logo fades to full opacity with y: 20 -> 0
  .to('.pre-logo', {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    fill: 'var(--cream)', // Transition into filled
    ease: 'power2.out'
  }, '-=0.4')
  // 3. Cream-colored panel (pre-wipe) slides up
  .to('.pre-wipe', {
    height: '100%',
    duration: 0.9,
    ease: 'expo.inOut'
  }, '+=0.2')
}
