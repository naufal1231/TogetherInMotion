import { useEffect, useRef } from 'react'

/**
 * Hook untuk menampilkan elemen saat scroll ke layar
 * Menggunakan Intersection Observer untuk deteksi elemen masuk viewport
 */
export function gunakanScrollReveal() {
  const ref = useRef(null)

  const buatObserverScroll = () => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    
    observer.observe(el)
    
    return () => observer.disconnect()
  }

  useEffect(() => {
    return buatObserverScroll()
  }, [])

  return ref
}
