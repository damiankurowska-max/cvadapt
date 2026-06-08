/**
 * CVAdapt — Internationalization strings
 * Usage: import { t } from "@/lib/i18n"; then t(lang, "key")
 */

export const TRANSLATIONS = {
  fr: {
    // Generate page — header
    history: "Historique",
    remaining: "restants",
    free: "gratuits",
    upgradePro: "Passer Pro",

    // Generate page — wizard steps
    step1: "L'offre",
    step2: "Ton profil",
    step3: "Génération",

    // Generate page — step 1
    step1Title: "Quelle offre cibles-tu ?",
    step1Subtitle: "Sélectionne un design de CV, puis colle l'offre d'emploi.",
    cvDesign: "Design du CV",
    jobOffer: "Offre d'emploi",
    jobOfferPlaceholder: "Colle l'offre d'emploi ici (LinkedIn, Indeed, APEC...)",
    jobOfferHint: "Plus tu colles d'infos, plus le CV sera précis.",
    nextStep: "Étape suivante →",

    // Generate page — step 2
    step2Title: "Ton profil",
    step2Subtitle: "Ces infos seront intégrées intelligemment dans ton CV.",
    fullName: "Nom complet",
    fullNamePlaceholder: "Marie Dupont",
    email: "Email",
    emailPlaceholder: "marie@email.fr",
    phone: "Téléphone",
    phonePlaceholder: "+33 6 12 34 56 78",
    experience: "Expérience professionnelle",
    experiencePlaceholder: "Stage chez X (2023) — analyse de données, Python, SQL\nAlternance chez Y (2022) — développement React...",
    experienceHint: "Titre du poste, entreprise, dates, missions principales.",
    skills: "Compétences",
    skillsPlaceholder: "Python, SQL, Excel, PowerBI, Gestion de projet, Agile...",
    skillsHint: "Techniques, outils, langues, certifications.",
    education: "Formation",
    educationPlaceholder: "Master Finance — Paris Dauphine (2024)\nBachelor Éco — Sorbonne (2022)",
    educationHint: "Diplôme, établissement, année d'obtention.",
    photo: "Photo (optionnel)",
    addPhoto: "Ajouter une photo",
    changePhoto: "Changer la photo",
    withCoverLetter: "Inclure une lettre de motivation",

    // Generate page — step 2 back / submit
    back: "← Retour",
    generateBtn: "Générer mon CV →",
    generatingBtn: "Génération en cours...",

    // Generate page — result
    myCV: "Mon CV",
    coverLetter: "Lettre de motivation",
    downloadPDF: "Télécharger le PDF",
    generateNew: "Nouveau CV",
    atsScore: "Score ATS",
    atsAnalyzing: "Analyse ATS en cours...",

    // Generate page — limits
    limit3: "Tu as utilisé tes 3 CV gratuits.",
    limit15: "Tu as atteint les 15 CV de ce mois (plan Étudiant).",
    viewPlans: "Voir les abonnements →",
    upgradeToPro: "Passer au plan Pro →",

    // Generate page — errors
    errorGeneric: "Une erreur est survenue, réessaie.",
    errorRequired: "L'offre et le nom sont requis.",

    // Generate page — history
    historyTitle: "Tes CV générés",
    historyEmpty: "Aucun CV dans l'historique pour l'instant.",
    historyReview: "Revoir →",

    // Generate page — upsell
    upsellTitle: "Débloquer plus de CV",

    // ATS
    atsTitle: "Analyse ATS",
    atsMissing: "Mots-clés manquants",

    // Cover letter
    generateLM: "Générer la lettre de motivation",
    generatingLM: "Génération en cours...",

    // Step 3 — summary / confirm
    step3Title: "Presque prêt !",
    step3Subtitle: "Vérifie le récapitulatif, puis génère ton CV.",
    selectedDesign: "Design sélectionné",
    targetOffer: "Offre cible",
    candidate: "Candidat",
    coverLetterLabel: "Générer aussi une lettre de motivation",
    coverLetterSubtitle: "Adaptée à l'offre, personnalisée, prête à envoyer",
    generateBtnWithLM: "Générer CV + lettre de motivation",
    generatingBtnWithLM: "Génération en cours…",

    // Result page
    cvReady: "Ton CV est prêt !",
    cvAndLMReady: "CV + Lettre générés !",
    adaptedToOffer: "Adapté à l'offre · Optimisé pour les recruteurs",
    newCV: "← Nouveau",

    // Tabs
    tabCV: "📄 CV",
    tabLM: "✉️ Lettre de motivation",
    tabATS: "🎯 Score ATS",
    previewCV: "Aperçu du CV",
    previewLM: "Aperçu de la lettre",
    previewATS: "Analyse ATS",

    // ATS detail
    atsCompatibility: "Score de compatibilité ATS",
    atsBasedOn: "Basé sur les mots-clés et les compétences",
    atsStrengths: "Points forts de ton profil",
    atsRecommendations: "Recommandations",
    atsNotAvailable: "Analyse ATS non disponible",
    atsComparison: "Comparaison avec l'offre",

    // Misc form hints / labels
    photoHint: "Optionnel · courant en France",
    emailHint: "Coordonnées CV",
    phoneHint: "Optionnel",
    addCoverLetterTitle: "Ajoute une lettre de motivation",
    addCoverLetterSubtitle: "Adaptée à cette offre · Prête en 20 secondes",
    continueBtn: "Continuer",
    deletePhoto: "Supprimer",
    generateWithLMBtn: "Génération CV + lettre…",
    tabLMLoading: "✉️ Lettre de motivation ⏳",

    // Homepage
    homeHeroBadge: "CV optimisés aujourd'hui · Gratuit pour commencer",
    homeH1Part1: "Tu postules. Tu n'as pas de réponse.",
    homeH1Part2: "C'est l'ATS — pas ton profil. 🎯",
    homeSubBold: "75% des CV sont filtrés automatiquement",
    homeSubRest: " avant d'être lus par un humain. CVAdapt analyse l'offre, intègre les bons mots-clés et génère ton CV optimisé en 30 secondes — gratuitement.",
    homePrimaryCTA: "Générer mon CV — C'est gratuit 🚀",
    homePerkNoCB: "Sans carte bancaire",
    homePerk30s: "30 secondes",
    homePerk3: "3 CV gratuits",
    homeUsersRating: "étudiants · ⭐ 4,9/5",
    homeCompaniesLabel: "Ils ont décroché des postes chez",
    homeHowLabel: "Simple",
    homeHowTitle: "3 étapes. 30 secondes.",
    homeStep1Title: "Colle l'offre",
    homeStep1Desc: "Copie n'importe quelle offre depuis LinkedIn, Indeed, APEC…",
    homeStep2Title: "Entre tes infos",
    homeStep2Desc: "Ton expérience, tes compétences, ta formation en quelques lignes.",
    homeStep3Title: "Reçois ton CV",
    homeStep3Desc: "Score ATS, mots-clés intégrés, CV PDF prêt à envoyer.",
    homeTryFreeBtn: "Essayer gratuitement 🎓",
    homeResultsLabel: "Résultat concret",
    homeBeforeAfterTitle: "Avant / Après CVAdapt",
    homeGenericCVLabel: "CV générique",
    homeATSScoreWeak: "Score ATS : Faible",
    homeFilteredAuto: "Filtré automatiquement",
    homeMissingKW: "Mots-clés manquants",
    homeBasicStr: "Structure basique",
    homeIgnoredATS: "Ignoré par l'ATS",
    homeOptimizedCVLabel: "CV optimisé par CVAdapt",
    homeATSExcellent: "Score ATS : Excellent",
    homeInterviewDays: "🎯 Entretien décroché en 3 jours",
    homeAllKW: "Tous les mots-clés intégrés",
    homeOptimizedStr: "Structure optimisée",
    homeReadByHuman: "Lu par un humain",
    homeTestimonialsTitle: "Ce qu'ils disent après leur premier CV",
    homeTestimonialsSubtitle: "Stages, alternances, premiers emplois · France 🇫🇷",
    homePricingLabel: "Tarifs",
    homePricingTitle: "Prix pensés pour les étudiants",
    homePricingSubtitle: "Sans engagement · Annule quand tu veux",
    homePlanFree: "Gratuit",
    homePlanFreeForever: "pour toujours",
    homePlanStudent: "Étudiant",
    homePlanPro: "Pro",
    homePlanPopular: "⭐ Populaire",
    homePerMonth: "/mois",
    homeStartBtn: "Commencer",
    homeChooseStudentBtn: "Choisir Étudiant →",
    homeChooseProBtn: "Choisir Pro →",
    homeSatisfied7: "Satisfait ou remboursé sous 7 jours",
    homeFreeF1: "3 CV à vie (non renouvelables)",
    homeFreeF2: "4 templates",
    homeFreeF3: "Téléchargement PDF",
    homeFreeF4: "Score ATS complet",
    homeFreeF5: "Lettre de motivation",
    homeStudentF1: "15 CV par mois",
    homeStudentF2: "Score ATS complet",
    homeStudentF3: "4 templates",
    homeStudentF4: "Lettre de motivation",
    homeStudentF5: "Mots-clés automatiques",
    homeStudentF6: "Support prioritaire",
    homeProF1: "CV illimités",
    homeProF2: "Score ATS complet",
    homeProF3: "4 templates",
    homeProF4: "Lettre de motivation",
    homeProF5: "Conseils personnalisés",
    homeProF6: "Support prioritaire",
    homeFAQTitle: "Questions fréquentes",
    homeFAQ1Q: "C'est vraiment gratuit pour commencer ?",
    homeFAQ1A: "Oui. Tu génères 3 CV complets gratuitement, sans carte bancaire. Le plan Étudiant à 4,99€/mois débloque 15 CV par mois avec score ATS et lettre de motivation.",
    homeFAQ2Q: "Ça marche sans expérience professionnelle ?",
    homeFAQ2A: "Oui, c'est fait pour ça. CVAdapt met en avant tes projets universitaires, stages, associations et compétences dans le format que les recruteurs attendent.",
    homeFAQ3Q: "CVAdapt fonctionne pour les stages et alternances ?",
    homeFAQ3A: "Oui — c'est même son point fort. Il analyse l'offre de stage ou d'alternance et adapte ton CV aux mots-clés exacts de chaque entreprise.",
    homeFAQ4Q: "Mes données sont-elles en sécurité ?",
    homeFAQ4A: "Oui. Ton contenu est utilisé uniquement pour générer le CV, puis supprimé. Paiement sécurisé via Stripe. Aucune donnée vendue.",
    homeFAQ5Q: "En combien de temps j'obtiens mon CV ?",
    homeFAQ5A: "Moins de 30 secondes. Tu colles l'offre, tu entres tes infos, et tu reçois ton CV optimisé avec score ATS et mots-clés intégrés.",
    homeFinalTitle1: "3 CV gratuits. Aucune carte.",
    homeFinalTitle2: "Résultat en 30 secondes.",
    homeFinalUsedBy: "étudiants l'ont utilisé pour décrocher leurs entretiens.",
    homeFinalCTABtn: "🎯 Générer mon CV gratuitement →",
    homeNewsletterTitle: "Reçois des conseils emploi chaque semaine",
    homeNewsletterSuccess: "✓ Merci, tu es inscrit !",
    homeNewsletterPlaceholder: "ton@email.fr",
    homeNewsletterBtn: "S'inscrire",
    homeFooterGenerate: "Générer un CV",
    homeFooterAnalyze: "Analyser mon CV",
    homeFooterLegal: "Mentions légales",
    homeFooterCopyright: "© 2026 CVAdapt 🇫🇷",
    navFeatures: "Fonctionnalités",
    navPricing: "Tarifs",
    navMySpace: "Mon espace",
    navGenerateCTA: "Générer un CV →",
    navStartFree: "Commencer — Gratuit",
  },

  en: {
    // Generate page — header
    history: "History",
    remaining: "remaining",
    free: "free",
    upgradePro: "Go Pro",

    // Generate page — wizard steps
    step1: "Job posting",
    step2: "Your profile",
    step3: "Generate",

    // Generate page — step 1
    step1Title: "Which job are you targeting?",
    step1Subtitle: "Choose a resume template, then paste the job posting.",
    cvDesign: "Resume template",
    jobOffer: "Job posting",
    jobOfferPlaceholder: "Paste the job posting here (LinkedIn, Indeed, Glassdoor...)",
    jobOfferHint: "The more details you provide, the more accurate your resume will be.",
    nextStep: "Next step →",

    // Generate page — step 2
    step2Title: "Your profile",
    step2Subtitle: "This information will be intelligently integrated into your resume.",
    fullName: "Full name",
    fullNamePlaceholder: "John Smith",
    email: "Email",
    emailPlaceholder: "john@email.com",
    phone: "Phone",
    phonePlaceholder: "+1 555 123 4567",
    experience: "Work experience",
    experiencePlaceholder: "Intern at X (2023) — data analysis, Python, SQL\nCoordinator at Y (2022) — React development...",
    experienceHint: "Job title, company, dates, key responsibilities.",
    skills: "Skills",
    skillsPlaceholder: "Python, SQL, Excel, PowerBI, Project Management, Agile...",
    skillsHint: "Technical skills, tools, languages, certifications.",
    education: "Education",
    educationPlaceholder: "MBA — Columbia Business School (2024)\nBS Economics — NYU (2022)",
    educationHint: "Degree, institution, graduation year.",
    photo: "Photo (optional)",
    addPhoto: "Add a photo",
    changePhoto: "Change photo",
    withCoverLetter: "Include a cover letter",

    // Generate page — step 2 back / submit
    back: "← Back",
    generateBtn: "Generate my resume →",
    generatingBtn: "Generating...",

    // Generate page — result
    myCV: "My Resume",
    coverLetter: "Cover letter",
    downloadPDF: "Download PDF",
    generateNew: "New resume",
    atsScore: "ATS Score",
    atsAnalyzing: "ATS analysis running...",

    // Generate page — limits
    limit3: "You've used your 3 free resumes.",
    limit15: "You've reached the 15 resumes limit for this month (Student plan).",
    viewPlans: "See plans →",
    upgradeToPro: "Upgrade to Pro →",

    // Generate page — errors
    errorGeneric: "Something went wrong, please try again.",
    errorRequired: "Job posting and name are required.",

    // Generate page — history
    historyTitle: "Your generated resumes",
    historyEmpty: "No resumes in history yet.",
    historyReview: "Review →",

    // Generate page — upsell
    upsellTitle: "Unlock more resumes",

    // ATS
    atsTitle: "ATS Analysis",
    atsMissing: "Missing keywords",

    // Cover letter
    generateLM: "Generate cover letter",
    generatingLM: "Generating...",

    // Step 3 — summary / confirm
    step3Title: "Almost ready!",
    step3Subtitle: "Review the summary, then generate your resume.",
    selectedDesign: "Selected template",
    targetOffer: "Target job",
    candidate: "Candidate",
    coverLetterLabel: "Also generate a cover letter",
    coverLetterSubtitle: "Tailored to the job, personalized, ready to send",
    generateBtnWithLM: "Generate resume + cover letter",
    generatingBtnWithLM: "Generating…",

    // Result page
    cvReady: "Your resume is ready!",
    cvAndLMReady: "Resume + Cover letter generated!",
    adaptedToOffer: "Tailored to the job · Optimized for recruiters",
    newCV: "← New",

    // Tabs
    tabCV: "📄 Resume",
    tabLM: "✉️ Cover letter",
    tabATS: "🎯 ATS Score",
    previewCV: "Resume preview",
    previewLM: "Cover letter preview",
    previewATS: "ATS analysis",

    // ATS detail
    atsCompatibility: "ATS Compatibility Score",
    atsBasedOn: "Based on keywords, experience and skills",
    atsStrengths: "Your profile strengths",
    atsRecommendations: "Recommendations to improve",
    atsNotAvailable: "ATS analysis not available",
    atsComparison: "Comparing with the job posting",

    // Misc form hints / labels
    photoHint: "Optional · common in Europe",
    emailHint: "Resume contact info",
    phoneHint: "Optional",
    addCoverLetterTitle: "Add a cover letter",
    addCoverLetterSubtitle: "Tailored to this job · Ready in 20 seconds",
    continueBtn: "Continue",
    deletePhoto: "Remove",
    generateWithLMBtn: "Generating resume + letter…",
    tabLMLoading: "✉️ Cover letter ⏳",

    // Homepage
    homeHeroBadge: "resumes optimized today · Free to start",
    homeH1Part1: "You apply. You get no response.",
    homeH1Part2: "It's the ATS — not your profile. 🎯",
    homeSubBold: "75% of resumes are filtered automatically",
    homeSubRest: " before being read by a human. CVAdapt analyzes the posting, integrates the right keywords and generates your optimized resume in 30 seconds — for free.",
    homePrimaryCTA: "Generate my resume — It's free 🚀",
    homePerkNoCB: "No credit card",
    homePerk30s: "30 seconds",
    homePerk3: "3 free resumes",
    homeUsersRating: "students · ⭐ 4.9/5",
    homeCompaniesLabel: "They landed positions at",
    homeHowLabel: "Simple",
    homeHowTitle: "3 steps. 30 seconds.",
    homeStep1Title: "Paste the job post",
    homeStep1Desc: "Copy any job from LinkedIn, Indeed, Glassdoor…",
    homeStep2Title: "Enter your info",
    homeStep2Desc: "Your experience, skills, and education in a few lines.",
    homeStep3Title: "Get your resume",
    homeStep3Desc: "ATS score, integrated keywords, print-ready PDF.",
    homeTryFreeBtn: "Try for free 🎓",
    homeResultsLabel: "Concrete results",
    homeBeforeAfterTitle: "Before / After CVAdapt",
    homeGenericCVLabel: "Generic resume",
    homeATSScoreWeak: "ATS Score: Low",
    homeFilteredAuto: "Filtered automatically",
    homeMissingKW: "Missing keywords",
    homeBasicStr: "Basic structure",
    homeIgnoredATS: "Ignored by ATS",
    homeOptimizedCVLabel: "Resume optimized by CVAdapt",
    homeATSExcellent: "ATS Score: Excellent",
    homeInterviewDays: "🎯 Interview secured in 3 days",
    homeAllKW: "All keywords integrated",
    homeOptimizedStr: "Optimized structure",
    homeReadByHuman: "Read by a recruiter",
    homeTestimonialsTitle: "What they say after their first resume",
    homeTestimonialsSubtitle: "Internships, apprenticeships, first jobs · France 🇫🇷",
    homePricingLabel: "Pricing",
    homePricingTitle: "Plans built for students",
    homePricingSubtitle: "No commitment · Cancel anytime",
    homePlanFree: "Free",
    homePlanFreeForever: "forever",
    homePlanStudent: "Student",
    homePlanPro: "Pro",
    homePlanPopular: "⭐ Popular",
    homePerMonth: "/month",
    homeStartBtn: "Start",
    homeChooseStudentBtn: "Choose Student →",
    homeChooseProBtn: "Choose Pro →",
    homeSatisfied7: "Satisfied or refunded within 7 days",
    homeFreeF1: "3 resumes lifetime (non-renewable)",
    homeFreeF2: "4 templates",
    homeFreeF3: "PDF download",
    homeFreeF4: "Full ATS score",
    homeFreeF5: "Cover letter",
    homeStudentF1: "15 resumes per month",
    homeStudentF2: "Full ATS score",
    homeStudentF3: "4 templates",
    homeStudentF4: "Cover letter",
    homeStudentF5: "Auto keywords",
    homeStudentF6: "Priority support",
    homeProF1: "Unlimited resumes",
    homeProF2: "Full ATS score",
    homeProF3: "4 templates",
    homeProF4: "Cover letter",
    homeProF5: "Personalized tips",
    homeProF6: "Priority support",
    homeFAQTitle: "Frequently asked questions",
    homeFAQ1Q: "Is it really free to start?",
    homeFAQ1A: "Yes. You generate 3 full resumes for free, no credit card needed. The Student plan at €4.99/month unlocks 15 resumes/month with full ATS score and cover letter.",
    homeFAQ2Q: "Does it work without professional experience?",
    homeFAQ2A: "Yes, that's exactly what it's built for. CVAdapt highlights your university projects, internships, clubs and skills in the format recruiters expect.",
    homeFAQ3Q: "Does CVAdapt work for internships and apprenticeships?",
    homeFAQ3A: "Yes — that's its strength. It analyzes the internship posting and tailors your resume to the exact keywords of each company.",
    homeFAQ4Q: "Is my data safe?",
    homeFAQ4A: "Yes. Your content is used only to generate the resume, then deleted. Payments secured via Stripe. No data sold.",
    homeFAQ5Q: "How long does it take to get my resume?",
    homeFAQ5A: "Under 30 seconds. You paste the job post, enter your info, and receive your optimized resume with ATS score and integrated keywords.",
    homeFinalTitle1: "3 free resumes. No card required.",
    homeFinalTitle2: "Results in 30 seconds.",
    homeFinalUsedBy: "students used it to land their interviews.",
    homeFinalCTABtn: "🎯 Generate my resume for free →",
    homeNewsletterTitle: "Get weekly job search tips",
    homeNewsletterSuccess: "✓ Thanks, you're subscribed!",
    homeNewsletterPlaceholder: "your@email.com",
    homeNewsletterBtn: "Subscribe",
    homeFooterGenerate: "Generate a resume",
    homeFooterAnalyze: "Analyze my resume",
    homeFooterLegal: "Legal notice",
    homeFooterCopyright: "© 2026 CVAdapt",
    navFeatures: "Features",
    navPricing: "Pricing",
    navMySpace: "My account",
    navGenerateCTA: "Generate CV →",
    navStartFree: "Start — Free",
  },
};

/** Get a translation string */
export function t(lang, key) {
  const locale = lang === "en" ? "en" : "fr";
  return TRANSLATIONS[locale][key] ?? TRANSLATIONS["fr"][key] ?? key;
}

/** Read language from localStorage (safe for SSR) */
export function getLang() {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem("cvadapt_lang");
  return saved === "en" ? "en" : "fr";
}
