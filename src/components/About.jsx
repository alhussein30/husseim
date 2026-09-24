import { useLang } from '../LanguageContext.jsx'
import { Reveal } from './ui.jsx'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-site grid items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm">
          {/* accent border glow */}
          <div aria-hidden className="absolute -inset-10" style={{ background: 'radial-gradient(closest-side, rgb(var(--c-accent) / 0.25), transparent)' }} />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-accent via-accent/30 to-transparent p-px shadow-glow">
            <img
              src="/me-about.webp"
              alt={a.photoAlt}
              width="600"
              height="750"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[calc(2rem-1px)] bg-surface object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 id="about-title" className="section-title">
            {a.title}
          </h2>
          <p className="mt-6 text-lg leading-loose text-cream/80 sm:text-xl">{a.text}</p>
        </Reveal>
      </div>
    </section>
  )
}
