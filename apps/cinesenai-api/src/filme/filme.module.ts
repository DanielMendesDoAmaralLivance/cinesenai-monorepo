import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller';
import { FilmeService } from './filme.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [FilmeController],
  providers: [FilmeService, PrismaService],
})
export class FilmeModule {}
