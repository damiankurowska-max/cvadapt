'use client';

import React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { MenuToggle } from '@/components/ui/menu-toggle';
import Logo from '@/app/components/Logo';
import { useAuth } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((m) => ({ default: m.UserButton as any })),
  { ssr: false }
);

const NAV_LINKS = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },
];

const HEADER_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.80)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(29, 78, 216, 0.08)',
  boxShadow: '0 1px 40px rgba(29, 78, 216, 0.06)',
};

const BTN_GLASS: React.CSSProperties = {
  background: 'rgba(29, 78, 216, 0.06)',
  border: '1px solid rgba(29, 78, 216, 0.18)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  color: '#1d4ed8',
  borderRadius: '9999px',
  padding: '8px 20px',
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: 'nowrap' as const,
  transition: 'all 0.2s ease',
};

const BTN_PRIMARY: React.CSSProperties = {
  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 4px 16px rgba(29,78,216,0.32)',
  color: '#ffffff',
  borderRadius: '9999px',
  padding: '8px 22px',
  fontSize: '0.875rem',
  fontWeight: 700,
  lineHeight: 1,
  whiteSpace: 'nowrap' as const,
  transition: 'all 0.2s ease',
  border: 'none',
};

function LangToggle({ compact = false }: { compact?: boolean }) {
  const [lang, setLangState] = React.useState<'fr' | 'en'>('fr');

  React.useEffect(() => {
    const saved = localStorage.getItem('cvadapt_lang');
    if (saved === 'en' || saved === 'fr') setLangState(saved);
  }, []);

  function setLang(l: 'fr' | 'en') {
    setLangState(l);
    localStorage.setItem('cvadapt_lang', l);
    window.dispatchEvent(new StorageEvent('storage', { key: 'cvadapt_lang', newValue: l }));
  }

  const next = lang === 'fr' ? 'en' : 'fr';
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="rounded-full transition-all hover:-translate-y-px"
      style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: compact ? '4px 10px' : '5px 14px',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        background: 'rgba(29,78,216,0.06)',
        border: '1px solid rgba(29,78,216,0.18)',
        cursor: 'pointer',
        lineHeight: 1,
      }}
      aria-label="Changer de langue"
    >
      <span style={{ color: lang === 'fr' ? '#1d4ed8' : '#9ca3af' }}>🇫🇷 FR</span>
      <span style={{ color: '#d1d5db', fontWeight: 400 }}>|</span>
      <span style={{ color: lang === 'en' ? '#1d4ed8' : '#9ca3af' }}>EN 🇺🇸</span>
    </button>
  );
}

export function SimpleHeader() {
  const [open, setOpen] = React.useState(false);
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full" style={HEADER_STYLE}>
      <nav className="flex h-14 w-full items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo size={28} />
          <span className="text-lg font-extrabold tracking-tight" style={{ color: '#1d4ed8' }}>
            CVAdapt
          </span>
        </Link>

        {/* Desktop nav — centré */}
        <div className="hidden items-center gap-6 lg:flex absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold transition-colors hover:text-blue-600"
              style={{ color: '#4b5563' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <LangToggle />
          {isSignedIn ? (
            <>
              <Link href="/generate" style={BTN_GLASS} className="hover:bg-blue-50/80 hover:-translate-y-px">
                Mon espace
              </Link>
              <Link href="/generate" style={BTN_PRIMARY} className="hover:-translate-y-0.5 hover:shadow-xl">
                Générer un CV →
              </Link>
              {/* @ts-expect-error Clerk dynamic import type mismatch */}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link href="/sign-in" style={BTN_GLASS} className="hover:bg-blue-50/80 hover:-translate-y-px">
                Connexion
              </Link>
              <Link href="/generate" style={BTN_PRIMARY} className="hover:-translate-y-0.5 hover:shadow-xl">
                Commencer — Gratuit
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full transition-colors"
            style={{
              background: 'rgba(29,78,216,0.06)',
              border: '1px solid rgba(29,78,216,0.18)',
            }}
            onClick={() => setOpen(!open)}
          >
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-5"
              stroke="#1d4ed8"
            />
          </button>

          <SheetContent
            showClose={false}
            side="left"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRight: '1px solid rgba(29,78,216,0.10)',
            }}
          >
            <div
              className="flex items-center gap-2 px-5 py-5"
              style={{ borderBottom: '1px solid rgba(29,78,216,0.08)' }}
            >
              <Logo size={24} />
              <span className="text-base font-extrabold" style={{ color: '#1d4ed8' }}>CVAdapt</span>
            </div>

            <div className="flex justify-center py-3" style={{ borderBottom: '1px solid rgba(29,78,216,0.08)' }}>
              <LangToggle compact />
            </div>

            <div className="grid gap-y-1 overflow-y-auto px-4 pt-5 pb-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors hover:bg-blue-50"
                  style={{ color: '#374151' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <SheetFooter
              style={{
                background: 'rgba(240,247,255,0.6)',
                borderTop: '1px solid rgba(29,78,216,0.08)',
              }}
            >
              {isSignedIn ? (
                <>
                  <Link
                    href="/generate"
                    className="flex items-center justify-center w-full py-3 text-sm font-semibold rounded-full transition-colors"
                    style={BTN_GLASS}
                    onClick={() => setOpen(false)}
                  >
                    Mon espace
                  </Link>
                  <Link
                    href="/generate"
                    className="flex items-center justify-center w-full py-3 text-sm font-bold rounded-full transition-all hover:-translate-y-0.5"
                    style={BTN_PRIMARY}
                    onClick={() => setOpen(false)}
                  >
                    Générer un CV →
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center w-full py-3 text-sm font-semibold rounded-full transition-colors"
                    style={BTN_GLASS}
                    onClick={() => setOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/generate"
                    className="flex items-center justify-center w-full py-3 text-sm font-bold rounded-full transition-all hover:-translate-y-0.5"
                    style={BTN_PRIMARY}
                    onClick={() => setOpen(false)}
                  >
                    Commencer — Gratuit
                  </Link>
                </>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
