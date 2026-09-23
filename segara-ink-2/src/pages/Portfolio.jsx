import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/Reveal'
import PlaceholderImage from '../components/PlaceholderImage'
import { useDocumentHead } from '../hooks/useDocumentHead'
import { PORTFOLIO, CATEGORIES, categoryToSlug } from '../data/portfolio'
import { STUDIO } from '../constants'

const FILTERS = ['All', ...CATEGORIES]

export default function Portfolio() {
  const { category: categorySlug } = useParams()
  const categoryFromUrl = CATEGORIES.find((c) => categoryToSlug(c) === categorySlug) || 'All'
  const [active, setActive] = useState(categoryFromUrl)

  // keep the filter in sync when arriving via a /portfolio/:category link
  // (e.g. clicking a Recent Work tile) rather than a fresh page load
  useEffect(() => {
    setActive(categoryFromUrl)
  }, [categoryFromUrl])

  useDocumentHead({
    title: active === 'All' ? 'Portfolio' : `${active} Tattoos — Portfolio`,
    description:
      active === 'All'
        ? 'Browse the full tattoo portfolio from Segara Ink Tattoo in Sanur, Bali — piercing, water color, polynesian, fineline, color, cover-ups, full back, full sleeve & full leg.'
        : `${active} tattoo work from Segara Ink Tattoo in Sanur, Bali.`,
  })

  const items = active === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active)

  return (
    <section className="pt-36 pb-28 md:pb-36">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">Portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-foam mb-5">
            Full Gallery
          </h1>
          <p className="text-foam-dim">
            Browse work by type, or follow{' '}
            <a
              href={STUDIO.instagram}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-tide-bright"
            >
              {STUDIO.instagramHandle}
            </a>{' '}
            for the latest pieces.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                active === f
                  ? 'bg-tide border-tide text-foam'
                  : 'border-foam/20 text-foam-dim hover:border-foam/50 hover:text-foam'
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {items.length === 0 ? (
          <Reveal delay={0.15} className="border border-foam/10 p-10 text-center">
            <p className="text-foam-dim">
              No photos in this category yet — check back soon, or see{' '}
              <a
                href={STUDIO.instagram}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-tide-bright"
              >
                {STUDIO.instagramHandle}
              </a>{' '}
              for the latest work.
            </p>
          </Reveal>
        ) : (
          <motion.div layout className="grid sm:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {items.map((it) => (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover="hover"
                    initial="rest"
                    className="relative h-[280px] overflow-hidden"
                  >
                    <motion.div
                      variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <PlaceholderImage label={it.category} src={it.src} className="absolute inset-0" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
