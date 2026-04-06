import { Link } from 'react-router-dom'
import { Camera } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera size={18} style={{ color: 'var(--color-primary)' }} aria-hidden />
              <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>Aperture Guild</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>Community-first photography marketplace. Own your work, your prices, your customers.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>Marketplace</p>
            <div className="flex flex-col gap-2">
              <Link to="/browse" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Browse Photos</Link>
              <Link to="/how-it-works" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>How It Works</Link>
              <Link to="/for-sellers" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>For Sellers</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>Account</p>
            <div className="flex flex-col gap-2">
              <Link to="/signup" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Join Free</Link>
              <Link to="/login" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sign In</Link>
              <Link to="/dashboard" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>Legal</p>
            <div className="flex flex-col gap-2">
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Terms of Service</span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Licensing Guide</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)' }} className="pt-6">
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>&copy; {year} Aperture Guild. All rights reserved. Photos are licensed, not sold. Rights remain with photographers.</p>
        </div>
      </div>
    </footer>
  )
}
