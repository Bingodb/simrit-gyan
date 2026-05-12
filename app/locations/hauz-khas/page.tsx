import Header from '@/components/Header'
import HauzKhasHero from '@/components/locations/HauzKhasHero'
import HauzKhasCoverage from '@/components/locations/HauzKhasCoverage'
import HauzKhasFeatures from '@/components/locations/HauzKhasFeatures'
import HauzKhasPricing from '@/components/locations/HauzKhasPricing'
import HauzKhasReviews from '@/components/locations/HauzKhasReviews'
import HauzKhasFAQ from '@/components/locations/HauzKhasFAQ'
import HauzKhasCTA from '@/components/locations/HauzKhasCTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Best Home Tuition in Hauz Khas, South Delhi | Simrit Gyan',
  description: 'Top home tutors in Hauz Khas, South Delhi for Class 1-12, JEE, NEET. 200+ verified tutors. Free demo class. Call +91-8287015044',
}

export default function HauzKhasPage() {
  return (
    <main>
      <Header />
      <HauzKhasHero />
      <HauzKhasCoverage />
      <HauzKhasFeatures />
      <HauzKhasPricing />
      <HauzKhasReviews />
      <HauzKhasFAQ />
      <HauzKhasCTA />
      <Footer />
    </main>
  )
}
