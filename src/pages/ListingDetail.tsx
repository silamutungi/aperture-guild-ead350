import { useParams, Link } from 'react-router-dom'
import { Camera, MapPin, Star, ShieldCheck, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { formatCurrency, formatDate } from '../lib/utils'
import type { Listing, Review } from '../types'

const ALL_LISTINGS: Listing[] = [
  { id: '1', title: 'Golden Hour Over the Dolomites', description: 'Captured at 5:42am on a solo four-day traverse of the Tre Cime circuit. The light broke through the ridge exactly as forecast — a 3-minute window. Shot tethered to a carbon tripod in sub-zero wind. The final file is 187MP, suitable for billboard-scale prints.', price: 149, license_type: 'commercial', category: 'Landscape', tags: ['mountain', 'sunrise', 'italy'], image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', photographer_name: 'Elena Vasquez', photographer_id: 'p1', photographer_avatar: '', camera_model: 'Sony A7R V', aperture: 'f/8', shutter_speed: '1/60s', iso: 100, focal_length: '24mm', location: 'Dolomites, Italy', created_at: '2024-03-15', deleted_at: null },
  { id: '2', title: 'Tokyo Neon Rain', description: 'Street photography at its most electric, Shinjuku 2am.', price: 89, license_type: 'editorial', category: 'Street', tags: ['tokyo', 'rain', 'night'], image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85', photographer_name: 'Haruto Mori', photographer_id: 'p2', photographer_avatar: '', camera_model: 'Fujifilm X-T5', aperture: 'f/2', shutter_speed: '1/30s', iso: 3200, focal_length: '35mm', location: 'Shinjuku, Tokyo', created_at: '2024-02-28', deleted_at: null },
  { id: '3', title: 'Serengeti Predawn Migration', description: 'Wildebeest crossing at dusk, a once-in-a-decade shot.', price: 299, license_type: 'commercial', category: 'Wildlife', tags: ['africa', 'wildlife', 'migration'], image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', photographer_name: 'Amara Diallo', photographer_id: 'p3', photographer_avatar: '', camera_model: 'Nikon Z9', aperture: 'f/4', shutter_speed: '1/500s', iso: 800, focal_length: '400mm', location: 'Serengeti, Tanzania', created_at: '2024-01-10', deleted_at: null },
  { id: '4', title: 'Icelandic Aurora Reflection', description: 'Northern lights mirrored in a still volcanic lake.', price: 199, license_type: 'commercial', category: 'Landscape', tags: ['aurora', 'iceland', 'night'], image_url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85', photographer_name: 'Sigrid Bjornsdottir', photographer_id: 'p4', photographer_avatar: '', camera_model: 'Canon EOS R5', aperture: 'f/2.8', shutter_speed: '15s', iso: 1600, focal_length: '16mm', location: 'Myvatn, Iceland', created_at: '2024-03-02', deleted_at: null },
  { id: '5', title: 'Monsoon Chai Vendor', description: 'Intimate portrait of a tea seller in the Mumbai rain.', price: 75, license_type: 'editorial', category: 'Portrait', tags: ['india', 'portrait', 'rain'], image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=85', photographer_name: 'Priya Sharma', photographer_id: 'p5', photographer_avatar: '', camera_model: 'Leica M11', aperture: 'f/1.4', shutter_speed: '1/125s', iso: 400, focal_length: '50mm', location: 'Mumbai, India', created_at: '2024-02-14', deleted_at: null },
  { id: '6', title: 'Patagonia Glacier Calving', description: 'The moment of impact — 200 tons of ice meets ocean.', price: 349, license_type: 'commercial', category: 'Nature', tags: ['patagonia', 'glacier', 'climate'], image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85', photographer_name: 'Carlos Ruiz', photographer_id: 'p6', photographer_avatar: '', camera_model: 'Phase One IQ4', aperture: 'f/5.6', shutter_speed: '1/1000s', iso: 200, focal_length: '100mm', location: 'Los Glaciares, Argentina', created_at: '2024-03-20', deleted_at: null },
]

const SEED_REVIEWS: Review[] = [
  { id: 'r1', listing_id: '1', reviewer_name: 'James Holbrook', rating: 5, comment: 'Used this for a major hotel lobby print installation — the resolution is extraordinary. Elena responded to my usage questions within the hour. Absolutely outstanding.', created_at: '2024-03-22' },
  { id: 'r2', listing_id: '1', reviewer_name: 'Mei Tanaka', rating: 5, comment: 'Purchased the commercial license for a travel magazine cover. The EXIF data and story behind the shot made it so easy to write the caption. Will buy again.', created_at: '2024-03-18' },
  { id: 'r3', listing_id: '1', reviewer_name: 'Farouk Osei', rating: 4, comment: 'Stunning image, fast download, clear license terms. Docking one star only because I wish there were more angle options. Otherwise perfect purchase.', created_at: '2024-03-10' },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} fill={i <= rating ? 'var(--color-accent)' : 'none'} stroke={i <= rating ? 'var(--color-accent)' : 'var(--color-border)'} />
      ))}
    </span>
  )
}

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const listing = ALL_LISTINGS.find(l => l.id === id) ?? ALL_LISTINGS[0]

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <nav className="flex gap-2 text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }} aria-label="Breadcrumb">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/browse" className="hover:underline">Browse</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text)' }}>{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--color-border)' }}>
              <img src={listing.image_url} alt={listing.title} className="w-full object-cover" />
            </div>
            <div className="mb-8">
              <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{listing.title}</h1>
              <p className="flex items-center gap-1 text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}><MapPin size={14} />{listing.location}</p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{listing.description}</p>
            </div>

            <div className="rounded-xl p-5 mb-8" style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <h2 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}><Camera size={16} /> EXIF Metadata</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Camera', value: listing.camera_model },
                  { label: 'Aperture', value: listing.aperture },
                  { label: 'Shutter', value: listing.shutter_speed },
                  { label: 'ISO', value: String(listing.iso) },
                  { label: 'Focal Length', value: listing.focal_length },
                  { label: 'Category', value: listing.category },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{row.label}</p>
                    <p className="text-sm font-medium font-mono" style={{ color: 'var(--color-text)' }}>{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-5" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Buyer Reviews</h2>
              <div className="flex flex-col gap-5">
                {SEED_REVIEWS.map(r => (
                  <div key={r.id} className="pb-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{r.reviewer_name}</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{formatDate(r.created_at)}</span>
                    </div>
                    <StarRow rating={r.rating} />
                    <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-6 rounded-xl p-6" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-primary)' }}>{formatCurrency(listing.price)}</span>
                <Badge style={{ background: 'var(--color-bg)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }} className="capitalize">{listing.license_type}</Badge>
              </div>
              <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>One-time payment. Full resolution file delivered instantly.</p>
              <Button className="w-full mb-3 h-12 font-semibold" style={{ background: 'var(--color-primary)', color: '#fff' }}>
                <Download size={16} className="mr-2" />
                License This Photo
              </Button>
              <div className="flex items-start gap-2 mt-4" style={{ color: 'var(--color-text-secondary)' }}>
                <ShieldCheck size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--color-success)' }} />
                <p className="text-xs">Commercial use included. Legal indemnification provided. Model and property releases available on request.</p>
              </div>
              <hr className="my-5" style={{ borderColor: 'var(--color-border)' }} />
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>Photographer</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: 'var(--color-primary)', fontSize: '14px' }}>{listing.photographer_name[0]}</div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{listing.photographer_name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{listing.category} photographer</p>
                </div>
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>Listed {formatDate(listing.created_at)}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
