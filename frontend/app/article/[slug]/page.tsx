import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Clock, User, Share2, Bookmark, ArrowLeft } from 'lucide-react'
import { formatDate, formatTimeAgo } from '@/lib/utils'
import { Article } from '@/types'

// Mock data - will be replaced with API call
const getArticle = async (slug: string): Promise<Article | null> => {
  // Simulate API call
  const mockArticles: Article[] = [
    {
      id: 1,
      title: "Major Economic Policy Changes Announced by Federal Reserve",
      slug: "major-economic-policy-changes-announced",
      excerpt: "The Federal Reserve has announced significant changes to monetary policy that could impact markets and consumers across the nation.",
      content: `
        <p>The Federal Reserve announced today a series of major policy changes that will reshape the nation's monetary landscape for years to come. The decision, made during a special meeting of the Federal Open Market Committee, represents the most significant shift in monetary policy since the 2008 financial crisis.</p>
        
        <h2>Key Changes Announced</h2>
        <p>The central bank revealed several critical modifications to its approach:</p>
        <ul>
          <li>Interest rate adjustments targeting inflation control</li>
          <li>New quantitative easing measures</li>
          <li>Enhanced regulatory oversight for major financial institutions</li>
          <li>Revised economic forecasting models</li>
        </ul>
        
        <h2>Market Impact</h2>
        <p>Financial markets reacted immediately to the announcement, with major indices experiencing significant volatility. Analysts predict these changes will have far-reaching implications for:</p>
        <ul>
          <li>Mortgage rates and housing markets</li>
          <li>Business investment and expansion</li>
          <li>Consumer spending patterns</li>
          <li>International trade relationships</li>
        </ul>
        
        <h2>Expert Analysis</h2>
        <p>Leading economists have weighed in on the policy changes, with many expressing cautious optimism about the long-term benefits while acknowledging short-term challenges for certain sectors.</p>
        
        <p>"This represents a fundamental shift in how the Fed approaches monetary policy," said Dr. Sarah Johnson, senior economics reporter at The Central Report. "The implications will be felt across every sector of the economy."</p>
        
        <h2>Looking Ahead</h2>
        <p>Federal Reserve officials emphasized that these changes are designed to promote long-term economic stability while addressing current inflationary pressures. The implementation timeline spans the next 18 months, with gradual phase-in periods to minimize market disruption.</p>
        
        <p>Investors and business leaders are advised to closely monitor upcoming Fed communications for additional guidance on navigating these policy changes.</p>
      `,
      featured_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop",
      published_date: "2024-01-15T10:30:00Z",
      author: {
        id: 1,
        name: "Sarah Johnson",
        bio: "Senior Economics Reporter with 15+ years of experience covering monetary policy and financial markets.",
        email: "sarah@centralreport.com"
      },
      category: {
        id: 1,
        name: "Business",
        slug: "business",
        description: "Business and economy news",
        color: "#3B82F6",
        order: 1
      },
      tags: ["economy", "federal-reserve", "policy", "inflation"],
      is_featured: true,
      read_time: 5,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    }
  ]
  
  return mockArticles.find(article => article.slug === slug) || null
}

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | The Central Report',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: `${article.title} | The Central Report`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featured_image],
      type: 'article',
      publishedTime: article.published_date,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featured_image],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Article Header */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container-custom">
            <Link 
              href="/"
              className="inline-flex items-center text-accent hover:text-accent-600 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-4">
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: article.category.color }}
                >
                  {article.category.name}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                {article.title}
              </h1>
              
              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {article.excerpt}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(article.published_date)}</span>
                  </div>
                  <span>{article.read_time} min read</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-accent transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-accent transition-colors">
                    <Bookmark className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <article className="lg:col-span-3">
                  {/* Featured Image */}
                  <div className="mb-8">
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                    </div>
                  </div>
                  
                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-primary mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/tag/${tag}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-accent hover:text-white transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Author Info */}
                    <div className="bg-white rounded-lg shadow-soft p-6">
                      <h3 className="text-lg font-bold text-primary mb-4">About the Author</h3>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="font-semibold text-primary mb-2">{article.author.name}</h4>
                        <p className="text-sm text-gray-600">{article.author.bio}</p>
                      </div>
                    </div>

                    {/* Related Articles */}
                    <div className="bg-white rounded-lg shadow-soft p-6">
                      <h3 className="text-lg font-bold text-primary mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <Link href="#" className="block group">
                              <h4 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors line-clamp-2">
                                Related Article Title Goes Here
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="bg-gradient-to-br from-accent to-accent-600 text-white rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                      <p className="text-sm mb-4 opacity-90">
                        Get the latest news delivered to your inbox.
                      </p>
                      <div className="space-y-3">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-3 py-2 rounded text-primary text-sm"
                        />
                        <button className="w-full bg-white text-accent font-medium py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 