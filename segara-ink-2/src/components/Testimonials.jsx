import { motion } from 'motion/react'
import Reveal from './Reveal'
import { STUDIO } from '../constants'
import { TESTIMONIALS } from '../data/testimonials'

// Rotate the review list so each column starts at a different card.
const rotate = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)]

function ReviewCard({ review }) {
  return (
    <figure className="bg-ink-soft border border-foam/10 p-6">
      <div className="flex gap-1 text-tide-bright text-sm mb-3" aria-label="5 stars">
        ★★★★★
      </div>
      <blockquote className="text-sm text-foam-dim leading-relaxed mb-4">
        "{review.text}"
      </blockquote>
      <figcaption className="text-xs uppercase tracking-widest text-foam">
        {review.name} <span className="text-foam-dim/60">· {review.meta}</span>
      </figcaption>
    </figure>
  )
}

function Column({ reviews, duration, className = '' }) {
  return (
    <div className={`relative h-[560px] overflow-hidden ${className}`}>
      <motion.div
        animate={{ y: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...reviews, ...reviews].map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}

export default function Testimonials() {
  const hasReviews = TESTIMONIALS.length > 0

  return (
    <section id="reviews" className="py-28 md:py-36 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_800px]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
            Reviews
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foam mb-4">
            {STUDIO.recommendLabel} · {STUDIO.reviewCount} reviews
          </h2>
          <p className="text-foam-dim text-sm">
            What clients say after the ink settles —{' '}
            <a
              href="https://www.facebook.com/Segarainktattoosanur/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-tide-bright"
            >
              read them on Facebook
            </a>
            .
          </p>
        </Reveal>

        {hasReviews ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Column reviews={rotate(TESTIMONIALS, 0)} duration={30} />
            <Column reviews={rotate(TESTIMONIALS, 1)} duration={38} className="hidden sm:block" />
            <Column reviews={rotate(TESTIMONIALS, 2)} duration={34} className="hidden lg:block" />
          </div>
        ) : (
          <Reveal delay={0.1} className="border border-foam/10 p-10 text-center max-w-2xl mx-auto">
            <p className="text-foam-dim">
              Client quotes are being added here — in the meantime, see the
              full review history directly on{' '}
              <a
                href="https://www.facebook.com/Segarainktattoosanur/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-tide-bright"
              >
                Facebook
              </a>
              .
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
