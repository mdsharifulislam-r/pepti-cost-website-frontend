import { Flame, DollarSign, Building2, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { vendors } from "../data/vendors";
import {
  useGetBiggestSavingsQuery,
  useGetLowestItemsQuery,
  useGetTopRatedVendorsQuery,
} from "../store/features/vendorSlice";
import IconMaker from "../helpers/iconMaker";

const money = (n: number) => `$${n.toFixed(2)}`;

export default function InfoCards() {
  const { data: lowestItemsData, isLoading: isLowestLoading } =
    useGetLowestItemsQuery();
  const { data: biggestSavingsData, isLoading: isSavingsLoading } =
    useGetBiggestSavingsQuery();
  const { data: topRatedVendorsData, isLoading: isTopRatedLoading } =
    useGetTopRatedVendorsQuery();

  const lowestItems = lowestItemsData?.data;
  const biggestSavings = biggestSavingsData?.data;
  const topRatedVendors = topRatedVendorsData?.data;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Lowest Prices Today */}
        <Card>
          <CardHeader
            icon={<Flame className="h-5 w-5 text-brand-600" />}
            title="LOWEST PRICES TODAY"
          />
          <div className="mt-4">
            <div className="grid grid-cols-[1.2fr_1fr_1.4fr_auto] gap-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Peptide</span>
              <span>Price / mg</span>
              <span>Vendor</span>
              <span className="text-right">Save</span>
            </div>
            <div className="divide-y divide-slate-100">
              {isLowestLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <LowestItemRowSkeleton key={`lowest-skeleton-${i}`} />
                  ))
                : lowestItems?.map((row) => (
                    <div
                      key={row.name}
                      className="grid grid-cols-[1.2fr_1fr_1.4fr_auto] items-center gap-2 py-2.5 text-[13px]"
                    >
                      <span className="font-semibold text-ink">
                        {row.peptide_str}
                      </span>
                      <span className="font-semibold text-brand-600">
                        {money(row.price_per_unit)}
                      </span>
                      <span className="truncate text-slate-600">
                        {row.name}
                      </span>
                      <span className="justify-self-end rounded-md bg-brand-100 px-2 py-0.5 text-[12px] font-semibold text-brand-700">
                        {row.discount_amount}%
                      </span>
                    </div>
                  ))}
            </div>
          </div>
          <CardFooter to="/compare" label="View All Lowest Prices" />
        </Card>

        {/* Biggest Savings Today */}
        <Card>
          <CardHeader
            icon={
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100">
                <DollarSign className="h-4 w-4 text-brand-600" />
              </span>
            }
            title="BIGGEST SAVINGS TODAY"
          />
          <div className="mt-5 divide-y divide-slate-100">
            {isSavingsLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <SavingsRowSkeleton key={`savings-skeleton-${i}`} />
                ))
              : biggestSavings?.map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between py-3 text-[14px]"
                  >
                    <span className="font-semibold text-ink">
                      {row.peptide_str}
                    </span>
                    <span className="flex items-center gap-2 text-slate-500">
                      Save up to
                      <span className="rounded-md bg-brand-100 px-2 py-0.5 text-[13px] font-semibold text-brand-700">
                        {row.discount_amount}%
                      </span>
                    </span>
                  </div>
                ))}
          </div>
          <CardFooter to="/compare" label="View All Savings" />
        </Card>

        {/* Top Vendors */}
        <Card>
          <div className="flex items-center justify-between">
            <CardHeader
              icon={<Building2 className="h-5 w-5 text-brand-600" />}
              title="TOP RATED VENDORS"
            />
            <span className="rounded-md bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">
              {vendors.length}
            </span>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {isTopRatedLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TopVendorRowSkeleton key={`vendor-skeleton-${i}`} />
                ))
              : topRatedVendors?.map((v) => (
                  <div
                    key={v.name}
                    className="flex items-center justify-between py-3 text-[14px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconMaker name={v.name} />
                      <span className="font-semibold text-ink">{v.name}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[13px] text-slate-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {v.rating > 0 ? v.rating.toFixed(1) : "—"}
                    </span>
                  </div>
                ))}
          </div>
          <CardFooter to="/vendors" label="View All Vendors" />
        </Card>
      </div>
    </section>
  );
}

/* ---------- Skeletons (match each row's real markup) ---------- */

function LowestItemRowSkeleton() {
  return (
    <div className="grid grid-cols-[1.2fr_1fr_1.4fr_auto] items-center gap-2 py-2.5">
      <div className="h-3.5 w-16 animate-pulse rounded bg-slate-100" />
      <div className="h-3.5 w-12 animate-pulse rounded bg-slate-100" />
      <div className="h-3.5 w-20 animate-pulse rounded bg-slate-100" />
      <div className="h-5 w-10 animate-pulse justify-self-end rounded-md bg-slate-100" />
    </div>
  );
}

function SavingsRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
      <div className="flex items-center gap-2">
        <div className="h-3.5 w-14 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-10 animate-pulse rounded-md bg-slate-100" />
      </div>
    </div>
  );
}

function TopVendorRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 shrink-0 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-3.5 w-20 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="h-3.5 w-8 animate-pulse rounded bg-slate-100" />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      {children}
    </div>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <h3 className="text-[13px] font-bold tracking-wide text-ink">{title}</h3>
    </div>
  );
}

function CardFooter({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mt-4 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-[14px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
