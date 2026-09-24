import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'

// Full-photo preview. `index` is null when closed. Rendered through a portal
// because the gallery tiles sit inside transformed (Reveal/motion) wrappers,
// which would otherwise become the containing block for a fixed overlay.
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const current = index === null ? null : items[index]
  const count = items.length

  useEffect(() => {
    if (!current) return
    const go = (step) => onNavigate((index + step + count) % count)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [current, index, count, onClose, onNavigate])

  const step = (e, delta) => {
    e.stopPropagation()
    onNavigate((index + delta + count) % count)
  }

  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.category} tattoo preview`}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 backdrop-blur-md p-4 md:p-10"
        >
          <motion.img
            key={current.id}
            src={current.src}
            alt={`${current.category} tattoo`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-full object-contain shadow-2xl shadow-ink"
          />

          <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none">
            <p className="px-4 py-2 rounded-full bg-ink/70 border border-foam/10 text-xs uppercase tracking-widest text-foam-dim">
              {current.category} · {index + 1} / {count}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-ink/70 border border-foam/15 text-foam text-lg hover:bg-tide transition-colors"
          >
            ✕
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => step(e, -1)}
                aria-label="Previous photo"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/70 border border-foam/15 text-foam text-xl hover:bg-tide transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => step(e, 1)}
                aria-label="Next photo"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/70 border border-foam/15 text-foam text-xl hover:bg-tide transition-colors"
              >
                ›
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
