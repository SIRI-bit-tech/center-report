'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/articles/article-card'
import { Search, Filter } from 'lucide-react'
import { Article, Category } from '@/types'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const page = parseInt(searchParams.get('page') || '1')
  
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState(category)

  // Fetch categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/categories/`)
        if (response.ok) {
          const data = await response.json()
          setCategories(data.results || data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setArticles([])
        setTotalCount(0)
        setTotalPages(0)
        return
      }

      setLoading(true)
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/?search=${encodeURIComponent(query)}&page=${page}`
        
        if (category) {
          url += `&category=${category}`
        }

        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setArticles(data.results || [])
          setTotalCount(data.count || 0)
          setTotalPages(Math.ceil((data.count || 0) / 12))
        } else {
          setArticles([])
          setTotalCount(0)
          setTotalPages(0)
        }
      } catch (error) {
        console.error('Error fetching search results:', error)
        setArticles([])
        setTotalCount(0)
        setTotalPages(0)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, category, page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const params = new URLSearchParams()
      params.set('q', searchTerm.trim())
      if (selectedCategory) {
        params.set('category', selectedCategory)
      }
      window.location.href = `/search?${params.toString()}`
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    if (searchTerm.trim()) {
      const params = new URLSearchParams()
      params.set('q', searchTerm.trim())
      if (e.target.value) {
        params.set('category', e.target.value)
      }
      window.location.href = `/search?${params.toString()}`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container-custom">
          {/* Search Header */}
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Search Results
            </h1>
            {query && (
              <p className="text-gray-600">
                Showing results for "{query}"
                {category && ` in ${category}`}
              </p>
            )}
          </header>

          {/* Search Form */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : query ? (
            <>
              {articles.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Found {totalCount} result{totalCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center">
                      <nav className="flex items-center space-x-2">
                        {page > 1 && (
                          <a
                            href={`/search?q=${encodeURIComponent(query)}&category=${category}&page=${page - 1}`}
                            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            Previous
                          </a>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <a
                            key={pageNum}
                            href={`/search?q=${encodeURIComponent(query)}&category=${category}&page=${pageNum}`}
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
                            href={`/search?q=${encodeURIComponent(query)}&category=${category}&page=${page + 1}`}
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
                    No results found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse our categories.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Start your search
              </h3>
              <p className="text-gray-500">
                Enter keywords above to find articles.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container-custom">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading search...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
} 