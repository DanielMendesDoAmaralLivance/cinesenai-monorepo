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

    const ingresso = await prisma.ingresso.findUnique({
      where: { id },
      include: {
        sessoesAssentos: {
          include: {
            sessao: {
              include: {
                filme: true,
                sala: true,
              },
            },
            assento: true,
          },
        },
        pagamento: true,
      },
    });

    if (!ingresso) {
      return NextResponse.json(
        { error: "Ingresso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(ingresso);
  } catch (error) {
    console.error("Erro ao buscar ingresso:", error);
    return NextResponse.json(
      { error: "Erro ao buscar ingresso" },
      { status: 500 }
    );
  }
}
