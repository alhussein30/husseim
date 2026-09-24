import { useLang } from '../LanguageContext.jsx'
import { waLink } from '../config.js'
import { WhatsAppIcon } from './ui.jsx'

/** Floating WhatsApp button: bottom-left in RTL, bottom-right in LTR (via `end-*`). */
export default function WhatsAppFab() {
  const { t } = useLang()
  return (
    <a
      href={waLink(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.fab}
      title={t.fab}
      className="group fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-glow transition duration-300 hover:scale-105 hover:bg-accent-soft sm:bottom-8 sm:end-8"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-accent/30 [animation-duration:2.5s] motion-reduce:hidden" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  )
}
