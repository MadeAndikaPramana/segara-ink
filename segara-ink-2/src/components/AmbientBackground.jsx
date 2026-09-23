import { motion, useReducedMotion } from 'motion/react'

// Site-wide living backdrop: slow-drifting blurred "liquid" blobs behind all
// content. Pure CSS transforms (GPU compositor) — no canvas or rAF loop, so it
// coexists with the hero WebGL shader without starving the main thread.
// Sections are translucent so this glows through everywhere.

export default function AmbientBackground() {
  const reduceMotion = useReducedMotion()

  // Two blobs only, and we animate position (x/y) but NOT scale — animating
  // scale on a huge blur forces the browser to re-rasterize the blur every
  // frame; pure translate stays on the compositor and is nearly free.
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full bg-tide/[0.09] blur-[100px] [will-change:transform]"
        style={{ top: '-15%', left: '-10%' }}
        animate={reduceMotion ? undefined : { x: ['0%', '18%', '4%', '0%'], y: ['0%', '22%', '40%', '0%'] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[48vw] h-[48vw] rounded-full bg-tide-bright/[0.07] blur-[90px] [will-change:transform]"
        style={{ bottom: '-20%', right: '-10%' }}
        animate={reduceMotion ? undefined : { x: ['0%', '-22%', '-6%', '0%'], y: ['0%', '-20%', '8%', '0%'] }}
        transition={{ duration: 54, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
    </div>
  )
}
