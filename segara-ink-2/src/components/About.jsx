import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './Reveal'
import PlaceholderImage from './PlaceholderImage'
import { STUDIO } from '../constants'
import { BRANCHES } from '../data/branches'

const stats = [
  { value: `${STUDIO.googleRating}`, label: `Google rating · ${STUDIO.googleReviewCount} reviews` },
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
    <div className="relative" onPointerEnter={pauseIfMouse} onPointerLeave={resumeIfMouse}>
      <div className="relative aspect-square w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={branch.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <PlaceholderImage
            label={`${branch.short} Studio`}
            src={branch.src}
            position={branch.srcPosition}
            className="absolute inset-0"
          />
          <img
            src={branch.logoSm}
            alt={`${branch.name} logo`}
            width="64"
            height="64"
            className="absolute top-4 left-4 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg shadow-ink/60 ring-1 ring-foam/20"
          />
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

      </div>

      {/* Sits outside the overflow-hidden frame above — inside it, the
          negative offsets got the badge clipped off the corner. */}
      <div className="hidden sm:block absolute -bottom-5 -right-5 z-10 bg-tide px-5 py-4 shadow-xl shadow-ink/50">
        <p className="font-display text-base text-foam leading-tight">Walk-ins welcome</p>
        <p className="text-[10px] uppercase tracking-widest text-foam/80 mt-1.5">{STUDIO.hours}</p>
      </div>
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
