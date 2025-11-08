import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { Genero } from "@cinesenai-monorepo/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Genero[]>> {
  try {
    const generos = await prisma.genero.findMany();

    return NextResponse.json(generos);
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return NextResponse.json([], { status: 500 });
  }
}
