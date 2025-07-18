import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Privacy Policy | The Central Report',
  description: 'Learn how The Central Report collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary to-primary-800 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div className="bg-white rounded-lg shadow-soft p-8">
                <p className="text-gray-600 mb-8">
                  <strong>Last updated:</strong> January 15, 2024
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
                <p className="text-gray-600 mb-6">
                  The Central Report ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
                <h3 className="text-xl font-semibold text-primary mb-3">Personal Information</h3>
                <p className="text-gray-600 mb-4">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Name and email address when you subscribe to our newsletter</li>
                  <li>Contact information when you reach out to us</li>
                  <li>Comments and feedback you provide on our articles</li>
                  <li>Information you provide when applying for jobs</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3">Automatically Collected Information</h3>
                <p className="text-gray-600 mb-4">
                  When you visit our website, we automatically collect certain information, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on each page</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Provide and maintain our news services</li>
                  <li>Send you newsletters and updates (with your consent)</li>
                  <li>Respond to your inquiries and feedback</li>
                  <li>Improve our website and user experience</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to enhance your browsing experience. These technologies help us:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website performance and security</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">Third-Party Services</h2>
                <p className="text-gray-600 mb-4">
                  We may use third-party services that collect, monitor, and analyze data, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media platforms for sharing and engagement</li>
                  <li>Advertising networks for relevant advertisements</li>
                  <li>Email service providers for newsletter delivery</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">Data Security</h2>
                <p className="text-gray-600 mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to restrict processing of your information</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">Children's Privacy</h2>
                <p className="text-gray-600 mb-6">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    <strong>Email:</strong> privacy@centralreport.com<br />
                    <strong>Address:</strong> The Central Report, 123 News Street, New York, NY 10001<br />
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 