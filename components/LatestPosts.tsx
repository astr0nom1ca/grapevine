import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default function LatestPosts({ posts }: { posts: any[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-serif font-bold mb-10 border-b-2 border-black pb-2 inline-block">
        The Latest
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}`} className="group">
            <article>
              <div className="aspect-[16/9] bg-gray-100 rounded-2xl mb-4 overflow-hidden relative shadow-sm">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(800).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-600 uppercase tracking-tighter">
                  {post.category}
                </span>
                <h3 className="text-2xl font-serif font-bold leading-tight group-hover:underline">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                  <span className="font-semibold">By {post.authorName}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}