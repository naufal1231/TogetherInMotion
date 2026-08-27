import { useScrollReveal } from '../hooks/useScrollReveal'

const hours = [
  { day: 'Senin – Jumat', time: '09.00 – 23.00' },
  { day: 'Sabtu', time: '08.00 – 23.00' },
  { day: 'Minggu', time: '08.00 – 23.00' },
]

export default function Location() {
  const textRef = useScrollReveal()
  const mapRef = useScrollReveal()

  return (
    <section
      id="lokasi"
      className="py-28 md:py-36 bg-[#f0e9dd]"
      aria-label="Lokasi dan jam buka"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <p className="text-[#8a6a4f] text-xs tracking-[0.3em] uppercase font-light mb-16">
          Lokasi & Jam Buka
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info */}
          <div ref={textRef} className="reveal">
            <h2 className="font-serif font-light text-[#1e1c1a] text-4xl md:text-5xl tracking-wide leading-tight mb-12">
              Kami tunggu
              <br />
              kamu di sini
            </h2>

            {/* Address */}
            <div className="mb-10">
              <p className="text-[#9a948d] text-xs tracking-[0.2em] uppercase font-light mb-3">
                Alamat
              </p>
              <address className="not-italic text-[#1e1c1a] font-light leading-relaxed text-base">
                Jl. Mertojoyo Selatan Blk. C No.1,
                <br />
                Merjosari, Kec. Lowokwaru,
                <br />
                Kota Malang, Jawa Timur 65145
              </address>
              <a
                id="location-maps-link"
                href="https://maps.google.com/?q=Together+In+Motion+Malang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#8a6a4f] text-sm font-light border-b border-[#8a6a4f]/40 hover:border-[#8a6a4f] transition-colors duration-300 tracking-wide"
              >
                Buka di Google Maps →
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="text-[#9a948d] text-xs tracking-[0.2em] uppercase font-light mb-5">
                Jam Buka
              </p>
              <ul className="space-y-4">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between items-center py-3 border-b border-[#d9cfc3]">
                    <span className="text-[#5a5650] font-light text-sm">{h.day}</span>
                    <span className="text-[#1e1c1a] font-light text-sm tracking-wide">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[#9a948d] text-xs font-light">
                * Jam buka bisa berubah saat hari libur nasional
              </p>
            </div>

            {/* Contact quick */}
            <div className="mt-10 pt-10 border-t border-[#d9cfc3]">
              <p className="text-[#9a948d] text-xs tracking-[0.2em] uppercase font-light mb-4">
                Hubungi Kami
              </p>
              <a
                href="https://wa.me/6288102634685"
                target="_blank"
                rel="noopener noreferrer"
                id="location-whatsapp-cta"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#8a6a4f] text-[#faf6ef] rounded-full text-sm font-light tracking-wide hover:bg-[#5e4535] transition-colors duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                0881-0263-46835
              </a>
            </div>
          </div>

          {/* Map */}
          <div ref={mapRef} className="reveal reveal-delay-1">
            <div className="rounded-2xl overflow-hidden h-[380px] lg:h-full min-h-[380px] shadow-sm border border-[#d9cfc3]">
              <iframe
                title="Lokasi Together In Motion di Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.596831578658!2d112.60563291477458!3d-7.960083394177698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629c1d8d2f853%3A0x6e0dd65f91bae4d7!2sJl.%20Mertojoyo%20Sel.%2C%20Merjosari%2C%20Kec.%20Lowokwaru%2C%20Kota%20Malang%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1693000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'sepia(15%) saturate(90%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
