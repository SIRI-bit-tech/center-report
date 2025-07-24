import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thecentralreport.com'
  
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

  try {
    // Fetch dynamic content from your API
    const [articlesRes, categoriesRes, authorsRes] = await Promise.allSettled([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/?limit=1000`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/categories/`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/authors/`)
    ])

    const dynamicPages: MetadataRoute.Sitemap = []

    // Add articles
    if (articlesRes.status === 'fulfilled' && articlesRes.value.ok) {
      const articlesData = await articlesRes.value.json()
      const articles = articlesData.results || []
      
      articles.forEach((article: any) => {
        dynamicPages.push({
          url: `${baseUrl}/article/${article.slug}`,
          lastModified: new Date(article.published_date || article.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        })
      })
    }

    // Add categories
    if (categoriesRes.status === 'fulfilled' && categoriesRes.value.ok) {
      const categories = await categoriesRes.value.json()
      
      categories.forEach((category: any) => {
        dynamicPages.push({
          url: `${baseUrl}/category/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        })
      })
    }

    // Add authors
    if (authorsRes.status === 'fulfilled' && authorsRes.value.ok) {
      const authors = await authorsRes.value.json()
      
      authors.forEach((author: any) => {
        dynamicPages.push({
          url: `${baseUrl}/author/${author.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })
      })
    }

    return [...staticPages, ...dynamicPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
} 