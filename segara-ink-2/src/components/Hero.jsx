import { motion } from 'motion/react'
import { STUDIO } from '../constants'
import { PORTFOLIO } from '../data/portfolio'
import SplitReveal from './SplitReveal'
import MagneticButton from './MagneticButton'
import PlaceholderImage from './PlaceholderImage'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

// Three cards for the collage — real newest-per-category work once it
// exists, PlaceholderImage's labeled placeholder until then (same fallback
// GalleryTeaser/Services already rely on).
const COLLAGE_FALLBACK = ['Portrait', 'Sleeve', 'Fine Line']
const collage = COLLAGE_FALLBACK.map(
  (label) => [...PORTFOLIO].reverse().find((p) => p.category === label) ?? { category: label, src: null },
)

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-0"
    >
      {/* The site-wide liquid-ink canvas (Layout.jsx) already shows through
          here — this just brightens the hero into more of a focal point on
          top of it, no second canvas needed. No dark vignette here: it would
          create a seam where Hero ends and the next section's plain canvas
          begins. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(23,184,172,0.16),_transparent_62%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-foam/20 text-xs uppercase tracking-[0.2em] text-foam-dim mb-8"
          >
            <span className="text-tide-bright">{STUDIO.recommendLabel}</span>
            <span className="w-1 h-1 rounded-full bg-foam-dim" />
            Sanur, Bali
          </motion.div>

          <h1 className="font-display text-[15vw] sm:text-[6rem] lg:text-[5.2rem] leading-[0.85] tracking-wide text-foam">
            <SplitReveal text="SEGARA" delay={0.32} />
            <br />
            <SplitReveal
              text="INK TATTOO"
              delay={0.5}
              className="text-tide-bright text-[8vw] sm:text-[3rem] lg:text-[2.6rem] tracking-wide"
            />
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-lg text-foam-dim text-base md:text-lg font-light"
          >
            Custom tattoos in the heart of Sanur since {STUDIO.since}. From fine
            line to bold traditional — every piece cut clean, healed strong.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4">
            <MagneticButton
              to="/book"
              className="px-8 py-3.5 bg-tide text-foam text-sm uppercase tracking-widest font-semibold hover:bg-tide-bright transition-colors"
            >
              Book a Session
            </MagneticButton>
            <MagneticButton
              to="/portfolio"
              className="px-8 py-3.5 border border-foam/30 text-foam text-sm uppercase tracking-widest font-semibold hover:border-foam transition-colors"
            >
              See Our Work
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Editorial collage — offset, rotated photo cards instead of a
            second centered block. Hidden below lg: at narrower widths there
            isn't room for it next to the headline without the whole hero
            feeling cramped. */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative hidden lg:block h-[520px]"
        >
          <motion.div
            variants={card}
            className="absolute top-0 right-4 w-56 h-72 rotate-3 shadow-2xl shadow-ink/60"
          >
            <PlaceholderImage
              label={collage[0].category}
              src={collage[0].src}
              className="absolute inset-0 border border-foam/15"
            />
          </motion.div>
          <motion.div
            variants={card}
            className="absolute bottom-4 left-0 w-48 h-64 -rotate-6 shadow-2xl shadow-ink/60"
          >
            <PlaceholderImage
              label={collage[1].category}
              src={collage[1].src}
              className="absolute inset-0 border border-foam/15"
            />
          </motion.div>
          <motion.div
            variants={card}
            className="absolute top-1/3 left-1/4 z-10 w-40 h-52 rotate-2 shadow-2xl shadow-ink/70"
          >
            <PlaceholderImage
              label={collage[2].category}
              src={collage[2].src}
              className="absolute inset-0 border border-foam/15"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-foam-dim"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 bg-foam-dim"
        />
      </motion.div>
    </section>
  )
}
