import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data: { session } }) => setAuthed(Boolean(session)))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setAuthed(Boolean(session)))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

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

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="px-4 h-9 flex items-center text-sm font-medium rounded-lg transition-colors" style={{ color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text-secondary)', background: isActive(link.to) ? 'rgba(200,75,17,0.08)' : 'transparent' }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
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

        {/* Mobile hamburger button — hidden at md and above */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'var(--color-text)' }}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="2" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile: backdrop overlay — hidden at md and above */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(28, 26, 24, 0.48)' }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile: slide-in drawer from left — hidden at md and above */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-72 z-50 md:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-bold"
            style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}
          >
            <Camera size={18} style={{ color: 'var(--color-primary)' }} aria-hidden />
            Aperture Guild
          </Link>
          <button
            className="w-11 h-11 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links — Ink color, Flame active state */}
        <div className="flex flex-col gap-1 px-4 pt-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="h-11 flex items-center px-4 text-sm rounded-lg transition-colors"
              style={{
                color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text)',
                background: isActive(link.to) ? 'rgba(200,75,17,0.08)' : 'transparent',
                fontWeight: isActive(link.to) ? 600 : 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Drawer auth section — pinned to bottom */}
        <div
          className="flex flex-col gap-2 px-4 pt-4 pb-8 mt-auto"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {authed || !isSupabaseConfigured ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="h-11 flex items-center px-4 text-sm font-medium rounded-lg transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { setOpen(false); handleSignOut() }}
                className="h-11 text-left px-4 text-sm font-medium rounded-lg transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="h-11 flex items-center px-4 text-sm font-medium rounded-lg transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="h-11 flex items-center justify-center text-sm font-semibold rounded-lg"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                List for Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
