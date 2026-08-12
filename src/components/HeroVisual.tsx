const nodes = [
  { id: 'bpc', label: 'BPC-157', x: 18, y: 22, color: '#f43f5e', delay: '0s' },
  { id: 'tb', label: 'TB-500', x: 72, y: 14, color: '#f97316', delay: '0.4s' },
  { id: 'ghk', label: 'GHK-Cu', x: 84, y: 48, color: '#14b8a6', delay: '0.8s' },
  { id: 'mots', label: 'MOTS-c', x: 58, y: 72, color: '#22c55e', delay: '1.2s' },
  { id: 'ss', label: 'SS-31', x: 24, y: 62, color: '#3b82f6', delay: '1.6s' },
  { id: 'kpv', label: 'KPV', x: 48, y: 38, color: '#a855f7', delay: '2s' },
]

const edges = [
  ['kpv', 'bpc'],
  ['kpv', 'tb'],
  ['kpv', 'ghk'],
  ['kpv', 'mots'],
  ['kpv', 'ss'],
  ['bpc', 'ss'],
  ['tb', 'ghk'],
  ['mots', 'ss'],
] as const

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 17) % 84)}%`,
  top: `${10 + ((i * 23) % 78)}%`,
  delay: `${(i % 7) * 0.9}s`,
  duration: `${4 + (i % 5)}s`,
}))

function getNode(id: string) {
  return nodes.find((node) => node.id === id)!
}

export default function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="hero-visual__glow pointer-events-none absolute inset-8 rounded-full bg-gradient-to-tr from-brand-500/25 to-brand-300/10 blur-3xl" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="hero-particle pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-brand-400/70"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <radialGradient id="hero-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {edges.map(([from, to], index) => {
          const start = getNode(from)
          const end = getNode(to)
          return (
            <line
              key={`${from}-${to}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              className="hero-line"
              style={{ animationDelay: `${index * 0.35}s` }}
            />
          )
        })}

        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <circle
              r="7.5"
              fill={node.color}
              opacity="0.18"
              className="hero-node-pulse"
              style={{ animationDelay: node.delay }}
            />
            <circle
              r="4.8"
              fill="url(#hero-node-glow)"
              stroke={node.color}
              strokeWidth="1.2"
              className="hero-node-pulse"
              style={{ animationDelay: node.delay }}
            />
            <text
              y="12"
              textAnchor="middle"
              className="fill-slate-700 text-[3px] font-semibold"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
