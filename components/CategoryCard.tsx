import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const coverImage = category.metadata?.cover_image
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {coverImage ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={`${coverImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
          <span className="text-6xl opacity-50" aria-hidden="true">
            🌍
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-warm-950/80 via-warm-950/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-terracotta-300 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-warm-300 text-sm line-clamp-2">{description}</p>
        )}
        <div className="mt-3 flex items-center gap-1.5 text-terracotta-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore
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
        </div>
      </div>
    </Link>
  )
}