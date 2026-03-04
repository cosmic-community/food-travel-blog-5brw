// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts, parseTags, formatDate } from '@/lib/cosmic'
import TagBadge from '@/components/TagBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const description =
    post.metadata?.content?.replace(/<[^>]*>/g, '').slice(0, 160) ||
    `Read ${post.title} on Food Travel Blog`

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: post.metadata?.featured_image?.imgix_url
        ? [
            {
              url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const tags = parseTags(post.metadata?.tags)
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      {featuredImage ? (
        <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-950/80 via-warm-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block bg-terracotta-500 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 hover:bg-terracotta-600 transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              )}
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
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
        <div className="bg-warm-900 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block bg-terracotta-500 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 hover:bg-terracotta-600 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-warm-300">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {post.metadata?.content && (
          <div
            className="prose prose-lg prose-warm max-w-none prose-headings:font-serif prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-warm-900 prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-warm-200">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-600 mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {author && (
          <div className="mt-12 pt-8 border-t border-warm-200">
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-start gap-5 group"
            >
              {author.metadata?.profile_photo ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-4 ring-warm-100 group-hover:ring-terracotta-200 transition-all"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-warm-200 flex items-center justify-center text-warm-600 font-bold text-2xl flex-shrink-0">
                  {(author.metadata?.name || author.title || 'A')
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-warm-500 mb-1">
                  Written by
                </p>
                <h3 className="text-xl font-serif font-bold text-warm-900 group-hover:text-terracotta-600 transition-colors">
                  {author.metadata?.name || author.title}
                </h3>
                {author.metadata?.bio && (
                  <p className="text-warm-600 mt-2 line-clamp-2">
                    {author.metadata.bio}
                  </p>
                )}
              </div>
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}