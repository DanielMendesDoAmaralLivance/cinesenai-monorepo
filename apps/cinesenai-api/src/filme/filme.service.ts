import type { FilmeComGeneros } from '@cinesenai-monorepo/types-custom';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilmeService {
  constructor(private readonly prismaService: PrismaService) {}

  async listarTodosEmCartazAsync(): Promise<FilmeComGeneros[]> {
    const hoje = new Date();

    return await this.prismaService.filme.findMany({
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
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
      },
    });
  }

  async listarTodosEmBreveAsync(): Promise<FilmeComGeneros[]> {
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
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
      },
    });
  }

  async buscarPorIdAsync(id: number) {
    return this.prismaService.filme.findUnique({
      where: {
        id: id,
      },
      include: {
        generos: {
          include: {
            genero: true,
          },
        },
        integrantes: {
          include: {
            integrante: {
              include: {
                tipoIntegrante: true,
              },
            },
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
            inicio: 'asc',
          },
        },
      },
    });
  }
}
