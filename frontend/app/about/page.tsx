import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Newspaper, Users, Award, Globe, Shield, Target } from 'lucide-react'

export const metadata = {
  title: 'About Us | The Central Report',
  description: 'Learn about The Central Report - our mission, values, and commitment to delivering professional journalism you can trust.',
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Editor-in-Chief',
      bio: 'Award-winning journalist with 15+ years of experience covering politics and business.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Technology Editor',
      bio: 'Former Silicon Valley executive turned tech journalist, covering innovation and digital transformation.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Political Correspondent',
      bio: 'Experienced political analyst with deep insights into national and international affairs.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'David Thompson',
      role: 'Health & Science Editor',
      bio: 'Medical journalist with a background in public health and scientific research.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest standards of journalistic ethics and accuracy in all our reporting.'
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'Every story is thoroughly fact-checked and verified before publication.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We provide comprehensive coverage of local, national, and international news.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We serve our readers with news that matters to their lives and communities.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary to-primary-800 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About The Central Report</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Professional journalism you can trust. Delivering accurate, timely, and comprehensive news coverage since 2024.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  The Central Report is committed to delivering high-quality, unbiased journalism that informs, educates, and empowers our readers. We believe in the power of accurate information to drive positive change in society.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our team of experienced journalists and editors work tirelessly to bring you the most important stories of the day, from breaking news to in-depth analysis across politics, business, technology, health, and more.
                </p>
                <div className="flex items-center space-x-4">
                  <Newspaper className="h-8 w-8 text-accent" />
                  <span className="text-lg font-semibold text-primary">Trusted by millions of readers worldwide</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-soft p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Our Commitment</h3>
                <div className="space-y-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <value.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{value.title}</h4>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the experienced journalists and editors who bring you the most important stories every day.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-soft overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-accent font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">2M+</div>
                <div className="text-gray-600">Monthly Readers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-gray-600">Expert Journalists</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-gray-600">News Coverage</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <div className="text-gray-600">Countries Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-accent text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have a story tip, feedback, or want to work with us? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/careers"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-accent transition-colors"
              >
                Join Our Team
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 