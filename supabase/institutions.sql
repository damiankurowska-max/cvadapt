-- ============================================================
-- CVAdapt — Module Établissements (B2B)
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Table principale des établissements
CREATE TABLE IF NOT EXISTS institutions (
  id                     UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                   TEXT NOT NULL,
  slug                   TEXT NOT NULL UNIQUE,
  type                   TEXT NOT NULL DEFAULT 'bts',
  -- starter=990€/an (300 CV/mois), pro=1990€/an (1000), campus=3990€/an (illimité)
  plan                   TEXT NOT NULL DEFAULT 'starter',
  quota_monthly          INTEGER NOT NULL DEFAULT 300,
  cv_used_this_month     INTEGER NOT NULL DEFAULT 0,
  month_key              TEXT NOT NULL DEFAULT '',          -- ex: "2026-06"
  admin_user_id          TEXT NOT NULL,                     -- Clerk user ID de l'admin
  admin_email            TEXT NOT NULL,
  stripe_subscription_id TEXT,
  stripe_customer_id     TEXT,
  active                 BOOLEAN NOT NULL DEFAULT false,    -- true après paiement
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Table des membres (étudiants rattachés à un établissement)
CREATE TABLE IF NOT EXISTS institution_members (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  user_id        TEXT NOT NULL,                             -- Clerk user ID
  email          TEXT,
  joined_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(institution_id, user_id)
);

-- Colonne optionnelle dans cv_history pour lier un CV à un établissement
ALTER TABLE cv_history ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES institutions(id);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_institution_members_user    ON institution_members(user_id);
CREATE INDEX IF NOT EXISTS idx_institution_members_inst    ON institution_members(institution_id);
CREATE INDEX IF NOT EXISTS idx_cv_history_institution      ON cv_history(institution_id);
CREATE INDEX IF NOT EXISTS idx_institutions_slug           ON institutions(slug);

-- RLS : désactivé (accès uniquement via service role côté API Next.js)
ALTER TABLE institutions        DISABLE ROW LEVEL SECURITY;
ALTER TABLE institution_members DISABLE ROW LEVEL SECURITY;
