import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import { useDocumentHead } from '../hooks/useDocumentHead'
import { STUDIO } from '../constants'

const FACTORS = [
  { title: 'Size', desc: 'Larger pieces take more sessions and materials, and cost more overall.' },
  { title: 'Detail & Color', desc: 'Fine shading, color work, and intricate detail add time in the chair.' },
  { title: 'Placement', desc: 'Some areas are slower and more precise to work — ribs, hands, feet.' },
  { title: 'Session Time', desc: 'Larger or multi-session pieces are typically quoted per session.' },
]

const FAQ = [
  {
    q: 'How much will my tattoo cost?',
    a: 'It depends on size, detail, and placement — send us a reference photo on WhatsApp and we\'ll give you a free quote before you book.',
  },
  {
    q: 'Do you take walk-ins?',
    a: 'Yes, walk-ins are welcome, but booking ahead on WhatsApp guarantees your artist and time slot — especially for larger custom pieces.',
  },
  {
    q: 'Is a deposit required?',
    a: 'For booked appointments, a deposit is generally required to hold your slot. Message us on WhatsApp for details on your specific piece.',
  },
  {
    q: 'What are your hygiene standards?',
    a: 'New, single-use needles for every client, sterilized equipment, and high-quality inks. Ask us on WhatsApp if you have any specific hygiene questions before booking.',
  },
  {
    q: 'Can you cover up an old tattoo?',
    a: 'Yes — cover-ups are one of our specialties. Send a photo of the existing piece and we\'ll talk through what\'s possible.',
  },
  {
    q: 'Does getting a tattoo hurt?',
    a: 'Some discomfort is normal and varies by placement and your own pain tolerance. Our artists work efficiently to keep sessions as comfortable as possible.',
  },
  {
    q: "What's the minimum age?",
    a: 'You must be a legal adult with valid ID. Message us on WhatsApp if you have questions about specific requirements.',
  },
]

const AFTERCARE = [
  'Keep the tattoo covered with the provided wrap for the time your artist recommends.',
  'Wash gently with fragrance-free soap and lukewarm water, then pat dry — don\'t rub.',
  'Apply a thin layer of unscented aftercare balm or moisturizer as directed.',
  'Avoid direct sun, swimming, saunas, and soaking (baths, pools, the sea) until fully healed.',
  'Don\'t pick or scratch peeling skin — let it flake off naturally.',
  'Wear loose, breathable clothing over the area while it heals.',
]

export default function Pricing() {
  useDocumentHead({
    title: 'Pricing & FAQ',
    description: 'What affects tattoo pricing at Segara Ink Tattoo Sanur, plus answers to common booking questions.',
  })

  return (
    <section className="pt-36 pb-28 md:pb-36">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">
            Pricing & FAQ
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-foam mb-5">
            What to Expect
          </h1>
          <p className="text-foam-dim">
            We don't publish flat prices — every tattoo is quoted individually. Here's what
            factors into it, and answers to what people ask us most.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mb-20">
          <h2 className="font-display text-2xl text-foam mb-8">How Pricing Works</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {FACTORS.map((f) => (
              <div key={f.title} className="border border-foam/10 p-6">
                <h3 className="text-foam font-medium mb-2">{f.title}</h3>
                <p className="text-sm text-foam-dim leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <a
            href={STUDIO.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3.5 bg-tide text-foam text-sm uppercase tracking-widest font-semibold hover:bg-tide-bright transition-colors"
          >
            Get a Free Quote
          </a>
        </Reveal>

        <Reveal delay={0.15} className="mb-20">
          <h2 className="font-display text-2xl text-foam mb-6">Frequently Asked</h2>
          <Accordion items={FAQ} />
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="font-display text-2xl text-foam mb-6">Aftercare</h2>
          <ul className="space-y-4">
            {AFTERCARE.map((tip) => (
              <li key={tip} className="flex gap-4 text-foam-dim leading-relaxed">
                <span className="text-tide-bright shrink-0">—</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
