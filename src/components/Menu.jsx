import { useState } from 'react'
import { gunakanScrollReveal } from '../hooks/useScrollReveal'

const menuData = {
  Kopi: [
    { name: 'Espresso', desc: 'Single origin Flores, diseduh langsung', price: 'Rp 22.000' },
    { name: 'Americano', desc: 'Espresso + air panas, bersih dan kuat', price: 'Rp 25.000' },
    { name: 'Latte', desc: 'Espresso dengan steamed milk lembut, latte art', price: 'Rp 32.000' },
    { name: 'Cappuccino', desc: 'Espresso, steamed milk & foam yang sempurna', price: 'Rp 32.000' },
    { name: 'Filter Coffee', desc: 'V60 pour-over, single origin pilihan barista', price: 'Rp 35.000' },
    { name: 'Cold Brew', desc: 'Diseduh 18 jam, smooth dan tidak pahit', price: 'Rp 38.000' },
    { name: 'Iced Latte', desc: 'Espresso dingin dengan susu segar', price: 'Rp 35.000' },
  ],
  'Non-Kopi': [
    { name: 'Matcha Latte', desc: 'Ceremonial grade matcha dengan oat milk', price: 'Rp 35.000' },
    { name: 'Hojicha Latte', desc: 'Teh panggang Jepang yang earthy dan hangat', price: 'Rp 33.000' },
    { name: 'Chocolate Milk', desc: 'Dark chocolate 70% dengan susu segar', price: 'Rp 30.000' },
    { name: 'Lemon Mint Soda', desc: 'Segar, tidak terlalu manis, cocok siang hari', price: 'Rp 28.000' },
    { name: 'Fresh Bandrek', desc: 'Rempah jahe hangat ala Jawa', price: 'Rp 25.000' },
    { name: 'Seasonal Fruit Tea', desc: 'Teh buah musiman, berubah tiap minggu', price: 'Rp 28.000' },
  ],
}

const categories = Object.keys(menuData)

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Kopi')
  const sectionRef = gunakanScrollReveal()

  const pilihKategori = (cat) => {
    setActiveCategory(cat)
  }

  const renderTombolKategori = (cat) => (
    <button
      id={`menu-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
      key={cat}
      onClick={() => pilihKategori(cat)}
      className={`px-6 py-2.5 rounded-full text-sm font-light tracking-wide border transition-all duration-300 ${
        activeCategory === cat
          ? 'bg-[#8a6a4f] text-[#faf6ef] border-[#8a6a4f]'
          : 'bg-transparent text-[#5a5650] border-[#c8b9a8] hover:border-[#8a6a4f] hover:text-[#8a6a4f]'
      }`}
    >
      {cat}
    </button>
  )

  const renderItemMenu = (item) => (
    <div
      key={item.name}
      className="bg-[#f0e9dd] p-7 hover:bg-[#faf6ef] transition-colors duration-300 group"
    >
      <div className="flex justify-between items-start gap-4 mb-2">
        <h3 className="font-serif font-light text-[#1e1c1a] text-lg group-hover:text-[#8a6a4f] transition-colors duration-300">
          {item.name}
        </h3>
        <span className="text-[#8a6a4f] text-sm font-light whitespace-nowrap mt-0.5">
          {item.price}
        </span>
      </div>
      <p className="text-[#9a948d] text-sm font-light leading-relaxed">
        {item.desc}
      </p>
    </div>
  )

  return (
    <section
      id="menu"
      className="py-28 md:py-36 bg-[#f0e9dd]"
      aria-label="Menu"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={sectionRef} className="reveal mb-16">
          <p className="text-[#8a6a4f] text-xs tracking-[0.3em] uppercase font-light mb-4">
            Menu
          </p>
          <h2 className="font-serif font-light text-[#1e1c1a] text-4xl md:text-5xl tracking-wide">
            Apa yang ingin
            <br />
            kamu nikmati hari ini?
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-14">
          {categories.map(renderTombolKategori)}
        </div>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#d9cfc3]">
          {menuData[activeCategory].map(renderItemMenu)}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-[#9a948d] text-xs font-light text-center tracking-wide">
          Semua minuman tersedia panas atau dingin · Harga sudah termasuk PPN
        </p>
      </div>
    </section>
  )
}
