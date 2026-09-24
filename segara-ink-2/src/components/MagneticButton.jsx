import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

// CTA wrapper: cursor-following magnetic pull + a light shimmer sweep on hover.
export default function MagneticButton({ to, children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionLink
      ref={ref}
      to={to}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover="hover"
      initial="rest"
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <motion.span
        variants={{ rest: { x: '-130%' }, hover: { x: '130%' } }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-foam/20 to-transparent -skew-x-[20deg]"
      />
      <span className="relative">{children}</span>
    </MotionLink>
  )
}
