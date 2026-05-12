import Header from '@/components/Header'
import UttamNagarHero from '@/components/locations/UttamNagarHero'
import UttamNagarCoverage from '@/components/locations/UttamNagarCoverage'
import UttamNagarFeatures from '@/components/locations/UttamNagarFeatures'
import UttamNagarPricing from '@/components/locations/UttamNagarPricing'
import UttamNagarReviews from '@/components/locations/UttamNagarReviews'
import UttamNagarFAQ from '@/components/locations/UttamNagarFAQ'
import UttamNagarCTA from '@/components/locations/UttamNagarCTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Best Home Tuition in Uttam Nagar, West Delhi | Simrit Gyan',
  description: 'Top home tutors in Uttam Nagar, West Delhi for Class 1-12, JEE, NEET. 250+ verified tutors. Free demo class. Call +91-7503219801',
}

export default function UttamNagarPage() {
  return (
    <main>
      <Header />
      <UttamNagarHero />
      <UttamNagarCoverage />
      <UttamNagarFeatures />
      <UttamNagarPricing />
      <UttamNagarReviews />
      <UttamNagarFAQ />
      <UttamNagarCTA />
      <Footer />
    </main>
  )
}
