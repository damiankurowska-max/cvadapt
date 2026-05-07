import { PhotoGallery } from "@/components/ui/gallery";
import Link from "next/link";

export const metadata = {
  title: "Galerie — CVAdapt",
  robots: { index: false },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pb-20">
      {/* Header minimal */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-blue-600 font-bold text-lg">← CVAdapt</Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-10">
        <PhotoGallery
          title="Nos Templates CV"
          subtitle="Choisis le design qui te correspond"
          ctaLabel="Générer mon CV →"
        />
      </div>
    </main>
  );
}
