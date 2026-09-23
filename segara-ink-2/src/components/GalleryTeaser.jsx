import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import PlaceholderImage from './PlaceholderImage'
import { PORTFOLIO, categoryToSlug } from '../data/portfolio'
import { STUDIO } from '../constants'

// Newest first — ids are assigned sequentially by the admin uploader, so the
// highest ids are the most recently added photos.
const teaser = [...PORTFOLIO].sort((a, b) => b.id - a.id).slice(0, 6)

export default function GalleryTeaser() {
  return (
    <section id="gallery" className="py-28 md:py-36 [content-visibility:auto] [contain-intrinsic-size:auto_1000px]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
              Portfolio
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foam">
              Recent Work
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="text-sm uppercase tracking-widest text-foam-dim hover:text-tide-bright transition-colors"
          >
            View Full Portfolio →
          </Link>
        </Reveal>

        {teaser.length === 0 ? (
          <Reveal delay={0.1} className="border border-foam/10 p-10 text-center">
            <p className="text-foam-dim">
              Photos are on their way. In the meantime, see the latest work on{' '}
              <a
                href={STUDIO.instagram}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-tide-bright"
              >
                {STUDIO.instagramHandle}
              </a>
              .
            </p>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            {teaser.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.08}>
                <Link to={`/portfolio/${categoryToSlug(it.category)}`} className="block">
                  <motion.div
                    whileHover="hover"
                    initial="rest"
                    className="group relative h-[260px] overflow-hidden"
                  >
                    <motion.div
                      variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <PlaceholderImage label={it.category} src={it.src} className="absolute inset-0" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent flex items-end p-5 pointer-events-none">
                      <span className="text-foam text-sm uppercase tracking-widest">{it.category}</span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
