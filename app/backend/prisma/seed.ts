import { PrismaClient } from '../src/generated/prisma';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await argon2.hash('password123');

  const users = [];
  const roles: Array<'ADMIN' | 'GESTOR' | 'USER'> = ['ADMIN', 'GESTOR', 'USER'];

  for (let i = 0; i < 15; i++) {
    const role = i < 1 ? 'ADMIN' : i < 4 ? 'GESTOR' : 'USER';
    const user = await prisma.user.create({
      data: {
        id: BigInt(1000000000000 + i),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
        name: faker.person.fullName(),
        role,
      },
    });
    users.push(user);
    console.log(`✅ Created user: ${user.email} (${role})`);
  }

  const roomResources = [
    ['TV', 'Projetor', 'Quadro Branco'],
    ['TV', 'VideoConferência'],
    ['Projetor', 'Quadro Branco', 'Webcam'],
    ['TV', 'Quadro Branco'],
    ['VideoConferência', 'Webcam'],
    ['Projetor'],
    ['TV', 'VideoConferência', 'Quadro Branco', 'Webcam'],
    ['Quadro Branco'],
  ];

  const rooms = [];
  for (let i = 0; i < 8; i++) {
    const room = await prisma.room.create({
      data: {
        name: `Sala ${faker.location.room()}`,
        capacity: faker.number.int({ min: 4, max: 20 }),
        resources: roomResources[i],
        location: faker.location.floor(),
        active: true,
      },
    });
    rooms.push(room);
    console.log(`✅ Created room: ${room.name} (cap: ${room.capacity})`);
  }

  const statuses: Array<'CONFIRMED' | 'CANCELLED' | 'PENDING'> = [
    'CONFIRMED',
    'CANCELLED',
    'PENDING',
  ];

  for (let i = 0; i < 30; i++) {
    const start = faker.date.soon({ days: 30 });
    const end = new Date(start.getTime() + faker.number.int({ min: 1, max: 4 }) * 60 * 60 * 1000);

    await prisma.reservation.create({
      data: {
        roomId: faker.helpers.arrayElement(rooms).id,
        userId: faker.helpers.arrayElement(users).id,
        start,
        end,
        status: faker.helpers.arrayElement(statuses),
        title: faker.lorem.words(3),
      },
    });
    console.log(`✅ Created reservation ${i + 1}/30`);
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
