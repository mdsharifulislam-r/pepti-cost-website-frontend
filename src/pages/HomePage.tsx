import Hero from '../components/Hero'
import BannerSlider from '../components/BannerSlider'
import InfoCards from '../components/InfoCards'
import PopularPeptides from '../components/PopularPeptides'
import ComparePrices from '../components/ComparePrices'
import Features from '../components/Features'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BannerSlider />
      <InfoCards />
      <PopularPeptides />
      <ComparePrices />
      <Features />
      <Newsletter />
    </>
  )
}
