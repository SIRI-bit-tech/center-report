import React from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/articles/article-card'
import { Calendar, MapPin, Globe, Twitter, Linkedin } from 'lucide-react'
import { Article, Author } from '@/types'

async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/authors/${slug}/`, {
      next: { revalidate: 3600 }
    })
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error('Error fetching author:', error)
    return null
  }
}

async function getAuthorArticles(slug: string): Promise<Article[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/authors/${slug}/articles/`, {
      next: { revalidate: 3600 }
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.results || data
  } catch (error) {
    console.error('Error fetching author articles:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const author = await getAuthor(params.slug)
  
  if (!author) {
    return {
      title: 'Author Not Found - The Central Report',
      description: 'The requested author could not be found.'
    }
  }

  return {
    title: `${author.name} - Author - The Central Report`,
    description: author.bio || `Read articles by ${author.name} on The Central Report.`,
    openGraph: {
      title: `${author.name} - Author - The Central Report`,
      description: author.bio || `Read articles by ${author.name} on The Central Report.`,
      type: 'profile',
      images: author.avatar ? [author.avatar] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} - Author - The Central Report`,
      description: author.bio || `Read articles by ${author.name} on The Central Report.`,
      images: author.avatar ? [author.avatar] : [],
    }
  }
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await getAuthor(params.slug)
  
  if (!author) {
    notFound()
  }

  const articles = await getAuthorArticles(params.slug)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container-custom">
          {/* Author Header */}
          <header className="mb-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Author Avatar */}
              <div className="flex-shrink-0">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-accent"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center text-white text-4xl font-bold">
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  {author.name}
                </h1>
                
                {author.title && (
                  <p className="text-xl text-accent font-semibold mb-4">
                    {author.title}
                  </p>
                )}

                {author.bio && (
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {author.bio}
                  </p>
                )}

                {/* Author Details */}
                <div className="flex flex-wrap gap-6 text-gray-600">
                  {author.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{author.location}</span>
                    </div>
                  )}
                  
                  {author.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Website</span>
                    </a>
                  )}
                  
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>@{author.twitter}</span>
                    </a>
                  )}
                  
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Author Articles */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-8">
              Articles by {author.name}
            </h2>

            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  This author hasn't published any articles yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 