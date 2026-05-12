import Header from '@/components/Header'
import ServicesHero from '@/components/ServicesHero'
import ServicesDetailed from '@/components/ServicesDetailed'
import SubjectsGrid from '@/components/SubjectsGrid'
import LocationsSection from '@/components/LocationsSection'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <ServicesHero />
      <ServicesDetailed />
      <SubjectsGrid />
      <LocationsSection />
      <CTA />
      <Footer />
    </main>
  )
}
