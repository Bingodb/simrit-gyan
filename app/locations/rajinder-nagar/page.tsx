import Header from '@/components/Header'
import RajinderNagarHero from '@/components/locations/RajinderNagarHero'
import RajinderNagarCoverage from '@/components/locations/RajinderNagarCoverage'
import RajinderNagarFeatures from '@/components/locations/RajinderNagarFeatures'
import RajinderNagarPricing from '@/components/locations/RajinderNagarPricing'
import RajinderNagarReviews from '@/components/locations/RajinderNagarReviews'
import RajinderNagarFAQ from '@/components/locations/RajinderNagarFAQ'
import RajinderNagarCTA from '@/components/locations/RajinderNagarCTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Best Home Tuition in Rajinder Nagar, Central Delhi | Simrit Gyan',
  description: 'Top home tutors in Rajinder Nagar, Central Delhi for Class 1-12, JEE, NEET. 180+ verified tutors. Free demo class. Call +91-8368653414',
}

export default function RajinderNagarPage() {
  return (
    <main>
      <Header />
      <RajinderNagarHero />
      <RajinderNagarCoverage />
      <RajinderNagarFeatures />
      <RajinderNagarPricing />
      <RajinderNagarReviews />
      <RajinderNagarFAQ />
      <RajinderNagarCTA />
      <Footer />
    </main>
  )
}
