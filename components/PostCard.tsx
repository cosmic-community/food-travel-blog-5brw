import Link from 'next/link'
import type { Post } from '@/types'
import { formatDate, parseTags } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = parseTags(post.metadata?.tags)

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-100">
      {/* Image */}
      <Link href={`/posts/${post.slug}`} className="block relative overflow-hidden">
        {featuredImage ? (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-warm-200 to-warm-300 flex items-center justify-center">
            <span className="text-5xl" aria-hidden="true">
              🍽️
            </span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <span className="absolute top-4 left-4 bg-terracotta-500 text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {category.metadata?.name || category.title}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link href={`/posts/${post.slug}`} className="block group/title">
          <h3 className="font-serif text-xl font-bold text-warm-900 group-hover/title:text-terracotta-600 transition-colors mb-3 line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>

        {/* Tags Preview */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-warm-100 text-warm-700 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-warm-500 px-1">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-warm-100">
          {author ? (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-terracotta-600 transition-colors"
            >
              {author.metadata?.profile_photo ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-warm-200 flex items-center justify-center text-warm-600 font-bold text-xs">
                  {(author.metadata?.name || author.title || 'A')
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-warm-700">
                {author.metadata?.name || author.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          <time
            dateTime={post.created_at}
            className="text-sm text-warm-500"
          >
            {formatDate(post.created_at)}
          </time>
        </div>
      </div>
    </article>
  )
}