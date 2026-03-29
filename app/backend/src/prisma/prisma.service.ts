import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool as any);
    super({
      adapter,
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async paginate(
    model: keyof PrismaClient,
    query: { page: number; limit: number },
    options?: {
      where?: Record<string, any>;
      select?: Record<string, any>;
      include?: Record<string, any>;
      orderBy?: Record<string, any>;
    },
  ) {
    const { page, limit } = query;
    const { where, select, include, orderBy } = options || {};
    const [data, total] = await Promise.all([
      (this[model] as any).findMany({
        where,
        select,
        include,
        orderBy,
        take: limit,
        skip: (page - 1) * limit,
      }),
      (this[model] as any).count({ where }),
    ]);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
