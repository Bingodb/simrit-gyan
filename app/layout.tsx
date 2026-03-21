import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Simrit Gyan - Home Tuition Services',
  description: 'Professional home tuition services for students of all levels',
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
