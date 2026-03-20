import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SnowflakeService } from 'src/snowflake/snowflake.service';
import { HashService } from 'src/hash/hash.service';
import { jwtConstants } from './constants';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },

  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, SnowflakeService, HashService],
})
export class AuthModule { }
