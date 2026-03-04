import type { Metadata } from 'next'
import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Explore food travel categories — Italian cuisine, Japanese delicacies, South American flavors, and more.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-warm-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-terracotta-400 uppercase tracking-widest text-sm font-semibold mb-4">
            Browse By Region
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            Categories
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            From the rolling hills of Tuscany to the bustling streets of Tokyo —
            explore cuisines by region and tradition.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏷️</p>
            <h2 className="text-2xl font-serif font-bold text-warm-800 mb-2">
              No categories yet
            </h2>
            <p className="text-warm-600">
              Categories will appear here as they are created.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}