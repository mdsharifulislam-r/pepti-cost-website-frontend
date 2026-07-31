import { useState } from 'react'
import {
  Building2,
  Globe,
  Mail,
  MessageSquareText,
  Phone,
  Store,
  UserRound,
} from 'lucide-react'
import { useSubmitApplicationMutation } from '../store/features/applicationSlice'

const initialState = {
  name: '',
  email: '',
  phone: '',
  company_name: '',
  website: '',
  products: '',
  labTesting: '',
  message: '',
}

export default function VendorApplyPage() {
  const [form, setForm] = useState(initialState)
  const [submitApplication, { isLoading, isSuccess, error }] =
    useSubmitApplicationMutation()

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await submitApplication(form).unwrap()
      setForm(initialState)
    } catch (submissionError) {
      console.error(submissionError)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 p-8 text-white shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">
            Vendor application
          </p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Apply to list your products on Pepti Center
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-brand-50 sm:text-base">
            New vendors can submit their business details and product information
            here. Our team will review your application and get back to you about
            listing your research peptides on the platform.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <Store className="h-5 w-5" />
              <span>For research peptide suppliers only</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <Mail className="h-5 w-5" />
              <span>partners@pepticost.com</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <MessageSquareText className="h-5 w-5" />
              <span>Review within 2–3 business days</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Contact person</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <UserRound className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="John Doe"
                />
              </div>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Business / company name</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Building2 className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Acme Peptides LLC"
                />
              </div>
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Email</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Contact number</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="+1 555 123 4567"
                />
              </div>
            </label>
          </div>

          <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
            <span>Website (optional)</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Globe className="h-4 w-4 text-slate-400" />
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="https://yourstore.com"
              />
            </div>
          </label>

          <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
            <span>Which peptides or products do you offer?</span>
            <textarea
              name="products"
              value={form.products}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="e.g. BPC-157, Retatrutide, MOTS-c, TB-500..."
            />
          </label>

          <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
            <span>Do you provide third-party lab testing / COAs?</span>
            <select
              name="labTesting"
              value={form.labTesting}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
            >
              <option value="">Select an option</option>
              <option value="Yes, for all products">Yes, for all products</option>
              <option value="Yes, for some products">Yes, for some products</option>
              <option value="No, not currently">No, not currently</option>
            </select>
          </label>

          <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
            <span>Additional information</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="Tell us about your shipping regions, payment methods, coupons, or why you want to join Pepti Center..."
            />
          </label>

          {isSuccess ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Your application has been submitted successfully. We will contact
              you soon.
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              We could not submit your application right now. Please try again
              later.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-400"
          >
            {isLoading ? 'Submitting...' : 'Submit application'}
          </button>
        </form>
      </div>
    </section>
  )
}
