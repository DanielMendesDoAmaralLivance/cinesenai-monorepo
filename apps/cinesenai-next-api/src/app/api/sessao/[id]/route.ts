import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const sessao = await prisma.sessao.findUnique({
      where: { id },
      include: {
        sala: {
          include: {
            assentos: true,
          },
        },
        filme: {
          include: {
            generos: {
              include: {
                genero: true,
              },
            },
          },
        },
        sessoesAssentos: true,
      },
    });

    if (!sessao) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(sessao);
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    return NextResponse.json(
      { error: "Erro ao buscar sessão" },
      { status: 500 }
    );
  }
}
