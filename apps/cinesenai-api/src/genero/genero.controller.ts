import { Controller, Get } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { Genero } from '@cinesenai-monorepo/types';

@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Get()
  async listar(): Promise<Genero[]> {
    return await this.generoService.listarAsync();
  }
}
