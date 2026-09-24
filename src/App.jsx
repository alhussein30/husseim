import { useLang } from './LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import WhyMe from './components/WhyMe.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'

export default function App() {
  const { t } = useLang()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-accent px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Process />
        <WhyMe />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
