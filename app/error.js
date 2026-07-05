'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[CVAdapt] Unhandled error:', error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f6ff',
        fontFamily: 'var(--font-outfit, system-ui, sans-serif)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '48px 40px',
          boxShadow: '0 4px 24px rgba(29,78,216,0.08)',
          border: '1px solid rgba(29,78,216,0.08)',
          maxWidth: 480,
          width: '100%',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#1e3a8a',
            marginBottom: 8,
          }}
        >
          Une erreur est survenue
        </h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
          La page a rencontré un problème inattendu. Tu peux réessayer ou revenir à l&apos;accueil.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 9999,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
          <Link
            href="/"
            style={{
              background: 'rgba(29,78,216,0.06)',
              border: '1px solid rgba(29,78,216,0.18)',
              color: '#1d4ed8',
              borderRadius: 9999,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
