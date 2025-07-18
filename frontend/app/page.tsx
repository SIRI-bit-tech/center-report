import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ArticleCard } from '@/components/articles/article-card'
import { Article, Category } from '@/types'

// Mock data for development - will be replaced with API calls
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Major Economic Policy Changes Announced by Federal Reserve",
    slug: "major-economic-policy-changes-announced",
    excerpt: "The Federal Reserve has announced significant changes to monetary policy that could impact markets and consumers across the nation.",
    content: "Full article content here...",
    featured_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    published_date: "2024-01-15T10:30:00Z",
    author: {
      id: 1,
      name: "Sarah Johnson",
      bio: "Senior Economics Reporter",
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
    tags: ["economy", "federal-reserve", "policy"],
    is_featured: true,
    read_time: 5,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "New Technology Breakthrough in Renewable Energy",
    slug: "new-technology-breakthrough-renewable-energy",
    excerpt: "Scientists have developed a revolutionary solar panel technology that could transform the renewable energy industry.",
    content: "Full article content here...",
    featured_image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    published_date: "2024-01-15T09:15:00Z",
    author: {
      id: 2,
      name: "Michael Chen",
      bio: "Technology Correspondent",
      email: "michael@centralreport.com"
    },
    category: {
      id: 2,
      name: "Technology",
      slug: "technology",
      description: "Technology and innovation news",
      color: "#10B981",
      order: 2
    },
    tags: ["technology", "solar", "renewable-energy"],
    is_featured: true,
    read_time: 4,
    created_at: "2024-01-15T09:15:00Z",
    updated_at: "2024-01-15T09:15:00Z"
  },
  {
    id: 3,
    title: "Political Summit Addresses Global Climate Challenges",
    slug: "political-summit-addresses-global-climate-challenges",
    excerpt: "World leaders gather for unprecedented summit to discuss climate change policies and international cooperation.",
    content: "Full article content here...",
    featured_image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    published_date: "2024-01-15T08:45:00Z",
    author: {
      id: 3,
      name: "Emily Rodriguez",
      bio: "Political Analyst",
      email: "emily@centralreport.com"
    },
    category: {
      id: 3,
      name: "Politics",
      slug: "politics",
      description: "Political news and analysis",
      color: "#EF4444",
      order: 3
    },
    tags: ["politics", "climate-change", "summit"],
    is_featured: false,
    read_time: 6,
    created_at: "2024-01-15T08:45:00Z",
    updated_at: "2024-01-15T08:45:00Z"
  },
  {
    id: 4,
    title: "Healthcare System Reforms Proposed by Congress",
    slug: "healthcare-system-reforms-proposed-congress",
    excerpt: "New healthcare legislation aims to improve access and reduce costs for millions of Americans.",
    content: "Full article content here...",
    featured_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    published_date: "2024-01-15T07:30:00Z",
    author: {
      id: 4,
      name: "David Thompson",
      bio: "Healthcare Reporter",
      email: "david@centralreport.com"
    },
    category: {
      id: 4,
      name: "Health",
      slug: "health",
      description: "Health and medical news",
      color: "#8B5CF6",
      order: 4
    },
    tags: ["healthcare", "congress", "reform"],
    is_featured: false,
    read_time: 7,
    created_at: "2024-01-15T07:30:00Z",
    updated_at: "2024-01-15T07:30:00Z"
  },
  {
    id: 5,
    title: "Local Community Celebrates Cultural Festival",
    slug: "local-community-celebrates-cultural-festival",
    excerpt: "Annual cultural festival brings together diverse communities for celebration and unity.",
    content: "Full article content here...",
    featured_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
    published_date: "2024-01-15T06:15:00Z",
    author: {
      id: 5,
      name: "Lisa Park",
      bio: "Local News Reporter",
      email: "lisa@centralreport.com"
    },
    category: {
      id: 5,
      name: "Local",
      slug: "local",
      description: "Local community news",
      color: "#F59E0B",
      order: 5
    },
    tags: ["local", "culture", "festival"],
    is_featured: false,
    read_time: 3,
    created_at: "2024-01-15T06:15:00Z",
    updated_at: "2024-01-15T06:15:00Z"
  },
  {
    id: 6,
    title: "Sports Championship Ends in Dramatic Victory",
    slug: "sports-championship-ends-dramatic-victory",
    excerpt: "Underdog team makes historic comeback to win championship in thrilling final moments.",
    content: "Full article content here...",
    featured_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    published_date: "2024-01-15T05:00:00Z",
    author: {
      id: 6,
      name: "James Wilson",
      bio: "Sports Editor",
      email: "james@centralreport.com"
    },
    category: {
      id: 6,
      name: "Sports",
      slug: "sports",
      description: "Sports news and coverage",
      color: "#06B6D4",
      order: 6
    },
    tags: ["sports", "championship", "victory"],
    is_featured: false,
    read_time: 4,
    created_at: "2024-01-15T05:00:00Z",
    updated_at: "2024-01-15T05:00:00Z"
  }
]

const breakingNews = mockArticles.filter(article => article.category.slug === 'politics').slice(0, 3)

export default function HomePage() {
  const featuredArticles = mockArticles.filter(article => article.is_featured)
  const regularArticles = mockArticles.filter(article => !article.is_featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection 
          featuredArticles={featuredArticles} 
          breakingNews={breakingNews}
        />

        {/* Main Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Latest News Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-primary mb-6">Latest News</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {regularArticles.map((article) => (
                      <ArticleCard 
                        key={article.id} 
                        article={article}
                        variant="default"
                      />
                    ))}
                  </div>
                </div>

                {/* Category Sections */}
                <div className="space-y-12">
                  {['Business', 'Technology', 'Politics'].map((categoryName) => {
                    const categoryArticles = mockArticles.filter(
                      article => article.category.name === categoryName
                    ).slice(0, 3)
                    
                    if (categoryArticles.length === 0) return null

                    return (
                      <div key={categoryName}>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-2xl font-bold text-primary">{categoryName}</h3>
                          <a 
                            href={`/category/${categoryArticles[0].category.slug}`}
                            className="text-accent hover:text-accent-600 font-medium text-sm"
                          >
                            View All →
                          </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {categoryArticles.map((article) => (
                            <ArticleCard 
                              key={article.id} 
                              article={article}
                              variant="compact"
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Trending Articles */}
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">Trending</h3>
                    <div className="space-y-4">
                      {mockArticles.slice(0, 5).map((article, index) => (
                        <div key={article.id} className="flex items-start space-x-3">
                          <span className="text-2xl font-bold text-gray-300 flex-shrink-0">
                            {index + 1}
                          </span>
                          <div>
                            <a 
                              href={`/article/${article.slug}`}
                              className="text-sm font-medium text-primary hover:text-accent line-clamp-2"
                            >
                              {article.title}
                            </a>
                            <p className="text-xs text-gray-500 mt-1">
                              {article.author.name} • {article.read_time} min read
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">Categories</h3>
                    <div className="space-y-2">
                      {['Breaking News', 'Politics', 'Business', 'Technology', 'Health', 'Entertainment', 'Sports', 'Local'].map((category) => (
                        <a
                          key={category}
                          href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                          className="block text-sm text-gray-600 hover:text-primary hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-accent to-accent-600 text-white rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2">Stay Informed</h3>
                    <p className="text-sm mb-4 opacity-90">
                      Get the latest news delivered to your inbox every morning.
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
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 