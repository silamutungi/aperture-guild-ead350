import { Link } from 'react-router-dom'
import { Camera, ShieldCheck, Users, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Badge } from '../components/ui/badge'
import { isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import type { Listing } from '../types'

const SEED_LISTINGS: Listing[] = [
  { id: '1', title: 'Golden Hour Over the Dolomites', description: 'A breathtaking panorama captured at first light.', price: 149, license_type: 'commercial', category: 'Landscape', tags: ['mountain', 'sunrise', 'italy'], image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', photographer_name: 'Elena Vasquez', photographer_id: 'p1', photographer_avatar: '', camera_model: 'Sony A7R V', aperture: 'f/8', shutter_speed: '1/60s', iso: 100, focal_length: '24mm', location: 'Dolomites, Italy', created_at: '2024-03-15', deleted_at: null },
  { id: '2', title: 'Tokyo Neon Rain', description: 'Street photography at its most electric, Shinjuku 2am.', price: 89, license_type: 'editorial', category: 'Street', tags: ['tokyo', 'rain', 'night'], image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', photographer_name: 'Haruto Mori', photographer_id: 'p2', photographer_avatar: '', camera_model: 'Fujifilm X-T5', aperture: 'f/2', shutter_speed: '1/30s', iso: 3200, focal_length: '35mm', location: 'Shinjuku, Tokyo', created_at: '2024-02-28', deleted_at: null },
  { id: '3', title: 'Serengeti Predawn Migration', description: 'Wildebeest crossing at dusk, a once-in-a-decade shot.', price: 299, license_type: 'commercial', category: 'Wildlife', tags: ['africa', 'wildlife', 'migration'], image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', photographer_name: 'Amara Diallo', photographer_id: 'p3', photographer_avatar: '', camera_model: 'Nikon Z9', aperture: 'f/4', shutter_speed: '1/500s', iso: 800, focal_length: '400mm', location: 'Serengeti, Tanzania', created_at: '2024-01-10', deleted_at: null },
  { id: '4', title: 'Icelandic Aurora Reflection', description: 'Northern lights mirrored in a still volcanic lake.', price: 199, license_type: 'commercial', category: 'Landscape', tags: ['aurora', 'iceland', 'night'], image_url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', photographer_name: 'Sigrid Bjornsdottir', photographer_id: 'p4', photographer_avatar: '', camera_model: 'Canon EOS R5', aperture: 'f/2.8', shutter_speed: '15s', iso: 1600, focal_length: '16mm', location: 'Myvatn, Iceland', created_at: '2024-03-02', deleted_at: null },
  { id: '5', title: 'Monsoon Chai Vendor', description: 'Intimate portrait of a tea seller in the Mumbai rain.', price: 75, license_type: 'editorial', category: 'Portrait', tags: ['india', 'portrait', 'rain'], image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', photographer_name: 'Priya Sharma', photographer_id: 'p5', photographer_avatar: '', camera_model: 'Leica M11', aperture: 'f/1.4', shutter_speed: '1/125s', iso: 400, focal_length: '50mm', location: 'Mumbai, India', created_at: '2024-02-14', deleted_at: null },
  { id: '6', title: 'Patagonia Glacier Calving', description: 'The moment of impact — 200 tons of ice meets ocean.', price: 349, license_type: 'commercial', category: 'Nature', tags: ['patagonia', 'glacier', 'climate'], image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80', photographer_name: 'Carlos Ruiz', photographer_id: 'p6', photographer_avatar: '', camera_model: 'Phase One IQ4', aperture: 'f/5.6', shutter_speed: '1/1000s', iso: 200, focal_length: '100mm', location: 'Los Glaciares, Argentina', created_at: '2024-03-20', deleted_at: null },
]

const CATEGORIES = ['Landscape', 'Street', 'Wildlife', 'Portrait', 'Nature', 'Architecture', 'Abstract', 'Documentary']

export default function Home() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div style={{ background: 'var(--color-accent)', color: '#1C1a18' }} className="text-center py-2 text-sm font-medium">
          Viewing sample data — connect your database to go live.
        </div>
      )}

      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1769713569350-8da3473eed3a?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwc2xlZWslMjBwaG90b2dyYXBoZXIlMjdzJTIwd29ya3NwYWNlJTIwZmVhdHVyaW5nJTIwYSUyMHByb2Zlc3Npb25hbCUyMGNhfGVufDB8MHx8fDE3NzU0Mzk4NDJ8MA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <Badge className="mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--color-primary)', color: '#fff', border: 'none' }}>Community-First Marketplace</Badge>
          <h1 className="text-white font-bold leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', maxWidth: '640px' }}>
            Your photography. Your prices. Your customers.
          </h1>
          <p className="text-white/80 mb-10 max-w-lg" style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
            Aperture Guild is the marketplace where 70% payouts, full customer data ownership, and quality-curated discovery replace algorithmic noise.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/browse" className="inline-flex items-center justify-center font-semibold rounded-lg px-6 h-12 min-w-[160px] transition-opacity hover:opacity-90" style={{ background: 'var(--color-primary)', color: '#fff' }}>
              Start Browsing
            </Link>
            <Link to="/for-sellers" className="inline-flex items-center justify-center font-semibold rounded-lg px-6 h-12 min-w-[160px] transition-colors" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)' }}>
              Sell Your Work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-bold mb-3" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Browse Categories</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Curated collections, not algorithm-driven feeds.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <Link key={cat} to={`/browse?category=${cat}`}
                className="px-5 py-2 rounded-full font-medium text-sm transition-colors hover:opacity-80"
                style={{ background: 'var(--color-bg-surface)', color: 'var(--color-text)', border: '1.5px solid var(--color-border)' }}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-bold mb-3" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Featured Work</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Hand-curated by our editorial team — quality over quantity, always.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEED_LISTINGS.map(listing => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="group block rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
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
          <div className="mt-12 text-center">
            <Link to="/browse" className="inline-flex items-center justify-center font-semibold rounded-lg px-8 h-12 transition-opacity hover:opacity-90" style={{ background: 'var(--color-primary)', color: '#fff' }}>
              Explore All Photos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-bold mb-12 text-center" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Why Aperture Guild?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <TrendingUp size={32} />, title: '70% Payouts', desc: 'Industry-leading commission. No exclusivity. No non-competes.' },
              { icon: <Users size={32} />, title: 'Your Customer Data', desc: 'You own every buyer relationship. Export contacts anytime.' },
              { icon: <ShieldCheck size={32} />, title: 'Vetted Quality', desc: 'Every submission reviewed. No spam, no stock-mill dumps.' },
              { icon: <Camera size={32} />, title: 'Full EXIF Metadata', desc: 'Camera settings, location, and story preserved on every photo.' },
            ].map(item => (
              <div key={item.title} className="text-left">
                <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ background: 'var(--color-bg-surface)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Ready to join the guild?</h2>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>Whether you shoot for a living or for love, Aperture Guild is the community-first platform built around your work.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup" className="inline-flex items-center justify-center font-semibold rounded-lg px-8 h-12 transition-opacity hover:opacity-90" style={{ background: 'var(--color-primary)', color: '#fff' }}>Join the Marketplace</Link>
            <Link to="/how-it-works" className="inline-flex items-center justify-center font-semibold rounded-lg px-8 h-12 transition-colors" style={{ color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', background: 'transparent' }}>How It Works</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
