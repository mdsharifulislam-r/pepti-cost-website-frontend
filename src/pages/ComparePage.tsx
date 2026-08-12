import { useEffect, useState } from "react";
import {
  Search,
  Star,
  BadgeCheck,
  ExternalLink,
  Scale,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { type ComparePeptide } from "../data/compare";
import { useGetPeptidesQuery } from "../store/features/peptideSlice";
import { useGetVendorItemsQuery } from "../store/features/vendorSlice";
import IconMaker from "../helpers/iconMaker";
import DosageTabs from "../components/DosageTabs";
import {
  filterRowsByDosage,
  getBestValueVendorId,
  sortVendorRows,
  type DosageMg,
} from "../helpers/compareUtils";
import {
  PaymentMethodIcons,
  vendorInStock,
} from "../helpers/paymentMethodIcons";

const money = (n: number) => `$${n.toFixed(2)}`;
const PAGE_LIMIT = 10;

function openVendor(vendor: string, peptide: string, url?: string) {
  const target =
    url ??
    `https://www.google.com/search?q=${encodeURIComponent(`${vendor} ${peptide} buy`)}`;
  window.open(target, "_blank", "noopener,noreferrer");
}

function CouponCode({ code, discount }: { code: string; discount: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard API unavailable — ignore
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      title="Click to copy coupon"
      className={`group inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-1 text-[12px] font-semibold transition-colors ${
        copied
          ? "border-brand-400 bg-brand-100 text-brand-700"
          : "border-brand-300 bg-brand-50 text-brand-700 hover:border-brand-500 hover:bg-brand-100"
      }`}
    >
      {code}
      <span className="rounded bg-brand-600 px-1 py-0.5 text-[10px] font-bold text-white">
        {discount}% OFF
      </span>
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
      )}
    </button>
  );
}

type SortKey = "price" | "priceMg";

type VisitInfo = {
  vendor: string;
  peptide: string;
  coupon?: string;
  url?: string;
  discount: number;
  price: number;
  finalPrice: number;
};

function VisitModal({
  visit,
  onClose,
}: {
  visit: VisitInfo | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!visit) return null;

  const needsCoupon = Boolean(visit.coupon);
  const canContinue = !needsCoupon || copied;

  const copy = async () => {
    if (!visit.coupon) return;
    try {
      await navigator.clipboard.writeText(visit.coupon);
    } catch {
      // clipboard API unavailable — ignore
    }
    setCopied(true);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    openVendor(visit.vendor, visit.peptide, visit.url);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[18px] font-bold text-ink">
              Copy your coupon to continue
            </h3>
            <p className="mt-1 text-[13.5px] text-slate-500">
              Visiting{" "}
              <span className="font-semibold text-ink">{visit.vendor}</span> for{" "}
              {visit.peptide}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {needsCoupon ? (
          <>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
              Apply this coupon at checkout to get{" "}
              <span className="font-semibold text-brand-700">
                {visit.discount}% off
              </span>
              . Copy the code, continue to the vendor, and paste it at checkout.
            </p>
            <button
              onClick={copy}
              className={`mt-4 flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed px-4 py-3.5 transition-colors ${
                copied
                  ? "border-brand-400 bg-brand-50"
                  : "border-brand-300 bg-brand-50/60 hover:border-brand-500 hover:bg-brand-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-[18px] font-extrabold tracking-wide text-brand-700">
                  {visit.coupon}
                </span>
                <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {visit.discount}% OFF
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy code
                  </>
                )}
              </span>
            </button>

            {/* Price after discount */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-[13.5px]">
              <span className="text-slate-500">
                Price after coupon
                <span className="ml-2 text-slate-400 line-through">
                  {money(visit.price)}
                </span>
              </span>
              <span className="text-[16px] font-extrabold text-brand-600">
                {money(visit.finalPrice)}
              </span>
            </div>
          </>
        ) : (
          <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
            No coupon is needed for this vendor. Click continue to visit their
            store.
          </p>
        )}

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[15px] font-semibold text-white transition-all ${
            canContinue
              ? "bg-brand-600 hover:bg-brand-700"
              : "cursor-not-allowed bg-slate-300"
          }`}
        >
          {canContinue ? "Continue to vendor" : "Copy coupon to continue"}
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Skeletons (match real row/card markup exactly) ---------- */

function VendorRowSkeleton() {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-4 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-100" />
          <div className="space-y-2">
            <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </td>
      <td className="py-4 pr-3">
        <div className="h-4 w-14 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pr-3">
        <div className="h-4 w-12 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pr-3">
        <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pr-3">
        <div className="h-5 w-16 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pr-3">
        <div className="h-6 w-20 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pr-3">
        <div className="h-4 w-12 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pr-3">
        <div className="h-7 w-24 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="py-4 pl-3 pr-6 text-right">
        <div className="ml-auto h-8 w-16 animate-pulse rounded-lg bg-slate-100" />
      </td>
    </tr>
  );
}

function VendorCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3.5">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-100" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-1/2 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="h-5 w-20 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-14 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="mt-3 h-9 w-full animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}

/* ---------- Traditional pagination control ---------- */

function buildPageList(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current]);
  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < total) pages.add(current + 1);

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const withGaps: (number | "...")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) withGaps.push("...");
    withGaps.push(p);
  });
  return withGaps;
}

function Pagination({
  page,
  totalPage,
  disabled,
  onChange,
}: {
  page: number;
  totalPage: number;
  disabled: boolean;
  onChange: (page: number) => void;
}) {
  if (totalPage <= 1) return null;

  const pageList = buildPageList(page, totalPage);

  return (
    <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 px-4 py-4 sm:px-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={disabled || page <= 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageList.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-1.5 text-[13px] font-medium text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            disabled={disabled}
            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2.5 text-[13px] font-semibold transition-colors disabled:cursor-not-allowed ${
              p === page
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={disabled || page >= totalPage}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ComparisonTable({
  peptide,
  peptideId,
  onVisit,
  searchTerm = "",
}: {
  peptide: ComparePeptide;
  peptideId: string;
  searchTerm?: string;
  onVisit: (info: VisitInfo) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [selectedDosage, setSelectedDosage] = useState<DosageMg>(10);
  const [page, setPage] = useState(1);

  const {
    data: peptideItems,
    isLoading,
    isFetching,
  } = useGetVendorItemsQuery({
    peptide: peptideId,
    page,
    limit: PAGE_LIMIT,
    searchTerm: searchTerm,
  });

  // Reset to page 1 whenever the peptide, search filter, or dosage changes
  useEffect(() => {
    setPage(1);
  }, [peptideId, searchTerm, selectedDosage]);

  const rows = sortVendorRows(
    filterRowsByDosage(peptideItems?.data ?? [], selectedDosage),
    sortKey,
  );
  const bestValueId = getBestValueVendorId(rows);
  const pagination = peptideItems?.pagination;
  const isPageLoading = isLoading || isFetching;

  // Nothing to show — only bail once we're sure (not while still loading)
  if (!isPageLoading && !rows.length) {
    return <></>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
      {/* Title strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <h2 className="text-[15px] font-bold text-ink sm:text-[18px]">
          COMPARE PRICES: {peptide.name.toUpperCase()}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <DosageTabs value={selectedDosage} onChange={setSelectedDosage} />
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
            {peptide?.category}
          </span>
        </div>
      </div>

      {/* Desktop: full table (fits without scroll from lg up) */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1240px] border-collapse">
          <thead>
            <tr className="bg-brand-600 text-[11px] font-bold uppercase tracking-wider text-white/90">
              <th className="py-3.5 pl-6 pr-3 text-left font-bold">
                <span className="inline-flex items-center gap-1">
                  Supplier <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </th>
              <th className="py-3.5 pr-3 text-left font-bold">
                <button
                  onClick={() => setSortKey("price")}
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  Price{" "}
                  <ChevronsUpDown
                    className={`h-3.5 w-3.5 ${sortKey === "price" ? "opacity-100" : "opacity-70"}`}
                  />
                </button>
              </th>
              <th className="py-3.5 pr-3 text-left font-bold">
                <button
                  onClick={() => setSortKey("priceMg")}
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  Price / mg{" "}
                  <ChevronsUpDown
                    className={`h-3.5 w-3.5 ${sortKey === "priceMg" ? "opacity-100" : "opacity-70"}`}
                  />
                </button>
              </th>
              <th className="w-[88px] py-3.5 pr-3 text-left font-bold">
                <span className="inline-flex items-center gap-1">
                  Stock <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </th>
              <th className="w-[100px] py-3.5 pr-3 text-left font-bold">
                <span className="inline-flex items-center gap-1">
                  Quality <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </th>
              <th className="min-w-[150px] py-3.5 pr-3 text-left font-bold">
                <span className="inline-flex items-center gap-1">
                  Coupon <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </th>
              <th className="w-[80px] py-3.5 pr-3 text-left font-bold">
                <span className="inline-flex items-center gap-1">
                  Delivery <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </th>
              <th className="min-w-[180px] py-3.5 pr-3 text-left font-bold">
                <span className="inline-flex items-center gap-1">
                  Payment <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </th>
              <th className="w-[110px] py-3.5 pr-6 text-right font-bold">Visit</th>
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {isPageLoading
              ? Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                  <VendorRowSkeleton key={`row-skeleton-${i}`} />
                ))
              : rows.map((row) => {
                  const isBestValue = row._id === bestValueId;
                  return (
                    <tr
                      key={`${row._id}-${row.peptide}`}
                      className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70 ${
                        isBestValue
                          ? "border-l-4 border-l-brand-400 bg-brand-50/40"
                          : ""
                      }`}
                    >
                      {/* Supplier */}
                      <td className="align-middle py-4 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <IconMaker name={row.name} className="h-9 w-9" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-ink">
                                {row.name}
                              </span>
                              {isBestValue && (
                                <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                                  Best Value
                                </span>
                              )}
                            </div>
                            {row.rating != null && (
                              <div className="mt-0.5 flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-[12px] font-semibold text-slate-700">
                                  {row.rating.toFixed(1)}
                                </span>
                                {row.total_reviews != null && (
                                  <span className="text-[12px] text-slate-400">
                                    ({row.total_reviews})
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="mt-0.5 text-[12px] text-slate-500">
                              {peptide.name} {row.unit} mg
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="align-middle py-4 pr-3 text-[17px] font-extrabold text-ink">
                        {money(row.total_price)}
                      </td>

                      {/* Price / mg */}
                      <td className="align-middle py-4 pr-3 font-semibold text-slate-700">
                        {money(row.price_per_unit)}
                        <span className="text-[11px] font-medium text-slate-400">
                          /mg
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="align-middle py-4 pr-3 whitespace-nowrap">
                        {vendorInStock(row) ? (
                          <span className="font-semibold text-brand-600">
                            In Stock
                          </span>
                        ) : (
                          <span className="font-semibold text-rose-500">
                            Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Quality */}
                      <td className="align-middle py-4 pr-3 whitespace-nowrap">
                        {row.quality ? (
                          <span className="inline-flex items-center rounded-md bg-brand-100 px-2 py-1 text-[11px] font-bold text-brand-700">
                            Lab Tested
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Coupon */}
                      <td className="align-middle py-4 pr-3">
                        {row.has_discount ? (
                          <CouponCode
                            code={row.coupon_code}
                            discount={row.discount_amount}
                          />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Delivery */}
                      <td className="align-middle py-4 pr-3 font-semibold whitespace-nowrap text-slate-700">
                        {row.delivery_cost != null ? (
                          row.delivery_cost === 0 ? (
                            <span className="text-brand-600">Free</span>
                          ) : (
                            money(row.delivery_cost)
                          )
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Payment */}
                      <td className="align-middle py-4 pr-3">
                        <PaymentMethodIcons
                          methods={row.payment_methods}
                          variant="compact"
                          maxVisible={6}
                        />
                      </td>

                      {/* Visit */}
                      <td className="align-middle py-4 pl-3 pr-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (row.has_discount) {
                              onVisit({
                                vendor: row.name,
                                peptide: peptide.name,
                                coupon: row.coupon_code,
                                url: row.website_url,
                                discount: row.discount_amount,
                                price: row.total_price,
                                finalPrice: row.discounted_price,
                              });
                            } else {
                              openVendor(
                                row.name,
                                peptide.name,
                                row.website_url,
                              );
                            }
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-700"
                        >
                          Visit
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet: stacked cards (no horizontal scroll) */}
      <div className="lg:hidden">
        <div className="space-y-3 px-4 pb-3 sm:px-6">
          <DosageTabs value={selectedDosage} onChange={setSelectedDosage} />
        </div>

        {/* Sort control */}
        <div className="flex items-center gap-2 px-4 pb-3 sm:px-6">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-slate-400">
            Sort by
          </span>
          <div className="flex overflow-hidden rounded-lg border border-slate-200">
            <button
              onClick={() => setSortKey("price")}
              className={`px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                sortKey === "price"
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setSortKey("priceMg")}
              className={`px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                sortKey === "priceMg"
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              Price / mg
            </button>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-5 sm:px-6">
          {isPageLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <VendorCardSkeleton key={`card-skeleton-${i}`} />
              ))
            : rows.map((row) => {
                const isBestValue = row._id === bestValueId;
                return (
                  <div
                    key={`${row._id}-${row.quality}`}
                    className={`rounded-xl border p-3.5 ${
                      isBestValue
                        ? "border-brand-300 bg-brand-50/50"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    {/* Top: supplier */}
                    <div className="flex items-start gap-3">
                      <IconMaker name={row.name} className="h-9 w-9" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-ink">{row.name}</span>
                          {isBestValue && (
                            <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                              Best Value
                            </span>
                          )}
                          {row.quality ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                              <BadgeCheck className="h-3 w-3" />
                              Lab Tested
                            </span>
                          ) : (
                            row.is_verified && (
                              <BadgeCheck className="h-4 w-4 text-amber-500" />
                            )
                          )}
                        </div>
                        {row.rating != null && (
                          <div className="mt-0.5 flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-[12px] font-semibold text-slate-700">
                              {row.rating.toFixed(1)}
                            </span>
                            {row.total_reviews != null && (
                              <span className="text-[12px] text-slate-400">
                                ({row.total_reviews})
                              </span>
                            )}
                          </div>
                        )}
                        <div className="mt-0.5 text-[12px] text-slate-500">
                          {peptide.name} {row.unit}
                        </div>
                      </div>
                    </div>

                    {/* Middle: price + price/mg */}
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div>
                        <div className={`text-[20px] font-extrabold text-ink`}>
                          {money(row.total_price)}
                        </div>
                        <div className="text-[12px] font-medium text-slate-400">
                          {money(row.price_per_unit)}/mg
                        </div>
                      </div>
                      <div className="text-right text-[12.5px] font-semibold">
                        {vendorInStock(row) ? (
                          <span className="text-brand-600">In Stock</span>
                        ) : (
                          <span className="text-rose-500">Out of Stock</span>
                        )}
                      </div>
                    </div>

                    {/* Delivery + payment */}
                    {(row.delivery_cost != null || row.payment_methods?.length) && (
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        {row.delivery_cost != null ? (
                          <div className="text-[12px] text-slate-500">
                            Delivery:{" "}
                            <span className="font-semibold text-slate-700">
                              {row.delivery_cost === 0
                                ? "Free"
                                : money(row.delivery_cost)}
                            </span>
                          </div>
                        ) : (
                          <span />
                        )}
                        <PaymentMethodIcons methods={row.payment_methods} />
                      </div>
                    )}

                    {/* Chips: quality + coupon */}
                    {(row.quality || row.has_discount) && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {row.quality && (
                          <span className="inline-flex items-center rounded-md bg-brand-100 px-2 py-1 text-[11px] font-bold text-brand-700">
                            Lab Tested
                          </span>
                        )}
                        {row.has_discount && (
                          <CouponCode
                            code={row.coupon_code}
                            discount={row.discount_amount}
                          />
                        )}
                      </div>
                    )}

                    {/* Bottom: full-width visit button */}
                    <button
                      onClick={() => {
                        if (row.has_discount) {
                          onVisit({
                            vendor: row.name,
                            peptide: peptide.name,
                            coupon: row.coupon_code,
                            url: row.website_url,
                            discount: row.discount_amount,
                            price: row.total_price,
                            finalPrice: row.discounted_price,
                          });
                        } else {
                          openVendor(row.name, peptide.name, row.website_url);
                        }
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Visit
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Traditional pagination — shared by desktop table and mobile cards */}
      {pagination && (
        <Pagination
          page={pagination.page}
          totalPage={pagination.totalPage}
          disabled={isPageLoading}
          onChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
}

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [medicine, setMedicine] = useState("All");
  const [visit, setVisit] = useState<VisitInfo | null>(null);

  const { data: peptideData } = useGetPeptidesQuery();
  const peptides = peptideData?.data || [];
  const filteredPeptides = peptides.filter((p) =>
    medicine === "All" ? true : p.name === medicine,
  );

  return (
    <div className="bg-[#f7fafd]">
      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <Scale className="h-4 w-4 text-brand-600" />
            Price Comparison
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
            Compare Every Vendor&apos;s{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Peptide Prices
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            Filter by medicine, apply the best coupons, and instantly find the
            lowest price per mg across trusted vendors.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by peptide (BPC-157, Retatrutide, MOTS-c...)"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-[15px] text-slate-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          {/* peptide category filter */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            {peptides?.map((peptide) => {
              const isActive = medicine === peptide.name;
              return (
                <button
                  key={peptide.name}
                  onClick={() => setMedicine(peptide.name)}
                  className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors ${
                    isActive
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm shadow-brand-600/25"
                      : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600"
                  }`}
                >
                  {peptide.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 pb-16 sm:px-6">
        {filteredPeptides?.length > 0 ? (
          filteredPeptides.map((p) => (
            <ComparisonTable
              key={p.name}
              peptideId={p._id}
              peptide={p as any}
              searchTerm={query}
              onVisit={setVisit}
            />
          ))
        ) : (
          <p className="py-16 text-center text-[15px] text-slate-500">
            No peptides match your filter. Try a different name or category.
          </p>
        )}
      </section>

      <VisitModal
        key={visit ? `${visit.peptide}-${visit.vendor}` : "closed"}
        visit={visit}
        onClose={() => setVisit(null)}
      />
    </div>
  );
}
