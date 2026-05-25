/**
 * Traductions CVAdapt — FR / EN
 * Usage : const t = useTranslations();  puis t("hero.title")
 */

export const translations = {
  fr: {
    nav: {
      features: "Fonctionnalités",
      pricing: "Tarifs",
      blog: "Blog",
      login: "Connexion",
      start: "Commencer gratuitement",
    },
    hero: {
      badge: "✨ Gratuit pour les étudiants — Sans CB",
      title: "Ton CV adapté à chaque offre en",
      titleHighlight: "30 secondes",
      subtitle: "75% des CV sont rejetés par les ATS avant d'être lus par un humain. CVAdapt analyse l'offre, optimise ton CV et le rend indétectable aux filtres.",
      cta: "Générer mon CV gratuitement →",
      ctaSub: "3 CV gratuits · Aucune CB requise",
    },
    stats: {
      users: "étudiants utilisateurs",
      cvsToday: "CV générés aujourd'hui",
      atsScore: "score ATS moyen",
    },
    features: {
      title: "Tout ce dont tu as besoin pour décrocher un entretien",
      ats: {
        title: "Score ATS instantané",
        desc: "Vois exactement pourquoi ton CV est rejeté et quels mots-clés ajouter.",
      },
      cv: {
        title: "CV adapté en 30 sec",
        desc: "CVAdapt réécrit ton CV pour matcher l'offre avec les mots-clés exacts.",
      },
      lm: {
        title: "Lettre de motivation IA",
        desc: "Génère une lettre personnalisée et convaincante en quelques clics.",
      },
    },
    pricing: {
      title: "Commence gratuitement. Upgrade quand tu veux.",
      free: {
        name: "Gratuit",
        price: "0€",
        period: "pour toujours",
        features: ["3 CV complets", "Score ATS basique", "Export PDF"],
        cta: "Commencer gratuitement",
      },
      student: {
        name: "Étudiant",
        badge: "⭐ Populaire",
        price: "4,99€",
        period: "/mois",
        features: ["15 CV/mois", "Score ATS complet", "Lettre de motivation", "Mots-clés manquants"],
        cta: "Choisir Étudiant",
      },
      pro: {
        name: "Pro",
        price: "9,99€",
        period: "/mois",
        features: ["CV illimités", "Tout Étudiant inclus", "Accès prioritaire", "Templates premium"],
        cta: "Choisir Pro",
      },
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "C'est vraiment gratuit pour commencer ?", a: "Oui. Tu génères 3 CV complets gratuitement, sans carte bancaire. Le plan Étudiant à 4,99€/mois débloque 15 CV par mois avec score ATS et lettre de motivation." },
        { q: "Ça marche sans expérience professionnelle ?", a: "Oui, c'est fait pour ça. CVAdapt met en avant tes projets universitaires, stages, associations et compétences dans le format que les recruteurs attendent." },
        { q: "CVAdapt fonctionne pour les stages et alternances ?", a: "Oui — c'est même son point fort. Il analyse l'offre de stage ou d'alternance et adapte ton CV aux mots-clés exacts de chaque entreprise." },
        { q: "Mes données sont-elles en sécurité ?", a: "Oui. Ton contenu est utilisé uniquement pour générer le CV, puis supprimé. Paiement sécurisé via Stripe. Aucune donnée vendue." },
        { q: "En combien de temps j'obtiens mon CV ?", a: "Moins de 30 secondes. Tu colles l'offre, tu entres tes infos, et tu reçois ton CV optimisé avec score ATS et mots-clés intégrés." },
      ],
    },
    footer: {
      tagline: "Fait en France 🇫🇷",
      legal: "Mentions légales",
      cgu: "CGU",
      contact: "Contact",
    },
  },

  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      blog: "Blog",
      login: "Log in",
      start: "Start for free",
    },
    hero: {
      badge: "✨ Free for students — No credit card",
      title: "Your CV tailored to every job offer in",
      titleHighlight: "30 seconds",
      subtitle: "75% of CVs are rejected by ATS filters before a human ever reads them. CVAdapt analyzes the job posting, optimizes your CV and makes it ATS-proof.",
      cta: "Generate my CV for free →",
      ctaSub: "3 free CVs · No credit card required",
    },
    stats: {
      users: "student users",
      cvsToday: "CVs generated today",
      atsScore: "average ATS score",
    },
    features: {
      title: "Everything you need to land an interview",
      ats: {
        title: "Instant ATS score",
        desc: "See exactly why your CV gets rejected and which keywords to add.",
      },
      cv: {
        title: "Tailored CV in 30 sec",
        desc: "CVAdapt rewrites your CV to match the job with the exact right keywords.",
      },
      lm: {
        title: "AI cover letter",
        desc: "Generate a personalized, compelling cover letter in just a few clicks.",
      },
    },
    pricing: {
      title: "Start free. Upgrade whenever you want.",
      free: {
        name: "Free",
        price: "€0",
        period: "forever",
        features: ["3 complete CVs", "Basic ATS score", "PDF export"],
        cta: "Start for free",
      },
      student: {
        name: "Student",
        badge: "⭐ Popular",
        price: "€4.99",
        period: "/month",
        features: ["15 CVs/month", "Full ATS score", "Cover letter", "Missing keywords"],
        cta: "Choose Student",
      },
      pro: {
        name: "Pro",
        price: "€9.99",
        period: "/month",
        features: ["Unlimited CVs", "Everything in Student", "Priority access", "Premium templates"],
        cta: "Choose Pro",
      },
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "Is it really free to start?", a: "Yes. You generate 3 complete CVs for free, with no credit card. The Student plan at €4.99/month unlocks 15 CVs per month with full ATS score and cover letter." },
        { q: "Does it work without professional experience?", a: "Yes, it's designed for that. CVAdapt highlights your university projects, internships, and skills in the format recruiters expect." },
        { q: "Does CVAdapt work for internships?", a: "Yes — that's actually its strongest point. It analyzes the internship posting and tailors your CV to the exact keywords each company is looking for." },
        { q: "Is my data secure?", a: "Yes. Your content is only used to generate the CV, then deleted. Payments are secured via Stripe. No data is sold." },
        { q: "How quickly do I get my CV?", a: "Under 30 seconds. Paste the job posting, enter your info, and receive your optimized CV with ATS score and keywords integrated." },
      ],
    },
    footer: {
      tagline: "Made in France 🇫🇷",
      legal: "Legal notice",
      cgu: "Terms of use",
      contact: "Contact",
    },
  },
};

/**
 * Hook côté client : retourne les traductions de la langue active
 * Usage dans un composant "use client" :
 *   const t = useTranslations();
 *   return <h1>{t.hero.title}</h1>
 */
export function getTranslations(lang = "fr") {
  return translations[lang] || translations["fr"];
}
