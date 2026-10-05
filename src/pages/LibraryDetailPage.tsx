import { useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpenText, Download, FileText, Link2, Printer, Tag, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { normalizeRichHtml } from "../helpers/richText";
import { getImageUrl, getPdfUrl } from "../lib/utils";
import { useGetLibraryItemByIdQuery } from "../store/features/librarySlice";

function LibraryDetailSkeleton() {
  return (
    <div className="bg-[#f7fafd]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
        <div className="mt-5 h-10 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="mt-8 h-[360px] w-full animate-pulse rounded-2xl bg-slate-100" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`h-3.5 animate-pulse rounded bg-slate-100 ${
                index % 3 === 2 ? "w-2/3" : "w-full"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LibraryDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetLibraryItemByIdQuery(id || "", {
    skip: !id,
  });

  const item = data;
  const html = normalizeRichHtml(item?.content);
  const image = item?.thumbnail ? getImageUrl(item.thumbnail) : "";
  const hasPdf = Boolean(item?.pdf && item.pdf.trim());
  const [pdfOpen, setPdfOpen] = useState(false);
  const pdfViewerRef = useRef<HTMLIFrameElement | null>(null);

  const pdfUrl = useMemo(() => (item?.pdf ? getPdfUrl(item.pdf) : ""), [item?.pdf]);

  const handlePrintPdf = () => {
    if (!item?.pdf) return;

    const pdfUrl = getPdfUrl(item.pdf);
    const printWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");
    if (printWindow) {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    }
  };

  if (isLoading) return <LibraryDetailSkeleton />;

  if (isError || !item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-ink">Library item not found</h1>
        <p className="mt-3 text-slate-500">
          The resource you’re looking for doesn’t exist or is no longer available.
        </p>
        <Link
          to="/peptipedia"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to PeptiPedia
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f7fafd]">
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[13px] font-medium text-slate-500 sm:px-6">
          <Link to="/" className="hover:text-brand-600">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link to="/peptipedia" className="hover:text-brand-600">
            PeptiPedia
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700">{item.category || "Resource"}</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          to="/peptipedia"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {item.category ? (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-brand-700">
              {item.category}
            </span>
          ) : null}
          {item.createdAt ? (
            <span className="text-[11px] font-medium uppercase tracking-[0.13em] text-slate-500">
              {new Date(item.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 text-[26px] font-bold leading-tight text-slate-900 sm:text-[34px]">
          {item.headline}
        </h1>

        {image ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img src={image} alt={item.headline} className="max-h-[260px] w-full object-cover" />
          </div>
        ) : (
          <div className="mt-6 flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white text-brand-600">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
              <BookOpenText className="h-5 w-5" />
            </div>
          </div>
        )}

        {html ? (
          <div
            className="rich-text mt-6 max-w-none text-[14px] leading-7 text-slate-700 sm:text-[15px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="mt-6 text-[14px] leading-7 text-slate-600">
            {item.content || "No content available for this library item."}
          </p>
        )}

        {item.tags?.length ? (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              <Tag className="h-3 w-3 text-brand-600" />
              Tags:
            </span>
            {item.tags.map((tag) => (
              <span
                key={`${item._id}-${tag}`}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {hasPdf ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setPdfOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3 py-2 text-[12px] font-medium text-white"
            >
              <FileText className="h-3.5 w-3.5" />
              Open PDF
            </button>
            <span className="inline-flex items-center gap-2 text-[12px] text-slate-500">
              <FileText className="h-3.5 w-3.5 text-brand-600" />
              Resource document
            </span>
          </div>
        ) : null}

        <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          <Link2 className="h-3 w-3 text-brand-600" />
          Public resource
        </div>
      </div>

      {pdfOpen && pdfUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                <FileText className="h-4 w-4 text-brand-600" />
                PDF preview
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={handlePrintPdf}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => setPdfOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
                  aria-label="Close PDF viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <iframe
              ref={pdfViewerRef}
              title={item.headline}
              src={pdfUrl}
              className="h-full w-full bg-white"
              loading="lazy"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
