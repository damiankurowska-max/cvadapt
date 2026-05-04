export const articles = [
  {
    slug: "comment-faire-un-cv-en-2025",
    titre: "Comment faire un CV en 2025 qui attire les recruteurs",
    description: "Structure, mots-clés, mise en page — tout ce qu'il faut pour un CV moderne qui passe les filtres et accroche les recruteurs.",
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
    description: "80% des CV sont éliminés automatiquement. Découvre les 5 règles pour que ton CV soit toujours lu par un humain.",
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
    description: "Tu changes de secteur ? Voici comment valoriser tes compétences transférables et construire un CV percutant pour ta reconversion.",
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
    description: "La méthode en 3 paragraphes pour rédiger une lettre percutante — et les 5 erreurs qui font que la tienne finit à la corbeille.",
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
    description: "Tu n'as pas encore d'expérience pro ? Voici quoi mettre dans ton CV et comment le rendre convaincant pour les recruteurs.",
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
];
