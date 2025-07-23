import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import * as Sentry from "@sentry/nextjs";


Sentry.init({
  dsn: process.env.NEXT_PUBLIC_GLITCHTIP_DSN,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  tracesSampleRate: 0.1,
  integrations: [],
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'The Central Report - Professional News Website',
    template: '%s | The Central Report'
  },
  description: 'Stay informed with the latest breaking news, politics, business, technology, and more from The Central Report. Professional journalism you can trust.',
  keywords: ['news', 'breaking news', 'politics', 'business', 'technology', 'health', 'entertainment', 'sports'],
  authors: [{ name: 'The Central Report' }],
  creator: 'The Central Report',
  publisher: 'The Central Report',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://centralreport.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://centralreport.com',
    title: 'The Central Report - Professional News Website',
    description: 'Stay informed with the latest breaking news, politics, business, technology, and more from The Central Report.',
    siteName: 'The Central Report',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Central Report',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Central Report - Professional News Website',
    description: 'Stay informed with the latest breaking news, politics, business, technology, and more from The Central Report.',
    images: ['/og-image.jpg'],
    creator: '@centralreport',
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#222222" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  )
} 