import { Dna, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetPeptideItemDetailsQuery } from "../store/features/peptideSlice";

const money = (n: number) => `$${n.toFixed(2)}`;

// Show the first six peptides as "popular"

export default function PopularPeptides() {
  const { data: peptideItemDetails } = useGetPeptideItemDetailsQuery();
  const peptideSummaries = peptideItemDetails?.data;
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-ink">
            COMPARE POPULAR PEPTIDES
          </h2>
          <Link
            to="/compare"
            className="flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            View All Peptides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {peptideSummaries?.map((p) => (
            <div
              key={p.name}
              className="flex flex-col rounded-xl border border-slate-100 bg-white p-4 transition-shadow hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50">
                    <Dna className="h-5 w-5 text-brand-600" />
                  </span>
                  <div>
                    <div className="text-[16px] font-bold text-ink">
                      {p.name}
                    </div>
                    {/* <div className="text-[12px] leading-snug text-slate-500">
                      {p.count}
                    </div> */}
                  </div>
                </div>
                <span className="shrink-0 rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-700">
                  Save {p.maxDiscount}%
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    From
                  </div>
                  <div className="text-[15px] font-bold text-brand-600">
                    {money(p.minPrice)}
                    <span className="text-[11px] font-medium text-slate-400">
                      /mg
                    </span>
                  </div>
                </div>
                <span className="text-[12px] text-slate-400">
                  {p.count} vendors
                </span>
              </div>

              <Link
                to={`/compare?q=${encodeURIComponent(p.name)}`}
                className="mt-3 w-full rounded-lg bg-brand-600 py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Compare Prices
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
