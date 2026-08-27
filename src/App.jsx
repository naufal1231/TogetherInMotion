import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf6ef]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </div>
  )
}
