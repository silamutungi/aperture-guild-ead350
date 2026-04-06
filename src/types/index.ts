export interface Listing {
  id: string
  title: string
  description: string
  price: number
  license_type: 'personal' | 'commercial' | 'editorial'
  category: string
  tags: string[]
  image_url: string
  photographer_name: string
  photographer_id: string
  photographer_avatar: string
  camera_model: string
  aperture: string
  shutter_speed: string
  iso: number
  focal_length: string
  location: string
  created_at: string
  deleted_at: string | null
}

export interface Review {
  id: string
  listing_id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
}

export interface Photographer {
  id: string
  display_name: string
  bio: string
  location: string
  specialty: string
  avatar_url: string
  member_since: string
  total_sales: number
  portfolio_count: number
}

export interface User {
  id: string
  email: string
  display_name: string
  avatar_url: string
  role: 'buyer' | 'seller' | 'both'
}
