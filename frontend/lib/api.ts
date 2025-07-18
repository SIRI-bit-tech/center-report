import { Article, Category, Author, ApiResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Network error occurred')
  }
}

// Articles API
export const articlesApi = {
  // Get all articles with optional filters
  async getArticles(params?: {
    page?: number
    limit?: number
    category?: string
    author?: string
    tag?: string
    featured?: boolean
  }): Promise<ApiResponse<Article[]>> {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.category) searchParams.append('category', params.category)
    if (params?.author) searchParams.append('author', params.author)
    if (params?.tag) searchParams.append('tag', params.tag)
    if (params?.featured) searchParams.append('featured', 'true')

    const endpoint = `/articles/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return fetchApi<ApiResponse<Article[]>>(endpoint)
  },

  // Get a single article by slug
  async getArticle(slug: string): Promise<Article> {
    return fetchApi<Article>(`/articles/${slug}/`)
  },

  // Get featured articles
  async getFeaturedArticles(limit: number = 6): Promise<Article[]> {
    const response = await this.getArticles({ featured: true, limit })
    return response.data
  },

  // Get breaking news articles
  async getBreakingNews(limit: number = 5): Promise<Article[]> {
    const response = await this.getArticles({ category: 'breaking-news', limit })
    return response.data
  },

  // Search articles
  async searchArticles(query: string, page: number = 1): Promise<ApiResponse<Article[]>> {
    const searchParams = new URLSearchParams({
      q: query,
      page: page.toString(),
    })
    return fetchApi<ApiResponse<Article[]>>(`/articles/search/?${searchParams.toString()}`)
  },
}

// Categories API
export const categoriesApi = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    return fetchApi<Category[]>('/categories/')
  },

  // Get a single category by slug
  async getCategory(slug: string): Promise<Category> {
    return fetchApi<Category>(`/categories/${slug}/`)
  },

  // Get articles by category
  async getCategoryArticles(slug: string, page: number = 1): Promise<ApiResponse<Article[]>> {
    return fetchApi<ApiResponse<Article[]>>(`/categories/${slug}/articles/?page=${page}`)
  },
}

// Authors API
export const authorsApi = {
  // Get all authors
  async getAuthors(): Promise<Author[]> {
    return fetchApi<Author[]>('/authors/')
  },

  // Get a single author by ID
  async getAuthor(id: number): Promise<Author> {
    return fetchApi<Author>(`/authors/${id}/`)
  },

  // Get articles by author
  async getAuthorArticles(id: number, page: number = 1): Promise<ApiResponse<Article[]>> {
    return fetchApi<ApiResponse<Article[]>>(`/authors/${id}/articles/?page=${page}`)
  },
}

// Trending API
export const trendingApi = {
  // Get trending articles
  async getTrendingArticles(limit: number = 10): Promise<Article[]> {
    return fetchApi<Article[]>(`/trending/?limit=${limit}`)
  },
}

export { ApiError } 