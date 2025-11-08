import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { Prisma } from "@cinesenai-monorepo/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valida se o corpo da requisição está no formato esperado
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Corpo da requisição inválido" },
        { status: 400 }
      );
    }

    // Cria o ingresso usando os dados fornecidos
    const ingresso = await prisma.ingresso.create(
      body as Prisma.IngressoCreateArgs
    );

    // Retorna apenas o ID do ingresso criado
    return NextResponse.json(ingresso.id, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar ingresso:", error);
    return NextResponse.json(
      { error: "Erro ao criar ingresso" },
      { status: 500 }
    );
  }
}
