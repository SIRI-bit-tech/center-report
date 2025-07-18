import React from 'react'
import Link from 'next/link'
import { Newspaper, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    sections: [
      { name: 'Breaking News', href: '/category/breaking-news' },
      { name: 'Politics', href: '/category/politics' },
      { name: 'Business', href: '/category/business' },
      { name: 'Technology', href: '/category/technology' },
      { name: 'Health', href: '/category/health' },
      { name: 'Entertainment', href: '/category/entertainment' },
      { name: 'Sports', href: '/category/sports' },
      { name: 'Local', href: '/category/local' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Advertise', href: '/advertise' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Newspaper className="h-8 w-8 text-accent" />
                <div>
                  <span className="text-xl font-bold">The Central Report</span>
                  <p className="text-sm text-gray-300">Professional News</p>
                </div>
              </Link>
              <p className="text-gray-300 text-sm mb-6">
                Stay informed with the latest breaking news, politics, business, technology, and more from The Central Report. Professional journalism you can trust.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-sm text-primary rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="bg-accent hover:bg-accent-600 px-4 py-2 rounded-r-md transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* News Sections */}
            <div>
              <h3 className="text-lg font-semibold mb-4">News Sections</h3>
              <ul className="space-y-2">
                {footerLinks.sections.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} The Central Report. All rights reserved.
            </div>
            <div className="text-sm text-gray-300">
              Professional journalism you can trust
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 