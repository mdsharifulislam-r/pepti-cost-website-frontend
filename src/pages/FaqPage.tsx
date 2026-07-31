import { useState } from "react";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetFaqsQuery } from "../store/features/faq.slice";
import { IFaq } from "../types/faq.type";

function FaqItem({ item }: { item: IFaq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15.5px] font-semibold text-ink">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate-600">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const { data: faqData } = useGetFaqsQuery();
  const faqs = faqData?.data || [];
  return (
    <div className="bg-[#f7fafd]">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <HelpCircle className="h-4 w-4 text-brand-600" />
            Help Center
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            Everything you need to know about how PeptiCenter compares prices,
            coupons, and vendors.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="mx-auto max-w-3xl px-4 py-10 pb-16 sm:px-6">
        <div className="space-y-3">
          {faqs.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-8 text-center">
          <h2 className="text-[20px] font-extrabold text-ink">
            Still have a question?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-600">
            Start comparing prices, or learn more about who we are.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-700 hover:to-brand-600"
            >
              Compare Prices
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
