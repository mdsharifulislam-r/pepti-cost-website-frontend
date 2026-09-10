import { ShieldCheck } from "lucide-react";
import { useGetDisclaimerQuery } from "../store/features/faq.slice";
import { normalizeRichHtml } from "../helpers/richText";

export default function LegalPage({
  badge,
  title,
  type,
}: {
  badge: string;
  title: string;
  type: "terms" | "privacy";
}) {
  const { data: disclaimerData, isLoading, isError } = useGetDisclaimerQuery({
    type,
  });

  const disclaimer = disclaimerData?.data;
  const html = normalizeRichHtml(disclaimer?.content);

  return (
    <div className="bg-[#f7fafd]">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            {badge}
          </div>
          <h1 className="mt-5 text-[26px] font-extrabold leading-tight tracking-tight text-ink sm:text-[34px] lg:text-[40px]">
            {title}
          </h1>
          {disclaimer?.updatedAt ? (
            <p className="mt-3 text-[13.5px] font-medium text-slate-500">
              Last updated:{" "}
              {new Date(disclaimer.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 animate-pulse rounded bg-slate-100 ${
                    i % 3 === 2 ? "w-2/3" : "w-full"
                  }`}
                />
              ))}
            </div>
          ) : isError || !html ? (
            <p className="text-[15px] leading-relaxed text-slate-600">
              Content is not available yet. Please check back later.
            </p>
          ) : (
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          <p className="mt-8 border-t border-slate-100 pt-6 text-[13.5px] text-slate-400">
            Questions about this page? Reach us via the contact details on our
            website.
          </p>
        </div>
      </section>
    </div>
  );
}
