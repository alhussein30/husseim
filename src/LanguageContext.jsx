import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './i18n'

const LanguageContext = createContext(null)

function readSaved() {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSaved)
  const t = translations[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable, ignore */
    }
  }, [lang, dir, t])

  const toggle = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])
  const value = useMemo(() => ({ lang, dir, t, toggle }), [lang, dir, t, toggle])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext)
