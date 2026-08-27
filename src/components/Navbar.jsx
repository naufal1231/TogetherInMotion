import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Menu', href: '#menu' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Lokasi', href: '#lokasi' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#faf6ef]/95 backdrop-blur-sm border-b border-[#e8ddd0] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className={`font-serif text-lg tracking-wider transition-colors duration-300 ${
            scrolled ? 'text-[#1e1c1a]' : 'text-[#faf6ef]'
          }`}
        >
          Together In Motion
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-[300] tracking-wide transition-colors duration-300 hover:opacity-60 ${
                  scrolled ? 'text-[#5a5650]' : 'text-[#faf6ef]/85'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/6288102634685"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
                scrolled
                  ? 'border-[#8a6a4f] text-[#8a6a4f] hover:bg-[#8a6a4f] hover:text-[#faf6ef]'
                  : 'border-[#faf6ef]/70 text-[#faf6ef] hover:bg-[#faf6ef]/10'
              }`}
            >
              WhatsApp
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          id="nav-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-1 transition-colors ${
            scrolled ? 'text-[#1e1c1a]' : 'text-[#faf6ef]'
          }`}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#faf6ef]/97 backdrop-blur-sm border-b border-[#e8ddd0]`}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#5a5650] text-base font-light tracking-wide hover:text-[#8a6a4f] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/6288102634685"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm px-5 py-2.5 rounded-full border border-[#8a6a4f] text-[#8a6a4f] hover:bg-[#8a6a4f] hover:text-[#faf6ef] transition-all"
            >
              Chat WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
