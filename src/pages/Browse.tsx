import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { formatCurrency } from '../lib/utils'
import type { Listing } from '../types'

const ALL_LISTINGS: Listing[] = [
  { id: '1', title: 'Golden Hour Over the Dolomites', description: 'A breathtaking panorama captured at first light.', price: 149, license_type: 'commercial', category: 'Landscape', tags: ['mountain', 'sunrise', 'italy'], image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', photographer_name: 'Elena Vasquez', photographer_id: 'p1', photographer_avatar: '', camera_model: 'Sony A7R V', aperture: 'f/8', shutter_speed: '1/60s', iso: 100, focal_length: '24mm', location: 'Dolomites, Italy', created_at: '2024-03-15', deleted_at: null },
  { id: '2', title: 'Tokyo Neon Rain', description: 'Street photography at its most electric, Shinjuku 2am.', price: 89, license_type: 'editorial', category: 'Street', tags: ['tokyo', 'rain', 'night'], image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', photographer_name: 'Haruto Mori', photographer_id: 'p2', photographer_avatar: '', camera_model: 'Fujifilm X-T5', aperture: 'f/2', shutter_speed: '1/30s', iso: 3200, focal_length: '35mm', location: 'Shinjuku, Tokyo', created_at: '2024-02-28', deleted_at: null },
  { id: '3', title: 'Serengeti Predawn Migration', description: 'Wildebeest crossing at dusk, a once-in-a-decade shot.', price: 299, license_type: 'commercial', category: 'Wildlife', tags: ['africa', 'wildlife', 'migration'], image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', photographer_name: 'Amara Diallo', photographer_id: 'p3', photographer_avatar: '', camera_model: 'Nikon Z9', aperture: 'f/4', shutter_speed: '1/500s', iso: 800, focal_length: '400mm', location: 'Serengeti, Tanzania', created_at: '2024-01-10', deleted_at: null },
  { id: '4', title: 'Icelandic Aurora Reflection', description: 'Northern lights mirrored in a still volcanic lake.', price: 199, license_type: 'commercial', category: 'Landscape', tags: ['aurora', 'iceland', 'night'], image_url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', photographer_name: 'Sigrid Bjornsdottir', photographer_id: 'p4', photographer_avatar: '', camera_model: 'Canon EOS R5', aperture: 'f/2.8', shutter_speed: '15s', iso: 1600, focal_length: '16mm', location: 'Myvatn, Iceland', created_at: '2024-03-02', deleted_at: null },
  { id: '5', title: 'Monsoon Chai Vendor', description: 'Intimate portrait of a tea seller in the Mumbai rain.', price: 75, license_type: 'editorial', category: 'Portrait', tags: ['india', 'portrait', 'rain'], image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', photographer_name: 'Priya Sharma', photographer_id: 'p5', photographer_avatar: '', camera_model: 'Leica M11', aperture: 'f/1.4', shutter_speed: '1/125s', iso: 400, focal_length: '50mm', location: 'Mumbai, India', created_at: '2024-02-14', deleted_at: null },
  { id: '6', title: 'Patagonia Glacier Calving', description: 'The moment of impact — 200 tons of ice meets ocean.', price: 349, license_type: 'commercial', category: 'Nature', tags: ['patagonia', 'glacier', 'climate'], image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80', photographer_name: 'Carlos Ruiz', photographer_id: 'p6', photographer_avatar: '', camera_model: 'Phase One IQ4', aperture: 'f/5.6', shutter_speed: '1/1000s', iso: 200, focal_length: '100mm', location: 'Los Glaciares, Argentina', created_at: '2024-03-20', deleted_at: null },
  { id: '7', title: 'Havana Sunday Morning', description: 'Classic cars and crumbling beauty — Cuba in color.', price: 120, license_type: 'editorial', category: 'Street', tags: ['cuba', 'cars', 'havana'], image_url: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=600&q=80', photographer_name: 'Miguel Fernandez', photographer_id: 'p7', photographer_avatar: '', camera_model: 'Nikon Z6 II', aperture: 'f/5.6', shutter_speed: '1/250s', iso: 200, focal_length: '28mm', location: 'Havana, Cuba', created_at: '2024-01-25', deleted_at: null },
  { id: '8', title: 'Himalayan Prayer Flags', description: 'Windswept flags against the Annapurna range at altitude.', price: 175, license_type: 'personal', category: 'Landscape', tags: ['nepal', 'mountains', 'culture'], image_url: 'https://images.unsplash.com/photo-1523592032792-7a5fe0ef2197?w=600&q=80', photographer_name: 'Tenzin Dorje', photographer_id: 'p8', photographer_avatar: '', camera_model: 'Sony A7 IV', aperture: 'f/11', shutter_speed: '1/200s', iso: 100, focal_length: '35mm', location: 'Annapurna, Nepal', created_at: '2024-02-05', deleted_at: null },
]

const CATEGORIES = ['All', 'Landscape', 'Street', 'Wildlife', 'Portrait', 'Nature', 'Architecture']
const LICENSE_TYPES = ['All', 'commercial', 'editorial', 'personal']
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low']

export default function Browse() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'All'
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const [license, setLicense] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    let items = ALL_LISTINGS
    if (query) items = items.filter(l => l.title.toLowerCase().includes(query.toLowerCase()) || l.tags.some(t => t.includes(query.toLowerCase())))
    if (category !== 'All') items = items.filter(l => l.category === category)
    if (license !== 'All') items = items.filter(l => l.license_type === license)
    if (sort === 'Price: Low to High') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'Price: High to Low') items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [query, category, license, sort])

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Browse Photos</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} aria-hidden />
              <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search photos..." className="pl-9 w-56" aria-label="Search photos" />
            </div>
            <button onClick={() => setShowFilters(v => !v)} className="flex items-center gap-2 px-4 h-10 rounded-lg font-medium text-sm" style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-text)', background: 'var(--color-bg-surface)' }} aria-label="Toggle filters">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 p-5 rounded-xl flex flex-wrap gap-6" style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)} className="px-3 py-1 rounded-full text-sm font-medium transition-colors" style={{ background: category === c ? 'var(--color-primary)' : 'var(--color-bg)', color: category === c ? '#fff' : 'var(--color-text)', border: '1px solid var(--color-border)' }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>License</p>
              <div className="flex flex-wrap gap-2">
                {LICENSE_TYPES.map(l => (
                  <button key={l} onClick={() => setLicense(l)} className="px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors" style={{ background: license === l ? 'var(--color-primary)' : 'var(--color-bg)', color: license === l ? '#fff' : 'var(--color-text)', border: '1px solid var(--color-border)' }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Sort</p>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map(s => (
                  <button key={s} onClick={() => setSort(s)} className="px-3 py-1 rounded-full text-sm font-medium transition-colors" style={{ background: sort === s ? 'var(--color-primary)' : 'var(--color-bg)', color: sort === s ? '#fff' : 'var(--color-text)', border: '1px solid var(--color-border)' }}>{s}</button>
                ))}
              </div>
            </div>
            {(category !== 'All' || license !== 'All' || query) && (
              <button onClick={() => { setCategory('All'); setLicense('All'); setQuery('') }} className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-error)' }}>
                <X size={14} /> Clear all
              </button>
            )}
          </div>
        )}

        {results.length === 0 ? (
          <div className="text-center py-24" style={{ color: 'var(--color-text-secondary)' }}>
            <p className="text-lg font-semibold mb-2">No photos found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(listing => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="group block rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-text)' }}>{listing.title}</h3>
                    <span className="font-bold text-sm whitespace-nowrap" style={{ color: 'var(--color-primary)' }}>{formatCurrency(listing.price)}</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{listing.photographer_name} &middot; {listing.location}</p>
                  <Badge style={{ fontSize: '10px', background: 'var(--color-bg-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{listing.license_type}</Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
