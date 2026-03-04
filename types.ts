export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface ImageField {
  url: string
  imgix_url: string
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    profile_photo?: ImageField
    social_link?: string
  }
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    cover_image?: ImageField
  }
}

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    content?: string
    featured_image?: ImageField
    author?: Author
    category?: Category
    tags?: string
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}