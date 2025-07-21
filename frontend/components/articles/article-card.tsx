'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, User } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo, truncateText } from '@/lib/utils'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

function getValidImageUrl(url?: string) {
  if (!url) return '/placeholder.jpg'
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
  // If not valid, use placeholder
  return '/placeholder.jpg'
}

export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  const isFeatured = variant === 'featured'
  const isCompact = variant === 'compact'

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group cursor-pointer ${className}`}
    >
      <Link href={`/article/${article.slug}`}>
        <article className={`
          bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden
          transition-all duration-300 hover:shadow-medium
          ${isFeatured ? 'lg:col-span-2' : ''}
        `}>
          {/* Image Container */}
          <div className={`
            relative overflow-hidden bg-gray-100
            ${isFeatured ? 'aspect-[16/9]' : isCompact ? 'aspect-[4/3]' : 'aspect-[3/2]'}
          `}>
            <Image
              src={getValidImageUrl(article.featured_image)}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              priority={isFeatured}
            />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span 
                className="category-badge text-white text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
            </div>

            {/* Breaking News Badge */}
            {article.is_featured && (
              <div className="absolute top-3 right-3">
                <span className="breaking-news">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className={`
              font-semibold text-primary mb-2 line-clamp-2
              ${isFeatured ? 'text-xl lg:text-2xl' : isCompact ? 'text-sm' : 'text-lg'}
            `}>
              {article.title}
            </h3>

            {/* Excerpt */}
            {!isCompact && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {truncateText(article.excerpt, isFeatured ? 150 : 100)}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(article.published_date)}</span>
                </div>
              </div>
              
              {!isCompact && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {article.read_time} min read
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
} 