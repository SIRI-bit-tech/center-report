import React from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/articles/article-card'
import { Article } from '@/types'

async function getTagArticles(slug: string, page: number = 1) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/?tag=${slug}&page=${page}`, {
      next: { revalidate: 300 }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch tag articles')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching tag articles:', error)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export default async function TagPage({ params, searchParams }: { params: { slug: string }, searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1')
  const articlesData = await getTagArticles(params.slug, page)
  const articles = articlesData.results || []
  const totalPages = Math.ceil((articlesData.count || 0) / 12)

  if (!articlesData || (articles.length === 0 && page === 1)) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container-custom">
          <header className="mb-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Tag: {params.slug.replace(/-/g, ' ')}
            </h1>
          </header>

          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {articles.map((article: Article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <nav className="flex items-center space-x-2">
                    {page > 1 && (
                      <a
                        href={`/tag/${params.slug}?page=${page - 1}`}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Previous
                      </a>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <a
                        key={pageNum}
                        href={`/tag/${params.slug}?page=${pageNum}`}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          pageNum === page
                            ? 'bg-accent text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </a>
                    ))}
                    {page < totalPages && (
                      <a
                        href={`/tag/${params.slug}?page=${page + 1}`}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Next
                      </a>
                    )}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found for this tag
              </h3>
              <p className="text-gray-500">
                Try another tag or check back later.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 