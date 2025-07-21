'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/articles/article-card'
import { Search, Filter } from 'lucide-react'
import { Article, Category } from '@/types'

export default function SearchPage() {
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
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Search Results
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
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
                  className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Search Results Info */}
            {query && (
              <div className="text-gray-600">
                {loading ? (
                  <p>Searching...</p>
                ) : (
                  <p>
                    Found {totalCount} result{totalCount !== 1 ? 's' : ''} for "{query}"
                    {category && ` in ${categories.find(c => c.slug === category)?.name || category}`}
                  </p>
                )}
              </div>
            )}
          </header>

          {/* Search Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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
          ) : query ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse our categories.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Enter a search term
              </h3>
              <p className="text-gray-500">
                Use the search box above to find articles.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 