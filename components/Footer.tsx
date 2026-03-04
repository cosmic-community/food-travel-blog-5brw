import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-warm-900 text-warm-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <span className="text-2xl" aria-hidden="true">
                🍜
              </span>
              <span className="font-serif text-xl font-bold text-white group-hover:text-terracotta-400 transition-colors">
                Food Travel Blog
              </span>
            </Link>
            <p className="text-warm-400 leading-relaxed">
              Culinary journeys from Italy to Japan to South America. Discover
              the world&apos;s most incredible dishes and the stories behind
              them.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/posts"
                  className="hover:text-terracotta-400 transition-colors"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              About
            </h3>
            <p className="text-warm-400 leading-relaxed">
              From street food to fine dining, we explore the intersection of
              food, culture, and travel. Every dish tells a story — and we&apos;re
              here to share it with you.
            </p>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-500 text-sm">
            © {currentYear} Food Travel Blog. All rights reserved.
          </p>
          <p className="text-warm-500 text-sm">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-400 hover:text-terracotta-300 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}