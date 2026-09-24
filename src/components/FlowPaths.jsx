// Flowing SVG path backdrop, adapted from the sibling Swordsman site's
// FlowPaths (itself adapted from 21st.dev "Modern Background Paths" by
// @uniquesonu). Color comes from the parent's text color (stroke="currentColor").

import { motion } from 'motion/react'

const flowPaths = Array.from({ length: 12 }, (_, i) => {
  const amplitude = 50 + i * 10
  const offset = i * 60
  return {
    id: `flow-${i}`,
    d: `M-100,${200 + offset} Q200,${200 + offset - amplitude} 500,${200 + offset} T900,${200 + offset}`,
    strokeWidth: 1 + i * 0.3,
    opacity: 0.1 + i * 0.05,
    delay: i * 0.8,
  }
})

export default function FlowPaths({ className = '' }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {flowPaths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0.8, 0],
            opacity: [0, path.opacity, path.opacity * 0.7, 0],
          }}
          transition={{
            duration: 15,
            delay: path.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  )
}
