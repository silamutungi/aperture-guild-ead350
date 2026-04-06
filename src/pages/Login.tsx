import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please enter your email and password.'); return }
    if (!isSupabaseConfigured) { navigate('/dashboard'); return }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    navigate('/dashboard')
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Sign in</h1>
          <p className="mb-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Welcome back to Aperture Guild.</p>
          {!isSupabaseConfigured && (
            <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              Demo mode: click Sign In to enter the dashboard.
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <Label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Email</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>Password</Label>
              <Input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg" style={{ background: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <AlertCircle size={14} />{error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="h-12 font-semibold" style={{ background: 'var(--color-primary)', color: '#fff' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="mt-6 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>No account? <Link to="/signup" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Create one free</Link></p>
        </div>
      </div>
    </div>
  )
}
