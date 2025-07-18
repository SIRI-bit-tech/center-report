export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  published_date: string
  author: Author
  category: Category
  tags: string[]
  is_featured: boolean
  read_time: number
  created_at: string
  updated_at: string
}

export interface Author {
  id: number
  name: string
  bio: string
  avatar?: string
  email: string
  twitter_handle?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  color: string
  order: number
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface SearchParams {
  q?: string
  category?: string
  author?: string
  tag?: string
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  data: T
  count?: number
  next?: string
  previous?: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface HeroArticle {
  article: Article
  isBreaking?: boolean
}

export interface TrendingArticle {
  article: Article
  position: number
} 