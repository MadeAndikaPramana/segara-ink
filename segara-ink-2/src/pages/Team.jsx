import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Reveal from '../components/Reveal'
import { useDocumentHead } from '../hooks/useDocumentHead'
import { BRANCHES } from '../data/branches'
import { STUDIO } from '../constants'

export default function Team() {
  const { branch: branchId } = useParams()
  const navigate = useNavigate()
  const active = BRANCHES.find((b) => b.id === branchId) || BRANCHES.find((b) => b.id === 'sanur')

  useEffect(() => {
    // land on /team with no branch in the URL -> default to Sanur without a redirect loop
    if (!branchId) return
    if (!BRANCHES.some((b) => b.id === branchId)) navigate('/team', { replace: true })
  }, [branchId, navigate])

  useDocumentHead({
    title: active.id === 'sanur' ? 'Our Team' : `Our Team — ${active.short}`,
    description: `Meet the artists at ${active.name}.`,
  })

  return (
    <section className="pt-36 pb-28 md:pb-36">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-tide-bright mb-4">Our Team</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-foam mb-5">
            The Artists
          </h1>
          <p className="text-foam-dim">
            Segara Ink runs 2 studios in Sanur — pick a location to see who's there.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-wrap gap-3 mb-16">
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => navigate(b.id === 'sanur' ? '/team' : `/team/${b.id}`)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                active.id === b.id
                  ? 'bg-tide border-tide text-foam'
                  : 'border-foam/20 text-foam-dim hover:border-foam/50 hover:text-foam'
              }`}
            >
              {b.short}
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-foam-dim text-sm mb-10">{active.address}</p>

            {active.team.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-10">
                {active.team.map((member, i) => (
                  <Reveal key={member.name} delay={i * 0.1}>
                    <h2 className="font-display text-2xl text-foam mb-1">{member.name}</h2>
                    <p className="text-xs uppercase tracking-widest text-tide-bright mb-4">
                      {member.role}
                    </p>
                    <p className="text-foam-dim leading-relaxed">{member.bio}</p>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="border border-foam/10 p-10 text-center">
                <p className="text-foam-dim">
                  Artist profiles for {active.short} are coming soon — get in
                  touch on{' '}
                  <a
                    href={active.instagram || STUDIO.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-tide-bright"
                  >
                    Instagram
                  </a>{' '}
                  to see who's available.
                </p>
              </Reveal>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
