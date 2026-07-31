import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useGetBannersQuery } from '../store/features/bannerSlice'
import { getImageUrl } from '../lib/utils'


export default function BannerSlider() {
  const { data, isLoading, error } = useGetBannersQuery()
  const banners = data?.data ?? []
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (banners.length < 2) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [banners.length])

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          Loading banners...
        </div>
      </section>
    )
  }

  if (error || banners.length === 0) {
    return null
  }

  const activeBanner = banners[activeIndex]
  const imageSrc = getImageUrl(activeBanner.image)

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="relative">
          <img
            src={imageSrc}
            alt={activeBanner.title || 'Promotional banner'}
            className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="mb-2 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur">
                  Featured offer
                </p>
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {activeBanner.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                  aria-label="Next banner"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {activeBanner.link ? (
                  <a
                    href={activeBanner.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    View deal
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>


      </div>
              {banners.length > 1 ? (
          <div className="flex justify-center gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3">
            {banners.map((banner, index) => (
              <button
                key={banner._id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-7 bg-brand-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
    </section>
  )
}
