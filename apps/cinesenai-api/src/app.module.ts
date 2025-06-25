import { Module } from '@nestjs/common';
import { FilmeController } from 'src/filme/filme.controller';
import { FilmeService } from 'src/filme/filme.service';
import { PrismaService } from 'src/prisma.service';
import { GeneroController } from 'src/genero/genero.controller';
import { GeneroService } from 'src/genero/genero.service';
import { SessaoService } from './sessao/sessao.service';
import { SessaoController } from './sessao/sessao.controller';

@Module({
  imports: [],
  controllers: [FilmeController, GeneroController, SessaoController],
  providers: [FilmeService, GeneroService, SessaoService, PrismaService],
})
export class AppModule {}
