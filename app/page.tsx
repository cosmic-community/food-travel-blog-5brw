import Link from 'next/link'
import { getPosts, getCategories } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const featuredPost = posts[0]
  const latestPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero Section */}
      {featuredPost ? (
        <HeroSection post={featuredPost} />
      ) : (
        <section className="relative bg-warm-900 text-white py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-warm-300 uppercase tracking-widest text-sm mb-4">
              Welcome to
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Food Travel Blog
            </h1>
            <p className="text-xl text-warm-200 max-w-2xl mx-auto">
              Culinary journeys from Italy to Japan to South America. Discover
              dishes, destinations, and the stories behind them.
            </p>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-terracotta-500 uppercase tracking-widest text-sm font-semibold mb-2">
                Explore By Region
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900">
                Culinary Categories
              </h2>
            </div>
            <Link
              href="/categories"
              className="hidden md:inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
            >
              View all categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sage-600 uppercase tracking-widest text-sm font-semibold mb-2">
                  Fresh From The Kitchen
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900">
                  Latest Stories
                </h2>
              </div>
              <Link
                href="/posts"
                className="hidden md:inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
              >
                View all posts
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg shadow-terracotta-500/25"
              >
                Explore All Posts
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter / CTA Section */}
      <section className="bg-warm-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-4">
            Join The Journey
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            From Street Food to Fine Dining
          </h2>
          <p className="text-warm-300 text-lg mb-8 max-w-xl mx-auto">
            Discover the world&apos;s most incredible food destinations — from
            hidden ramen bars in Tokyo to vibrant markets in Lima and rustic
            osterias in Tuscany.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Start Exploring
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}