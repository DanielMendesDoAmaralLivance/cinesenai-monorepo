import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const filme = await prisma.filme.findUnique({
      where: {
        id: id,
      },
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
        sessoes: {
          where: {
            inicio: {
              gte: new Date(),
            },
          },
          include: {
            tipoSessao: true,
            sala: {
              include: {
                tipoSala: true,
              },
            },
            tipoIdioma: true,
          },
          orderBy: {
            inicio: "asc",
          },
        },
      },
    });

    if (!filme) {
      return NextResponse.json(
        { error: "Filme não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(filme);
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return NextResponse.json(
      { error: "Erro ao buscar filme" },
      { status: 500 }
    );
  }
}
