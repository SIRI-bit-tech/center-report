import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import * as Sentry from "@sentry/nextjs";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CookieConsent } from "@/components/ui/cookie-consent"


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
    default: 'The Central Report - Your Trusted Source',
    template: '%s | The Central Report'
  },
  description: 'Stay informed with the latest breaking news, politics, business, technology, and more from The Central Report. Your trusted source for reliable journalism.',
  keywords: ['news', 'breaking news', 'politics', 'business', 'technology', 'health', 'entertainment', 'sports'],
  authors: [{ name: 'The Central Report' }],
  creator: 'The Central Report',
  publisher: 'The Central Report',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thecentralreport.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thecentralreport.com',
    title: 'The Central Report - Your Trusted Source',
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
    title: 'The Central Report - Your Trusted Source',
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        {/* AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3032394425172826"
          crossOrigin="anonymous"
        ></script>
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        
        {/* Android Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/android-icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/android-icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="72x72" href="/android-icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/android-icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="36x36" href="/android-icon-36x36.png" />
        
        {/* Windows Icons */}
        <meta name="msapplication-TileColor" content="#222222" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#222222" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
      </body>
    </html>
  )
} 