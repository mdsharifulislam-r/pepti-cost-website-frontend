type LogoProps = {
  variant?: 'dark' | 'light'
}

/**
 * PeptiCenter wordmark with the molecule-style icon.
 * "PEPTI" inherits the text color, "COST" is always brand blue.
 */
export default function Logo({ variant = 'dark' }: LogoProps) {
  const peptiColor = variant === 'light' ? 'text-white' : 'text-ink'
  const tagColor = variant === 'light' ? 'text-slate-400' : 'text-slate-500'

  return (
    <div className="flex items-center gap-2.5">
      <MoleculeIcon />
      <div className="leading-none">
        <div className="text-[22px] font-extrabold tracking-tight">
          <span className={peptiColor}>PEPTI</span>
          <span className="text-brand-600">CENTER</span>
        </div>
        <div className={`mt-1 text-[9px] font-semibold tracking-[0.18em] ${tagColor}`}>
          COMPARE. SAVE. RESEARCH.
        </div>
      </div>
    </div>
  )
}

function MoleculeIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#2563eb" strokeWidth="2">
        <line x1="17" y1="17" x2="17" y2="5" />
        <line x1="17" y1="17" x2="27" y2="11" />
        <line x1="17" y1="17" x2="27" y2="23" />
        <line x1="17" y1="17" x2="17" y2="29" />
        <line x1="17" y1="17" x2="7" y2="23" />
        <line x1="17" y1="17" x2="7" y2="11" />
      </g>
      <g fill="#2563eb">
        <circle cx="17" cy="5" r="3" />
        <circle cx="27" cy="11" r="3" />
        <circle cx="27" cy="23" r="3" />
        <circle cx="17" cy="29" r="3" />
        <circle cx="7" cy="23" r="3" />
        <circle cx="7" cy="11" r="3" />
      </g>
      <circle cx="17" cy="17" r="4" fill="#3b82f6" />
    </svg>
  )
}
