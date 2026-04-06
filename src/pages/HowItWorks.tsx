import { Link } from 'react-router-dom'
import { Search, CreditCard, Download, Upload, DollarSign, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function HowItWorks() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)' }}>How Aperture Guild Works</h1>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)' }}>A transparent, fair platform for photographers and buyers. No hidden fees, no algorithmic gatekeeping.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="font-bold mb-8" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>For Buyers</h2>
            <div className="flex flex-col gap-8">
              {[
                { step: '01', icon: <Search size={24} />, title: 'Discover curated work', desc: 'Browse by category, style, or location. Every photo is manually reviewed before listing. No spam, no low-quality uploads diluting the feed.' },
                { step: '02', icon: <CreditCard size={24} />, title: 'License with confidence', desc: 'Choose personal, editorial, or commercial licensing. All images come with legal indemnification and clear rights documentation.' },
                { step: '03', icon: <Download size={24} />, title: 'Download full resolution', desc: 'Instant high-res download with full EXIF metadata preserved. Access your purchase history any time from your account.' },
              ].map(s => (
                <div key={s.step} className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--color-bg-surface)', color: 'var(--color-primary)', border: '1.5px solid var(--color-border)' }}>{s.step}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--color-primary)' }}>{s.icon}<h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{s.title}</h3></div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/browse" className="inline-flex items-center justify-center font-semibold rounded-lg px-6 h-12" style={{ background: 'var(--color-primary)', color: '#fff' }}>Start Browsing</Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-8" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>For Photographers</h2>
            <div className="flex flex-col gap-8">
              {[
                { step: '01', icon: <Upload size={24} />, title: 'List your work', desc: 'Upload high-res photos, set your own prices, and write the story behind the shot. EXIF data is extracted and displayed automatically.' },
                { step: '02', icon: <Users size={24} />, title: 'Get discovered fairly', desc: 'Chronological and editorial-curated feeds only — no algorithm burying quality work. Your talent drives your visibility.' },
                { step: '03', icon: <DollarSign size={24} />, title: 'Earn 70% on every sale', desc: 'Keep 70% of every transaction. You own your customer data and can export buyer contacts at any time. No non-competes.' },
              ].map(s => (
                <div key={s.step} className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--color-bg-surface)', color: 'var(--color-accent)', border: '1.5px solid var(--color-border)' }}>{s.step}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--color-accent)' }}>{s.icon}<h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{s.title}</h3></div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/for-sellers" className="inline-flex items-center justify-center font-semibold rounded-lg px-6 h-12" style={{ background: 'var(--color-accent)', color: '#fff' }}>Sell Your Work</Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <h2 className="font-bold mb-3" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Questions? We answer them.</h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>No bots. Every support request handled by a real person within 24 hours.</p>
          <Link to="/signup" className="inline-flex items-center justify-center font-semibold rounded-lg px-6 h-12" style={{ background: 'var(--color-primary)', color: '#fff' }}>Join Free Today</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
