import { ShieldCheck } from "lucide-react";
import { useGetDisclaimerQuery } from "../store/features/faq.slice";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  badge,
  title,
}: {
  badge: string;
  title: string;
}) {
  const type = title == "Terms & Conditions" ? "terms" : "privacy";
  const { data: disclaimerData } = useGetDisclaimerQuery({ type });

  const intro = disclaimerData?.data;

  return (
    <div className="bg-[#f7fafd]">
      {/* Header */}
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
          <p className="mt-3 text-[13.5px] font-medium text-slate-500">
            Last updated: {new Date((intro as any)?.updatedAt).toDateString()}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
          <div
            dangerouslySetInnerHTML={{
              __html: intro?.content || "",
            }}
          />
          <p className="mt-8 border-t border-slate-100 pt-6 text-[13.5px] text-slate-400">
            Questions about this page? Reach us via the contact details on our
            website.
          </p>
        </div>
      </section>
    </div>
  );
}
