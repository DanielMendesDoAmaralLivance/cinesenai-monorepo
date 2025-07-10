import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngressoService } from './ingresso.service';
import { Prisma } from '@cinesenai-monorepo/types';

@Controller('ingresso')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @Get(':id')
  async buscarPorIdAsync(@Param() params: { id: string }) {
    return await this.ingressoService.buscarPorIdAsync(Number(params.id));
  }

  @Post()
  async criar(@Body() ingresso: Prisma.IngressoCreateArgs): Promise<number> {
    const result = await this.ingressoService.criarAsync(ingresso);

    return result.id;
  }
}
