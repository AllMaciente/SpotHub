import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SnowflakeService } from './snowflake/snowflake.service';
import { PrismaService } from './prisma/prisma.service';
import { HashService } from './hash/hash.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: [SnowflakeService, PrismaService, HashService],
})
export class AppModule {}
