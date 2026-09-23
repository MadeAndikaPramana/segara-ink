export default function PlaceholderImage({ label = 'Photo', src, eager = false, className = '' }) {
  if (src) {
    return (
      <div className={`overflow-hidden bg-ink-soft ${className}`}>
        <img
          src={src}
          alt={label}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-ink-soft border border-foam/15 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-60 bg-[repeating-linear-gradient(45deg,_rgba(238,244,242,0.05)_0px,_rgba(238,244,242,0.05)_1px,_transparent_1px,_transparent_12px)]" />
      <svg
        className="relative w-8 h-8 text-foam-dim/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="9" cy="9" r="1.5" />
        <path d="M21 15l-5-5-9 9" />
      </svg>
      <span className="relative text-[10px] uppercase tracking-[0.25em] text-foam-dim/70">
        {label}
      </span>
    </div>
  )
}
