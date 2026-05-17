import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const pros = await prisma.professional.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pros);
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    return NextResponse.json({ error: "Erro ao buscar profissionais" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, skills, hourlyRate, about } = body;

    // Validate
    if (!name || !role || hourlyRate == null || !about) {
      return NextResponse.json({ error: "Preencha os campos obrigatórios." }, { status: 400 });
    }

    const pro = await prisma.professional.create({
      data: {
        name,
        role,
        skills: skills || "",
        hourlyRate: parseFloat(hourlyRate),
        about,
      },
    });

    return NextResponse.json(pro, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    return NextResponse.json({ error: "Erro ao cadastrar o perfil" }, { status: 500 });
  }
}
