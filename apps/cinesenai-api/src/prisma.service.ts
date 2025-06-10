import { PrismaClient } from '@cinesenai-monorepo/types';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
