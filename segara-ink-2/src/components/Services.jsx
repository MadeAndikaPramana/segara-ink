import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import PlaceholderImage from './PlaceholderImage'
import { PORTFOLIO, CATEGORIES, categoryToSlug } from '../data/portfolio'

const DESCRIPTIONS = {
  Piercing: 'Professional piercing services in a clean, sterile environment.',
  'Water Color': 'Vivid, painterly color work with soft, blended washes.',
  Polynesian: 'Bold tribal patterns rooted in Polynesian tradition.',
  Fineline: 'Delicate, precise linework — minimalist designs with lasting clarity.',
  Color: 'Vibrant, saturated color tattoos built for detail.',
  'Cover Up': "Reworking old tattoos into something you'll want to show off again.",
  'Full Back': 'Large-scale back pieces built session by session.',
  'Full Sleeve': 'Full arm coverage, from shoulder to wrist.',
  'Full Leg': 'Full leg coverage with cohesive large-scale design.',
}

// One representative photo per category, pulled straight from the gallery —
// newest upload in that category first — so Services stays in sync with
// whatever's actually in the portfolio instead of drifting out of date.
// PORTFOLIO starts empty on a fresh site, so `cover` is undefined until
// photos are added via /admin — PlaceholderImage already renders a labeled
// placeholder card in that case.
const services = CATEGORIES.map((category) => {
  const cover = [...PORTFOLIO].reverse().find((p) => p.category === category)
  return { category, cover, desc: DESCRIPTIONS[category] }
})

export default function Services() {
  return (
    <section
      id="services"
      className="py-28 md:py-36 bg-gradient-to-b from-transparent via-ink-soft/85 to-transparent [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foam">
            Services
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.06}>
              <Link to={`/portfolio/${categoryToSlug(s.category)}`} className="block">
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  className="group relative h-[300px] overflow-hidden"
                >
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <PlaceholderImage label={s.category} src={s.cover?.src} className="absolute inset-0" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                    <h3 className="text-lg font-semibold text-foam mb-1">{s.category}</h3>
                    <p className="text-sm text-foam-dim leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
