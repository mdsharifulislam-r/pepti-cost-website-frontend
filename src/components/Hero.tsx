import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Ticket,
  RefreshCw,
  Lock,
  Store,
  FlaskConical,
  Tags,
} from "lucide-react";
import heroBg from "../assets/hero-bg.png";
import { useGetPeptidesQuery } from "../store/features/peptideSlice";

const trustBadges = [
  {
    icon: ShieldCheck,
    title: "100% Independent",
    subtitle: "Unbiased data",
  },
  {
    icon: Ticket,
    title: "Active Coupons",
    subtitle: "Instant savings",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Prices",
    subtitle: "Always accurate",
  },
  {
    icon: Lock,
    title: "No Advertiser Influence",
    subtitle: "Built for researchers",
  },
];

const heroStats = [
  { icon: Store, value: "40+", label: "Trusted Vendors" },
  { icon: FlaskConical, value: "900+", label: "Peptides Listed" },
  { icon: Tags, value: "2,300+", label: "Price Comparisons" },
  { icon: RefreshCw, value: "Updated Daily", label: "Always Current" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: peptidesData } = useGetPeptidesQuery();
  const peptides = peptidesData?.data;

  const goToCompare = (term: string) => {
    const t = term.trim();
    navigate(t ? `/compare?q=${encodeURIComponent(t)}` : "/compare");
  };

  return (
    <section className="relative overflow-hidden bg-[#dff3f8]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-[center_right] bg-no-repeat sm:bg-right"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-white/20 to-transparent lg:from-white/35 lg:via-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:pb-10 lg:pt-20">
        <div className="max-w-xl text-center lg:max-w-2xl lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3.5 py-1.5 text-[12px] font-semibold text-brand-700 shadow-sm backdrop-blur sm:text-[13px]">
            The Research Peptide Resource Center
          </div>

          <h1 className="mt-5 text-[28px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[40px] lg:text-[44px]">
            Compare peptide prices from{" "}
            <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
              trusted research suppliers
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600 sm:text-[16px] lg:mx-0">
            Independent comparisons, real-time prices, active coupons, and
            unbiased vendor data — all in one place.
          </p>
          <p className="mx-auto mt-2 text-[14px] font-medium text-brand-700/90 lg:mx-0">
            Compare vendors. Discover research. Verify quality. Save money.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToCompare(query);
            }}
            className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:mt-7 sm:flex-row sm:items-stretch lg:mx-0"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search peptides (BPC-157, Retatrutide, MOTS-c...)"
                className="h-full w-full rounded-2xl border border-white/80 bg-white/90 py-4 pl-12 pr-4 text-[15px] text-slate-700 shadow-[0_8px_30px_rgba(15,23,42,0.08)] outline-none backdrop-blur transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-4 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-700 hover:to-brand-600"
            >
              <Search className="h-[18px] w-[18px]" />
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Popular
            </span>
            {(peptides?.slice(0, 5) ?? ["BPC-157", "TB-500", "MOTS-c", "GHK-Cu", "Retatrutide"]).map(
              (peptide) => {
                const label = typeof peptide === "string" ? peptide : peptide.name;
                const key = typeof peptide === "string" ? peptide : peptide._id;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => goToCompare(label)}
                    className="rounded-full border border-white/70 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-600 shadow-sm backdrop-blur transition hover:border-brand-400 hover:text-brand-700"
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {trustBadges.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-3.5 py-3 text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-4 w-4 text-brand-600" />
                </span>
                <div>
                  <div className="text-[13px] font-bold text-ink">{title}</div>
                  <div className="text-[12px] text-slate-500">{subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:pb-20">
        <div className="grid gap-4 rounded-2xl border border-white/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <Icon className="h-5 w-5 text-brand-600" />
              </span>
              <div>
                <div className="text-[18px] font-extrabold text-brand-600">{value}</div>
                <div className="text-[13px] font-medium text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
