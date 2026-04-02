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
      where?: Record<string, unknown>;
      select?: Record<string, unknown>;
      include?: Record<string, unknown>;
      orderBy?: Record<string, unknown>;
    },
  ): Promise<{
    data: unknown[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const { page, limit } = query;
    const { where, select, include, orderBy } = options || {};

    const dynamicModel = this[model] as any;

    const [data, total]: [any[], number] = await Promise.all([
      dynamicModel.findMany({
        where,
        select,
        include,
        orderBy,
        take: limit,
        skip: (page - 1) * limit,
      }),

      dynamicModel.count({ where }),
    ]);
    return {
      data: data as unknown[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
