import Header from '@/components/Header'
import GurgaonHero from '@/components/locations/GurgaonHero'
import GurgaonCoverage from '@/components/locations/GurgaonCoverage'
import GurgaonFeatures from '@/components/locations/GurgaonFeatures'
import GurgaonPricing from '@/components/locations/GurgaonPricing'
import GurgaonReviews from '@/components/locations/GurgaonReviews'
import GurgaonFAQ from '@/components/locations/GurgaonFAQ'
import GurgaonCTA from '@/components/locations/GurgaonCTA'
import Footer from '@/components/Footer'

export default function GurgaonPage() {
  return (
    <main>
      <Header />
      <GurgaonHero />
      <GurgaonCoverage />
      <GurgaonFeatures />
      <GurgaonPricing />
      <GurgaonReviews />
      <GurgaonFAQ />
      <GurgaonCTA />
      <Footer />
    </main>
  )
}
