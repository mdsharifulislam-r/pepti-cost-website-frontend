const VENDOR_COLORS = [
  'bg-blue-900',
  'bg-indigo-700',
  'bg-violet-700',
  'bg-sky-700',
  'bg-cyan-700',
  'bg-emerald-700',
  'bg-teal-700',
  'bg-rose-700',
]

function colorFromName(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return VENDOR_COLORS[Math.abs(hash) % VENDOR_COLORS.length]
}

/** Temporary demo logos until vendors upload real assets after signup. */
const DEMO_VENDOR_LOGOS: Record<string, string> = {
  'Crownwell Research':
    'https://api.dicebear.com/7.x/initials/svg?seed=Crownwell&backgroundColor=2563eb',
  'Precision Peptides':
    'https://api.dicebear.com/7.x/initials/svg?seed=Precision&backgroundColor=7c3aed',
  'Peptide Prime':
    'https://api.dicebear.com/7.x/initials/svg?seed=Prime&backgroundColor=0891b2',
  'Alpha Peptides':
    'https://api.dicebear.com/7.x/initials/svg?seed=Alpha&backgroundColor=059669',
}

type IconMakerProps = {
  name: string
  logoUrl?: string
  className?: string
}

export default function IconMaker({
  name,
  logoUrl,
  className = 'h-12 w-12',
}: IconMakerProps) {
  const resolvedLogo = logoUrl || DEMO_VENDOR_LOGOS[name]

  if (resolvedLogo) {
    return (
      <img
        src={resolvedLogo}
        alt={`${name} logo`}
        className={`${className} shrink-0 rounded-xl border border-slate-100 bg-white object-cover`}
      />
    )
  }

  return (
    <div
      className={`flex ${className} shrink-0 items-center justify-center rounded-xl text-[14px] font-bold text-white ${colorFromName(name)}`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}
