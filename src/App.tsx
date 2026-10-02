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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-[#f7fafd]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:id" element={<LibraryDetailPage />} />
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
