import { ArrowRight, Cloud, Flame, Languages, Zap } from 'lucide-react'
import { siFirebase, siGithub, siReact, siTailwindcss, siVercel } from 'simple-icons'
import { useLang } from '../LanguageContext.jsx'
import { BrandIcon, Reveal, SectionHeading } from './ui.jsx'

const ICONS = [Zap, Languages, Flame, Cloud]
const STACK = [
  { icon: siReact, name: 'React' },
  { icon: siFirebase, name: 'Firebase' },
  { icon: siGithub, name: 'GitHub' },
  { icon: siVercel, name: 'Vercel' },
  { icon: siTailwindcss, name: 'Tailwind CSS' },
]

export default function WhyMe() {
  const { t } = useLang()
  const w = t.why

  return (
    <section id="why" className="section" aria-labelledby="why-title">
      <div className="container-site">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} id="why-title" />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {w.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08} className="group bg-ink p-7 transition hover:bg-surface sm:p-9">
                <Icon size={22} className="text-accent" aria-hidden />
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg sm:text-xl">
                  <span className="font-bold text-cream">{item.title}</span>
                  <ArrowRight size={18} className="text-accent rtl:-scale-x-100" aria-hidden />
                  <span className="text-muted transition group-hover:text-cream/85">{item.benefit}</span>
                </p>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="text-sm text-muted">{w.stack}</p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
            {STACK.map(({ icon, name }) => (
              <li key={name} className="flex items-center gap-2.5 text-cream/60 transition hover:text-cream">
                <BrandIcon icon={icon} className="h-6 w-6" />
                <span className="font-en text-sm font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
