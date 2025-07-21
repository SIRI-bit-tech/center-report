import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ArticleCard } from '@/components/articles/article-card'
import { Article, Category } from '@/types'

async function getHomepageData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/homepage/`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch homepage data')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      featured_articles: [],
      breaking_news: [],
      category_articles: {}
    }
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/categories/`, {
      next: { revalidate: 600 } // Revalidate every 10 minutes
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

async function getLatestArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/?limit=8`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch latest articles')
    }
    
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching latest articles:', error)
    return []
  }
}

export default async function HomePage() {
  const [homepageData, categories, latestArticles] = await Promise.all([
    getHomepageData(),
    getCategories(),
    getLatestArticles()
  ])

  const { featured_articles, breaking_news, category_articles } = homepageData

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection 
          featuredArticles={featured_articles} 
          breakingNews={breaking_news}
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
                    {latestArticles.map((article: Article) => (
                      <ArticleCard 
                        key={article.id} 
                        article={article}
                        variant="default"
                      />
                    ))}
                  </div>
                </div>

                {/* Category Sections */}
                {Object.entries(category_articles).map(([categorySlug, articles]: [string, any]) => {
                  if (!articles || articles.length === 0) return null
                  
                  const category = categories.find((cat: Category) => cat.slug === categorySlug)
                  if (!category) return null

                  return (
                    <div key={categorySlug} className="mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-primary">{category.name}</h3>
                        <a 
                          href={`/category/${categorySlug}`}
                          className="text-accent hover:text-accent-600 font-medium text-sm"
                        >
                          View All →
                        </a>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.slice(0, 3).map((article: Article) => (
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

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Trending Articles */}
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">Trending</h3>
                    <div className="space-y-4">
                      {latestArticles.slice(0, 5).map((article: Article, index: number) => (
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
                      {categories.map((category: Category) => (
                        <a
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="block text-sm text-gray-600 hover:text-primary hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                        >
                          {category.name}
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