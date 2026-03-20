import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { SnowflakeService } from '../snowflake/snowflake.service';
import { HashService } from '../hash/hash.service';

import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private snowflake: SnowflakeService,
    private hash: HashService,
    private jwt: JwtService,
  ) { }

  async signup(data: SignupDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userAlreadyExists) {
      throw new UnauthorizedException('User with this email already exists');
    }
    const hashedPassword = await this.hash.hash(data.password);
    const user = await this.prisma.user.create({
      data: {
        id: this.snowflake.getNextId(),
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async signin(data: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await this.hash.verify(
      user.password,
      data.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwt.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    return {
      accessToken
    };
  }
}
