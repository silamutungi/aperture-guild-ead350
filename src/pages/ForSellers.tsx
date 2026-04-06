import { Link } from 'react-router-dom'
import { Check, TrendingUp, ShieldCheck, Database } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { formatCurrency } from '../lib/utils'

const PLANS = [
  { name: 'Free', price: 0, payout: '60%', limit: '20 photos', features: ['20 active listings', '60% payout per sale', 'Basic analytics', 'Community access', 'Standard support'] },
  { name: 'Guild Member', price: 12, payout: '70%', limit: 'Unlimited', features: ['Unlimited listings', '70% payout per sale', 'Full buyer data export', 'Priority editorial review', 'Advanced analytics', 'Direct messaging', '24h priority support'], highlighted: true },
  { name: 'Studio', price: 39, payout: '75%', limit: 'Unlimited + team', features: ['Everything in Guild Member', '75% payout per sale', 'Team seats (up to 5)', 'White-label client proofing', 'API access', 'Dedicated account manager'] },
]

export default function ForSellers() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="mb-16">
          <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)', maxWidth: '640px' }}>Sell your photography on your terms.</h1>
          <p className="max-w-xl" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-callout)', lineHeight: 'var(--leading-relaxed)' }}>70% payouts. Your customer data. No non-competes. No algorithmic gatekeeping. Just your work, seen by buyers who are ready to pay for quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <TrendingUp size={28} />, title: '70% Payouts', desc: 'Industry-leading commission on every sale, paid monthly with no minimum threshold.' },
            { icon: <Database size={28} />, title: 'Own Your Data', desc: 'Every buyer email and contact is yours to export. No platform lock-in, ever.' },
            { icon: <ShieldCheck size={28} />, title: 'Vetted Community', desc: 'Manual review of every submission keeps quality high and your portfolio valued.' },
            { icon: <Check size={28} />, title: 'No Non-Compete', desc: 'Sell here and everywhere else. We succeed when you succeed, not by trapping you.' },
          ].map(f => (
            <div key={f.title}>
              <div className="mb-3" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-bold mb-8" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Simple, transparent pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PLANS.map(plan => (
            <div key={plan.name} className="rounded-xl p-6 flex flex-col" style={{ border: plan.highlighted ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: plan.highlighted ? 'var(--color-bg-surface)' : 'var(--color-bg)' }}>
              {plan.highlighted && <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>Most Popular</p>}
              <h3 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>{plan.name}</h3>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-bold" style={{ fontSize: '2rem', color: 'var(--color-text)' }}>{formatCurrency(plan.price)}</span>
                {plan.price > 0 && <span className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>/month</span>}
              </div>
              <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>{plan.payout} payout &middot; {plan.limit}</p>
              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--color-success)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="inline-flex items-center justify-center font-semibold rounded-lg h-11 transition-opacity hover:opacity-90" style={{ background: plan.highlighted ? 'var(--color-primary)' : 'var(--color-bg-surface)', color: plan.highlighted ? '#fff' : 'var(--color-text)', border: plan.highlighted ? 'none' : '1.5px solid var(--color-border)' }}>
                {plan.price === 0 ? 'Get started free' : 'Start listing'}
              </Link>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-10" style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <h2 className="font-bold mb-3" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Ready to list your first photo?</h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>Set up your portfolio in under 5 minutes. Your first 20 listings are always free.</p>
          <Link to="/signup" className="inline-flex items-center justify-center font-semibold rounded-lg px-8 h-12" style={{ background: 'var(--color-primary)', color: '#fff' }}>Join the Guild — Free</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
