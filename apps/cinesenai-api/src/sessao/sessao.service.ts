import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SessaoService {
  constructor(private readonly prismaService: PrismaService) {}

  async buscarPorIdAsync(id: number) {
    return await this.prismaService.sessao.findUnique({
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
  }
}
