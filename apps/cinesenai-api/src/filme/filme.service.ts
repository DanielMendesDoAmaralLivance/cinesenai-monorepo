import { Filme } from '@cinesenai-monorepo/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilmeService {
  constructor(private readonly prismaService: PrismaService) {}

  async listarTodosEmCartazAsync(): Promise<Filme[]> {
    const hoje = new Date();

    return this.prismaService.filme.findMany({
      where: {
        dataInicioCartaz: {
          lte: hoje,
        },
        dataFimCartaz: {
          gte: hoje,
        },
      },
      orderBy: {
        titulo: 'asc',
      },
    });
  }

  async listarTodosEmBreveAsync(): Promise<Filme[]> {
    const hoje = new Date();

    return this.prismaService.filme.findMany({
      where: {
        dataInicioCartaz: {
          gt: hoje,
        },
      },
      orderBy: {
        titulo: 'asc',
      },
    });
  }
}
