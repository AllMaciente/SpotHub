import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { userPublicSelect } from './user.select';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: PaginationDto) {
    return this.prisma.paginate('user', query, { select: userPublicSelect });
  }

  async updateUser(data: UpdateUserDto, req) {
    const { id: requesterId, role: requesterRole } = req.user;
    const targetUserId = data.userId ?? requesterId;
    const { userId, ...updateData } = data;

    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    if (requesterRole !== 'ADMIN' && requesterId !== targetUserId) {
      throw new ForbiddenException('You can only update your own profile');
    }

    if (updateData.role && requesterRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can change the role');
    }

    return this.prisma.user.update({
      where: { id: targetUserId },
      data: updateData,
      select: userPublicSelect,
    });
  }
}
