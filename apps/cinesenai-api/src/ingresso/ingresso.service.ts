import { Prisma } from '@cinesenai-monorepo/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngressoService {
  constructor(private readonly prismaService: PrismaService) {}

  async buscarPorIdAsync(id: number) {
    return await this.prismaService.ingresso.findUnique({
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
  }

  async criarAsync(ingresso: Prisma.IngressoCreateArgs) {
    return await this.prismaService.ingresso.create(ingresso);
  }
}
