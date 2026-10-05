import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import LibraryPage from './pages/LibraryPage'
import LibraryDetailPage from './pages/LibraryDetailPage'
import ComparePage from './pages/ComparePage'
import VendorsPage from './pages/VendorsPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'
import VendorApplyPage from './pages/VendorApplyPage'
import CalculatorPage from './pages/CalculatorPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'PeptiCenter — Compare Research Peptide Prices in Seconds',
    description:
      'Compare research peptide prices, browse trusted vendors, and discover useful peptide resources with PeptiCenter.',
  },
  '/peptipedia': {
    title: 'PeptiPedia | PeptiCenter',
    description: 'Explore the PeptiCenter peptide library for research resources, guides, and informational content.',
  },
  '/compare': {
    title: 'Compare Peptide Prices | PeptiCenter',
    description: 'Quickly compare peptide prices across vendors and identify the best value for your research needs.',
  },
  '/vendors': {
    title: 'Peptide Vendors | PeptiCenter',
    description: 'Browse verified peptide vendors and compare supplier offerings through PeptiCenter.',
  },
  '/about': {
    title: 'About PeptiCenter',
    description: 'Learn more about PeptiCenter and the mission behind smarter peptide shopping and research discovery.',
  },
  '/faq': {
    title: 'FAQ | PeptiCenter',
    description: 'Find answers to common questions about peptide pricing, vendors, and product research on PeptiCenter.',
  },
  '/contact': {
    title: 'Contact | PeptiCenter',
    description: 'Get in touch with PeptiCenter for questions, vendor inquiries, and research support.',
  },
  '/blog': {
    title: 'Peptide Blog | PeptiCenter',
    description: 'Read educational blog content and industry updates covering peptide research and sourcing topics.',
  },
  '/calculator': {
    title: 'Peptide Calculator | PeptiCenter',
    description: 'Use the PeptiCenter calculator tools to estimate peptide dosage and preparation details more accurately.',
  },
}

function SeoMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = pageMeta[pathname] ?? pageMeta['/']

    document.title = meta.title

    const setMetaByName = (name: string, value: string) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

      if (!tag) {
        tag = document.createElement('meta')
        tag.name = name
        document.head.appendChild(tag)
      }

      tag.content = value
    }

    const setMetaByProperty = (property: string, value: string) => {
      let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null

      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }

      tag.content = value
    }

    setMetaByName('description', meta.description)
    setMetaByProperty('og:title', meta.title)
    setMetaByProperty('og:description', meta.description)
    setMetaByProperty('og:type', 'website')
    setMetaByName('twitter:title', meta.title)
    setMetaByName('twitter:description', meta.description)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoMeta />
      <div className="flex min-h-screen flex-col bg-[#f7fafd]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/peptipedia" element={<LibraryPage />} />
            <Route path="/peptipedia/:id" element={<LibraryDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/vendor-apply" element={<VendorApplyPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
