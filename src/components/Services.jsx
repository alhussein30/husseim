import { Gem, MousePointerClick, ShoppingBag, Wrench } from 'lucide-react'
import { useLang } from '../LanguageContext.jsx'
import { PRICES } from '../config.js'
import { Reveal, SectionHeading } from './ui.jsx'

const ICONS = { store: ShoppingBag, landing: MousePointerClick, brand: Gem, care: Wrench }

export default function Services() {
  const { t } = useLang()
  const s = t.services

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} id="services-title" />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => {
            const Icon = ICONS[item.key]
            return (
              <Reveal as="li" key={item.key} delay={i * 0.08}>
                <article className="group glass flex h-full flex-col rounded-3xl p-7 transition duration-500 hover:-translate-y-1 hover:border-accent/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/[0.07] text-accent transition group-hover:shadow-glow">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{item.desc}</p>
                  <p className="mt-6 border-t border-line pt-5 text-sm font-medium text-accent-soft">
                    {s.from(PRICES[item.key])}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
