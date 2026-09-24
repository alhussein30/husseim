import { m } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLang } from '../LanguageContext.jsx'
import { waLink } from '../config.js'
import { MagneticLink, WhatsAppIcon } from './ui.jsx'

const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-44">
      {/* Soft accent glow + faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 start-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] rtl:translate-x-1/2 sm:h-[48rem] sm:w-[48rem]" />
        <div className="absolute -bottom-40 -end-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-site grid items-center gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <m.p {...fade(0)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-cream/85">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {h.tag}
          </m.p>

          {/* Headline is not animated from opacity 0 so it counts as LCP right away */}
          <h1 className="mt-7 max-w-4xl text-[2.35rem] leading-[1.15] sm:text-6xl xl:text-7xl">
            {h.title}
          </h1>

          <m.p {...fade(0.15)} className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
            {h.sub}
          </m.p>

          <m.div {...fade(0.25)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticLink href="#work" className="btn-primary group relative sm:!px-8">
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-accent/50 opacity-0 blur-xl transition duration-500 group-hover:opacity-100"
              />
              {h.primary}
              <ArrowDown size={18} aria-hidden className="transition group-hover:translate-y-0.5" />
            </MagneticLink>
            <a href={waLink(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {h.secondary}
            </a>
          </m.div>

          <m.ul
            {...fade(0.35)}
            className="mt-14 grid max-w-2xl grid-cols-3 divide-x divide-line border-y border-line rtl:divide-x-reverse"
          >
            {h.stats.map((s) => (
              <li key={s.value} className="px-3 py-5 first:ps-0 sm:px-6">
                <span className="block text-lg font-bold text-cream sm:text-2xl">{s.value}</span>
                {s.label && <span className="mt-1 block text-xs text-muted sm:text-sm">{s.label}</span>}
              </li>
            ))}
          </m.ul>
        </div>

        <m.figure
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden w-full lg:block"
        >
          <div aria-hidden className="absolute -inset-10" style={{ background: 'radial-gradient(closest-side, rgb(var(--c-accent) / 0.28), transparent)' }} />
          <div className="relative rounded-[2rem] bg-gradient-to-b from-accent/70 via-accent/15 to-white/5 p-px shadow-glow">
            <img
              src="/me.webp"
              srcSet="/me-480.webp 480w, /me.webp 800w"
              sizes="34vw"
              alt={h.photoAlt}
              width="800"
              height="1000"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[calc(2rem-1px)] bg-surface object-cover"
            />
            <div aria-hidden className="absolute inset-x-px bottom-px h-1/3 rounded-b-[calc(2rem-1px)] bg-gradient-to-t from-ink/80 to-transparent" />
          </div>
          <figcaption className="glass absolute -bottom-5 start-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm text-cream shadow-xl shadow-black/40 rtl:translate-x-1/2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {h.available}
          </figcaption>
        </m.figure>
      </div>
    </section>
  )
}
