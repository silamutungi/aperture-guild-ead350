import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Camera } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data: { session } }) => setAuthed(Boolean(session)))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setAuthed(Boolean(session)))
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  const navLinks = [
    { to: '/browse', label: 'Browse' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/for-sellers', label: 'For Sellers' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav role="navigation" aria-label="Main navigation" className="sticky top-0 z-50" style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }} aria-label="Aperture Guild home">
          <Camera size={22} style={{ color: 'var(--color-primary)' }} aria-hidden />
          Aperture Guild
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="px-4 h-9 flex items-center text-sm font-medium rounded-lg transition-colors" style={{ color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text-secondary)', background: isActive(link.to) ? 'rgba(200,75,17,0.08)' : 'transparent' }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {authed || !isSupabaseConfigured ? (
            <>
              <Link to="/dashboard" className="px-4 h-9 flex items-center text-sm font-medium rounded-lg" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</Link>
              <button onClick={handleSignOut} className="px-4 h-9 text-sm font-medium rounded-lg" style={{ color: 'var(--color-text-secondary)' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 h-9 flex items-center text-sm font-medium rounded-lg" style={{ color: 'var(--color-text-secondary)' }}>Sign In</Link>
              <Link to="/signup" className="px-5 h-9 flex items-center text-sm font-semibold rounded-lg" style={{ background: 'var(--color-primary)', color: '#fff' }}>List for Free</Link>
            </>
          )}
        </div>

        <button className="md:hidden w-11 h-11 flex items-center justify-center" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={20} style={{ color: 'var(--color-text)' }} /> : <Menu size={20} style={{ color: 'var(--color-text)' }} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-2" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="h-11 flex items-center text-sm font-medium" style={{ color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text)' }}>{link.label}</Link>
          ))}
          {authed || !isSupabaseConfigured ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="h-11 flex items-center text-sm font-medium" style={{ color: 'var(--color-text)' }}>Dashboard</Link>
              <button onClick={() => { setOpen(false); handleSignOut() }} className="h-11 text-left text-sm font-medium" style={{ color: 'var(--color-text)' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="h-11 flex items-center text-sm font-medium" style={{ color: 'var(--color-text)' }}>Sign In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="h-11 flex items-center justify-center text-sm font-semibold rounded-lg" style={{ background: 'var(--color-primary)', color: '#fff' }}>List for Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
