import { useLang } from '../LanguageContext.jsx'
import { Reveal, SectionHeading } from './ui.jsx'

export default function Process() {
  const { t } = useLang()
  const p = t.process

  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container-site">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} id="process-title" />

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {/* connecting line on desktop */}
          <span aria-hidden className="absolute inset-x-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 lg:block" />
          {p.steps.map((step, i) => (
            <Reveal as="li" key={step.num} delay={i * 0.1} className="relative lg:pe-8">
              <div className="glass rounded-3xl p-7 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
                <span className="relative inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-accent/30 bg-ink text-xl font-bold text-accent">
                  {step.num}
                </span>
                <h3 className="mt-6 text-xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
