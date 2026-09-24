import { motion } from 'motion/react'

// Vertical "cut" reveal: each character slides up out of a clipped box.
export default function SplitReveal({ text, className = '', delay = 0, stagger = 0.035 }) {
  const chars = [...text]

  return (
    <span className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}
