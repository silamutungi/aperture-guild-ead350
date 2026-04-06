import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, TrendingUp, DollarSign, Image, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatDate } from '../lib/utils'
import type { User } from '../types'

const SEED_LISTINGS = [
  { id: '1', title: 'Golden Hour Over the Dolomites', price: 149, license_type: 'commercial', category: 'Landscape', status: 'active', sales: 8, earnings: 835.20, created_at: '2024-03-15' },
  { id: '4', title: 'Icelandic Aurora Reflection', price: 199, license_type: 'commercial', category: 'Landscape', status: 'active', sales: 3, earnings: 418.10, created_at: '2024-03-02' },
  { id: '5', title: 'Monsoon Chai Vendor', price: 75, license_type: 'editorial', category: 'Portrait', status: 'active', sales: 12, earnings: 630.00, created_at: '2024-02-14' },
]

const SEED_SALES = [
  { id: 's1', photo: 'Golden Hour Over the Dolomites', buyer: 'James Holbrook', amount: 149, date: '2024-03-22', license: 'commercial' },
  { id: 's2', photo: 'Monsoon Chai Vendor', buyer: 'Mei Tanaka', amount: 75, date: '2024-03-18', license: 'editorial' },
  { id: 's3', photo: 'Icelandic Aurora Reflection', buyer: 'Carlos Ruiz', amount: 199, date: '2024-03-10', license: 'commercial' },
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      if (!isSupabaseConfigured) {
        setUser({ id: 'demo', email: 'demo@apertureguild.com', display_name: 'Elena Vasquez', avatar_url: '', role: 'both' })
        setLoading(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? '', display_name: session.user.user_metadata?.display_name ?? 'Photographer', avatar_url: '', role: 'both' })
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  const totalEarnings = SEED_LISTINGS.reduce((sum, l) => sum + l.earnings, 0)
  const totalSales = SEED_LISTINGS.reduce((sum, l) => sum + l.sales, 0)

  if (loading) {
    return (
      <div style={{ background: 'var(--color-bg)' }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div style={{ background: 'var(--color-accent)', color: '#1C1a18' }} className="text-center py-2 text-sm font-medium">
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Welcome back, {user?.display_name ?? 'Photographer'}</h1>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Guild Member &middot; {user?.email}</p>
          </div>
          <Button className="h-11 font-semibold flex items-center gap-2" style={{ background: 'var(--color-primary)', color: '#fff' }}>
            <Plus size={16} /> Add New Photo
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: <DollarSign size={20} />, label: 'Total Earnings', value: formatCurrency(totalEarnings) },
            { icon: <Download size={20} />, label: 'Total Sales', value: String(totalSales) },
            { icon: <Image size={20} />, label: 'Active Listings', value: String(SEED_LISTINGS.length) },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-5" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--color-primary)' }}>{stat.icon}<span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</span></div>
              <p className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Your Listings</h2>
            <Link to="/browse" className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>View in marketplace</Link>
          </div>
          <div className="flex flex-col gap-3">
            {SEED_LISTINGS.map(listing => (
              <div key={listing.id} className="flex items-center justify-between rounded-xl p-4 gap-4 flex-wrap" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: 'var(--color-text)' }}>{listing.title}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{listing.category} &middot; Listed {formatDate(listing.created_at)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Sales</p>
                    <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{listing.sales}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Earned</p>
                    <p className="font-semibold text-sm" style={{ color: 'var(--color-success)' }}>{formatCurrency(listing.earnings)}</p>
                  </div>
                  <Badge style={{ background: 'var(--color-bg-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', fontSize: '11px' }}>{listing.license_type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} />
            <h2 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Recent Sales</h2>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Photo</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Buyer</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>License</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Date</th>
                  <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {SEED_SALES.map((sale, i) => (
                  <tr key={sale.id} style={{ background: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>{sale.photo}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>{sale.buyer}</td>
                    <td className="px-4 py-3 capitalize" style={{ color: 'var(--color-text-secondary)' }}>{sale.license}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{formatDate(sale.date)}</td>
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: 'var(--color-success)' }}>{formatCurrency(sale.amount * 0.7)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>Amounts shown are your 70% payout after platform fee.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
