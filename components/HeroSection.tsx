import Link from 'next/link'
import type { Post } from '@/types'
import { formatDate } from '@/lib/cosmic'

interface HeroSectionProps {
  post: Post
}

export default function HeroSection({ post }: HeroSectionProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  return (
    <section className="relative overflow-hidden">
      {featuredImage ? (
        <div className="relative h-[70vh] md:h-[85vh]">
          <img
            src={`${featuredImage.imgix_url}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-950/90 via-warm-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                {category && (
                  <Link
                    href={`/categories/${category.slug}`}
                    className="bg-terracotta-500 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-terracotta-600 transition-colors"
                  >
                    {category.metadata?.name || category.title}
                  </Link>
                )}
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  Featured
                </span>
              </div>
              <Link href={`/posts/${post.slug}`} className="group">
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight group-hover:text-terracotta-300 transition-colors">
                  {post.title}
                </h1>
              </Link>
              <div className="flex flex-wrap items-center gap-4 text-warm-200">
                {author && (
                  <Link
                    href={`/authors/${author.slug}`}
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    {author.metadata?.profile_photo ? (
                      <img
                        src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={author.metadata?.name || author.title}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-warm-600 flex items-center justify-center text-white font-bold text-sm">
                        {(author.metadata?.name || author.title || 'A')
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium">
                      {author.metadata?.name || author.title}
                    </span>
                  </Link>
                )}
                <span className="text-warm-400">•</span>
                <time dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-warm-900 text-white py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="bg-terracotta-500 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-terracotta-600 transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              )}
              <span className="bg-warm-700 text-warm-200 text-xs font-medium px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
            <Link href={`/posts/${post.slug}`} className="group">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 group-hover:text-terracotta-400 transition-colors">
                {post.title}
              </h1>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-4 text-warm-300">
              {author && (
                <Link
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="font-medium">
                    {author.metadata?.name || author.title}
                  </span>
                </Link>
              )}
              <span className="text-warm-500">•</span>
              <time dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}