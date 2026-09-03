import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion'

/**
 * Komponen Hero dengan efek 3D Parallax
 * Foto latar belakang akan bergerak mengikuti posisi mouse untuk efek kedalaman 3D
 */
export default function HeroSection() {
  // Referensi untuk elemen-elemen yang akan dianimasikan
  const titleRef = useRef(null)  // Judul utama
  const subRef = useRef(null)    // Sub judul
  const ctaRef = useRef(null)    // Tombol aksi
  const heroRef = useRef(null)   // Container hero

  // Nilai posisi mouse (relatif terhadap container hero, range 0-1)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Deteksi apakah perangkat mendukung hover (desktop) atau tidak (mobile)
  const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)') : null
  const [hasHover, setHasHover] = useState(mediaQuery?.matches ?? false)

  // Konfigurasi spring animation untuk gerakan yang halus dan natural
  // damping: kontrol bouncing (makin besar makin kaku)
  // stiffness: kecepatan respon (makin besar makin cepat)
  const springConfig = { damping: 25, stiffness: 180, restDelta: 0.01 }

  // Konversi posisi mouse menjadi rotasi 3D dengan efek spring (halus)
  // mouseY 0-1 → rotateX 3° sampai -3°
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [3, -3]),
    springConfig
  )
  // mouseX 0-1 → rotateY -3° sampai 3°
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-3, 3]),
    springConfig
  )

  // Layer parallax - setiap layer punya intensitas berbeda untuk efek kedalaman
  // Layer paling belakang (foto): gerakan paling kecil (0.6x)
  const photoRotateX = useTransform(rotateX, (v) => `${v * 0.6}deg`)
  const photoRotateY = useTransform(rotateY, (v) => `${v * 0.6}deg`)
  const photoTranslateZ = useMotionTemplate`-20px` // Posisi foto di belakang

  // Layer tengah (overlay gelap): gerakan sedang (0.8x)
  const overlayRotateX = useTransform(rotateX, (v) => `${v * 0.8}deg`)
  const overlayRotateY = useTransform(rotateY, (v) => `${v * 0.8}deg`)
  const overlayTranslateZ = useMotionTemplate`-10px` // Posisi overlay di tengah

  // Layer depan (teks): gerakan paling besar (1.2x) → terlihat lebih dekat
  const textRotateX = useTransform(rotateX, (v) => `${v * 1.2}deg`)
  const textRotateY = useTransform(rotateY, (v) => `${v * 1.2}deg`)
  const textTranslateZ = useMotionTemplate`40px` // Posisi teks di depan

  // ===== FUNCTION UTAMA DALAM BAHASA INDONESIA =====

  const pantauPerubahanHover = (e) => setHasHover(e.matches)

  const hitungPosisiMouse = (e) => {
    if (!heroRef.current || !hasHover) return

    const rect = heroRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  const aturUlangPosisiMouse = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const terapkanParallaksScroll = () => {
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
  }

  const animasiElemen = () => {
    const timer = setTimeout(() => {
      titleRef.current?.classList.add('visible')
      setTimeout(() => subRef.current?.classList.add('visible'), 200)
      setTimeout(() => ctaRef.current?.classList.add('visible'), 400)
    }, 150)
    return () => clearTimeout(timer)
  }

  // ===== HOOK EFFECTS =====

  useEffect(() => {
    if (!mediaQuery) return
    mediaQuery.addEventListener('change', pantauPerubahanHover)
    return () => mediaQuery.removeEventListener('change', pantauPerubahanHover)
  }, [mediaQuery])

  useEffect(() => {
    return terapkanParallaksScroll()
  }, [hasHover])

  useEffect(() => {
    return animasiElemen()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen flex items-end overflow-hidden perspective-container"
      aria-label="Hero"
      onMouseMove={hitungPosisiMouse}
      onMouseLeave={aturUlangPosisiMouse}
    >
      {/* Layer gambar latar belakang (paling belakang) */}
      <div className="absolute inset-0 preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
        {/* Container gambar yang akan berputar 3D */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: useMotionTemplate`rotateX(${photoRotateX}) rotateY(${photoRotateY}) translateZ(${photoTranslateZ})`,
          }}
        >
          <img
            src="/TogetherInMotion/hero_interior.jpg"
            alt="Interior Together In Motion"
            className="w-full h-full object-cover object-center"
            loading="eager"
            style={{ willChange: 'transform' }}
          />
        </div>

        {/* Overlay gradasi gelap (layer tengah) */}
        {/* Gradasi dari hitam pekat di bawah ke transparan di atas */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 via-[#1a1410]/30 to-transparent will-change-transform"
          style={{
            transform: useMotionTemplate`rotateX(${overlayRotateX}) rotateY(${overlayRotateY}) translateZ(${overlayTranslateZ})`,
          }}
        />
      </div>

      {/* Konten teks (layer paling depan - terlihat mengambang di atas foto) */}
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
          {/* Tombol Lihat Menu */}
          <a
            id="hero-cta-menu"
            href="#menu"
            className="inline-block px-7 py-3.5 bg-[#faf6ef] text-[#1e1c1a] rounded-full text-sm font-medium tracking-wide hover:bg-[#f0e9dd] transition-all duration-300"
          >
            Lihat Menu
          </a>
          {/* Tombol Chat WhatsApp */}
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

      {/* Indikator scroll (panah ke bawah) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-10 bg-[#faf6ef] animate-pulse" />
      </div>

      {/* CSS khusus untuk efek perspective 3D */}
      <style>{`
        .perspective-container {
          perspective: 1000px; /* Jarak kamera ke layar */
        }
        .preserve-3d {
          transform-style: preserve-3d; /* Biarkan child elements tetap 3D */
        }
      `}</style>
    </section>
  )
}
