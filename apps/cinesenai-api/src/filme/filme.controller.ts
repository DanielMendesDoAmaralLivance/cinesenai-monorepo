import { Controller, Get } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { Filme } from '@cinesenai-monorepo/types';

@Controller('filme')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Get('em-cartaz')
  async listarTodosEmCartazAsync(): Promise<Filme[]> {
    return await this.filmeService.listarTodosEmCartazAsync();
  }

  @Get('em-breve')
  async listarTodosEmBreveAsync(): Promise<Filme[]> {
    return await this.filmeService.listarTodosEmBreveAsync();
  }
}
