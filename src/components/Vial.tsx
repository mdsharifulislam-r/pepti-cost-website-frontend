type VialProps = {
  label: string
  dose: string
  className?: string
}

/** A research-vial illustration, recreated with SVG to mirror the hero mockup. */
export default function Vial({ label, dose, className = '' }: VialProps) {
  return (
    <svg
      viewBox="0 0 120 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`glass-${label}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#eaf1fb" stopOpacity="0.8" />
          <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c9d8ef" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`cap-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b6fd6" />
          <stop offset="1" stopColor="#1e4fa8" />
        </linearGradient>
        <linearGradient id={`collar-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8edf5" />
          <stop offset="1" stopColor="#b8c4d6" />
        </linearGradient>
      </defs>

      {/* Aluminium collar */}
      <rect x="34" y="26" width="52" height="22" rx="3" fill={`url(#collar-${label})`} />
      {/* Blue rubber cap */}
      <rect x="40" y="14" width="40" height="20" rx="6" fill={`url(#cap-${label})`} />
      <ellipse cx="60" cy="16" rx="20" ry="5" fill="#5b86db" />

      {/* Glass body */}
      <rect
        x="22"
        y="44"
        width="76"
        height="244"
        rx="14"
        fill={`url(#glass-${label})`}
        stroke="#d3def0"
        strokeWidth="1.5"
      />
      {/* Glass highlight */}
      <rect x="30" y="56" width="10" height="210" rx="5" fill="#ffffff" opacity="0.65" />

      {/* Label text */}
      <text
        x="60"
        y="150"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="#1d4ed8"
      >
        {label}
      </text>
      <text
        x="60"
        y="176"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#1e4fa8"
      >
        {dose}
      </text>
      <text
        x="60"
        y="226"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="7"
        fontWeight="600"
        letterSpacing="1"
        fill="#7c8aa3"
      >
        RESEARCH USE ONLY
      </text>
    </svg>
  )
}
