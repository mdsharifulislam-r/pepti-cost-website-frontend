import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowLeft,
  ChevronRight,
  Tag,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

import { useGetBlogByIdQuery } from "../store/features/blogsSlice";
import { getImageUrl } from "../lib/utils";

/* ---------------- Skeleton ---------------- */

function BlogDetailSkeleton() {
  return (
    <div className="bg-[#f7fafd]">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6">
          <div className="h-3 w-10 animate-pulse rounded bg-slate-100" />
          <ChevronRight className="h-3.5 w-3.5 text-slate-200" />
          <div className="h-3 w-10 animate-pulse rounded bg-slate-100" />
          <ChevronRight className="h-3.5 w-3.5 text-slate-200" />
          <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <article className="min-w-0">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />

          {/* Title */}
          <div className="mt-6 space-y-3">
            <div className="h-9 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-9 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>

          {/* Meta box */}
          <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-card sm:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
                  <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>

          {/* Cover */}
          <div className="mt-7 h-[380px] w-full animate-pulse rounded-2xl border border-slate-100 bg-slate-100 sm:h-[480px]" />

          {/* Body */}
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-3.5 animate-pulse rounded bg-slate-100 ${
                  i % 3 === 2 ? "w-2/3" : "w-full"
                }`}
              />
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-6">
            <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-500">
              <Tag className="h-3.5 w-3.5 text-green-600" />
              Tags:
            </span>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 animate-pulse rounded-full bg-slate-100"
              />
            ))}
          </div>

          {/* Share */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <span className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
              Share This Article:
            </span>
            <div className="flex items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-9 animate-pulse rounded-full bg-slate-100"
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function BlogDetailPage() {
  const { id } = useParams();
  const { data: articleData, isLoading } = useGetBlogByIdQuery({ id: id! });
  const article = articleData?.data;

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-ink">Article not found</h1>
        <p className="mt-3 text-slate-500">
          The article you’re looking for doesn’t exist.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const tags = article?.tags || [];

  return (
    <div className="bg-[#f7fafd]">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[13px] font-medium text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-brand-600">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <Link to="/blog" className="hover:text-brand-600">
            Blog
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-700">{article.category}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Main article */}
        <article className="min-w-0">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>

          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[42px]">
            {article.headline}
          </h1>

          {/* Meta box */}
          <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-card sm:grid-cols-3">
            <MetaItem icon={User} label="Written By" value={"Admin"} />
            <MetaItem
              icon={Calendar}
              label="Last Updated"
              value={article?.updatedAt}
            />
          </div>

          {/* Cover */}
          <div className="mt-7 max-h-[700px] overflow-hidden rounded-2xl border border-slate-100 shadow-soft">
            <img
              src={getImageUrl(article?.thumbnail)}
              alt={article?.headline}
              className="w-full object-cover"
            />
          </div>

          {/* Body */}
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: article?.content }}
          />

          {/* Tags */}
          <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-6">
            <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-500">
              <Tag className="h-3.5 w-3.5 text-green-600" />
              Tags:
            </span>
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[12.5px] font-medium text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <span className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
              Share This Article:
            </span>
            <div className="flex items-center gap-2">
              {[Facebook, Twitter, Linkedin, Link2].map((Icon, i) => (
                <button
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
        <Icon className="h-4 w-4 text-green-600" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </div>
        <div className="truncate text-[14px] font-semibold text-ink">
          {label === "Last Updated" ? new Date(value).toLocaleString() : value}
        </div>
      </div>
    </div>
  );
}
