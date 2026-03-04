import type { Metadata } from 'next'
import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: 'Authors',
  description:
    'Meet the writers behind the food travel stories — passionate foodies and world travelers.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-warm-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-4">
            The Team
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            Our Authors
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Meet the passionate foodies and world travelers who bring you the
            best culinary stories from around the globe.
          </p>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">✍️</p>
            <h2 className="text-2xl font-serif font-bold text-warm-800 mb-2">
              No authors yet
            </h2>
            <p className="text-warm-600">
              Author profiles will appear here as they are created.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}