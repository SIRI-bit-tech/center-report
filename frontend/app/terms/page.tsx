import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Terms of Service | The Central Report',
  description: 'Read our Terms of Service to understand the rules and guidelines for using The Central Report website.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary to-primary-800 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Please read these terms carefully before using our website and services.
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

                <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-6">
                  By accessing and using The Central Report website ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-6">
                  The Central Report provides news, analysis, and editorial content covering politics, business, technology, health, entertainment, sports, and local news. Our service includes website access, newsletters, and related content.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">3. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p className="text-gray-600 mb-6">
                  You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">4. Acceptable Use</h2>
                <p className="text-gray-600 mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Post false, misleading, or defamatory content</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the Service</li>
                  <li>Use automated systems to access the Service</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">5. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of The Central Report and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p className="text-gray-600 mb-6">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as follows:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                  <li>You may store files that are automatically cached by your Web browser for display enhancement purposes</li>
                  <li>You may print or download one copy of a reasonable number of pages of the Service for your own personal, non-commercial use</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">6. User Content</h2>
                <p className="text-gray-600 mb-4">
                  By posting content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service. You retain any and all of your rights to any content you submit, post, or display on or through the Service.
                </p>
                <p className="text-gray-600 mb-6">
                  You represent and warrant that the content you post is your own or that you have the right to use it and grant us the rights and license as provided in these Terms.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">7. Privacy Policy</h2>
                <p className="text-gray-600 mb-6">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">8. Disclaimers</h2>
                <p className="text-gray-600 mb-4">
                  The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Excludes all representations, warranties, conditions and terms whether express or implied</li>
                  <li>Makes no warranties about the accuracy, completeness, or usefulness of any information</li>
                  <li>Does not guarantee that the Service will be uninterrupted or error-free</li>
                  <li>Is not responsible for any content posted by users</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600 mb-6">
                  In no event shall The Central Report, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">10. Termination</h2>
                <p className="text-gray-600 mb-6">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">11. Governing Law</h2>
                <p className="text-gray-600 mb-6">
                  These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 mb-6">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>

                <h2 className="text-2xl font-bold text-primary mb-4">13. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    <strong>Email:</strong> legal@centralreport.com<br />
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