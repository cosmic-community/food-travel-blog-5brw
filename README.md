# Food Travel Blog

![App Preview](https://imgix.cosmicjs.com/f2078f30-1809-11f1-a3e6-0569ca0db350-autopilot-photo-1535399831218-d5bd36d1a6b3-1772656641947.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautifully crafted food travel blog that takes readers on a culinary journey across Italy, Japan, and South America. Built with Next.js 16, styled with Tailwind CSS, and powered by [Cosmic](https://www.cosmicjs.com) CMS for seamless content management.

## Features

- 🌍 **Global Cuisine Coverage** — From Italian pasta to Japanese ramen to South American empanadas
- 📸 **Stunning Imagery** — Full-width hero images with imgix optimization for fast loading
- ✍️ **Author Profiles** — Detailed writer pages with bios, photos, and their published articles
- 🏷️ **Category Browsing** — Explore by cuisine region with dedicated category pages
- 🔖 **Tag System** — Discover posts by ingredients, techniques, or travel themes
- 📱 **Fully Responsive** — Mobile-first design that looks gorgeous on every device
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router and Server Components
- 🔍 **SEO Optimized** — Dynamic metadata and Open Graph tags for social sharing

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69a8979a509535b32fefd0ce&clone_repository=69a89904509535b32fefd0fd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: Food travel blog covering Italy to Japan to South American cuisine and locations."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'Food Travel Blog'. The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Food travel blog covering Italy to Japan to South American cuisine and locations."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management
- [@cosmicjs/sdk](https://www.cosmicjs.com/docs) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your content bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd food-travel-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching a Single Post by Slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching Categories
```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses three content types:

| Object Type | Description | Key Metafields |
|---|---|---|
| **Posts** | Blog articles | content, featured_image, author, category, tags |
| **Categories** | Cuisine/region groups | name, description, cover_image |
| **Authors** | Writer profiles | name, bio, profile_photo, social_link |

Content is fetched server-side using the Cosmic SDK with proper depth for connected objects (authors and categories linked to posts).

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables in Netlify settings
5. Deploy!

<!-- README_END -->