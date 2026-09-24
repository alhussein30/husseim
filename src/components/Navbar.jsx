import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../LanguageContext.jsx'

const LINKS = ['work', 'services', 'process', 'about', 'contact']

export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link of the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const langButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.switchLabel}
      lang={lang === 'ar' ? 'en' : 'ar'}
      className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-line px-3 text-sm font-semibold text-cream/90 transition hover:border-accent/50 hover:text-accent"
    >
      {t.nav.switchShort}
    </button>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ink/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between gap-4 sm:h-20" aria-label="Main">
        <a
          href="#top"
          dir="ltr"
          className="font-en text-xl font-extrabold tracking-tight text-cream"
          aria-label={t.nav.home}
          onClick={() => setOpen(false)}
        >
          Alhussein<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition hover:text-cream ${
                  active === id ? 'text-accent' : 'text-muted'
                }`}
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {langButton}
          <a href="#contact" className="btn-primary hidden !min-h-10 !px-5 text-sm md:inline-flex">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-site flex flex-col gap-1 pb-6 pt-2">
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-lg text-cream"
                  >
                    {t.nav[id]}
                    {active === id && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  {t.nav.cta}
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
