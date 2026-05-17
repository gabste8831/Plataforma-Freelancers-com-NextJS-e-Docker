import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { hiredProfessionalId, isClosed } = body;

    console.log("Tentando atualizar projeto:", { projectId: id, hiredProfessionalId, isClosed });

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: { 
        hiredProfessionalId: hiredProfessionalId !== undefined ? hiredProfessionalId : undefined,
        isClosed: isClosed !== undefined ? isClosed : undefined
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("ERRO DETALHADO NO VÍNCULO:", error);
    return NextResponse.json({ 
      error: "Erro ao vincular profissional",
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Projeto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir projeto:", error);
    return NextResponse.json({ error: "Erro ao excluir projeto" }, { status: 500 });
  }
}
