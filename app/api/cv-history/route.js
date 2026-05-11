import { auth } from "@clerk/nextjs/server";
import { getUserCVHistory, getCVById, deleteCV } from "@/lib/supabase";

// GET /api/cv-history → liste des CV de l'utilisateur connecté
export async function GET(request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Connexion requise." }, { status: 401 });
  }

  const url = new URL(request.url);
  const id  = url.searchParams.get("id");

  try {
    if (id) {
      const cv = await getCVById(id, userId);
      return Response.json({ cv });
    } else {
      const history = await getUserCVHistory(userId, 10);
      return Response.json({ history });
    }
  } catch (error) {
    console.error("cv-history GET error:", error);
    return Response.json({ error: "Erreur lors de la récupération." }, { status: 500 });
  }
}

// DELETE /api/cv-history?id=xxx → supprime un CV
export async function DELETE(request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Connexion requise." }, { status: 401 });
  }

  const url = new URL(request.url);
  const id  = url.searchParams.get("id");

  if (!id) {
    return Response.json({ error: "ID manquant." }, { status: 400 });
  }

  try {
    await deleteCV(id, userId);
    return Response.json({ success: true });
  } catch (error) {
    console.error("cv-history DELETE error:", error);
    return Response.json({ error: "Erreur lors de la suppression." }, { status: 500 });
  }
}
