import { DOSAGE_OPTIONS, type DosageMg } from '../helpers/compareUtils'

export default function DosageTabs({
  value,
  onChange,
}: {
  value: DosageMg
  onChange: (dosage: DosageMg) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Dosage
      </span>
      <div className="flex overflow-hidden rounded-lg border border-slate-200">
        {DOSAGE_OPTIONS.map((dosage) => {
          const active = value === dosage
          return (
            <button
              key={dosage}
              type="button"
              onClick={() => onChange(dosage)}
              className={`px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {dosage}mg
            </button>
          )
        })}
      </div>
    </div>
  )
}
