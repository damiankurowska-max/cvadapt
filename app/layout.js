import "./globals.css";

export const metadata = {
  title: "CVAdapt - Ton CV adapté à chaque offre d'emploi",
  description: "Génère automatiquement un CV optimisé pour chaque offre d'emploi en 30 secondes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
