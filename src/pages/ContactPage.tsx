import { useState } from 'react'
import { Mail, MessageSquareText, Phone, UserRound } from 'lucide-react'
import { useSubmitContactMutation } from '../store/features/contactSlice'

const initialState = {
  fullName: '',
  email: '',
  contact: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialState)
  const [submitContact, { isLoading, isSuccess, error }] = useSubmitContactMutation()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await submitContact(form).unwrap()
      setForm(initialState)
    } catch (submissionError) {
      console.error(submissionError)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 p-8 text-white shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Contact us</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">We’re here to help with your peptide questions.</h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-brand-50 sm:text-base">
            Share your details and we’ll get back to you with the support you need about pricing, vendors, or product availability.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <Mail className="h-5 w-5" />
              <span>support@pepticost.com</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <Phone className="h-5 w-5" />
              <span>+1 (800) 555-0142</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <MessageSquareText className="h-5 w-5" />
              <span>Response within 24 hours</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Full name</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <UserRound className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="John Doe"
                />
              </div>
            </label>

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
                  placeholder="you@example.com"
                />
              </div>
            </label>
          </div>

          <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
            <span>Contact number</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Phone className="h-4 w-4 text-slate-400" />
              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm outline-none"
                placeholder="+1 555 123 4567"
              />
            </div>
          </label>

          <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="Tell us how we can help..."
            />
          </label>

          {isSuccess ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Your message has been sent successfully.
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              We could not send your message right now. Please try again later.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-400"
          >
            {isLoading ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  )
}
