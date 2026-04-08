import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import StatsBar from '../components/home/StatsBar'
import AboutPreview from '../components/home/AboutPreview'
import ClientsTrusted from '../components/home/ClientsTrusted'
// import Testimonials from '../components/home/Testimonials'
import ServicesOverview from '../components/home/ServicesOverview'
import IndustryVerticals from '../components/home/IndustryVerticals'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OurProcess from '../components/home/OurProcess'
import CtaBanner from '../components/home/CtaBanner'
import PhotoHighlights from '../components/home/PhotoHighlights'
import { getAllPosts } from '../lib/blogData'

const latestPosts = getAllPosts().slice(0, 3)

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <StatsBar />
      <AboutPreview />
      <ClientsTrusted />
      {/* <Testimonials /> */}
      <ServicesOverview />
      <IndustryVerticals />
      <WhyChooseUs />
      <OurProcess />
      <PhotoHighlights />
      <section id="blog" className="sb-section bg-slate-50">
        <div className="sb-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <p className="sb-kicker mb-2">From Our Blog</p>
              <h2 className="sb-h2">Latest Insights</h2>
            </div>
            <Link to="/blog" className="sb-btn-secondary">
              View All Posts
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="sb-card sb-card-hover p-5 block"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gold mb-2">
                  {post.data.category || 'Blog'}
                </p>
                <h3 className="text-lg text-navy mb-2">{post.data.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{post.data.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </div>
  )
}
