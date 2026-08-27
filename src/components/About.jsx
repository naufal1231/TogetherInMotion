import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const textRef = useScrollReveal()
  const imageRef = useScrollReveal()

  return (
    <section
      id="tentang"
      className="py-28 md:py-36 bg-[#faf6ef]"
      aria-label="Tentang kami"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <p className="text-[#8a6a4f] text-xs tracking-[0.3em] uppercase font-light mb-16">
          Tentang Kami
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="reveal order-2 md:order-1">
            <div className="relative">
              <img
                src="/about_barista.jpg"
                alt="Barista Together In Motion sedang menyeduh kopi"
                className="w-full h-[480px] md:h-[560px] object-cover rounded-2xl"
                loading="lazy"
              />
              {/* Small accent element */}
              <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl bg-[#f0e9dd] -z-10" />
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="reveal reveal-delay-1 order-1 md:order-2">
            <h2 className="font-serif font-light text-[#1e1c1a] text-4xl md:text-5xl leading-tight tracking-wide mb-8">
              Bukan sekadar
              <br />
              <em className="not-italic text-[#8a6a4f]">tempat nongkrong</em>
            </h2>
            <div className="space-y-5 text-[#5a5650] font-light leading-[1.85] text-base md:text-[17px]">
              <p>
                Together In Motion lahir dari keinginan sederhana — menyediakan ruang di mana orang bisa beristirahat sejenak dari rutinitas, berbagi cerita, atau sekadar diam sambil menikmati secangkir kopi yang diseduh dengan sungguh-sungguh.
              </p>
              <p>
                Kami ada di sudut Merjosari, Malang, dengan interior hangat yang sengaja kami rancang agar kamu merasa seperti di rumah sendiri. Tidak ada tekanan, tidak ada terburu-buru. Hanya kamu, waktu, dan kopi yang tepat.
              </p>
              <p>
                Dari biji kopi pilihan lokal hingga makanan yang dibuat dengan bahan segar setiap hari — semuanya kami siapkan dengan penuh perhatian.
              </p>
            </div>

            {/* Small stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-10 border-t border-[#e8ddd0]">
              {[
                { num: '2019', label: 'Berdiri' },
                { num: '11+', label: 'Jam buka per hari' },
                { num: '100%', label: 'Biji kopi lokal' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif font-light text-[#8a6a4f] text-2xl mb-1">{stat.num}</p>
                  <p className="text-[#9a948d] text-xs font-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
