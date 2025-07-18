import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Briefcase, Users, Heart, Zap, Award, Globe } from 'lucide-react'

export const metadata = {
  title: 'Careers | The Central Report',
  description: 'Join our team of passionate journalists and professionals. Explore career opportunities at The Central Report.',
}

export default function CareersPage() {
  const jobOpenings = [
    {
      title: 'Senior Political Reporter',
      department: 'Editorial',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'We\'re looking for an experienced political reporter to cover national politics and policy.',
      requirements: [
        '5+ years of political reporting experience',
        'Strong analytical and writing skills',
        'Experience with investigative journalism',
        'Bachelor\'s degree in Journalism or related field'
      ]
    },
    {
      title: 'Technology Correspondent',
      department: 'Technology',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Cover the latest in technology, startups, and innovation in Silicon Valley.',
      requirements: [
        '3+ years of technology journalism experience',
        'Deep understanding of tech industry',
        'Strong network in Silicon Valley',
        'Experience with data journalism'
      ]
    },
    {
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our digital marketing efforts and grow our audience across platforms.',
      requirements: [
        '5+ years of digital marketing experience',
        'Experience with social media and content marketing',
        'Analytics and data-driven approach',
        'Experience in media industry preferred'
      ]
    },
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain our website and digital platforms.',
      requirements: [
        '3+ years of React/Next.js experience',
        'Strong TypeScript skills',
        'Experience with modern web technologies',
        'Understanding of SEO and performance'
      ]
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and mental health support.'
    },
    {
      icon: Zap,
      title: 'Flexible Work',
      description: 'Remote work options, flexible hours, and generous PTO policies.'
    },
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Training programs, conference attendance, and career development opportunities.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Work on stories that matter and reach millions of readers worldwide.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary to-primary-800 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Help us deliver the news that matters. Join a team of passionate professionals committed to excellence in journalism.
            </p>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Culture</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At The Central Report, we believe in the power of diverse perspectives, innovation, and integrity. 
                We're building a team that reflects the world we cover.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Open Positions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our current job openings and find the perfect role for your skills and passion.
              </p>
            </div>

            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div key={index} className="bg-white rounded-lg shadow-soft p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="bg-accent text-white px-2 py-1 rounded-full text-xs">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 lg:mt-0 bg-accent text-white font-semibold px-6 py-2 rounded-lg hover:bg-accent-600 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Application Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Here's what you can expect when applying to join our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Apply</h3>
                <p className="text-gray-600">Submit your resume and cover letter through our application portal.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Review</h3>
                <p className="text-gray-600">Our hiring team will review your application within 48 hours.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Interview</h3>
                <p className="text-gray-600">Meet with our team through video calls and in-person interviews.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Join</h3>
                <p className="text-gray-600">Welcome to the team! We'll help you get started and settled in.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't see a position that fits? Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="mailto:careers@centralreport.com"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-accent transition-colors"
              >
                Send Resume
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 