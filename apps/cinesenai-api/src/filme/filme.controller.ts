import { Controller, Get, Param } from '@nestjs/common';
import { FilmeService } from './filme.service';
import type { FilmeComGeneros } from '@cinesenai-monorepo/types-custom';

@Controller('filme')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Get('em-cartaz')
  async listarTodosEmCartazAsync(): Promise<FilmeComGeneros[]> {
    return await this.filmeService.listarTodosEmCartazAsync();
  }

  @Get('em-breve')
  async listarTodosEmBreveAsync(): Promise<FilmeComGeneros[]> {
    return await this.filmeService.listarTodosEmBreveAsync();
  }

  @Get(':id')
  async buscarPorIdAsync(@Param() params: { id: string }) {
    return await this.filmeService.buscarPorIdAsync(Number(params.id));
  }
}
