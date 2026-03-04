// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getCategoryBySlug,
  getPostsByCategory,
  getCategories,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.metadata?.name || category.title,
    description:
      category.metadata?.description ||
      `Browse all posts in ${category.metadata?.name || category.title}`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const coverImage = category.metadata?.cover_image

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden">
        {coverImage ? (
          <div className="relative h-[40vh] md:h-[50vh]">
            <img
              src={`${coverImage.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
              alt={category.metadata?.name || category.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-950/80 via-warm-950/40 to-warm-950/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-3">
                  Category
                </p>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
                  {category.metadata?.name || category.title}
                </h1>
                {category.metadata?.description && (
                  <p className="text-warm-200 text-lg max-w-2xl mx-auto">
                    {category.metadata.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-warm-900 text-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-4">
                Category
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
                {category.metadata?.name || category.title}
              </h1>
              {category.metadata?.description && (
                <p className="text-warm-300 text-lg max-w-2xl mx-auto">
                  {category.metadata.description}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-warm-600 mb-8 text-lg">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this
          category
        </p>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <h2 className="text-2xl font-serif font-bold text-warm-800 mb-2">
              No posts in this category yet
            </h2>
            <p className="text-warm-600">
              Stay tuned — new stories are coming soon!
            </p>
          </div>
        )}
      </section>
    </div>
  )
}