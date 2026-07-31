import { useEffect, useState } from "react";
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/articles";
import BlogCard from "../components/BlogCard";
import { useGetBlogsQuery } from "../store/features/blogsSlice";

const PAGE_LIMIT = 9;

function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
      <div className="aspect-[16/9] w-full animate-pulse bg-slate-100" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-100" />
          <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

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
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(page - 1)}
        disabled={disabled || page <= 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
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
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-[13.5px] font-semibold transition-colors disabled:cursor-not-allowed ${
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
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category") ?? "All";
  const [page, setPage] = useState(1);

  const setActive = (cat: string) => {
    if (cat === "All") setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const {
    data: blogsData,
    isLoading,
    isFetching,
  } = useGetBlogsQuery({
    category: active == "All" ? "" : active,
    page,
    limit: PAGE_LIMIT,
  });

  // Reset to page 1 whenever the category filter changes
  useEffect(() => {
    setPage(1);
  }, [active]);

  const blogs = blogsData?.data;
  const pagination = blogsData?.pagination;
  const isPageLoading = isLoading || isFetching;

  return (
    <div className="bg-[#f7fafd]">
      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm">
            <Newspaper className="h-4 w-4 text-brand-600" />
            PeptiCenter Blog
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
            Research, Pricing &amp; Peptide{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Guides
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            The latest articles on peptide science, vendor pricing trends, and
            practical research guides — all in one place.
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        {/* Category filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors ${
                  isActive
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm shadow-brand-600/25"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {isPageLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
              <BlogCardSkeleton key={`blog-skeleton-${i}`} />
            ))}
          </div>
        ) : (blogs?.length ?? 0) > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((article) => (
              <BlogCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-[15px] text-slate-500">
            No articles in this category yet.
          </p>
        )}

        {/* Traditional pagination */}
        {pagination && !isPageLoading && (
          <Pagination
            page={pagination.page}
            totalPage={pagination.totalPage}
            disabled={isPageLoading}
            onChange={(p) => setPage(p)}
          />
        )}
      </section>
    </div>
  );
}
