import { useState } from 'react'
import { CheckCircle2, Loader2, Mail, TriangleAlert } from 'lucide-react'
import { siGithub } from 'simple-icons'
import { useLang } from '../LanguageContext.jsx'
import { EMAIL, GITHUB_URL, WHATSAPP_NUMBER, isPlaceholder, waLink } from '../config.js'
import { BrandIcon, MagneticLink, Reveal, WhatsAppIcon } from './ui.jsx'

const EMPTY = { name: '', phone: '', projectType: '', message: '', company: '' }
const TYPES = ['store', 'landing', 'brand', 'other']

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = true
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15) errors.phone = true
  if (!TYPES.includes(v.projectType)) errors.projectType = true
  return errors
}

function ErrorText({ id, message }) {
  return message ? (
    <p id={`lead-${id}-error`} className="mt-1.5 text-sm text-red-300">
      {message}
    </p>
  ) : null
}

function ContactLink({ href, icon, label, value }) {
  const placeholder = isPlaceholder(href)
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block truncate text-cream" dir="ltr">
          {value}
        </span>
      </span>
    </>
  )
  return (
    <li>
      {placeholder ? (
        <span className="flex items-center gap-3">{inner}</span>
      ) : (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition hover:text-accent"
        >
          {inner}
        </a>
      )}
    </li>
  )
}

export default function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: false }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`lead-${firstInvalid}`)?.focus()
      return
    }
    // Honeypot: bots fill hidden fields, humans don't.
    if (values.company) {
      setStatus('success')
      return
    }
    setStatus('sending')
    try {
      const { saveLead } = await import('../lib/firebase.js')
      await saveLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        projectType: values.projectType,
        message: values.message.trim(),
        lang,
      })
      setStatus('success')
      setValues(EMPTY)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const fieldProps = (key) => ({
    id: `lead-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `lead-${key}-error` : undefined,
  })

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem]" style={{ background: 'radial-gradient(ellipse at bottom, rgb(var(--c-accent) / 0.14), transparent 65%)' }} />
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id="contact-title" className="section-title sm:text-6xl">
            {c.title}
          </h2>
          <p className="mt-5 text-lg text-muted">{c.sub}</p>

          <MagneticLink
            href={waLink(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group relative mt-10 !min-h-[60px] w-full !px-8 text-lg sm:w-auto"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-accent/50 opacity-0 blur-xl transition duration-500 group-hover:opacity-100"
            />
            <WhatsAppIcon className="h-6 w-6" />
            {c.whatsapp}
          </MagneticLink>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            <ContactLink href={waLink(t.whatsappMessage)} icon={<WhatsAppIcon className="h-[18px] w-[18px]" />} label="WhatsApp" value={'0' + WHATSAPP_NUMBER.slice(2)} />
            <ContactLink href={isPlaceholder(EMAIL) ? EMAIL : `mailto:${EMAIL}`} icon={<Mail size={18} aria-hidden />} label={c.email} value={EMAIL} />
            <ContactLink href={GITHUB_URL} icon={<BrandIcon icon={siGithub} className="h-[18px] w-[18px]" />} label="GitHub" value={GITHUB_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')} />
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass relative rounded-[1.75rem] p-6 sm:p-9">
            <h3 className="text-xl">{c.formTitle}</h3>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-name" className="mb-2 block text-sm text-cream/85">{c.name}</label>
                <input type="text" autoComplete="name" maxLength={100} className="field" {...fieldProps('name')} />
                <ErrorText id="name" message={errors.name && c.errors.name} />
              </div>
              <div>
                <label htmlFor="lead-phone" className="mb-2 block text-sm text-cream/85">{c.phone}</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  maxLength={20}
                  placeholder="01X XXXX XXXX"
                  className="field rtl:text-right"
                  {...fieldProps('phone')}
                />
                <ErrorText id="phone" message={errors.phone && c.errors.phone} />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="lead-projectType" className="mb-2 block text-sm text-cream/85">{c.projectType}</label>
              <select className="field appearance-none bg-[length:1rem] bg-no-repeat pe-10 [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%239494AB%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] ltr:bg-[position:right_1rem_center] rtl:bg-[position:left_1rem_center]" {...fieldProps('projectType')}>
                <option value="" disabled>{c.choose}</option>
                {TYPES.map((k) => (
                  <option key={k} value={k} className="bg-surface">
                    {c.types[k]}
                  </option>
                ))}
              </select>
              <ErrorText id="projectType" message={errors.projectType && c.errors.projectType} />
            </div>

            <div className="mt-5">
              <label htmlFor="lead-message" className="mb-2 block text-sm text-cream/85">{c.message}</label>
              <textarea rows={4} maxLength={2000} className="field resize-y" {...fieldProps('message')} />
            </div>

            {/* honeypot */}
            <div className="sr-only" aria-hidden>
              <label htmlFor="lead-company">Company</label>
              <input id="lead-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary mt-7 w-full disabled:cursor-wait disabled:opacity-70">
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden />
                  {c.sending}
                </>
              ) : (
                c.submit
              )}
            </button>

            <div aria-live="polite" role="status" className="empty:hidden">
              {status === 'success' && (
                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4 text-sm text-emerald-200">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden />
                  {c.success}
                </p>
              )}
              {status === 'error' && (
                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-400/[0.07] p-4 text-sm text-red-200">
                  <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
                  {c.error}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
