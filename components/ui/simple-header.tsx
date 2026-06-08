'use client';

import React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import Logo from '@/app/components/Logo';
import { useAuth } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { t } from '@/lib/i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((m) => ({ default: m.UserButton as any })),
  { ssr: false }
);

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

function LangToggle({ compact = false, currentLang }: { compact?: boolean; currentLang?: string }) {
  const [lang, setLangState] = React.useState<'fr' | 'en'>('fr');

  // Sync with external lang prop (from parent page) or localStorage
  React.useEffect(() => {
    if (currentLang === 'en' || currentLang === 'fr') {
      setLangState(currentLang);
      return;
    }
    const saved = localStorage.getItem('cvadapt_lang');
    if (saved === 'en' || saved === 'fr') setLangState(saved);
  }, [currentLang]);

  function setLang(l: 'fr' | 'en') {
    setLangState(l);
    localStorage.setItem('cvadapt_lang', l);
    window.dispatchEvent(new StorageEvent('storage', { key: 'cvadapt_lang', newValue: l }));
  }

  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      aria-label="Changer de langue"
      style={{
        display: 'flex', alignItems: 'center', gap: '3px',
        padding: compact ? '3px 7px' : '4px 9px',
        fontSize: '0.68rem',
        fontWeight: 700,
        background: 'rgba(29,78,216,0.05)',
        border: '1px solid rgba(29,78,216,0.15)',
        borderRadius: '9999px',
        cursor: 'pointer',
        lineHeight: 1,
      }}
    >
      <span style={{ opacity: lang === 'fr' ? 1 : 0.35 }}>🇫🇷</span>
      <span style={{ color: '#d1d5db', fontSize: '0.55rem' }}>|</span>
      <span style={{ opacity: lang === 'en' ? 1 : 0.35 }}>🇺🇸</span>
    </button>
  );
}

export function SimpleHeader({ lang: langProp }: { lang?: string }) {
  const [open, setOpen] = React.useState(false);
  const { isSignedIn } = useAuth();

  // Resolve language: use prop if provided, otherwise read from localStorage
  const [lang, setLang] = React.useState<'fr' | 'en'>('fr');
  React.useEffect(() => {
    if (langProp === 'en' || langProp === 'fr') { setLang(langProp); return; }
    const saved = localStorage.getItem('cvadapt_lang');
    if (saved === 'en' || saved === 'fr') setLang(saved);
  }, [langProp]);

  const navLinks = [
    { label: t(lang, 'navFeatures'), href: '#features' },
    { label: t(lang, 'navPricing'), href: '/tarifs' },
    { label: 'Blog', href: '/blog' },
  ];

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
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
          <LangToggle currentLang={lang} />
          {isSignedIn ? (
            <>
              <Link href="/generate" style={BTN_GLASS} className="hover:bg-blue-50/80 hover:-translate-y-px">
                {t(lang, 'navMySpace')}
              </Link>
              <Link href="/generate" style={BTN_PRIMARY} className="hover:-translate-y-0.5 hover:shadow-xl">
                {t(lang, 'navGenerateCTA')}
              </Link>
              {/* @ts-expect-error Clerk dynamic import type mismatch */}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link href="/sign-in" style={BTN_GLASS} className="hover:bg-blue-50/80 hover:-translate-y-px">
                {lang === 'en' ? 'Log in' : 'Connexion'}
              </Link>
              <Link href="/generate" style={BTN_PRIMARY} className="hover:-translate-y-0.5 hover:shadow-xl">
                {t(lang, 'navStartFree')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full transition-colors"
            style={{
              background: 'rgba(29,78,216,0.06)',
              border: '1px solid rgba(29,78,216,0.18)',
              WebkitTapHighlightColor: 'transparent',
            }}
            onClick={() => setOpen(prev => !prev)}
          >
            {/* Animated hamburger → X — no label/input trick, plain SVG only */}
            <svg
              width="20" height="20" viewBox="0 0 20 20"
              fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="5" x2="17" y2="5"
                style={{
                  transformOrigin: '10px 5px',
                  transform: open ? 'translateY(5px) rotate(45deg)' : 'none',
                  transition: 'transform 0.25s ease',
                }}
              />
              <line x1="3" y1="10" x2="17" y2="10"
                style={{
                  opacity: open ? 0 : 1,
                  transition: 'opacity 0.15s ease',
                }}
              />
              <line x1="3" y1="15" x2="17" y2="15"
                style={{
                  transformOrigin: '10px 15px',
                  transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none',
                  transition: 'transform 0.25s ease',
                }}
              />
            </svg>
          </button>

          <SheetContent
            showClose={false}
            side="left"
            className="gap-0 p-0"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRight: '1px solid rgba(29,78,216,0.10)',
            }}
          >
            {/* Logo */}
            <div
              className="flex items-center gap-2 px-5 py-4 shrink-0"
              style={{ borderBottom: '1px solid rgba(29,78,216,0.08)' }}
            >
              <Logo size={24} />
              <span className="text-base font-extrabold" style={{ color: '#1d4ed8' }}>CVAdapt</span>
            </div>

            {/* Language toggle */}
            <div className="flex justify-center py-3 shrink-0" style={{ borderBottom: '1px solid rgba(29,78,216,0.08)' }}>
              <LangToggle compact currentLang={lang} />
            </div>

            {/* Nav links — fills remaining space, scrollable if needed */}
            <div className="flex-1 grid gap-y-1 overflow-y-auto px-4 pt-4 pb-4 content-start">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
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
              className="shrink-0 p-4 gap-2 border-t mt-0"
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
                    {t(lang, 'navMySpace')}
                  </Link>
                  <Link
                    href="/generate"
                    className="flex items-center justify-center w-full py-3 text-sm font-bold rounded-full transition-all hover:-translate-y-0.5"
                    style={BTN_PRIMARY}
                    onClick={() => setOpen(false)}
                  >
                    {t(lang, 'navGenerateCTA')}
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
                    {lang === 'en' ? 'Log in' : 'Connexion'}
                  </Link>
                  <Link
                    href="/generate"
                    className="flex items-center justify-center w-full py-3 text-sm font-bold rounded-full transition-all hover:-translate-y-0.5"
                    style={BTN_PRIMARY}
                    onClick={() => setOpen(false)}
                  >
                    {t(lang, 'navStartFree')}
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
