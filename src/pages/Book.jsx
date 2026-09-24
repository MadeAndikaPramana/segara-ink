import { useState } from 'react'
import Reveal from '../components/Reveal'
import FlowPaths from '../components/FlowPaths'
import { useDocumentHead } from '../hooks/useDocumentHead'
import { BRANCHES } from '../data/branches'
import { CATEGORIES } from '../data/portfolio'
import { STUDIO } from '../constants'

const artistOptionsFor = (branchId) => [
  'No preference',
  ...(BRANCHES.find((b) => b.id === branchId)?.team.map((t) => t.name) || []),
]

const DEFAULT_BRANCH_ID = 'sanur'

export default function Book() {
  useDocumentHead({
    title: 'Book a Session',
    description: 'Book your tattoo session at Segara Ink Tattoo Sanur — fill in a few details and continue straight to WhatsApp.',
  })

  const [form, setForm] = useState({
    name: '',
    contact: '',
    branch: DEFAULT_BRANCH_ID,
    artist: artistOptionsFor(DEFAULT_BRANCH_ID)[0],
    category: CATEGORIES[0],
    date: '',
    message: '',
  })

  const artistOptions = artistOptionsFor(form.branch)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const updateBranch = (e) => {
    const branch = e.target.value
    setForm((f) => ({ ...f, branch, artist: artistOptionsFor(branch)[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const branchName = BRANCHES.find((b) => b.id === form.branch)?.name || STUDIO.name
    const lines = [
      `Hi Segara Ink Tattoo, I'd like to book a session.`,
      `Name: ${form.name}`,
      `Contact: ${form.contact}`,
      `Studio: ${branchName}`,
      `Preferred artist: ${form.artist}`,
      `Type: ${form.category}`,
      form.date ? `Preferred date: ${form.date}` : null,
      form.message ? `Details: ${form.message}` : null,
    ].filter(Boolean)

    const url = `${STUDIO.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const inputClass =
    'w-full bg-transparent border border-foam/20 px-4 py-3 text-foam placeholder:text-foam-dim/50 focus:outline-none focus:border-tide-bright transition-colors'

  return (
    <section className="relative pt-36 pb-28 md:pb-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 text-tide-bright/60">
        <FlowPaths />
      </div>
      <div className="relative max-w-2xl mx-auto px-6">
        <Reveal className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">Book</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-foam mb-5">
            Book a Session
          </h1>
          <p className="text-foam-dim">
            Fill this out and we'll open WhatsApp with your details ready to send — no account,
            no backend, just a direct message to the studio.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  required
                  value={form.contact}
                  onChange={update('contact')}
                  className={inputClass}
                  placeholder="+62..."
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                  Studio
                </label>
                <select value={form.branch} onChange={updateBranch} className={inputClass}>
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id} className="bg-ink">
                      {b.short}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                  Preferred Artist
                </label>
                <select value={form.artist} onChange={update('artist')} className={inputClass}>
                  {artistOptions.map((a) => (
                    <option key={a} value={a} className="bg-ink">
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                  Type
                </label>
                <select value={form.category} onChange={update('category')} className={inputClass}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-ink">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                  Preferred Date (optional)
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={update('date')}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foam-dim mb-2">
                Tell us about the piece
              </label>
              <textarea
                value={form.message}
                onChange={update('message')}
                rows={4}
                className={inputClass}
                placeholder="Size, placement, reference ideas..."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-tide text-foam text-sm uppercase tracking-widest font-semibold hover:bg-tide-bright transition-colors"
            >
              Continue on WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
