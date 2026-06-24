import bcrypt from 'bcrypt';
import { prisma } from '../app.js';
import { WoodType, Hardness } from '../generated/prisma/enums.js';


async function main() {

  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
    },
  });

  const woods = [
    { name: 'Épicéa', type: WoodType.softwood, hardness: Hardness.tender },
    { name: 'Pin', type: WoodType.softwood, hardness: Hardness.tender },
    { name: 'Padouk', type: WoodType.exotic_wood, hardness: Hardness.hard },
    { name: 'Érable', type: WoodType.noble_and_hardwoods, hardness: Hardness.medium_hard },
    { name: 'Hêtre', type: WoodType.noble_and_hardwoods, hardness: Hardness.medium_hard },
    { name: 'Itauba', type: WoodType.exotic_wood, hardness: Hardness.hard },
    { name: 'Douglas', type: WoodType.softwood, hardness: Hardness.tender },
  ];

  for (const wood of woods) {
    await prisma.wood.upsert({
      where: { name: wood.name },
      update: {},
      create: wood,
    });
  }

  console.log('Seeds effectués !');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });