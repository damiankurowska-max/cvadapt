export const articles = [
  {
    slug: "comment-faire-un-cv-en-2025",
    titre: "Comment faire un CV en 2025 qui attire les recruteurs",
    description: "En 2025, 75% des CV ne sont jamais lus par un humain. Ce guide te montre exactement quoi mettre, où et comment pour être rappelé — en moins de 10 minutes.",
    date: "2025-05-01",
    categorie: "Conseils CV",
    tempsLecture: "4 min",
    illustration: "📄",
    couleur: "from-blue-500 to-blue-700",
    contenu: `
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">📊 Le chiffre clé</p>
  <p style="color:#1d4ed8;margin:0;font-size:15px">Un recruteur passe <strong>7 secondes</strong> sur un CV. Ton CV doit convaincre immédiatement.</p>
</div>

<h2>La structure idéale ✅</h2>

<div style="display:grid;gap:12px;margin:20px 0">
  ${["🎯 Profil — 3 phrases qui résument ta valeur", "💼 Expériences — du plus récent au plus ancien + résultats chiffrés", "🛠 Compétences — adaptées à l'offre", "🎓 Formation — diplôme, établissement, année"].map((item, i) => `
  <div style="display:flex;align-items:center;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px">
    <div style="width:28px;height:28px;background:#2563eb;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">${i + 1}</div>
    <span style="font-size:15px;color:#111827">${item}</span>
  </div>`).join("")}
</div>

<h2>❌ vs ✅ — Les formulations qui font la différence</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px">
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:12px 16px;text-align:left;color:#ef4444;border:1px solid #e5e7eb">❌ Évite</th>
      <th style="padding:12px 16px;text-align:left;color:#16a34a;border:1px solid #e5e7eb">✅ Préfère</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ["Responsable des ventes", "Développement du CA de +40% en 12 mois"],
      ["Service client", "Satisfaction client 96% sur 200+ interactions/mois"],
      ["Gestion de projets", "5 projets livrés dans les délais, budget -15%"],
      ["Dynamique et motivé", "Commercial B2B, 120% des objectifs atteints"],
    ].map(([bad, good]) => `
    <tr>
      <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#374151">${bad}</td>
      <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#374151;font-weight:500">${good}</td>
    </tr>`).join("")}
  </tbody>
</table>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 4px 0">💡 L'astuce CVAdapt</p>
  <p style="color:#166534;margin:0;font-size:14px">Colle ton offre d'emploi dans CVAdapt — l'IA intègre automatiquement les bons mots-clés dans ton CV en 30 secondes.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#2563eb;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon CV maintenant →</a>
</div>
    `,
  },
  {
    slug: "cv-ats-passer-les-filtres-automatiques",
    titre: "CV ATS : comment passer les filtres automatiques des recruteurs",
    description: "80% des CV sont éliminés par un algorithme avant qu'un humain les voie. Ces 5 règles simples garantissent que le tien passe — vérifiées sur +1 000 candidatures réelles.",
    date: "2025-05-02",
    categorie: "CV ATS",
    tempsLecture: "3 min",
    illustration: "🤖",
    couleur: "from-purple-500 to-purple-700",
    contenu: `
<div style="background:#faf5ff;border-left:4px solid #7c3aed;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#6d28d9;margin:0 0 4px 0">🤖 C'est quoi un ATS ?</p>
  <p style="color:#5b21b6;margin:0;font-size:15px">Un logiciel qui trie les CV <strong>avant</strong> qu'un humain les lise. Si ton CV ne passe pas, personne ne le verra jamais.</p>
</div>

<h2>Les 5 règles d'un CV compatible ATS</h2>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    ["1", "#7c3aed", "Utilise les mots-clés exacts de l'offre", "Si l'offre dit \"Agile\", ton CV doit dire \"Agile\" — pas \"méthodes modernes\"."],
    ["2", "#2563eb", "Structure simple et linéaire", "Pas de colonnes complexes, pas de tableaux — les ATS ne savent pas les lire."],
    ["3", "#059669", "Titres de sections standards", "Écris \"Expérience professionnelle\" et non \"Mon parcours\"."],
    ["4", "#d97706", "Envoie en PDF", "Préserve la mise en page et est bien lu par la plupart des ATS modernes."],
    ["5", "#dc2626", "Texte brut pour les infos clés", "Ton nom et tes coordonnées ne doivent jamais être dans une image."],
  ].map(([num, color, title, desc]) => `
  <div style="display:flex;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px">
    <div style="width:32px;height:32px;background:${color};color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0">${num}</div>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 4px 0;font-size:15px">${title}</p>
      <p style="color:#6b7280;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Comment trouver les bons mots-clés ?</h2>

<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:20px 0">
  <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px">
    <span style="font-size:24px">📋</span>
    <span style="font-weight:700;color:#111827">Méthode manuelle</span>
  </div>
  <div style="display:flex;flex-direction:column;gap:8px">
    ${["Lis l'offre d'emploi attentivement", "Surligne les compétences et qualifications mentionnées", "Intègre ces termes naturellement dans ton CV"].map((step, i) => `
    <div style="display:flex;align-items:center;gap:10px">
      <span style="width:22px;height:22px;background:#7c3aed;color:#fff;border-radius:50%;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i + 1}</span>
      <span style="font-size:14px;color:#374151">${step}</span>
    </div>`).join("")}
  </div>
</div>

<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">⚡ Méthode rapide — CVAdapt</p>
  <p style="color:#1d4ed8;margin:0;font-size:14px">Colle l'offre dans CVAdapt → l'IA identifie et intègre automatiquement tous les mots-clés en 30 secondes.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Générer mon CV ATS-ready →</a>
</div>
    `,
  },
  {
    slug: "cv-reconversion-professionnelle",
    titre: "Reconversion professionnelle : comment faire un CV convaincant",
    description: "Tu changes de secteur et tu ne sais pas quoi mettre sur ton CV ? Cette méthode transforme ton expérience passée en atout pour le poste que tu vises — même sans expérience directe.",
    date: "2025-05-03",
    categorie: "Reconversion",
    tempsLecture: "4 min",
    illustration: "🔄",
    couleur: "from-green-500 to-green-700",
    contenu: `
<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#15803d;margin:0 0 4px 0">💡 Le bon angle</p>
  <p style="color:#166534;margin:0;font-size:15px">Tu n'as pas "pas d'expérience dans ce domaine". Tu as des <strong>compétences transférables</strong> que les autres candidats n'ont pas.</p>
</div>

<h2>Tes compétences transférables par catégorie</h2>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0">
  ${[
    ["🤝", "Relationnelles", "Communication, négociation, service client, management"],
    ["📋", "Organisationnelles", "Gestion de projet, planification, priorisation"],
    ["📊", "Analytiques", "Analyse de données, résolution de problèmes, reporting"],
    ["💻", "Techniques", "Outils numériques, logiciels métier, CRM, Excel"],
  ].map(([emoji, cat, skills]) => `
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px">
    <p style="font-size:20px;margin:0 0 6px 0">${emoji}</p>
    <p style="font-weight:700;color:#111827;margin:0 0 4px 0;font-size:13px">${cat}</p>
    <p style="color:#6b7280;font-size:12px;margin:0;line-height:1.5">${skills}</p>
  </div>`).join("")}
</div>

<h2>Structure recommandée pour un CV de reconversion</h2>

<div style="display:grid;gap:8px;margin:20px 0">
  ${[
    ["🎯", "1. Profil en premier", "Explique ta reconversion en 3-4 phrases positives. C'est ta meilleure arme.", "#eff6ff", "#2563eb"],
    ["🛠", "2. Compétences avant les expériences", "Montre ce que tu apportes avant de montrer d'où tu viens.", "#f0fdf4", "#16a34a"],
    ["💼", "3. Reformule tes expériences", "Mets en avant ce qui est pertinent pour le nouveau poste.", "#faf5ff", "#7c3aed"],
    ["🎓", "4. Formations de reconversion", "Certifications, bootcamps, MOOCs — montre que tu te formes activement.", "#fff7ed", "#ea580c"],
  ].map(([emoji, title, desc, bg, color]) => `
  <div style="display:flex;gap:14px;background:${bg};border-radius:10px;padding:14px 16px">
    <span style="font-size:22px;flex-shrink:0">${emoji}</span>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 3px 0;font-size:14px">${title}</p>
      <p style="color:#374151;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Exemple de profil efficace</h2>
<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:20px 0;font-style:italic;color:#374151;font-size:14px;line-height:1.8">
  "Commercial B2B pendant 5 ans, j'ai développé une forte capacité à coordonner des projets complexes et à travailler avec des équipes pluridisciplinaires. Passionné par le digital, j'ai suivi une formation en gestion de projet (certification PMP) et souhaite mettre mes compétences au service d'une équipe produit."
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#16a34a;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon CV de reconversion →</a>
</div>
    `,
  },
  {
    slug: "lettre-motivation-efficace-2025",
    titre: "Lettre de motivation : comment en écrire une qui soit vraiment lue",
    description: "La plupart des lettres de motivation sont ignorées en 8 secondes. Cette méthode en 3 paragraphes est celle que les RH lisent jusqu'au bout — et qui obtient des réponses.",
    date: "2025-05-04",
    categorie: "Lettre de motivation",
    tempsLecture: "3 min",
    illustration: "✉️",
    couleur: "from-orange-500 to-orange-700",
    contenu: `
<div style="background:#fff7ed;border-left:4px solid #ea580c;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#c2410c;margin:0 0 4px 0">📊 Savoir-faire</p>
  <p style="color:#9a3412;margin:0;font-size:15px"><strong>68% des recruteurs</strong> lisent la lettre quand le CV les intéresse. Elle peut faire toute la différence.</p>
</div>

<h2>La structure en 3 paragraphes</h2>

<div style="display:grid;gap:12px;margin:20px 0">
  ${[
    ["1", "#ea580c", "L'accroche — Pourquoi CE poste", "Montre que tu connais l'entreprise. Ne commence jamais par \"Je me permets de vous contacter...\""],
    ["2", "#2563eb", "Ta valeur — Ce que tu apportes", "2-3 réalisations concrètes avec des chiffres. Utilise les mots-clés de l'offre."],
    ["3", "#16a34a", "La conclusion — L'invitation", "Formule de politesse + invitation à un entretien. Sois direct et confiant."],
  ].map(([num, color, title, desc]) => `
  <div style="display:flex;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px">
    <div style="width:32px;height:32px;background:${color};color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0">${num}</div>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 4px 0;font-size:15px">${title}</p>
      <p style="color:#6b7280;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Les 5 erreurs qui tuent ta lettre</h2>

<div style="display:grid;gap:8px;margin:20px 0">
  ${[
    "Commencer par \"Je\" (trop centré sur soi)",
    "Répéter mot pour mot ce qui est dans le CV",
    "Utiliser des formules vides : \"dynamique\", \"motivé\", \"sérieux\"",
    "Dépasser une page",
    "Envoyer la même lettre à toutes les entreprises",
  ].map(err => `
  <div style="display:flex;align-items:center;gap:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 14px">
    <span style="color:#ef4444;font-size:18px;flex-shrink:0">✗</span>
    <span style="font-size:14px;color:#374151">${err}</span>
  </div>`).join("")}
</div>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 4px 0">⚡ Génère ta lettre automatiquement</p>
  <p style="color:#166534;margin:0;font-size:14px">CVAdapt génère une lettre de motivation adaptée à chaque offre en même temps que ton CV. Coche l'option avant de générer.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#ea580c;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Générer ma lettre de motivation →</a>
</div>
    `,
  },
  {
    slug: "cv-sans-experience-premier-emploi",
    titre: "CV sans expérience : comment décrocher son premier emploi",
    description: "Pas d'expérience ? Pas de problème. Ce guide te montre exactement quoi mettre dans ton premier CV pour décrocher un entretien — même avec zéro poste précédent.",
    date: "2025-05-04",
    categorie: "Débutants",
    tempsLecture: "4 min",
    illustration: "🌱",
    couleur: "from-teal-500 to-teal-700",
    contenu: `
<div style="background:#f0fdfa;border-left:4px solid #0d9488;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#0f766e;margin:0 0 4px 0">💡 La vérité</p>
  <p style="color:#115e59;margin:0;font-size:15px">Tout le monde a commencé quelque part. Les recruteurs qui cherchent des juniors <strong>savent</strong> que tu n'as pas d'expérience. Ils cherchent du potentiel.</p>
</div>

<h2>Ce que tu peux mettre dans ton CV</h2>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    ["🎓", "Ta formation", "Diplôme, spécialisation, mention, projets scolaires"],
    ["🏢", "Stages et jobs étudiants", "Même 2 semaines, même McDonald's — ça compte !"],
    ["🤝", "Bénévolat et associations", "Trésorier d'un BDE, animateur, responsable d'asso"],
    ["💻", "Projets personnels", "Site web, app, blog, chaîne YouTube, création artistique"],
    ["🏆", "Sports et activités", "Compétition, capitaine d'équipe, entraîneur junior"],
  ].map(([emoji, title, desc]) => `
  <div style="display:flex;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px">
    <span style="font-size:22px;flex-shrink:0">${emoji}</span>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 3px 0;font-size:14px">${title}</p>
      <p style="color:#6b7280;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Transforme tes expériences en atouts</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px">
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:10px 14px;text-align:left;color:#6b7280;border:1px solid #e5e7eb">Ce que tu as fait</th>
      <th style="padding:10px 14px;text-align:left;color:#16a34a;border:1px solid #e5e7eb">✅ Comment le formuler</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ["Responsable com d'une asso", "Gestion des réseaux sociaux, +800 abonnés en 6 mois"],
      ["Baby-sitting régulier", "Gestion autonome de 3 enfants, confiance de 5 familles"],
      ["Projet scolaire", "Développement d'une app en équipe, présenté à un jury pro"],
      ["Job d'été en caisse", "Service de 150+ clients/jour, gestion des erreurs de caisse"],
    ].map(([from, to]) => `
    <tr>
      <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#374151">${from}</td>
      <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827;font-weight:500">${to}</td>
    </tr>`).join("")}
  </tbody>
</table>

<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">⚡ CVAdapt pour les profils juniors</p>
  <p style="color:#1d4ed8;margin:0;font-size:14px">CVAdapt met automatiquement en avant les éléments de ton profil qui correspondent le mieux au poste, même sans expérience directe.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#0d9488;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon premier CV →</a>
</div>
    `,
  },
  {
    slug: "score-ats-comment-optimiser",
    titre: "Score ATS : comment atteindre 90/100 et passer les filtres",
    description: "Ton CV a peut-être un score ATS de 30/100 sans que tu le saches. Ce guide te montre comment atteindre 90/100 étape par étape — et multiplier tes chances d'être rappelé.",
    date: "2025-05-02",
    categorie: "ATS & Mots-clés",
    tempsLecture: "5 min",
    illustration: "🤖",
    couleur: "from-indigo-500 to-blue-600",
    contenu: `
<div style="background:#eef2ff;border-left:4px solid #6366f1;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#4338ca;margin:0 0 4px 0">🤖 Le fait qui change tout</p>
  <p style="color:#4f46e5;margin:0;font-size:15px"><strong>75% des CV</strong> sont rejetés par les ATS avant qu'un humain ne les lise. Ton profil n'est pas le problème — ton CV l'est.</p>
</div>

<h2>Qu'est-ce qu'un score ATS ?</h2>
<p>Un ATS (Applicant Tracking System) est un logiciel utilisé par 99% des grandes entreprises pour trier les candidatures. Il analyse ton CV et lui attribue un score de compatibilité avec l'offre d'emploi.</p>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    ["📊 Score > 80", "Tu passes les filtres automatiques", "#f0fdf4", "#16a34a", "#dcfce7"],
    ["📊 Score 50-80", "Tu passes parfois, selon la concurrence", "#fffbeb", "#d97706", "#fef3c7"],
    ["📊 Score < 50", "Rejeté automatiquement, même avec un bon profil", "#fef2f2", "#dc2626", "#fee2e2"],
  ].map(([score, label, bg, color, border]) => `
  <div style="display:flex;align-items:center;gap:14px;background:${bg};border:1px solid ${border};border-radius:10px;padding:14px 16px">
    <span style="font-weight:700;color:${color};font-size:14px">${score}</span>
    <span style="color:#374151;font-size:14px">${label}</span>
  </div>`).join("")}
</div>

<h2>Les 4 facteurs qui composent ton score</h2>

<div style="display:grid;gap:12px;margin:20px 0">
  ${[
    ["🔑", "Mots-clés", "40%", "Les termes exacts de l'offre doivent apparaître dans ton CV"],
    ["🏗️", "Structure", "30%", "Sections clairement identifiées (Expériences, Compétences, Formation)"],
    ["📖", "Lisibilité", "20%", "Pas de tableaux, colonnes complexes ou images — l'ATS ne les lit pas"],
    ["📅", "Expérience", "10%", "Années d'expérience correspondant à l'offre"],
  ].map(([icon, title, pct, desc]) => `
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <span style="font-size:20px">${icon}</span>
      <span style="font-weight:700;color:#111827">${title}</span>
      <span style="margin-left:auto;background:#dbeafe;color:#1d4ed8;font-weight:700;font-size:12px;padding:2px 8px;border-radius:12px">${pct}</span>
    </div>
    <p style="color:#6b7280;font-size:14px;margin:0">${desc}</p>
  </div>`).join("")}
</div>

<h2>Comment améliorer ton score rapidement</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px">
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:12px 16px;text-align:left;border:1px solid #e5e7eb;color:#374151">Action</th>
      <th style="padding:12px 16px;text-align:left;border:1px solid #e5e7eb;color:#374151">Impact sur le score</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ["Copier les mots-clés exacts de l'offre", "+15 à +25 pts"],
      ["Reformater en colonnes simples (1 seule colonne)", "+8 à +15 pts"],
      ["Ajouter une section Compétences dédiée", "+5 à +10 pts"],
      ["Supprimer les tableaux et images", "+5 à +8 pts"],
      ["Adapter le titre du poste à l'offre", "+3 à +7 pts"],
    ].map(([action, impact]) => `
    <tr>
      <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#374151">${action}</td>
      <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#16a34a;font-weight:700">${impact}</td>
    </tr>`).join("")}
  </tbody>
</table>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 8px 0">💡 Astuce CVAdapt</p>
  <p style="color:#166534;margin:0;font-size:14px">CVAdapt calcule ton score ATS en 30 secondes et identifie exactement quels mots-clés ajouter. Essaie l'analyse gratuite sur cvadapt.eu/analyse</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/analyse" style="display:inline-block;background:#2563eb;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">🎯 Analyser mon score ATS →</a>
</div>
    `,
  },
  {
    slug: "cv-cadre-reconversion-secteur",
    titre: "CV cadre en reconversion : comment valoriser 10 ans d'expérience dans un nouveau secteur",
    description: "10 ans d'expérience mais dans le mauvais secteur ? Voici comment repositionner ton profil pour que les recruteurs voient exactement ce qu'ils cherchent — et te rappellent.",
    date: "2025-05-03",
    categorie: "Reconversion",
    tempsLecture: "6 min",
    illustration: "🎯",
    couleur: "from-violet-500 to-purple-700",
    contenu: `
<div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#6d28d9;margin:0 0 4px 0">📌 La réalité des recruteurs</p>
  <p style="color:#7c3aed;margin:0;font-size:15px">Un recruteur voit "10 ans dans la banque → candidat pour un poste marketing" et se demande : <strong>pourquoi ce profil ?</strong> Ton CV doit répondre avant même qu'il pose la question.</p>
</div>

<h2>L'erreur fatale du CV de reconversion</h2>
<p>La plupart des cadres en reconversion font la même erreur : ils copient-collent leur ancien CV en changeant juste le titre du poste. Résultat : le recruteur voit un profil incompatible et passe au suivant.</p>
<p>La solution : <strong>reformuler ton expérience dans le langage du nouveau secteur</strong> sans mentir sur ce que tu as fait.</p>

<h2>La méthode en 4 étapes</h2>

<div style="display:grid;gap:14px;margin:24px 0">
  ${[
    ["1", "#7c3aed", "Identifie les compétences transversales", "Gestion de projet, management, analyse de données, communication, négociation — ces compétences valent dans tous les secteurs. Liste les tiennes."],
    ["2", "#2563eb", "Traduis en langage du nouveau secteur", "\"Gestion de portefeuille clients\" en finance devient \"Account management B2B\" en tech. Même réalité, vocabulaire différent."],
    ["3", "#16a34a", "Chiffre tes résultats", "Les chiffres n'ont pas de secteur. \"Augmentation du CA de 40%\" ou \"réduction des délais de 30%\" parlent à tous les recruteurs."],
    ["4", "#f59e0b", "Réécris ton profil en narratif", "En 3 phrases, explique ta trajectoire comme une évolution logique, pas une fuite. \"Après 10 ans en finance, je mets mon sens de l'analyse au service du marketing digital.\""],
  ].map(([n, color, title, desc]) => `
  <div style="display:flex;gap:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px">
    <div style="width:36px;height:36px;background:${color};color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0">${n}</div>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 6px 0">${title}</p>
      <p style="color:#6b7280;font-size:14px;margin:0;line-height:1.6">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Exemple concret : Finance → Marketing Digital</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px">
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:12px 16px;text-align:left;border:1px solid #e5e7eb;color:#ef4444">❌ Formulation finance</th>
      <th style="padding:12px 16px;text-align:left;border:1px solid #e5e7eb;color:#16a34a">✅ Reformulation marketing</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ["Analyse de portefeuilles d'actifs", "Analyse de données et segmentation d'audience"],
      ["Reporting hebdomadaire direction", "Création de dashboards KPI et reporting ROI"],
      ["Relation clients patrimoniaux", "Account management et fidélisation clients premium"],
      ["Veille réglementaire marchés", "Veille concurrentielle et tendances sectorielles"],
    ].map(([bad, good]) => `
    <tr>
      <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#374151">${bad}</td>
      <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#374151;font-weight:500">${good}</td>
    </tr>`).join("")}
  </tbody>
</table>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 8px 0">💡 CVAdapt pour la reconversion</p>
  <p style="color:#166534;margin:0;font-size:14px">Colle l'offre du nouveau secteur dans CVAdapt — l'IA reformule automatiquement ton expérience dans le bon vocabulaire métier et intègre les mots-clés attendus.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Générer mon CV de reconversion →</a>
</div>
    `,
  },
  {
    slug: "mots-cles-cv-par-metier",
    titre: "Les mots-clés CV essentiels par métier en 2025 (liste complète)",
    description: "Sans ces mots-clés, ton CV est invisible. La liste complète des termes exacts que les ATS et recruteurs cherchent en 2025 — par secteur : marketing, tech, finance, RH, vente.",
    date: "2025-05-04",
    categorie: "ATS & Mots-clés",
    tempsLecture: "7 min",
    illustration: "🔑",
    couleur: "from-amber-500 to-orange-600",
    contenu: `
<div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#b45309;margin:0 0 4px 0">🔑 Pourquoi les mots-clés sont critiques</p>
  <p style="color:#92400e;margin:0;font-size:15px">Un ATS cherche des <strong>termes exacts</strong>. "Gestion de projet" et "Project management" sont deux choses différentes pour un logiciel. Un seul mot-clé manquant peut te faire rejeter.</p>
</div>

${[
  {
    metier: "💻 Développement web / Tech",
    keywords: ["React", "Node.js", "TypeScript", "Python", "Docker", "AWS", "CI/CD", "Agile", "Scrum", "API REST", "Git", "SQL", "MongoDB", "Kubernetes", "Microservices"],
    color: "#3b82f6",
    bg: "#eff6ff"
  },
  {
    metier: "📣 Marketing Digital",
    keywords: ["SEO", "SEM", "Google Analytics", "Meta Ads", "Growth Hacking", "Content Marketing", "CRM", "A/B Testing", "Conversion Rate", "Email Marketing", "KPI", "ROI", "Copywriting", "Social Media"],
    color: "#ec4899",
    bg: "#fdf2f8"
  },
  {
    metier: "💰 Finance / Comptabilité",
    keywords: ["Analyse financière", "Excel avancé", "Power BI", "Reporting", "Budget prévisionnel", "Contrôle de gestion", "Audit", "IFRS", "TVA", "Bilan comptable", "SAP", "Sage", "Cash flow", "P&L"],
    color: "#16a34a",
    bg: "#f0fdf4"
  },
  {
    metier: "👥 RH / Recrutement",
    keywords: ["Recrutement", "ATS", "SIRH", "Onboarding", "Formation", "GPEC", "Droit social", "Paie", "Marque employeur", "Assessment", "Talent acquisition", "People management", "Entretiens", "Job board"],
    color: "#7c3aed",
    bg: "#f5f3ff"
  },
  {
    metier: "📦 Commercial / Vente",
    keywords: ["Prospection B2B", "CRM Salesforce", "Cycle de vente", "Closing", "Négociation", "KPI commerciaux", "Pipeline", "Chiffre d'affaires", "Fidélisation", "Account management", "Inbound", "Cold calling"],
    color: "#ea580c",
    bg: "#fff7ed"
  },
].map(({ metier, keywords, color, bg }) => `
<div style="background:${bg};border:1px solid ${color}30;border-radius:14px;padding:20px;margin:20px 0">
  <h3 style="color:${color};font-weight:700;margin:0 0 14px 0">${metier}</h3>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    ${keywords.map(kw => `<span style="background:#fff;border:1px solid ${color}40;color:#374151;font-size:13px;font-weight:600;padding:4px 12px;border-radius:20px">${kw}</span>`).join("")}
  </div>
</div>`).join("")}

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 8px 0">💡 La méthode la plus rapide</p>
  <p style="color:#166534;margin:0;font-size:14px">Au lieu de chercher les bons mots-clés manuellement, colle ton offre dans CVAdapt. L'outil détecte automatiquement les termes clés de l'offre et les intègre dans ton CV.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/analyse" style="display:inline-block;background:#f59e0b;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">🔍 Analyser mes mots-clés manquants →</a>
</div>
    `,
  },
  {
    slug: "erreurs-cv-qui-font-rejeter",
    titre: "7 erreurs de CV qui font rejeter votre candidature (et comment les corriger)",
    description: "L'erreur n°3 fait rejeter 1 CV sur 2 — et presque tout le monde la commet. Vérifie en 2 minutes si ton CV en est victime, et corrige-la avant d'envoyer ta prochaine candidature.",
    date: "2025-05-05",
    categorie: "Conseils CV",
    tempsLecture: "5 min",
    illustration: "⚠️",
    couleur: "from-red-500 to-rose-600",
    contenu: `
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#b91c1c;margin:0 0 4px 0">⚡ Le chiffre qui fait mal</p>
  <p style="color:#dc2626;margin:0;font-size:15px">Un recruteur passe en moyenne <strong>6 à 10 secondes</strong> sur un CV. Ces erreurs te font rejeter dans ce laps de temps sans même que ton profil soit évalué.</p>
</div>

<div style="display:grid;gap:16px;margin:24px 0">
  ${[
    { n: "1", title: "Un CV générique envoyé à toutes les offres", fix: "Adapte ton CV à chaque offre. Intègre les mots-clés spécifiques à l'offre. CVAdapt le fait automatiquement en 30 secondes.", icon: "📋" },
    { n: "2", title: "Des responsabilités sans résultats chiffrés", fix: "Remplace \"Gestion de l'équipe\" par \"Management d'une équipe de 8 personnes, objectifs atteints à 120% sur 2 ans\".", icon: "📊" },
    { n: "3", title: "Une mise en forme illisible par les ATS", fix: "Évite les tableaux, colonnes multiples, graphiques. L'ATS lit de gauche à droite, de haut en bas. Une colonne simple = meilleur score.", icon: "🤖" },
    { n: "4", title: "Un titre de poste qui ne correspond pas à l'offre", fix: "Si l'offre dit \"Product Manager\", ton titre doit être \"Product Manager\" et non \"Chef de produit\" ou \"Responsable produit\".", icon: "🏷️" },
    { n: "5", title: "Pas de section Compétences dédiée", fix: "Les ATS cherchent une section intitulée \"Compétences\" ou \"Skills\". Sans elle, tes compétences ne sont pas comptabilisées dans le score.", icon: "🛠️" },
    { n: "6", title: "Un email peu professionnel", fix: "prenom.nom@gmail.com uniquement. Pas de pseudo, pas de date de naissance dans l'email. C'est la première chose que voit le recruteur.", icon: "📧" },
    { n: "7", title: "Plus de 2 pages pour moins de 10 ans d'expérience", fix: "1 page pour les juniors, 2 pages maximum pour les seniors. Au-delà, le recruteur ne lira pas. Chaque mot doit avoir sa place.", icon: "📄" },
  ].map(({ n, title, fix, icon }) => `
  <div style="border:1px solid #fecaca;border-radius:14px;overflow:hidden">
    <div style="background:#fef2f2;padding:14px 18px;display:flex;align-items:center;gap:12px">
      <div style="width:28px;height:28px;background:#ef4444;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;flex-shrink:0">${n}</div>
      <span style="font-size:16px">${icon}</span>
      <p style="font-weight:700;color:#b91c1c;margin:0;font-size:15px">${title}</p>
    </div>
    <div style="background:#fff;padding:14px 18px;border-top:1px solid #fecaca">
      <span style="color:#16a34a;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">✓ La correction : </span>
      <span style="color:#374151;font-size:14px;line-height:1.6">${fix}</span>
    </div>
  </div>`).join("")}
</div>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 8px 0">💡 Corrige tout ça en 30 secondes</p>
  <p style="color:#166534;margin:0;font-size:14px">CVAdapt génère un CV optimisé qui évite automatiquement toutes ces erreurs : mots-clés adaptés, structure ATS-friendly, résultats chiffrés mis en avant.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#ef4444;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Corriger mon CV maintenant →</a>
</div>
    `,
  },
  {
    slug: "linkedin-cv-coherence",
    titre: "LinkedIn + CV : comment les rendre cohérents et décrocher 2× plus d'entretiens",
    description: "Les recruteurs passent 30 secondes sur ton profil LinkedIn après avoir lu ton CV. Une seule incohérence et ta candidature est grillée. Voici comment aligner les deux pour décrocher 2× plus d'entretiens.",
    date: "2025-05-06",
    categorie: "Conseils CV",
    tempsLecture: "5 min",
    illustration: "🔗",
    couleur: "from-blue-600 to-cyan-500",
    contenu: `
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">🔍 Ce que font les recruteurs</p>
  <p style="color:#1d4ed8;margin:0;font-size:15px"><strong>87% des recruteurs</strong> consultent le LinkedIn d'un candidat après avoir reçu son CV. Une incohérence entre les deux crée immédiatement de la méfiance.</p>
</div>

<h2>Les 5 points à aligner absolument</h2>

<div style="display:grid;gap:12px;margin:20px 0">
  ${[
    ["📌 Titre du poste", "Le titre sur ton CV doit correspondre exactement à celui sur LinkedIn. Les dates de tes expériences aussi."],
    ["📅 Dates d'expérience", "Moindre écart = red flag immédiat. Vérifie chaque mois, chaque année."],
    ["🏢 Noms des entreprises", "Utilise les noms officiels. \"Société Générale\" pas \"SG\" ou \"Société Gen.\""],
    ["🛠 Compétences", "Les compétences listées sur ton CV doivent apparaître sur LinkedIn (et idéalement être validées par tes contacts)."],
    ["🎓 Formation", "Diplôme, école, années — tout doit être identique mot pour mot."],
  ].map(([title, desc]) => `
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px">
    <p style="font-weight:700;color:#111827;margin:0 0 4px 0">${title}</p>
    <p style="color:#6b7280;font-size:14px;margin:0;line-height:1.5">${desc}</p>
  </div>`).join("")}
</div>

<h2>Optimiser ton profil LinkedIn pour les ATS</h2>
<p>LinkedIn a aussi son propre algorithme de matching. Voici les optimisations qui font la différence :</p>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    "Remplis le titre avec les mots-clés du poste visé (pas juste ton titre actuel)",
    "Section \"À propos\" : 3 premières lignes visibles sans clic — rends-les impactantes",
    "Demande 3-5 recommandations de collègues ou managers",
    "Valide les compétences clés de tes contacts pour qu'ils te les retournent",
    "Indique \"Open to Work\" en mode discret (visible recruteurs uniquement)",
  ].map(tip => `
  <div style="display:flex;align-items:flex-start;gap:10px;background:#f0fdf4;border-radius:8px;padding:12px 14px">
    <span style="color:#16a34a;font-weight:700;flex-shrink:0">✓</span>
    <span style="color:#374151;font-size:14px">${tip}</span>
  </div>`).join("")}
</div>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 8px 0">💡 Ton CV comme base LinkedIn</p>
  <p style="color:#166534;margin:0;font-size:14px">Génère d'abord ton CV optimisé avec CVAdapt, puis utilise exactement les mêmes formulations sur ton profil LinkedIn. Cohérence garantie en 5 minutes.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#2563eb;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon CV base LinkedIn →</a>
</div>
    `,
  },
  // ─── NOUVEAUX ARTICLES SEO ───────────────────────────────────
  {
    slug: "cv-alternance-2025",
    titre: "CV alternance 2025 : le guide complet pour décrocher ton contrat",
    description: "Comment faire un CV pour une alternance en 2025 ? Structure, mots-clés, exemples — tout ce qu'il faut pour convaincre une entreprise de te prendre en alternance, même sans expérience.",
    date: "2025-05-07",
    categorie: "Alternance",
    tempsLecture: "5 min",
    illustration: "🎓",
    couleur: "from-blue-500 to-indigo-600",
    contenu: `
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">📊 Le marché 2025</p>
  <p style="color:#1d4ed8;margin:0;font-size:15px">Plus de <strong>1 million d'alternants</strong> en France en 2025. La concurrence est réelle — ton CV fait toute la différence.</p>
</div>

<h2>Ce qu'un recruteur cherche dans un CV d'alternance</h2>
<p>Pour une alternance, le recruteur sait que tu n'as pas d'expérience pro significative. Ce qu'il cherche : <strong>motivation, compétences techniques de base, et compatibilité avec l'équipe</strong>.</p>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    ["🎯", "La formation", "Ton école, ton programme, ta spécialisation — c'est ton principal atout"],
    ["💡", "Les projets scolaires", "Mémoires, projets de groupe, présentations techniques"],
    ["🛠", "Les compétences techniques", "Logiciels, langages, certifications — même basiques"],
    ["🤝", "Les jobs étudiants", "Même un job d'été montre ton sérieux et ta capacité à travailler"],
    ["🏆", "Les activités extra", "BDE, sport, bénévolat — montrent ton caractère"],
  ].map(([icon, title, desc]) => `
  <div style="display:flex;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px">
    <span style="font-size:22px;flex-shrink:0">${icon}</span>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 3px 0;font-size:14px">${title}</p>
      <p style="color:#6b7280;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Structure idéale d'un CV alternance</h2>

<div style="display:grid;gap:8px;margin:20px 0">
  ${[
    ["1", "Profil / Objectif", "2-3 phrases : ton domaine, l'alternance visée, ta valeur ajoutée", "#2563eb"],
    ["2", "Formation", "En premier ! C'est ton atout principal. École, programme, dates, projets notables", "#7c3aed"],
    ["3", "Compétences techniques", "Liste adaptée à l'offre. Utilise les mots-clés exacts de l'entreprise", "#059669"],
    ["4", "Expériences", "Stages, jobs, bénévolat — même courtes, avec des résultats concrets", "#d97706"],
    ["5", "Activités", "BDE, sport, projets perso — montre ta personnalité", "#dc2626"],
  ].map(([n, title, desc, color]) => `
  <div style="display:flex;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px">
    <div style="width:28px;height:28px;background:${color};color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">${n}</div>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 3px 0;font-size:14px">${title}</p>
      <p style="color:#6b7280;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Les mots-clés qui font la différence selon le secteur</h2>

<div style="display:grid;gap:12px;margin:20px 0">
  ${[
    ["💻 Alternance tech / Dev", ["JavaScript", "React", "Python", "Git", "Agile", "SQL", "Docker", "API"], "#3b82f6", "#eff6ff"],
    ["📣 Alternance marketing", ["SEO", "Community management", "Google Analytics", "Canva", "Adobe", "CRM", "Réseaux sociaux"], "#ec4899", "#fdf2f8"],
    ["💰 Alternance finance / compta", ["Excel", "Sage", "Comptabilité générale", "Reporting", "TVA", "Bilan", "SAP"], "#16a34a", "#f0fdf4"],
    ["👥 Alternance RH", ["Recrutement", "SIRH", "Onboarding", "Droit social", "Paie", "Entretiens", "Formation"], "#7c3aed", "#f5f3ff"],
  ].map(([sector, kws, color, bg]) => `
  <div style="background:${bg};border:1px solid ${color}30;border-radius:12px;padding:16px">
    <p style="font-weight:700;color:${color};margin:0 0 10px 0;font-size:14px">${sector}</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${kws.map(kw => `<span style="background:#fff;border:1px solid ${color}40;color:#374151;font-size:12px;font-weight:600;padding:3px 10px;border-radius:16px">${kw}</span>`).join("")}
    </div>
  </div>`).join("")}
</div>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 4px 0">⚡ Astuce CVAdapt pour l'alternance</p>
  <p style="color:#166534;margin:0;font-size:14px">Colle l'offre d'alternance dans CVAdapt — l'IA adapte automatiquement ton CV aux mots-clés exacts de l'entreprise. Gratuit, 30 secondes.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#2563eb;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon CV alternance →</a>
</div>
    `,
  },
  {
    slug: "exemple-cv-bts",
    titre: "Exemple CV BTS 2025 : modèle et conseils pour décrocher votre alternance",
    description: "Exemple de CV pour un BTS en 2025 : que tu sois en BTS MCO, NRC, SIO, CG ou autre — voici la structure exacte, les mots-clés et les erreurs à éviter pour décrocher ton alternance ou stage.",
    date: "2025-05-07",
    categorie: "Alternance",
    tempsLecture: "4 min",
    illustration: "📋",
    couleur: "from-teal-500 to-cyan-600",
    contenu: `
<div style="background:#f0fdfa;border-left:4px solid #0d9488;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#0f766e;margin:0 0 4px 0">🎓 BTS = profil recherché</p>
  <p style="color:#115e59;margin:0;font-size:15px">Les entreprises recrutent massivement en BTS. Un CV bien construit suffit pour décrocher une alternance — même en première année.</p>
</div>

<h2>Structure recommandée pour un CV BTS</h2>

<div style="background:#fff;border:2px solid #e5e7eb;border-radius:16px;overflow:hidden;margin:20px 0;font-size:13px">
  <div style="background:#0d9488;padding:12px 16px">
    <p style="color:#fff;font-weight:700;margin:0;font-size:15px">PRÉNOM NOM</p>
    <p style="color:#99f6e4;margin:0;font-size:12px">BTS [Spécialité] — Alternance [Poste visé]</p>
  </div>
  <div style="padding:16px;display:grid;gap:12px">
    ${[
      ["Formation", "BTS NOM · École · 2024-2026 · Alternance"],
      ["Compétences", "Liste des compétences clés adaptées à l'offre"],
      ["Expériences", "Jobs d'été, stages, bénévolat"],
      ["Projets scolaires", "Projets en lien avec le poste visé"],
      ["Activités", "Sport, associations, centres d'intérêt pertinents"],
    ].map(([section, desc]) => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #f3f4f6">
      <span style="font-weight:700;color:#0d9488;min-width:130px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">${section}</span>
      <span style="color:#6b7280;font-size:13px">${desc}</span>
    </div>`).join("")}
  </div>
</div>

<h2>Mots-clés par spécialité BTS</h2>

<div style="display:grid;gap:12px;margin:20px 0">
  ${[
    ["BTS MCO / NRC (Commerce)", ["Relation client", "Prospection", "Fidélisation", "CRM", "Vente", "Négociation", "Merchandising", "Réseaux sociaux"], "#ea580c", "#fff7ed"],
    ["BTS SIO (Informatique)", ["Python", "JavaScript", "SQL", "Réseau", "Cybersécurité", "Linux", "HTML/CSS", "PHP"], "#3b82f6", "#eff6ff"],
    ["BTS CG (Comptabilité)", ["Comptabilité", "Excel", "Sage", "TVA", "Paie", "Bilan", "Rapprochement bancaire"], "#16a34a", "#f0fdf4"],
    ["BTS Communication", ["Canva", "Photoshop", "Rédaction", "Événementiel", "Réseaux sociaux", "Communiqué de presse"], "#ec4899", "#fdf2f8"],
  ].map(([bts, kws, color, bg]) => `
  <div style="background:${bg};border-radius:12px;padding:14px">
    <p style="font-weight:700;color:${color};font-size:13px;margin:0 0 10px 0">${bts}</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${kws.map(kw => `<span style="background:#fff;border:1px solid ${color}40;color:#374151;font-size:12px;font-weight:600;padding:3px 10px;border-radius:16px">${kw}</span>`).join("")}
    </div>
  </div>`).join("")}
</div>

<h2>Erreurs fréquentes sur un CV BTS</h2>

<div style="display:grid;gap:8px;margin:20px 0">
  ${[
    "Mettre \"Bac Pro\" ou le collège — commence directement avec le BTS",
    "Ne pas mentionner l'alternance visée dans le titre",
    "Oublier les projets scolaires (souvent les seuls exemples concrets)",
    "Utiliser une photo mal cadrée ou trop informelle",
    "CV de plus d'1 page — pour un BTS, 1 page suffit largement",
  ].map(err => `
  <div style="display:flex;gap:10px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 14px">
    <span style="color:#ef4444;font-weight:700;flex-shrink:0">✗</span>
    <span style="color:#374151;font-size:14px">${err}</span>
  </div>`).join("")}
</div>

<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">⚡ Génère ton CV BTS en 30 secondes</p>
  <p style="color:#1d4ed8;margin:0;font-size:14px">CVAdapt adapte automatiquement ton CV à chaque offre d'alternance. Entre ta spécialité, tes compétences et l'offre — ton CV est prêt à envoyer.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#0d9488;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Générer mon CV BTS →</a>
</div>
    `,
  },
  {
    slug: "cv-stage-etudiant-2025",
    titre: "CV stage étudiant 2025 : comment décrocher ton stage même sans expérience",
    description: "Comment faire un CV pour un stage quand tu es étudiant ? Guide complet 2025 : structure, mots-clés, projets scolaires à valoriser — pour décrocher ton stage de licence, master ou école.",
    date: "2025-05-08",
    categorie: "Stage",
    tempsLecture: "4 min",
    illustration: "🌱",
    couleur: "from-green-500 to-emerald-600",
    contenu: `
<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#15803d;margin:0 0 4px 0">💡 Ce que le recruteur sait déjà</p>
  <p style="color:#166534;margin:0;font-size:15px">Il sait que tu cherches un stage donc que tu n'as pas d'expérience pro. Il cherche du <strong>potentiel</strong>, pas un expert.</p>
</div>

<h2>Quoi mettre dans un CV de stage sans expérience</h2>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    ["🎓", "Ta formation en premier", "Université/école, filière, niveau, projets notables, note si bonne"],
    ["💻", "Projets académiques", "Ton mémoire, tes projets de groupe, les sujets traités"],
    ["🛠", "Compétences techniques", "Logiciels, langages, outils — adaptés à l'offre"],
    ["🤝", "Expériences courtes", "Job d'été, baby-sitting, caissier — montrent que tu sais travailler"],
    ["🏆", "Engagement extra", "BDE, tutorat, bénévolat, sport — montrent ta personnalité"],
    ["🌍", "Langues et mobilité", "Ton niveau d'anglais, expériences à l'étranger, permis"],
  ].map(([icon, title, desc]) => `
  <div style="display:flex;gap:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px">
    <span style="font-size:20px;flex-shrink:0">${icon}</span>
    <div>
      <p style="font-weight:700;color:#111827;margin:0 0 3px 0;font-size:14px">${title}</p>
      <p style="color:#6b7280;margin:0;font-size:13px">${desc}</p>
    </div>
  </div>`).join("")}
</div>

<h2>Exemples de formulations qui marchent</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px">
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:10px 14px;text-align:left;color:#6b7280;border:1px solid #e5e7eb">Ce que tu as fait</th>
      <th style="padding:10px 14px;text-align:left;color:#16a34a;border:1px solid #e5e7eb">✅ Comment le formuler</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ["Projet de groupe en L3", "Développement d'une application web en équipe de 4, présentée à un jury professionnel"],
      ["Trésorier d'une asso étudiante", "Gestion d'un budget annuel de 8 000€, suivi des comptes et reporting mensuel"],
      ["Tutorat de camarades", "Accompagnement pédagogique de 5 étudiants, taux de réussite 100% aux examens"],
      ["Stage d'observation 2 semaines", "Découverte du service commercial : participation aux réunions client et CRM"],
    ].map(([from, to]) => `
    <tr>
      <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#374151">${from}</td>
      <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827;font-weight:500">${to}</td>
    </tr>`).join("")}
  </tbody>
</table>

<h2>La lettre de motivation : obligatoire pour un stage</h2>
<p>Pour un stage, la lettre de motivation est encore plus importante que le CV. Elle répond à la question : <strong>pourquoi cette entreprise ? pourquoi maintenant ?</strong></p>

<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:20px;margin:16px 0">
  <p style="font-weight:700;color:#6d28d9;margin:0 0 12px 0">Structure en 3 paragraphes :</p>
  ${[
    ["1.", "Pourquoi cette entreprise", "Montre que tu les connais. Site, actualités, secteur."],
    ["2.", "Ce que tu apportes", "Compétences + projets pertinents + motivation réelle."],
    ["3.", "Ce que tu cherches à apprendre", "Les recruteurs adorent les stagiaires qui savent ce qu'ils veulent."],
  ].map(([n, title, desc]) => `
  <div style="display:flex;gap:10px;margin-bottom:8px">
    <span style="font-weight:700;color:#7c3aed;min-width:20px">${n}</span>
    <div>
      <span style="font-weight:700;color:#111827">${title}</span>
      <span style="color:#6b7280;font-size:13px"> — ${desc}</span>
    </div>
  </div>`).join("")}
</div>

<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#1e40af;margin:0 0 4px 0">⚡ CV + lettre de motivation en 30 secondes</p>
  <p style="color:#1d4ed8;margin:0;font-size:14px">CVAdapt génère ton CV ET ta lettre de motivation adaptés à chaque offre de stage. Coche l'option "Lettre de motivation" avant de générer.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#16a34a;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon CV de stage →</a>
</div>
    `,
  },
  {
    slug: "cv-premier-emploi-jeune-diplome",
    titre: "CV jeune diplômé 2025 : décrocher son premier emploi après les études",
    description: "Tu viens de finir tes études et tu cherches ton premier CDI ? Voici comment construire un CV de jeune diplômé qui convainc les recruteurs — même avec peu d'expérience professionnelle.",
    date: "2025-05-08",
    categorie: "Débutants",
    tempsLecture: "4 min",
    illustration: "🚀",
    couleur: "from-orange-500 to-amber-500",
    contenu: `
<div style="background:#fff7ed;border-left:4px solid #f59e0b;padding:16px 20px;border-radius:8px;margin-bottom:28px">
  <p style="font-weight:700;color:#b45309;margin:0 0 4px 0">🎓 La bonne nouvelle</p>
  <p style="color:#92400e;margin:0;font-size:15px">Les entreprises cherchent des jeunes diplômés. Tu arrives avec des <strong>connaissances récentes et à jour</strong> — c'est un vrai avantage.</p>
</div>

<h2>Ce qui différencie les jeunes diplômés qui décrochent</h2>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0">
  ${[
    ["❌", "CV copie des autres", "Même structure, mêmes formules génériques, aucune différenciation"],
    ["✅", "CV adapté à l'offre", "Mots-clés repris de l'offre, profil qui répond exactement au besoin"],
    ["❌", "Formation en dernier", "Expériences (rares) en premier, formation noyée à la fin"],
    ["✅", "Formation mise en avant", "Projets, spécialisation, compétences acquises — ton vrai atout"],
  ].map(([emoji, title, desc]) => `
  <div style="background:${emoji === "✅" ? "#f0fdf4" : "#fef2f2"};border:1px solid ${emoji === "✅" ? "#bbf7d0" : "#fecaca"};border-radius:10px;padding:14px">
    <p style="font-size:18px;margin:0 0 6px 0">${emoji}</p>
    <p style="font-weight:700;color:#111827;font-size:13px;margin:0 0 4px 0">${title}</p>
    <p style="color:#6b7280;font-size:12px;margin:0;line-height:1.5">${desc}</p>
  </div>`).join("")}
</div>

<h2>Les 3 questions que se pose le recruteur</h2>

<div style="display:grid;gap:10px;margin:20px 0">
  ${[
    ["❓", "Est-ce qu'il/elle peut faire le job ?", "Montre tes compétences techniques + projets où tu les as appliquées"],
    ["❓", "S'intégrera-t-il/elle à l'équipe ?", "Montre tes expériences de travail en groupe, ton engagement associatif"],
    ["❓", "A-t-il/elle envie de progresser ?", "Montre ta curiosité : certifications, projets perso, veille sectorielle"],
  ].map(([icon, question, reponse]) => `
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px">
    <p style="font-weight:700;color:#111827;margin:0 0 6px 0;font-size:14px">${icon} ${question}</p>
    <p style="color:#6b7280;font-size:13px;margin:0;padding-left:20px;border-left:2px solid #e5e7eb">${reponse}</p>
  </div>`).join("")}
</div>

<h2>Transforme tes études en expérience concrète</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px">
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:10px 14px;text-align:left;color:#6b7280;border:1px solid #e5e7eb">Ce que tu as fait pendant tes études</th>
      <th style="padding:10px 14px;text-align:left;color:#16a34a;border:1px solid #e5e7eb">✅ Comment le valoriser</th>
    </tr>
  </thead>
  <tbody>
    ${[
      ["Mémoire de fin d'études", "Recherche sur [sujet], analyse de données, présentation orale jury 5 personnes"],
      ["Stage de 6 mois", "Mission X, résultat Y, compétences acquises Z"],
      ["Cours en groupe", "Gestion de projet, répartition des tâches, livraison dans les délais"],
      ["Double diplôme / échange Erasmus", "Adaptabilité, langues, ouverture interculturelle"],
    ].map(([from, to]) => `
    <tr>
      <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#374151">${from}</td>
      <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827;font-weight:500">${to}</td>
    </tr>`).join("")}
  </tbody>
</table>

<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin:24px 0">
  <p style="font-weight:700;color:#15803d;margin:0 0 4px 0">⚡ Adapte ton CV à chaque offre</p>
  <p style="color:#166534;margin:0;font-size:14px">Le secret des jeunes diplômés qui décrochent : ils adaptent leur CV à chaque offre. CVAdapt le fait automatiquement en 30 secondes.</p>
</div>

<div style="text-align:center;margin-top:32px">
  <a href="/generate" style="display:inline-block;background:#f59e0b;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:16px">Créer mon CV jeune diplômé →</a>
</div>
    `,
  },
];
