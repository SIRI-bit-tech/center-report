'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo, truncateText } from '@/lib/utils'

interface HeroSectionProps {
  featuredArticles: Article[]
  breakingNews?: Article[]
}

function getValidImageUrl(url?: string) {
  if (!url) return '/placeholder.jpg'
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
  return '/placeholder.jpg'
}

// Animated Breaking News Ticker Component
function BreakingNewsTicker({ breakingNews }: { breakingNews: Article[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (breakingNews.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNews.length)
    }, 4000) // Change headline every 4 seconds

    return () => clearInterval(interval)
  }, [breakingNews.length])

  if (!breakingNews || breakingNews.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-accent text-white px-4 py-3 rounded-lg flex items-center space-x-3">
        <TrendingUp className="h-5 w-5 animate-pulse" />
        <span className="font-semibold text-sm uppercase tracking-wider">Breaking News</span>
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Link
                href={`/article/${breakingNews[currentIndex].slug}`}
                className="text-sm hover:underline truncate flex-1"
              >
                {breakingNews[currentIndex].title}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress indicators */}
        {breakingNews.length > 1 && (
          <div className="flex space-x-1">
            {breakingNews.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function HeroSection({ featuredArticles, breakingNews }: HeroSectionProps) {
  if (!featuredArticles || featuredArticles.length === 0) {
    return (
      <section className="py-8 bg-gradient-to-b from-background-50 to-background">
        <div className="container-custom text-center py-16">
          <h2 className="text-2xl font-bold text-primary mb-4">No featured articles available</h2>
          <p className="text-gray-600">Check back soon for the latest top stories.</p>
        </div>
      </section>
    )
  }

  const mainArticle = featuredArticles[0]
  const secondaryArticles = featuredArticles.slice(1, 4)

  return (
    <section className="py-8 bg-gradient-to-b from-background-50 to-background">
      <div className="container-custom">
        {/* Animated Breaking News Ticker */}
        <BreakingNewsTicker breakingNews={breakingNews || []} />

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href={`/article/${mainArticle.slug}`}>
              <article className="group relative h-96 lg:h-[500px] rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={getValidImageUrl(mainArticle.featured_image)}
                  alt={mainArticle.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span 
                      className="category-badge text-white text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: mainArticle.category.color }}
                    >
                      {mainArticle.category.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl lg:text-4xl font-bold mb-3 text-shadow-lg line-clamp-3">
                    {mainArticle.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-gray-200 text-sm lg:text-base mb-4 line-clamp-2">
                    {truncateText(mainArticle.excerpt, 200)}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center space-x-4">
                      <span>{mainArticle.author.name}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(mainArticle.published_date)}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Secondary Articles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {secondaryArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/article/${article.slug}`}>
                  <article className="group bg-white rounded-lg shadow-soft overflow-hidden cursor-pointer hover:shadow-medium transition-all duration-300">
                    <div className="flex">
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={getValidImageUrl(article.featured_image)}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-3">
                        <h3 className="font-semibold text-sm text-primary mb-1 line-clamp-2 group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{article.author.name}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(article.published_date)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 