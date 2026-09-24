import { Plus } from 'lucide-react'
import { useLang } from '../LanguageContext.jsx'
import { waLink } from '../config.js'
import { jurista, yala } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import { Reveal, SectionHeading, WhatsAppIcon } from './ui.jsx'

export default function Work() {
  const { t } = useLang()
  const w = t.work
  const j = w.jurista

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container-site">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} id="work-title" />

        {/* ── Featured: Jurista Coffee ─────────────────────────── */}
        <Reveal
          as="article"
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-surface to-ink p-5 sm:p-10 lg:p-14"
          aria-labelledby="jurista-title"
        >
          <div aria-hidden className="pointer-events-none absolute -top-32 start-1/4 h-80 w-80 rounded-full bg-accent/15 blur-[100px]" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-medium text-accent">{j.type}</p>
            <h3 id="jurista-title" className="mt-3 text-3xl leading-tight sm:text-5xl">
              {j.name}
              <span className="text-accent">. </span>
              <span className="block text-cream/60 sm:inline">{j.tagline}</span>
            </h3>
            <p className="mt-5 text-base text-cream/80 sm:text-lg">{j.story}</p>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-2">
            {[
              { key: 'store', text: j.store, data: jurista.store },
              { key: 'experience', text: j.experience, data: jurista.experience },
            ].map(({ key, text, data }, i) => (
              <Reveal key={key} delay={i * 0.1}>
                <ProjectCard
                  as="div"
                  headingLevel={4}
                  label={`${text.label} · ${j.name}`}
                  name={text.name}
                  features={text.features}
                  tech={data.tech}
                  url={data.url}
                  desktop={data.desktop}
                  mobile={data.mobile}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ── Yala Vape ────────────────────────────────────────── */}
        <Reveal className="mt-8">
          <ProjectCard
            layout="split"
            label={w.yala.label}
            name={w.yala.name}
            type={w.yala.type}
            story={w.yala.story}
            features={w.yala.features}
            tech={yala.tech}
            url={yala.url}
            desktop={yala.desktop}
            mobile={yala.mobile}
          />
        </Reveal>

        {/* ── Your project here? ───────────────────────────────── */}
        <Reveal className="mt-8">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[1.75rem] border border-dashed border-accent/30 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 text-accent" aria-hidden>
                <Plus size={26} />
              </span>
              <h3 className="text-2xl sm:text-3xl">{w.next.title}</h3>
            </div>
            <a href={waLink(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {w.next.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
