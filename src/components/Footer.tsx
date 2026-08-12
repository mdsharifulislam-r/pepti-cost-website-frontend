import { Twitter, Facebook, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

type FooterLink = { label: string; to?: string }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'RESOURCES',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'About Us', to: '/about' },
      { label: 'Apply as Vendor', to: '/vendor-apply' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
]

const socials = [Twitter, Facebook, Youtube]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-navy-900 to-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-slate-400">
              The Research Peptide Resource Center. Compare vendors. Discover research.
              Verify quality. Save money.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-bold tracking-wider text-slate-400">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-[14px] text-slate-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a href="#" className="text-[14px] text-slate-300 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h4 className="text-[12px] font-bold tracking-wider text-slate-400">FOLLOW US</h4>
            <div className="mt-4 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-600"
                >
                  <Icon className="h-[18px] w-[18px] text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} PeptiCenter.com</span>
        </div>
      </div>
    </footer>
  )
}
