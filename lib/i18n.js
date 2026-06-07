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
