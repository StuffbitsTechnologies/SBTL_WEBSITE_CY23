import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import SeoManager from './lib/seo'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const VerticalsPage = lazy(() => import('./pages/VerticalsPage'))
const VerticalDetailPage = lazy(() => import('./pages/VerticalDetailPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const PortfolioProjectPage = lazy(() => import('./pages/PortfolioProjectPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NewsAndEventsPage = lazy(() => import('./pages/NewsAndEventsPage'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoManager />
      <Suspense fallback={<div className="min-h-[40vh] bg-white" aria-hidden />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="verticals" element={<VerticalsPage />} />
            <Route path="verticals/:slug" element={<VerticalDetailPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="portfolio/:id" element={<PortfolioProjectPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="careers/jobs/:id" element={<JobDetailPage />} />
            <Route path="careers/jobs/:id/:slug" element={<JobDetailPage />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="news-and-events" element={<NewsAndEventsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="legal" element={<LegalPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
