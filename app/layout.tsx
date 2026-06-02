import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Simrit Gyan - Home Tuition Services',
  description: 'Professional home tuition services for students of all levels. Verified tutors for Class 1-12, Board Exams, NEET & JEE preparation. Available in Delhi, Gurgaon & NCR.',
  keywords: 'home tuition, private tutor, home tutor, tuition classes, NEET coaching, JEE preparation, Delhi tutor, Gurgaon tutor',
  authors: [{ name: 'Simrit Gyan' }],
  creator: 'Simrit Gyan',
  publisher: 'Simrit Gyan',
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.simritgyan.com',
    siteName: 'Simrit Gyan',
    title: 'Simrit Gyan - Home Tuition Services',
    description: 'Professional home tuition services for students of all levels. Verified tutors for Class 1-12, Board Exams, NEET & JEE preparation.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Simrit Gyan Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simrit Gyan - Home Tuition Services',
    description: 'Professional home tuition services for students of all levels',
    images: ['/images/logo.png'],
    creator: '@SimritGyan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Simrit Gyan',
    alternateName: 'Simrit Gyan Home Tuition Services',
    url: 'https://www.simritgyan.com',
    logo: 'https://www.simritgyan.com/images/logo.png',
    image: 'https://www.simritgyan.com/images/logo.png',
    description: 'Professional home tuition services for students of all levels. Verified tutors for Class 1-12, Board Exams, NEET & JEE preparation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7503219801',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61583513346762',
      'https://www.instagram.com/simritgyan',
      'https://www.linkedin.com/in/simrit-gyan-3b527339a/',
      'https://x.com/SimritGyan',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
