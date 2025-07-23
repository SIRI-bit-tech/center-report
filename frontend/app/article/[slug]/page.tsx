import React from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/articles/article-card'
import { Article } from '@/types'
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

async function getArticle(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/${slug}/`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch article')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getRelatedArticles(categoryId: number, currentArticleId: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/?category=${categoryId}&limit=3`, {
      next: { revalidate: 300 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch related articles')
    }
    
    const data = await response.json()
    return (data.results || []).filter((article: Article) => article.id !== currentArticleId)
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.category.id, article.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                  <li><a href="/" className="hover:text-primary">Home</a></li>
                  <li>/</li>
                  <li><a href={`/category/${article.category.slug}`} className="hover:text-primary">{article.category.name}</a></li>
                  <li>/</li>
                  <li className="text-primary">{article.title}</li>
                </ol>
              </nav>

              {/* Article Header */}
              <header className="mb-8">
                <div className="mb-4">
                  <a 
                    href={`/category/${article.category.slug}`}
                    className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {article.category.name}
                  </a>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.published_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.read_time} min read</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Share:</span>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-700 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {article.featured_image && (
                <div className="mb-8">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* Article Footer */}
              <footer className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {article.author.avatar && (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-primary">{article.author.name}</h4>
                      <p className="text-sm text-gray-500">{article.author.bio}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Share:</span>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-700 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </footer>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedArticles.map((article: Article) => (
                        <ArticleCard 
                          key={article.id} 
                          article={article}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-accent to-accent-600 text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Get the latest news and insights delivered to your inbox.
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
      </main>
      
      <Footer />
    </div>
  )
} 