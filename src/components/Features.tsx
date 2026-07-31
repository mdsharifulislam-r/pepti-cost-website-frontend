import { Tag, ShieldCheck, TicketCheck, Clock, Lock } from 'lucide-react'

const features = [
  {
    icon: Tag,
    title: 'Best Prices',
    text: 'We compare prices across every trusted vendor to find you the best deals.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Vendors',
    text: 'All vendors are vetted for reliability, product quality, and customer service.',
  },
  {
    icon: TicketCheck,
    title: 'Active Coupons',
    text: 'We test and verify coupon codes so you always get the best price.',
  },
  {
    icon: Clock,
    title: 'Real-Time Updates',
    text: 'Prices and coupons are updated continuously throughout the day.',
  },
  {
    icon: Lock,
    title: 'Independent',
    text: 'We are not owned by any vendor. Your trust is our only priority.',
  },
]

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-7">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Icon className="h-6 w-6 text-brand-600" />
              </span>
              <h3 className="mt-3 text-[15px] font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
