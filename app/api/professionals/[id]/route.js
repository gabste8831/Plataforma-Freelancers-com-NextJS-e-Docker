import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.professional.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Profissional excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir profissional:", error);
    return NextResponse.json({ error: "Erro ao excluir profissional" }, { status: 500 });
  }
}
