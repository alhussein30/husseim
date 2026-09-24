// Generates the social share image and touch icon.
// Usage: npm run placeholders      (won't overwrite existing files; pass --force to regenerate)
// Also converts any PNG/JPG you drop in /public/work/_raw/ into optimized WebP in /public/work/.
import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const PUB = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const force = process.argv.includes('--force')
const out = (f) => join(PUB, f)
const make = async (file, svg, fmt) => {
  if (existsSync(out(file)) && !force) return console.log('skip', file)
  await sharp(Buffer.from(svg))[fmt]({ quality: 82 }).toFile(out(file))
  console.log('made', file)
}

const glow = `<defs><radialGradient id="g" cx="50%" cy="0%" r="80%"><stop offset="0" stop-color="#818CF8" stop-opacity=".35"/><stop offset="1" stop-color="#0B0B14" stop-opacity="0"/></radialGradient></defs>`

await make('og.jpg', `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${glow}
  <rect width="100%" height="100%" fill="#0B0B14"/><rect width="100%" height="100%" fill="url(#g)"/>
  <text x="90" y="250" font-family="Arial" font-weight="800" font-size="88" fill="#EDEDF5">Alhussein<tspan fill="#818CF8">.</tspan></text>
  <text x="90" y="340" font-family="Arial" font-size="40" fill="#EDEDF5">I build online stores that look premium</text>
  <text x="90" y="395" font-family="Arial" font-size="40" fill="#EDEDF5">and actually sell.</text>
  <rect x="90" y="460" width="60" height="3" fill="#818CF8"/>
  <text x="90" y="520" font-family="Arial" font-size="28" fill="#9494AB">Front-End Developer · Egypt · AR + EN</text></svg>`, 'jpeg')

await make('apple-touch-icon.png', `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" fill="#0B0B14"/>
  <text x="82" y="128" font-family="Arial" font-weight="800" font-size="108" fill="#EDEDF5" text-anchor="middle">A</text>
  <circle cx="138" cy="118" r="13" fill="#818CF8"/></svg>`, 'png')

// Screenshots: /public/work/_raw/*.png|jpg → /public/work/*.webp
const RAW = out('work/_raw')
if (existsSync(RAW)) {
  mkdirSync(out('work'), { recursive: true })
  for (const f of readdirSync(RAW).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const { name } = parse(f)
    const mobile = name.endsWith('-mobile')
    await sharp(join(RAW, f))
      .resize({ width: mobile ? 390 : 1440, height: mobile ? 844 : 900, fit: 'cover', position: 'top' })
      .webp({ quality: 78 })
      .toFile(out(`work/${name}.webp`))
    console.log('converted', `work/${name}.webp`)
  }
}
