import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../LanguageContext.jsx'

const hostOf = (url) => new URL(url).host.replace(/^www\./, '')

/** Screenshot inside a browser frame, with a phone frame overlapping the corner. */
export function DeviceMockup({ url, desktop, mobile, alt }) {
  return (
    <div className="relative pb-6 pe-6 sm:pb-8 sm:pe-8" dir="ltr">
      <div className="overflow-hidden rounded-xl border border-line bg-ink shadow-2xl shadow-black/60 sm:rounded-2xl">
        <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="mx-auto truncate rounded-md bg-white/[0.04] px-3 py-0.5 text-[11px] text-muted">
            {hostOf(url)}
          </span>
        </div>
        <img
          src={desktop}
          alt={alt}
          width="1440"
          height="900"
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
        />
      </div>
      {mobile && (
        <div className="absolute bottom-0 end-0 w-[26%] min-w-[84px] overflow-hidden rounded-[1.1rem] border-[3px] border-[#25253A] bg-ink shadow-2xl shadow-black/70 sm:rounded-[1.5rem] sm:border-4">
          <img
            src={mobile}
            alt=""
            width="390"
            height="844"
            loading="lazy"
            decoding="async"
            className="aspect-[9/19.5] w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  )
}

export function Chips({ label, items, variant = 'chip' }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((f) => (
          <li key={f} className={variant}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function VisitButton({ url, name }) {
  const { t } = useLang()
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-ghost group/btn self-start"
      aria-label={`${t.work.visit}: ${name} ${t.work.newTab}`}
    >
      {t.work.visit}
      <ArrowUpRight
        size={18}
        aria-hidden
        className="transition group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-0.5"
      />
    </a>
  )
}

/**
 * A single case study: mockup + name, type, story, feature/tech chips and a live link.
 * `layout="split"` puts the mockup beside the text on large screens.
 */
export default function ProjectCard({
  name,
  label,
  type,
  story,
  features,
  tech,
  url,
  desktop,
  mobile,
  layout = 'stack',
  as = 'article',
  headingLevel = 3,
}) {
  const { t } = useLang()
  const Heading = `h${headingLevel}`
  const Comp = m[as]
  const split = layout === 'split'

  return (
    <Comp
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group glass relative flex flex-col gap-8 overflow-hidden rounded-[1.75rem] p-5 transition-colors duration-500 hover:border-accent/30 sm:p-8 ${
        split ? 'lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:p-10' : ''
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 end-0 h-60 w-60 rounded-full bg-accent/10 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100"
      />
      <DeviceMockup url={url} desktop={desktop} mobile={mobile} alt={`${name}: ${type}`} />

      <div className="flex flex-col gap-5">
        <div>
          {label && <p className="text-sm font-medium text-accent">{label}</p>}
          <Heading className="mt-1 text-2xl sm:text-3xl">{name}</Heading>
          {type && <p className="mt-1 text-sm text-muted">{type}</p>}
        </div>
        {story && <p className="text-cream/80">{story}</p>}
        <Chips label={t.work.features} items={features} />
        <Chips label={t.work.tech} items={tech} variant="chip-tech" />
        <VisitButton url={url} name={name} />
      </div>
    </Comp>
  )
}
