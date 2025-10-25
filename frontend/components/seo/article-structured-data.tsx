interface ArticleStructuredDataProps {
  article: {
    title: string
    content: string
    slug: string
    published_date: string
    updated_date?: string
    author: {
      name: string
      slug: string
      bio?: string
    }
    category: {
      name: string
      slug: string
    }
    featured_image?: string
    excerpt?: string
  }
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const baseUrl = 'https://centralsreport.com'
  
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt || article.content.substring(0, 160),
    "url": `${baseUrl}/article/${article.slug}`,
    "datePublished": article.published_date,
    "dateModified": article.updated_date || article.published_date,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "url": `${baseUrl}/author/${article.author.slug}`,
      "description": article.author.bio
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "The Central Report",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/article/${article.slug}`
    },
    "articleSection": article.category.name,
    "keywords": [article.category.name, "news", "breaking news"],
    "inLanguage": "en-US"
  }

  if (article.featured_image) {
    structuredData.image = {
      "@type": "ImageObject",
      "url": article.featured_image,
      "width": 1200,
      "height": 630
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}