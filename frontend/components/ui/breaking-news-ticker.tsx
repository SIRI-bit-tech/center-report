'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { Article } from '@/types'

interface BreakingNewsTickerProps {
  breakingNews: Article[]
}

export function BreakingNewsTicker({ breakingNews }: BreakingNewsTickerProps) {
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