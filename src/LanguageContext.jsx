import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './i18n'

const LanguageContext = createContext(null)

// Only an explicit choice (the AR/EN button) is stored, so the default stays English.
// (The old 'lang' key was auto-saved on every visit and is intentionally ignored.)
const STORAGE_KEY = 'lang-choice'

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
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
  }, [lang, dir, t])

  const toggle = useCallback(() => {
    setLang((l) => {
      const next = l === 'ar' ? 'en' : 'ar'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage unavailable, ignore */
      }
      return next
    })
  }, [])
  const value = useMemo(() => ({ lang, dir, t, toggle }), [lang, dir, t, toggle])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext)
