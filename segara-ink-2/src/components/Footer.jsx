import { Link } from 'react-router-dom'
import { STUDIO, NAV_LINKS } from '../constants'
import NavLink from './NavLink'

export default function Footer() {
  return (
    <footer className="border-t border-foam/10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="font-display text-xl tracking-wide text-foam leading-none">
          SEGARA <span className="text-tide-bright">INK</span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-foam-dim">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} className="hover:text-tide-bright transition-colors">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="text-xs text-foam-dim/60">
          © {new Date().getFullYear()} {STUDIO.name} · Sanur, Bali
        </p>
      </div>
    </footer>
  )
}
