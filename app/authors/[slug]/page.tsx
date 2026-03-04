// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getAuthors,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: author.metadata?.name || author.title,
    description:
      author.metadata?.bio ||
      `Read articles by ${author.metadata?.name || author.title}`,
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const profilePhoto = author.metadata?.profile_photo

  return (
    <div className="min-h-screen">
      {/* Author Profile */}
      <section className="bg-warm-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {profilePhoto ? (
              <img
                src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-warm-700 flex-shrink-0"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-warm-700 flex items-center justify-center text-white font-bold text-5xl flex-shrink-0">
                {(author.metadata?.name || author.title || 'A')
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
            <div className="text-center md:text-left">
              <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-2">
                Author
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {author.metadata?.name || author.title}
              </h1>
              {author.metadata?.bio && (
                <p className="text-warm-300 text-lg max-w-xl leading-relaxed">
                  {author.metadata.bio}
                </p>
              )}
              {author.metadata?.social_link && (
                <a
                  href={author.metadata.social_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-terracotta-400 hover:text-terracotta-300 font-medium transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Follow
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-900 mb-8">
          Articles by {author.metadata?.name || author.title}
          <span className="text-warm-400 font-normal ml-2">
            ({posts.length})
          </span>
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📝</p>
            <h3 className="text-2xl font-serif font-bold text-warm-800 mb-2">
              No published posts yet
            </h3>
            <p className="text-warm-600">
              This author hasn&apos;t published any posts yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  )
}