import { Link } from 'react-router-dom'
import { STUDIO, NAV_LINKS } from '../constants'
import NavLink from './NavLink'

const linkClass = 'hover:text-tide-bright transition-colors'

export default function Footer() {
  return (
    <footer className="border-t border-foam/10 pt-20 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
              Let&apos;s talk ink
            </p>
            <p className="text-foam-dim max-w-sm leading-relaxed mb-6">
              Walk-ins welcome. For custom pieces, message us with a reference
              photo and we&apos;ll quote you before you book.
            </p>
            <a
              href={STUDIO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full px-6 py-3 bg-tide text-foam text-xs uppercase tracking-widest font-semibold hover:bg-tide-bright transition-colors"
            >
              WhatsApp Us
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-foam mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-foam-dim">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} className={linkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-foam mb-5">Visit</p>
            <ul className="space-y-3 text-sm text-foam-dim">
              <li>{STUDIO.address}</li>
              <li>{STUDIO.hours}</li>
              <li>
                <a href={STUDIO.whatsapp} target="_blank" rel="noreferrer" className={linkClass}>
                  {STUDIO.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={STUDIO.instagram} target="_blank" rel="noreferrer" className={linkClass}>
                  {STUDIO.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Link
          to="/"
          aria-label="Segara Ink home"
          className="block font-display text-[16vw] md:text-[10rem] leading-[0.85] tracking-tight text-foam/[0.06] select-none whitespace-nowrap"
        >
          SEGARA INK
        </Link>

        <p className="mt-8 pt-6 border-t border-foam/10 text-xs text-foam-dim/60">
          © {new Date().getFullYear()} {STUDIO.name} · Sanur, Bali
        </p>
      </div>
    </footer>
  )
}
