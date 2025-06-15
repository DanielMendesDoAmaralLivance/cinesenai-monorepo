import { Genero } from '@cinesenai-monorepo/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GeneroService {
  constructor(private readonly prismaService: PrismaService) {}

  async listarAsync(): Promise<Genero[]> {
    return await this.prismaService.genero.findMany();
  }
}
