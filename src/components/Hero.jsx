import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion'

export default function Hero() {
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const heroRef = useRef(null)

  // Mouse tracking values (relative to hero container)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Initialize hasHover based on media query
  const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)') : null
  const [hasHover, setHasHover] = useState(mediaQuery?.matches ?? false)

  useEffect(() => {
    if (!mediaQuery) return
    
    const handleChange = (e) => setHasHover(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mediaQuery])

  // Spring configuration for smooth animation
  const springConfig = { damping: 25, stiffness: 180, restDelta: 0.01 }

  // Smoothed rotation values with springs
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [3, -3]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-3, 3]),
    springConfig
  )

  // Parallax layers - different intensities for depth effect
  const photoRotateX = useTransform(rotateX, (v) => `${v * 0.6}deg`)
  const photoRotateY = useTransform(rotateY, (v) => `${v * 0.6}deg`)
  const photoTranslateZ = useMotionTemplate`-20px`

  const overlayRotateX = useTransform(rotateX, (v) => `${v * 0.8}deg`)
  const overlayRotateY = useTransform(rotateY, (v) => `${v * 0.8}deg`)
  const overlayTranslateZ = useMotionTemplate`-10px`

  const textRotateX = useTransform(rotateX, (v) => `${v * 1.2}deg`)
  const textRotateY = useTransform(rotateY, (v) => `${v * 1.2}deg`)
  const textTranslateZ = useMotionTemplate`40px`

  // Handle mouse movement relative to hero container
  const handleMouseMove = (e) => {
    if (!heroRef.current || !hasHover) return

    const rect = heroRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to center (0 to 1 range)
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  // Reset to neutral position on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Scroll-based parallax for mobile (fallback)
  useEffect(() => {
    if (hasHover) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxFactor = 0.05

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${scrollY * parallaxFactor}px)`
      }
      if (subRef.current) {
        subRef.current.style.transform = `translateY(${scrollY * parallaxFactor * 0.7}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasHover])

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      titleRef.current?.classList.add('visible')
      setTimeout(() => subRef.current?.classList.add('visible'), 200)
      setTimeout(() => ctaRef.current?.classList.add('visible'), 400)
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen flex items-end overflow-hidden perspective-container"
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image layer (back) */}
      <div className="absolute inset-0 preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: useMotionTemplate`rotateX(${photoRotateX}) rotateY(${photoRotateY}) translateZ(${photoTranslateZ})`,
          }}
        >
          <img
            src="/hero_interior.jpg"
            alt="Interior Together In Motion"
            className="w-full h-full object-cover object-center"
            loading="eager"
            style={{ willChange: 'transform' }}
          />
        </div>

        {/* Gradient overlay — warm dark from bottom (middle layer) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 via-[#1a1410]/30 to-transparent will-change-transform"
          style={{
            transform: useMotionTemplate`rotateX(${overlayRotateX}) rotateY(${overlayRotateY}) translateZ(${overlayTranslateZ})`,
          }}
        />
      </div>

      {/* Content (front layer - appears to float above photo) */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 md:pb-32 will-change-transform"
        style={{
          transform: useMotionTemplate`rotateX(${textRotateX}) rotateY(${textRotateY}) translateZ(${textTranslateZ})`,
        }}
      >
        <p
          ref={subRef}
          className="reveal text-[#faf6ef]/60 text-sm tracking-[0.25em] uppercase font-light mb-5"
        >
          Kafe & Ruang Bersama · Malang
        </p>
        <h1
          ref={titleRef}
          className="reveal font-serif font-light text-[#faf6ef] text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-wider mb-6 max-w-3xl"
        >
          Together
          <br />
          <em className="not-italic">In Motion</em>
        </h1>
        <p
          ref={subRef}
          className="reveal reveal-delay-1 text-[#faf6ef]/75 text-lg md:text-xl font-light max-w-md leading-relaxed mb-10"
        >
          Tempat di mana waktu terasa lebih pelan, kopi lebih hangat, dan percakapan lebih bermakna.
        </p>
        <div
          ref={ctaRef}
          className="reveal reveal-delay-2 flex flex-wrap gap-4"
        >
          <a
            id="hero-cta-menu"
            href="#menu"
            className="inline-block px-7 py-3.5 bg-[#faf6ef] text-[#1e1c1a] rounded-full text-sm font-medium tracking-wide hover:bg-[#f0e9dd] transition-all duration-300"
          >
            Lihat Menu
          </a>
          <a
            id="hero-cta-whatsapp"
            href="https://wa.me/6288102634685"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3.5 border border-[#faf6ef]/50 text-[#faf6ef] rounded-full text-sm font-light tracking-wide hover:bg-[#faf6ef]/10 hover:border-[#faf6ef]/80 transition-all duration-300"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-10 bg-[#faf6ef] animate-pulse" />
      </div>

      {/* CSS for perspective and 3D */}

      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  )
}
