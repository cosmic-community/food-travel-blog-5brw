import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const profilePhoto = author.metadata?.profile_photo
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const socialLink = author.metadata?.social_link

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-100 text-center"
    >
      {profilePhoto ? (
        <img
          src={`${profilePhoto.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
          alt={name}
          className="w-28 h-28 rounded-full object-cover mx-auto mb-5 ring-4 ring-warm-100 group-hover:ring-terracotta-200 transition-all"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-warm-200 flex items-center justify-center mx-auto mb-5 text-warm-600 font-bold text-4xl ring-4 ring-warm-100 group-hover:ring-terracotta-200 transition-all">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <h3 className="font-serif text-xl font-bold text-warm-900 group-hover:text-terracotta-600 transition-colors mb-2">
        {name}
      </h3>

      {bio && (
        <p className="text-warm-600 text-sm line-clamp-3 leading-relaxed mb-4">
          {bio}
        </p>
      )}

      {socialLink && (
        <span className="inline-flex items-center gap-1.5 text-terracotta-500 text-sm font-medium">
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
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          Social
        </span>
      )}
    </Link>
  )
}