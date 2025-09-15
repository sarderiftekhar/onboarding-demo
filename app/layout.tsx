import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onboarding Demo - Hilbert Financial',
  description: 'A visually stunning onboarding experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">{children}</body>
    </html>
  )
}
