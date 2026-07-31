import { Mail, Bell } from 'lucide-react'

export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-7">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/* Left: icon + copy */}
          <div className="flex items-center gap-5">
            <span className="hidden h-14 w-14 items-center justify-center rounded-xl bg-brand-100 sm:flex">
              <Mail className="h-7 w-7 text-brand-600" />
            </span>
            <div>
              <h3 className="text-[20px] font-bold text-ink">Never Miss a Better Deal</h3>
              <p className="mt-1 text-[14px] text-slate-600">
                Get price drop alerts, new coupon codes, and updates on your favorite peptides.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 lg:w-64"
              />
              <button className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700">
                <Bell className="h-4 w-4" />
                Get Alerts
              </button>
            </div>
            <p className="mt-2 text-[12px] text-slate-400">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
