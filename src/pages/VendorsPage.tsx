import { useEffect, useRef, useState, useCallback } from "react";
import {
  Store,
  Star,
  BadgeCheck,
  ShieldCheck,
  ExternalLink,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetVendorsQuery } from "../store/features/vendorSlice";
import IconMaker from "../helpers/iconMaker";
import { PaymentMethodIcons } from "../helpers/paymentMethodIcons";
import { IVendorList } from "../types/vendorlist.type";

const money = (n: number) => `$${n.toFixed(2)}`;

function openVendor(name: string, website?: string) {
  const target =
    website ??
    `https://www.google.com/search?q=${encodeURIComponent(`${name} research peptides`)}`;
  window.open(target, "_blank", "noopener,noreferrer");
}

const PAGE_LIMIT = 10;

function VendorCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="space-y-2">
          <div className="h-2.5 w-10 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}

export default function VendorsPage() {
  const [page, setPage] = useState(1);
  const [vendors, setVendors] = useState<IVendorList[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: VendorListData,
    isFetching,
    isLoading,
  } = useGetVendorsQuery({
    page,
    limit: PAGE_LIMIT,
  });

  // Append each page's results to the running list
  useEffect(() => {
    if (!VendorListData?.data) return;

    setVendors((prev) =>
      page === 1 ? VendorListData.data : [...prev, ...VendorListData.data],
    );

    const { page: currentPage, totalPage } = VendorListData.pagination;
    setHasMore(currentPage < totalPage);
  }, [VendorListData, page]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) return;
    setPage((p) => p + 1);
  }, [isFetching, hasMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const showInitialSkeleton = isLoading && vendors.length === 0;

  return (
    <div className="bg-[#f7fafd]">
      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <Store className="h-4 w-4 text-brand-600" />
            Trusted Vendors
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
            Every Peptide Vendor{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              We Track
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            We independently monitor pricing, coupons, and lab-testing across{" "}
            {VendorListData?.pagination?.total ?? vendors.length} research
            peptide suppliers — so you always buy from the best.
          </p>
        </div>
      </section>

      {/* Vendor grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showInitialSkeleton
            ? Array.from({ length: 6 }).map((_, i) => (
                <VendorCardSkeleton key={`skeleton-${i}`} />
              ))
            : vendors.map((v) => (
                <div
                  key={v._id}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft"
                >
                  {/* Top: logo + name */}
                  <div className="flex items-start gap-3">
                    <IconMaker name={v.name} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-[16px] font-bold text-ink">
                          {v.name}
                        </h3>
                        {v.is_verified && (
                          <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
                        )}
                      </div>
                      {v.rating > 0 ? (
                        <div className="mt-0.5 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-[12.5px] font-semibold text-slate-700">
                            {v.rating.toFixed(1)}
                          </span>
                          <span className="text-[12px] text-slate-400">
                            ({v.total_reviews} reviews)
                          </span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-slate-400">
                          New vendor
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Blurb */}
                  <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                    {v.about}
                  </p>

                  {/* Meta chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-600">
                      {v.count} peptide{v.count > 1 ? "s" : ""}
                    </span>
                    {v?.quality && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[12px] font-semibold text-brand-700">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Lab Tested
                      </span>
                    )}
                    {v?.has_discount && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-brand-300 bg-brand-50 px-2.5 py-1 text-[12px] font-semibold text-brand-700">
                        <Ticket className="h-3.5 w-3.5" />
                        {v.coupon_code} · {v.discount_amount}% off
                      </span>
                    )}
                    {v.delivery_cost != null && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-600">
                        Delivery:{" "}
                        {v.delivery_cost === 0 ? "Free" : money(v.delivery_cost)}
                      </span>
                    )}
                    {typeof v.is_stock === "boolean" && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                          v.is_stock
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {v.is_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    )}
                  </div>

                  {v.payment_methods?.length > 0 && (
                    <div className="mt-3">
                      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Payment
                      </div>
                      <PaymentMethodIcons methods={v.payment_methods} />
                    </div>
                  )}

                  {/* Footer: price + visit */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        From
                      </div>
                      <div className="text-[16px] font-bold text-brand-600">
                        {money(v.minPrice)}
                        <span className="text-[11px] font-medium text-slate-400">
                          /mg
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => openVendor(v.name, v.website_url)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Visit Store
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

          {/* Skeletons appended while fetching the next page */}
          {isFetching &&
            !showInitialSkeleton &&
            Array.from({ length: 3 }).map((_, i) => (
              <VendorCardSkeleton key={`skeleton-more-${i}`} />
            ))}
        </div>

        {/* Scroll sentinel — triggers the next page when it enters the viewport */}
        {hasMore && !showInitialSkeleton && (
          <div ref={sentinelRef} className="h-px w-full" />
        )}

        {!hasMore && vendors.length > 0 && (
          <p className="mt-8 text-center text-[13px] text-slate-400">
            You've reached the end of the list.
          </p>
        )}

        {/* CTA to compare */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-8 text-center">
          <h2 className="text-[22px] font-extrabold text-ink">
            Ready to find the lowest price?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-600">
            Compare live prices and coupons across all of these vendors in one
            place.
          </p>
          <Link
            to="/compare"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-700 hover:to-brand-600"
          >
            Compare Peptide Prices
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {/* CTA for new vendors */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
          <h2 className="text-[22px] font-extrabold text-ink">
            Are you a peptide vendor?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-600">
            Apply to list your products on Pepti Center and reach buyers comparing
            research peptide prices.
          </p>
          <Link
            to="/vendor-apply"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-6 py-3 text-[15px] font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            Apply to Pepti Center
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
