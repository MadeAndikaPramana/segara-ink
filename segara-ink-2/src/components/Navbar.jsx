import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../constants'
import NavLink from './NavLink'
import MagneticButton from './MagneticButton'

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
      className="fixed top-3 md:top-5 inset-x-0 z-50 px-3 md:px-6 pointer-events-none"
    >
      {/* Floating pill: detached from the viewport edge, turns into frosted
          glass once the page scrolls so it never fights the content under it. */}
      <div
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full border transition-all duration-300 ${
          scrolled || open
            ? 'bg-ink/70 backdrop-blur-xl border-foam/15 shadow-lg shadow-ink/50'
            : 'bg-ink/20 backdrop-blur-sm border-foam/10'
        }`}
      >
        <nav className="flex items-center justify-between gap-4 pl-6 pr-2 py-2">
          <Link to="/" className="font-display text-lg md:text-xl tracking-wide text-foam leading-none">
            SEGARA <span className="text-tide-bright">INK</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest text-foam-dim">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} className="hover:text-tide-bright transition-colors">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <MagneticButton
            to="/book"
            strength={0.4}
            className="hidden lg:inline-block rounded-full text-xs uppercase tracking-widest font-semibold px-5 py-2.5 bg-tide text-foam hover:bg-tide-bright transition-colors"
          >
            Book Now
          </MagneticButton>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full text-foam text-xl leading-none flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-foam/10">
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
                  className="rounded-full text-xs uppercase tracking-widest font-semibold px-5 py-3 bg-tide text-foam text-center"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
