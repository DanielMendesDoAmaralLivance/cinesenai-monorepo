import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";

export async function GET(
  request: NextRequest
): Promise<NextResponse<FilmeComGeneros[]>> {
  try {
    const hoje = new Date();

    const filmes = await prisma.filme.findMany({
      where: {
        dataInicioCartaz: {
          gt: hoje,
        },
      },
      orderBy: {
        titulo: "asc",
      },
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
      },
    });

    return NextResponse.json(filmes);
  } catch (error) {
    console.error("Erro ao buscar filmes em breve:", error);
    return NextResponse.json([], { status: 500 });
  }
}
