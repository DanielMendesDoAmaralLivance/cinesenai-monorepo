import { Controller, Get, Param } from '@nestjs/common';
import { SessaoService } from './sessao.service';

@Controller('sessao')
export class SessaoController {
  constructor(private readonly sessaoService: SessaoService) {}

  @Get(':id')
  async buscarPorIdAsync(@Param() params: { id: string }) {
    return await this.sessaoService.buscarPorIdAsync(Number(params.id));
  }
}
