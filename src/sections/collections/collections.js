/**
 * KOVA JEWELRY — collections.js
 * ─────────────────────────────────────────────
 * Phase 6 & 7: Clones Aupale's horizontal scroll areas.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initCollections() {
  const sections = document.querySelectorAll('.collections-section')
  
  if (!sections.length) return

  sections.forEach((section) => {
    const pinWrap = section.querySelector('.collections-pin-wrap')
    const track = section.querySelector('.collections-track')
    const cards = section.querySelectorAll('.collection-card')
    const theme = section.dataset.theme

    // Add extra scroll distance for dragging effect
    const number_of_cards = cards.length
    section.style.height = `${(number_of_cards * 100)}vh`

    // Horizontal Scroll
    const getScrollAmount = () => {
      // The track width minus the viewport width plus some padding
      return -(track.scrollWidth - window.innerWidth)
    }

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    })

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${(number_of_cards * 100) * (window.innerHeight / 100)}`,
      pin: pinWrap,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Change body color based on theme
        const bodyTheme = document.documentElement.style // Or we set on body
        
        // As a simpler method, we can trigger the color change when the section hits halfway or just let CSS var inheritance handle it if we apply it to document body
        // The spec: "Color state: Alternates — Collection 1: Cream / Collection 2: Obsidian"
      },
      onEnter: () => {
        gsap.to(document.documentElement, {
          '--bg-color': theme === 'obsidian' ? 'var(--obsidian)' : 'var(--cream)',
          duration: 1.4,
          ease: 'power2.inOut'
        })
      },
      onEnterBack: () => {
        gsap.to(document.documentElement, {
          '--bg-color': theme === 'obsidian' ? 'var(--obsidian)' : 'var(--cream)',
          duration: 1.4,
          ease: 'power2.inOut'
        })
      }
    })

    // Internal parallax for each card
    cards.forEach((card) => {
      const img = card.querySelector('.collection-img')
      gsap.fromTo(img, 
        { x: -30 }, 
        { 
          x: 30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true
          }
        }
      )
    })

    // Drag Cursor behavior
    const cursorRing = document.getElementById('cursor-ring')
    
    section.addEventListener('mouseenter', () => {
      cursorRing.setAttribute('data-label', 'DRAG')
      cursorRing.classList.add('is-dragging')
      gsap.to(cursorRing, { width: 64, height: 64, duration: 0.3 })
    })
    
    section.addEventListener('mouseleave', () => {
      cursorRing.removeAttribute('data-label')
      cursorRing.classList.remove('is-dragging')
      gsap.to(cursorRing, { width: 40, height: 40, duration: 0.3 })
    })
  })
}
