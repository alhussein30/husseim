import { ArrowUp } from 'lucide-react'
import { useLang } from '../LanguageContext.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-5 pb-28 pt-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-10">
        <p>{t.footer.text}</p>
        <a href="#top" className="inline-flex items-center gap-2 self-start transition hover:text-accent sm:self-auto">
          {t.footer.top}
          <ArrowUp size={16} aria-hidden />
        </a>
      </div>
    </footer>
  )
}
