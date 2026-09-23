import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Reveal from './Reveal'
import { STUDIO } from '../constants'
import { BRANCHES } from '../data/branches'

// Phone/WhatsApp, email, and Instagram-of-record are shared studio-wide.
// Only address, hours, and the map differ per branch (and Sanur 2 has its
// own Instagram account, shown separately below).
const sharedRows = [
  { label: 'WhatsApp', value: STUDIO.phoneDisplay, href: STUDIO.whatsapp },
  { label: 'Email', value: STUDIO.email, href: `mailto:${STUDIO.email}` },
]

export default function Location() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id)
  const active = BRANCHES.find((b) => b.id === activeId) || BRANCHES[0]

  return (
    <section
      id="location"
      className="py-28 md:py-36 bg-gradient-to-b from-transparent via-ink-soft/85 to-transparent [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
            Visit Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foam mb-8">
            Come say hi.
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveId(b.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                  activeId === b.id
                    ? 'bg-tide border-tide text-foam'
                    : 'border-foam/20 text-foam-dim hover:border-foam/50 hover:text-foam'
                }`}
              >
                {b.short}
              </button>
            ))}
          </div>

          <dl className="divide-y divide-foam/10 border-y border-foam/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4">
                  <dt className="w-28 shrink-0 text-[11px] uppercase tracking-widest text-foam-dim">
                    Address
                  </dt>
                  <dd>
                    <a
                      href={active.mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foam hover:text-tide-bright transition-colors"
                    >
                      {active.address}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4">
                  <dt className="w-28 shrink-0 text-[11px] uppercase tracking-widest text-foam-dim">
                    Hours
                  </dt>
                  <dd className="text-foam">{active.hours}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4">
                  <dt className="w-28 shrink-0 text-[11px] uppercase tracking-widest text-foam-dim">
                    Instagram
                  </dt>
                  <dd>
                    <a
                      href={active.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foam hover:text-tide-bright transition-colors"
                    >
                      {active.instagramHandle}
                    </a>
                  </dd>
                </div>
              </motion.div>
            </AnimatePresence>

            {sharedRows.map((row) => (
              <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4">
                <dt className="w-28 shrink-0 text-[11px] uppercase tracking-widest text-foam-dim">
                  {row.label}
                </dt>
                <dd>
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foam hover:text-tide-bright transition-colors"
                  >
                    {row.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={STUDIO.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-10 px-8 py-3.5 bg-tide text-foam text-sm uppercase tracking-widest font-semibold hover:bg-tide-bright transition-colors"
          >
            Book via WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.15} className="min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              title={`${active.name} location`}
              src={active.mapsEmbed}
              className="w-full h-full min-h-[360px] border border-foam/10 grayscale contrast-125 invert-[0.92] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
