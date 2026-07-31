import {
  BadgeCheck,
  Search,
  Scale,
  ShieldCheck,
  Lock,
  RefreshCw,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { vendors } from '../data/vendors'
import { comparePeptides } from '../data/compare'

const stats = [
  { value: `${vendors.length}+`, label: 'Vendors tracked' },
  { value: `${comparePeptides.length}+`, label: 'Peptides compared' },
  { value: 'Real-time', label: 'Price updates' },
  { value: '100%', label: 'Independent' },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Independent & Unbiased',
    body: 'We are not a vendor. We rank suppliers purely on price, quality, and reviews — never on who pays us most.',
  },
  {
    icon: RefreshCw,
    title: 'Always Up to Date',
    body: 'Prices, coupons, and stock are refreshed continuously so the comparison you see is the deal you get.',
  },
  {
    icon: Lock,
    title: 'No Vendor Bias',
    body: 'Every supplier is measured against the same criteria. The best value rises to the top, every time.',
  },
  {
    icon: Heart,
    title: 'Built for Researchers',
    body: 'Made by people who got tired of opening 15 tabs to compare peptide prices. Now it takes seconds.',
  },
]

const steps = [
  { icon: Search, title: 'Search a peptide', body: 'Type the compound you are researching, like BPC-157 or Retatrutide.' },
  { icon: Scale, title: 'Compare every vendor', body: 'We line up price, price-per-mg, stock, delivery, and lab testing side by side.' },
  { icon: BadgeCheck, title: 'Buy with confidence', body: 'Grab the best coupon, copy it, and head straight to the cheapest trusted vendor.' },
]

export default function AboutPage() {
  return (
    <div className="bg-[#f7fafd]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <BadgeCheck className="h-4 w-4 text-brand-600" />
            About PeptiCenter
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px] lg:text-[46px]">
            The independent way to{' '}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              compare peptide prices
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-600">
            PeptiCenter is a free, independent price-comparison platform for research peptides. We track
            vendors, prices, coupons, and lab testing so researchers can find the best deal in seconds —
            without the bias.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[26px] font-extrabold text-brand-600">{s.value}</div>
              <div className="mt-1 text-[13px] font-medium text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <h2 className="text-[26px] font-extrabold text-ink">Our mission</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
          Buying research peptides used to mean juggling a dozen browser tabs, hunting for working coupon
          codes, and second-guessing whether a vendor was legit. We built PeptiCenter to fix that. By
          gathering every vendor's pricing in one transparent place — and ranking purely on value — we put
          researchers back in control. No sponsored rankings, no hidden fees, no nonsense.
        </p>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
        <h2 className="text-center text-[26px] font-extrabold text-ink">How it works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <span className="absolute right-5 top-5 text-[28px] font-extrabold text-brand-50">
                0{i + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                <step.icon className="h-5 w-5 text-brand-600" />
              </span>
              <h3 className="mt-4 text-[16px] font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
        <h2 className="text-center text-[26px] font-extrabold text-ink">What we stand for</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {values.map((val) => (
            <div key={val.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <val.icon className="h-5 w-5 text-brand-600" />
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-ink">{val.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{val.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-8 text-center">
          <h2 className="text-[22px] font-extrabold text-ink">Start comparing in seconds</h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-600">
            See live prices and coupons across every vendor we track.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-700 hover:to-brand-600"
            >
              Compare Prices
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/vendors"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
