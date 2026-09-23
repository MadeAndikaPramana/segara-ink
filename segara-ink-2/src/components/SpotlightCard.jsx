import { useRef, useState } from 'react'

export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, rgba(23,184,172,0.13), transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(180px circle at ${spot.x}px ${spot.y}px, rgba(23,184,172,0.35), transparent 70%)`,
          maskImage:
            'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      {children}
    </div>
  )
}
