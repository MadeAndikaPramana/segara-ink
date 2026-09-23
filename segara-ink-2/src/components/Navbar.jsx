import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../constants'
import NavLink from './NavLink'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-foam/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl tracking-wide text-foam leading-none">
          SEGARA <span className="text-tide-bright">INK</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm uppercase tracking-widest text-foam-dim">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} className="hover:text-tide-bright transition-colors">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/book"
          className="hidden lg:inline-block text-xs uppercase tracking-widest font-semibold px-5 py-2.5 border border-tide-bright text-foam hover:bg-tide-bright transition-colors"
        >
          Book Now
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-foam text-2xl leading-none"
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden bg-ink border-t border-foam/10 px-6 py-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="uppercase tracking-widest text-sm text-foam-dim hover:text-tide-bright"
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-widest font-semibold px-5 py-2.5 border border-tide-bright text-foam text-center"
          >
            Book Now
          </Link>
        </motion.div>
      )}
    </motion.header>
  )
}
