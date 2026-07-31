import { useState, useEffect } from 'react'
import { Scale, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'

type NavItem = { label: string; to: string }

const navLinks: NavItem[] = [
  { label: 'Vendors', to: '/vendors' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Apply', to: '/vendor-apply' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-brand-600 ${
      isActive && pathname !== '/' ? 'text-brand-600' : 'text-slate-700'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <NavLink key={item.label} to={item.to} end className={linkClass}>
              {item.label}
            </NavLink>
          ))}

          {/* Priority CTA */}
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-700 hover:to-brand-600 hover:shadow-brand-600/40 ${
                isActive ? 'ring-2 ring-brand-300' : ''
              }`
            }
          >
            <Scale className="h-4 w-4" />
            Compare Peptides
          </NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-slate-50 ${
                    isActive && pathname !== '/' ? 'text-brand-600' : 'text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/compare"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/25"
            >
              <Scale className="h-4 w-4" />
              Compare Peptides
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
