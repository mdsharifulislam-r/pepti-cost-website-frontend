import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ArticleVisual from "./ArticleVisual";
import { IBlog } from "../types/blog.type";

export default function BlogCard({ article }: { article: IBlog }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-shadow hover:shadow-soft">
      {/* Cover */}
      <Link
        to={`/blog/${article._id}`}
        className="relative block h-48 overflow-hidden"
      >
        <ArticleVisual visual={article?.thumbnail || "lab"} />
        {/* category badge */}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-green-600 shadow-sm">
          {article?.category}
        </span>
        <span className="absolute right-4 top-4 text-[10px] font-medium text-white/70">
          PeptidePricing.com
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wide text-green-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(article?.createdAt!).toDateString()}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            Admin
          </span>
        </div>

        <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
          <Link to={`/blog/${article._id}`}>{article.headline}</Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-slate-500">
          {article.content}
        </p>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <Link
            to={`/blog/${article._id}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-green-600 transition-colors hover:text-green-700"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
