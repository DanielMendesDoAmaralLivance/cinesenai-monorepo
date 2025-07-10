import { Module } from '@nestjs/common';
import { FilmeController } from 'src/filme/filme.controller';
import { FilmeService } from 'src/filme/filme.service';
import { PrismaService } from 'src/prisma.service';
import { GeneroController } from 'src/genero/genero.controller';
import { GeneroService } from 'src/genero/genero.service';
import { SessaoService } from './sessao/sessao.service';
import { SessaoController } from './sessao/sessao.controller';
import { IngressoController } from './ingresso/ingresso.controller';
import { IngressoService } from './ingresso/ingresso.service';

@Module({
  imports: [],
  controllers: [
    FilmeController,
    GeneroController,
    SessaoController,
    IngressoController,
  ],
  providers: [
    FilmeService,
    GeneroService,
    SessaoService,
    IngressoService,
    PrismaService,
  ],
})
export class AppModule {}
