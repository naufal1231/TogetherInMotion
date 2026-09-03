import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import Tentang from './components/About'
import MenuSection from './components/Menu'
import Galeri from './components/Gallery'
import Location from './components/Location'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf6ef]">
      <Navbar />
      <main>
        <HeroSection />
        <Tentang />
        <MenuSection />
        <Galeri />
        <Location />
      </main>
      <Footer />
    </div>
  )
}
