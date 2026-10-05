import { useMemo } from "react";
import { BookOpenText, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getPdfUrl } from "../lib/utils";
import { useGetLibraryItemsQuery } from "../store/features/librarySlice";

function stripHtml(html?: string) {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function LibraryCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="h-2.5 w-16 animate-pulse rounded-full bg-slate-100" />
        <div className="h-7 w-16 animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-slate-100" />
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, error } = useGetLibraryItemsQuery();

  const libraryItems = useMemo(
    () =>
      [...data]
        .filter((item) => item?.status === "active")
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
        ),
    [data],
  );

  const errorMessage =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "data" in error
        ? (error.data as { message?: string })?.message || "Something went wrong while loading the library."
        : "Something went wrong while loading the library.";

  return (
    <div className="bg-[#f7fafd]">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <BookOpenText className="h-4 w-4 text-brand-600" />
            PeptiPedia
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[36px] lg:text-[44px]">
            Explore peptide research and practical
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              {" "}library resources
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-600">
            Public research notes, guides, and reference material covering peptide science,
            dosing, and application topics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <LibraryCardSkeleton key={`library-skeleton-${index}`} />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 text-center text-red-700 shadow-[0_20px_45px_rgba(239,68,68,0.08)]">
            <p className="text-[15px] font-medium">{errorMessage}</p>
          </div>
        ) : libraryItems.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-10 text-center shadow-[0_20px_45px_rgba(15,23,42,0.03)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <BookOpenText className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-ink">No active library entries yet</h2>
            <p className="mt-2 text-[15px] text-slate-500">
              Check back soon for new research and educational resources.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {libraryItems.map((item) => {
              const hasPdf = Boolean(item.pdf && item.pdf.trim());
              const preview = stripHtml(item.content);

              return (
                <article
                  key={item._id}
                  className="group flex h-full cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
                  onClick={() => navigate(`/peptipedia/${item._id}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/peptipedia/${item._id}`);
                    }
                  }}
                  role="link"
                  tabIndex={0}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-brand-600" />
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>

                      {hasPdf ? (
                        <a
                          href={getPdfUrl(item.pdf)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-1 text-[10px] font-medium text-brand-700"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Download className="h-3 w-3" />
                          PDF
                        </a>
                      ) : null}
                    </div>

                    <h2 className="mt-3 text-[17px] font-semibold leading-snug text-slate-900">
                      {item.headline}
                    </h2>

                    <p className="mt-2 line-clamp-4 text-[13px] leading-6 text-slate-600">
                      {preview.length > 140 ? `${preview.slice(0, 140)}...` : preview}
                    </p>

                    <div className="mt-auto pt-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                        Read more
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
