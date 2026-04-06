import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'buyer' | 'seller' | 'both'>('both')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) { setError('All fields are required.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!isSupabaseConfigured) { navigate('/dashboard'); return }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name, role } } })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="text-center max-w-md">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(22,163,74,0.12)' }}>
              <Check size={28} style={{ color: 'var(--color-success)' }} />
            </div>
            <h2 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Check your inbox</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Join Aperture Guild</h1>
          <p className="mb-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Free forever. 20 listings included. No credit card required.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <Label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Display Name</Label>
              <Input id="name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name or studio name" required />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Email</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Password</Label>
              <Input id="password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" required />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium" style={{ color: 'var(--color-text)' }}>I want to</p>
              <div className="flex gap-3">
                {(['buyer', 'seller', 'both'] as const).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)} className="flex-1 h-10 rounded-lg text-sm font-medium capitalize transition-colors" style={{ background: role === r ? 'var(--color-primary)' : 'var(--color-bg-surface)', color: role === r ? '#fff' : 'var(--color-text)', border: '1.5px solid var(--color-border)' }}>
                    {r === 'both' ? 'Buy & Sell' : r === 'buyer' ? 'Buy photos' : 'Sell photos'}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg" style={{ background: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <AlertCircle size={14} />{error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="h-12 font-semibold" style={{ background: 'var(--color-primary)', color: '#fff' }}>
              {loading ? 'Creating account...' : 'Create Free Account'}
            </Button>
          </form>
          <p className="mt-6 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>Already a member? <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
