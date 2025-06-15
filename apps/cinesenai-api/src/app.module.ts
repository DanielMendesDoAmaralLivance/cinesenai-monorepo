import { Module } from '@nestjs/common';
import { FilmeController } from 'src/filme/filme.controller';
import { FilmeService } from 'src/filme/filme.service';
import { PrismaService } from 'src/prisma.service';
import { GeneroController } from 'src/genero/genero.controller';
import { GeneroService } from 'src/genero/genero.service';

@Module({
  imports: [],
  controllers: [FilmeController, GeneroController],
  providers: [FilmeService, GeneroService, PrismaService],
})
export class AppModule {}
