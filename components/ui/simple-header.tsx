'use client';

import React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { MenuToggle } from '@/components/ui/menu-toggle';
import Logo from '@/app/components/Logo';

const NAV_LINKS = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },
];

export function SimpleHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderColor: '#e0ecff',
      }}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo size={28} />
          <span className="text-lg font-extrabold" style={{ color: '#1d4ed8' }}>CVAdapt</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-blue-50"
              style={{ color: '#4b5563' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-semibold rounded-lg border transition-colors hover:bg-gray-50"
              style={{ color: '#374151', borderColor: '#d1d5db' }}
            >
              Connexion
            </Link>
            <Link
              href="/generate"
              className="px-5 py-2 text-sm font-bold text-white rounded-full transition-all hover:-translate-y-0.5"
              style={{
                background: '#1d4ed8',
                boxShadow: '0 4px 14px rgba(29,78,216,0.3)',
              }}
            >
              Commencer — Gratuit
            </Link>
          </div>
        </div>

        {/* Mobile burger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#d1d5db' }}
            onClick={() => setOpen(!open)}
          >
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-6"
              stroke="#374151"
            />
          </button>

          <SheetContent
            showClose={false}
            side="left"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(14px)' }}
          >
            {/* Logo in drawer */}
            <div className="flex items-center gap-2 border-b px-4 py-4" style={{ borderColor: '#e0ecff' }}>
              <Logo size={24} />
              <span className="text-base font-extrabold" style={{ color: '#1d4ed8' }}>CVAdapt</span>
            </div>

            <div className="grid gap-y-1 overflow-y-auto px-3 pt-4 pb-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors hover:bg-blue-50"
                  style={{ color: '#374151' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <SheetFooter style={{ borderColor: '#e0ecff', background: '#f8faff' }}>
              <Link
                href="/sign-in"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold rounded-lg border transition-colors hover:bg-gray-50"
                style={{ color: '#374151', borderColor: '#d1d5db' }}
                onClick={() => setOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/generate"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: '#1d4ed8', boxShadow: '0 4px 14px rgba(29,78,216,0.3)' }}
                onClick={() => setOpen(false)}
              >
                Commencer — Gratuit
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
