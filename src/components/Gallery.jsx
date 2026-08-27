import { useScrollReveal } from '../hooks/useScrollReveal'

const photos = [
  {
    src: '/hero_interior.jpg',
    alt: 'Suasana dalam Together In Motion yang hangat',
    className: 'md:col-span-2 md:row-span-2',
    aspect: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    src: '/gallery_coffee.jpg',
    alt: 'Latte art cantik di atas meja kayu',
    className: '',
    aspect: 'aspect-square',
  },
  {
    src: '/gallery_food.jpg',
    alt: 'Avocado toast segar dengan telur setengah matang',
    className: '',
    aspect: 'aspect-square',
  },
  {
    src: '/gallery_space.jpg',
    alt: 'Sudut nyaman dengan kursi rotan dan rak buku',
    className: 'md:col-span-2',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/gallery_drinks.jpg',
    alt: 'Cold brew dan matcha latte di atas meja marmer',
    className: '',
    aspect: 'aspect-square',
  },
  {
    src: '/gallery_window.jpg',
    alt: 'Momen tenang di jendela kafe dengan pemandangan hijau',
    className: '',
    aspect: 'aspect-square',
  },
]

export default function Gallery() {
  const headerRef = useScrollReveal()

  return (
    <section
      id="galeri"
      className="py-28 md:py-36 bg-[#faf6ef]"
      aria-label="Galeri foto"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-16">
          <p className="text-[#8a6a4f] text-xs tracking-[0.3em] uppercase font-light mb-4">
            Galeri
          </p>
          <h2 className="font-serif font-light text-[#1e1c1a] text-4xl md:text-5xl tracking-wide">
            Sekilas suasana
            <br />
            <em className="not-italic text-[#8a6a4f]">di sini</em>
          </h2>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 md:grid-rows-[280px_280px]">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`overflow-hidden rounded-xl group ${photo.className}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-full h-full ${photo.aspect} overflow-hidden`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <p className="mt-10 text-[#9a948d] text-sm font-light text-center">
          Foto-foto di atas adalah gambaran suasana sehari-hari di Together In Motion.
        </p>
      </div>
    </section>
  )
}
