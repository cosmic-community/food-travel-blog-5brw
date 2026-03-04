import type { Metadata } from 'next'
import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'All Posts',
  description:
    'Browse all food travel stories — from Italian cuisine to Japanese delicacies to South American flavors.',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-warm-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-4">
            Our Stories
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            All Posts
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Every dish tells a story, every destination holds a surprise. Dive
            into our collection of culinary adventures from around the globe.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📝</p>
            <h2 className="text-2xl font-serif font-bold text-warm-800 mb-2">
              No posts yet
            </h2>
            <p className="text-warm-600">
              Check back soon for delicious new content!
            </p>
          </div>
        )}
      </section>
    </div>
  )
}