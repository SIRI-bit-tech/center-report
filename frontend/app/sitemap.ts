import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://centralsreport.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Skip API calls during build time if API is not available
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
    console.log('Skipping dynamic sitemap generation - API URL not configured for production')
    return staticPages
  }

  try {
    // Create fetch with timeout
    const fetchWithTimeout = (url: string, timeout = 10000) => {
      return Promise.race([
        fetch(url, { 
          headers: { 'Accept': 'application/json' },
          cache: 'no-store'
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error('Fetch timeout')), timeout)
        )
      ])
    }

    // Fetch dynamic content from your API with timeout
    const [articlesRes, categoriesRes, authorsRes] = await Promise.allSettled([
      fetchWithTimeout(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/?limit=1000`),
      fetchWithTimeout(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/categories/`),
      fetchWithTimeout(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/authors/`)
    ])

    const dynamicPages: MetadataRoute.Sitemap = []

    // Add articles
    if (articlesRes.status === 'fulfilled' && articlesRes.value.ok) {
      try {
        const articlesData = await articlesRes.value.json()
        const articles = Array.isArray(articlesData.results) ? articlesData.results : 
                        Array.isArray(articlesData) ? articlesData : []
        
        articles.forEach((article: any) => {
          if (article && article.slug) {
            dynamicPages.push({
              url: `${baseUrl}/article/${article.slug}`,
              lastModified: new Date(article.published_date || article.created_at || Date.now()),
              changeFrequency: 'weekly' as const,
              priority: 0.9,
            })
          }
        })
      } catch (error) {
        console.error('Error processing articles for sitemap:', error)
      }
    }

    // Add categories
    if (categoriesRes.status === 'fulfilled' && categoriesRes.value.ok) {
      try {
        const categoriesData = await categoriesRes.value.json()
        const categories = Array.isArray(categoriesData.results) ? categoriesData.results : 
                          Array.isArray(categoriesData) ? categoriesData : []
        
        categories.forEach((category: any) => {
          if (category && category.slug) {
            dynamicPages.push({
              url: `${baseUrl}/category/${category.slug}`,
              lastModified: new Date(),
              changeFrequency: 'daily' as const,
              priority: 0.8,
            })
          }
        })
      } catch (error) {
        console.error('Error processing categories for sitemap:', error)
      }
    }

    // Add authors
    if (authorsRes.status === 'fulfilled' && authorsRes.value.ok) {
      try {
        const authorsData = await authorsRes.value.json()
        const authors = Array.isArray(authorsData.results) ? authorsData.results : 
                       Array.isArray(authorsData) ? authorsData : []
        
        authors.forEach((author: any) => {
          if (author && author.slug) {
            dynamicPages.push({
              url: `${baseUrl}/author/${author.slug}`,
              lastModified: new Date(),
              changeFrequency: 'weekly' as const,
              priority: 0.7,
            })
          }
        })
      } catch (error) {
        console.error('Error processing authors for sitemap:', error)
      }
    }

    return [...staticPages, ...dynamicPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
} 