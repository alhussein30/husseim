// ─── Personal details ─────────────────────────────────────────────
// Replace every [PLACEHOLDER] below. Placeholders are rendered as plain
// (non-clickable) text until you replace them, so nothing links to a broken URL.

/** WhatsApp number in international format, digits only (01211980194 → 201211980194). */
export const WHATSAPP_NUMBER = '201211980194'
export const EMAIL = 'alhusseinsalah66@gmail.com'
export const GITHUB_URL = 'https://github.com/alhussein30/'

/** "Starting from" prices in EGP, shown on the Services cards. */
export const PRICES = {
  store: '[PRICE]',
  landing: '[PRICE]',
  brand: '[PRICE]',
  care: '[PRICE]',
}

export const isPlaceholder = (value) => typeof value === 'string' && value.startsWith('[')

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
