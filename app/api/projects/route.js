import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar projetos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, budget, description } = body;

    // Basic validation
    if (!title || !category || budget == null || !description) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        budget: parseFloat(budget),
        description,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Erro ao publicar projeto:", error);
    return NextResponse.json(
      { error: "Erro ao publicar a vaga de freelance" },
      { status: 500 }
    );
  }
}
