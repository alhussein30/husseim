/* eslint-disable react-refresh/only-export-components */
import { useRef } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { siWhatsapp } from 'simple-icons'

const EASE = [0.22, 1, 0.36, 1]

/** Fades children up the first time they scroll into view. */
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const Comp = m[as]
  return (
    <Comp
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SectionHeading({ eyebrow, title, id, className = '' }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
    </Reveal>
  )
}

/** Monochrome brand glyph from simple-icons. */
export function BrandIcon({ icon, className = 'h-5 w-5', title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  )
}

export const WhatsAppIcon = (props) => <BrandIcon icon={siWhatsapp} {...props} />

/** Link that gently follows the pointer (desktop only, off for reduced motion). */
export function MagneticLink({ className, children, strength = 0.25, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      {...rest}
    >
      {children}
    </m.a>
  )
}
