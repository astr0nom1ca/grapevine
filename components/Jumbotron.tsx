'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'

export default function Jumbotron({ posts }: { posts: any[] }) {
  const [index, setIndex] = useState(0)

  // Auto-flip every 5 seconds
  useEffect(() => {
    if (posts.length <= 1) return // Don't flip if only 1 post
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [posts.length])

  if (!posts || posts.length === 0) return null

  const currentPost = posts[index]

  // SAFETY: Handle the case where a post might be missing a slug
  const postHref = currentPost.slug ? `/post/${currentPost.slug}` : '#'

  return (
    <section className="relative h-[500px] md:h-[650px] w-full bg-[#111] rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* THE IMAGE: Using a template literal for the style */}
          {currentPost.mainImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] scale-105"
              style={{ 
                backgroundImage: currentPost?.mainImage?.asset
                  ? `url('${urlFor(currentPost.mainImage).width(1600).url()}')` 
                  : 'none',
                backgroundColor: '#111' 
              }}
            />
          )}
          
          {/* THE OVERLAY: Essential for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

          {/* THE CONTENT */}
          <Link href={`/post/${currentPost.slug}`} className="absolute inset-0 z-20 flex items-end p-8 md:p-16 group">
            <div className="max-w-4xl space-y-4">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block shadow-lg">
                {currentPost.category || 'Featured'}
              </span>
              
              <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-[1.1] group-hover:text-red-100 transition-colors">
                {currentPost.title}
              </h1>
              
              <div className="flex items-center gap-3 text-white/90 font-medium text-lg">
                <span className="hover:underline">By {currentPost.authorName || 'Staff Writer'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="text-white/60 text-sm">
                  {currentPost.publishedAt ? new Date(currentPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION INDICATORS */}
      {posts.length > 1 && (
        <div className="absolute bottom-10 right-10 z-30 flex gap-3 bg-black/20 backdrop-blur-md p-2 rounded-full">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 transition-all duration-500 rounded-full ${
                i === index ? "w-10 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}