import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryUserDto } from './dto/queryUser.dto';
import { userPublicSelect } from './user.select';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getAll(query: QueryUserDto) {
        const { page, limit } = query
        return this.prisma.user.findMany({
            take: limit,
            skip: (page - 1) * limit,
            select: userPublicSelect
        })
    }
}
