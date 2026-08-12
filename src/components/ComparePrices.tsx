import { useEffect, useMemo, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetPeptidesQuery } from "../store/features/peptideSlice";
import { useGetVendorItemsQuery } from "../store/features/vendorSlice";
import IconMaker from "../helpers/iconMaker";
import DosageTabs from "./DosageTabs";
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

const ROTATE_MS = 15000;
const FADE_MS = 300;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(rating);
        return (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${filled ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
          />
        );
      })}
    </div>
  );
}

export default function ComparePrices() {
  const { data: peptidesData } = useGetPeptidesQuery();
  const peptides = peptidesData?.data;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(ROTATE_MS / 1000);
  const [selectedDosage, setSelectedDosage] = useState<DosageMg>(10);

  useEffect(() => {
    let remaining = ROTATE_MS / 1000;
    const tick = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => {
            const len = peptides?.length || 0;
            return len > 0 ? (i + 1) % len : 0;
          });
          setVisible(true);
        }, FADE_MS);
        remaining = ROTATE_MS / 1000;
      }
      setSecondsLeft(remaining);
    }, 1000);
    return () => clearInterval(tick);
  }, [peptides]);

  useEffect(() => {
    setSelectedDosage(10);
  }, [index]);

  const featured = peptides?.[index];
  const visitTo = `/compare?q=${encodeURIComponent(featured?.name ?? "")}`;

  const { data: vendorsData } = useGetVendorItemsQuery(
    {
      peptide: featured?._id!,
    },
    { skip: !featured?._id },
  );

  const rows = useMemo(() => {
    const filtered = filterRowsByDosage(vendorsData?.data ?? [], selectedDosage);
    return sortVendorRows(filtered, "priceMg");
  }, [vendorsData?.data, selectedDosage]);

  const bestValueId = getBestValueVendorId(rows);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold text-ink sm:text-[18px]">
            COMPARE PRICES: {featured?.name.toUpperCase()}{" "}
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
            </span>
            Live preview
            <span className="tabular-nums text-brand-400">{secondsLeft}s</span>
          </span>
        </div>

        <div className="mb-4">
          <DosageTabs value={selectedDosage} onChange={setSelectedDosage} />
        </div>

        <div
          className="transition-opacity ease-in-out"
          style={{
            opacity: visible ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  <th className="py-2.5 text-left font-semibold">Vendor</th>
                  <th className="py-2.5 text-left font-semibold">Rating</th>
                  <th className="py-2.5 text-left font-semibold">Price</th>
                  <th className="py-2.5 text-left font-semibold">Price / mg</th>
                  <th className="py-2.5 text-left font-semibold">Stock</th>
                  <th className="py-2.5 text-left font-semibold">Payment</th>
                  <th className="py-2.5 text-right font-semibold">Visit</th>
                </tr>
              </thead>
              <tbody className="text-[13.5px]">
                {rows.map((row) => {
                  const isBestValue = row._id === bestValueId;
                  return (
                    <tr
                      key={`${row._id}`}
                      className={`border-b border-slate-100 last:border-0 ${
                        isBestValue
                          ? "border-l-4 border-l-brand-400 bg-brand-50/40"
                          : ""
                      }`}
                    >
                      <td className="py-4 pr-3">
                        <div className="flex items-center gap-2.5">
                          <IconMaker name={row.name} className="h-9 w-9" />
                          <span className="font-semibold text-ink">
                            {row.name}
                          </span>
                          {isBestValue && (
                            <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                              Best Value
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-3">
                        {row.rating != null ? (
                          <div className="flex items-center gap-1.5">
                            <Stars rating={row.rating} />
                            <span className="font-semibold text-ink">
                              {row.rating.toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="py-4 pr-3 text-[15px] font-bold text-ink">
                        {money(row.total_price)}
                      </td>
                      <td className="py-4 pr-3 font-semibold text-slate-700">
                        {money(row.price_per_unit)}
                        <span className="text-[11px] font-medium text-slate-400">
                          /mg
                        </span>
                      </td>
                      <td className="py-4 pr-3">
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
                      <td className="py-4 pr-3">
                        <PaymentMethodIcons
                          methods={row.payment_methods}
                          variant="compact"
                        />
                      </td>
                      <td className="py-4 pl-3 text-right">
                        <Link
                          to={visitTo}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-700"
                        >
                          Visit
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {rows.map((row) => {
              const isBestValue = row._id === bestValueId;
              return (
                <div
                  key={`${row._id}`}
                  className={`rounded-xl border p-3.5 ${
                    isBestValue
                      ? "border-brand-300 bg-brand-50/50"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconMaker name={row.name} className="h-9 w-9" />
                    <span className="font-semibold text-ink">{row.name}</span>
                    {isBestValue && (
                      <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                        Best Value
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <div className="text-[18px] font-bold text-ink">
                        {money(row.total_price)}
                      </div>
                      <div className="text-[12px] font-medium text-slate-400">
                        {money(row.price_per_unit)}/mg
                      </div>
                    </div>
                    <div className="text-right">
                      {row.rating != null ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <Stars rating={row.rating} />
                          <span className="text-[13px] font-semibold text-ink">
                            {row.rating.toFixed(1)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[13px] text-slate-300">
                          No rating
                        </span>
                      )}
                      <div className="mt-1 text-[12.5px] font-semibold">
                        {vendorInStock(row) ? (
                          <span className="text-brand-600">In Stock</span>
                        ) : (
                          <span className="text-rose-500">Out of Stock</span>
                        )}
                      </div>
                      {row.payment_methods?.length ? (
                        <div className="mt-2 flex justify-end">
                          <PaymentMethodIcons
                            methods={row.payment_methods}
                            variant="compact"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <Link
                    to={visitTo}
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Visit
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
