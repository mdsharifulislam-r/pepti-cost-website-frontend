import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Ticket,
  RefreshCw,
  Lock,
  BadgeCheck,
} from "lucide-react";
import Header from "../assets/hero.png";
import { useGetPeptidesQuery } from "../store/features/peptideSlice";

const trustBadges = [
  { icon: ShieldCheck, label: "100% Independent" },
  { icon: Ticket, label: "Active Coupons" },
  { icon: RefreshCw, label: "Real-Time Prices" },
  { icon: Lock, label: "No Vendor Bias" },
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] via-[#f1f6fd] to-white">
      {/* decorative brand-color glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-600/15 blur-3xl" />
      {/* subtle dotted grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.10)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <div className="relative mx-auto grid max-w-7xl items-stretch gap-8 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32 lg:pt-28">
        {/* Left column */}
        <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          {/* eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-semibold text-brand-700 shadow-sm sm:text-[13px]">
            <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
            Trusted by thousands of researchers
          </div>

          <h1 className="mt-5 text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[40px] lg:text-[46px]">
            Compare Research Peptide{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Prices in Seconds
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-600 sm:mt-5 sm:text-[17px] lg:mx-0">
            Find the best prices, active coupons, and trusted vendors all in one
            place.
          </p>

          {/* Search bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToCompare(query);
            }}
            className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center lg:mx-0"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search peptides (BPC-157, Retatrutide...)"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-[15px] text-slate-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-700 hover:to-brand-600 hover:shadow-brand-600/40 sm:w-auto"
            >
              <Search className="h-[18px] w-[18px]" />
              Search
            </button>
          </form>

          {/* Popular searches — wrap & center on mobile */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Popular:
            </span>
            {peptides?.map((peptide) => (
              <button
                key={peptide._id}
                onClick={() => goToCompare(peptide.name)}
                className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-slate-600 shadow-sm transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                {peptide.name}
              </button>
            ))}
          </div>

          {/* Trust badges — wrap & center on mobile */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-100 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <Icon className="h-[11px] w-[11px] text-brand-600" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — hero image */}
        <div className="relative order-1 flex items-center justify-center self-stretch lg:order-2 lg:justify-end">
          {/* glowing brand halo behind the image */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-500/30 to-brand-300/20 blur-3xl sm:h-72 sm:w-72" />
          {/* soft reflection pad */}
          <div className="pointer-events-none absolute -bottom-2 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[50%] bg-brand-600/10 blur-xl" />
          <img
            src={Header}
            alt="Research peptide vials"
            className="relative h-full max-h-[240px] w-full object-contain drop-shadow-xl sm:max-h-[360px] lg:max-h-[460px]"
          />
        </div>
      </div>
    </section>
  );
}
