import Header from '@/components/Header'
import DelhiHero from '@/components/locations/DelhiHero'
import DelhiCoverage from '@/components/locations/DelhiCoverage'
import DelhiFeatures from '@/components/locations/DelhiFeatures'
import DelhiPricing from '@/components/locations/DelhiPricing'
import DelhiReviews from '@/components/locations/DelhiReviews'
import DelhiFAQ from '@/components/locations/DelhiFAQ'
import DelhiCTA from '@/components/locations/DelhiCTA'
import Footer from '@/components/Footer'

export default function DelhiPage() {
  return (
    <main>
      <Header />
      <DelhiHero />
      <DelhiCoverage />
      <DelhiFeatures />
      <DelhiPricing />
      <DelhiReviews />
      <DelhiFAQ />
      <DelhiCTA />
      <Footer />
    </main>
  )
}
