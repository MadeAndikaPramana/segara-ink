import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './Reveal'
import PlaceholderImage from './PlaceholderImage'
import { STUDIO } from '../constants'
import { BRANCHES } from '../data/branches'

const stats = [
  { value: STUDIO.recommendLabel, label: `${STUDIO.reviewCount} Facebook Reviews` },
  { value: `${STUDIO.since}`, label: 'Open Since' },
  { value: `${BRANCHES.length}`, label: 'Studios in Sanur' },
]

const AUTO_SWIPE_MS = 3000

function BranchCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const branch = BRANCHES[index]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % BRANCHES.length), AUTO_SWIPE_MS)
    return () => clearInterval(t)
  }, [paused])

  // Only pause on hover for mouse/trackpad users — on touch devices a tap can
  // fire a synthetic mouseenter with no matching mouseleave, which would
  // otherwise freeze the carousel permanently after the first tap.
  const pauseIfMouse = (e) => {
    if (e.pointerType === 'mouse') setPaused(true)
  }
  const resumeIfMouse = (e) => {
    if (e.pointerType === 'mouse') setPaused(false)
  }

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden"
      onPointerEnter={pauseIfMouse}
      onPointerLeave={resumeIfMouse}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={branch.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <PlaceholderImage label={`${branch.short} Studio`} src={branch.src} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent flex items-end p-5 pointer-events-none">
            <div>
              <p className="text-foam text-sm uppercase tracking-widest">{branch.short}</p>
              <p className="text-foam-dim/70 text-xs">{branch.country}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        {BRANCHES.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setIndex(i)}
            aria-label={`Show ${b.short}`}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index ? 'bg-foam' : 'bg-foam/30 hover:bg-foam/60'
            }`}
          />
        ))}
      </div>

      <motion.div
        key={`badge-${branch.id}`}
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden sm:block absolute -bottom-6 -right-6 bg-tide px-6 py-5 z-10"
      >
        <p className="font-display text-2xl text-foam leading-none">{STUDIO.recommendLabel}</p>
        <p className="text-[10px] uppercase tracking-widest text-foam/80 mt-1">
          {STUDIO.reviewCount} reviews on Facebook
        </p>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <Reveal className="relative">
          <BranchCarousel />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
              About the Studio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foam mb-6">
              Ink drawn from the sea,
              <br />
              built on trust &amp; craft.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-foam-dim leading-relaxed mb-6">
              With 2 studios in Sanur, Segara Ink brings together experienced
              artists working across fine line, black &amp; grey realism,
              portraiture and custom design. Every session runs on single-use
              needles and sterilized equipment — whether it's your first
              tattoo or your fifteenth.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-foam-dim leading-relaxed mb-10">
              Walk-ins welcome, custom consultations by appointment. Piercing
              services also available.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="panel p-4 md:p-5">
                <p className="font-display text-lg md:text-2xl text-foam leading-tight">{s.value}</p>
                <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-foam-dim mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
