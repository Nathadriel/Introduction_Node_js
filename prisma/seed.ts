import { prisma } from '../app.js';

async function main() {
  await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    },
  });

  await prisma.wood.createMany({
    data: [
        { name: 'Épicéa', type: 'softwood', hardness: 'tender' },
        { name: 'Pin', type: 'softwood', hardness: 'tender' },
        { name: 'Padouk', type: 'exotic_wood', hardness: 'hard' },
        { name: 'Érable', type: 'noble_and_hardwoods', hardness: 'medium_hard' },
        { name: 'Hêtre', type: 'noble_and_hardwoods', hardness: 'medium_hard' },
        { name: 'Itauba', type: 'exotic_wood', hardness: 'hard' },
        { name: 'Douglas', type: 'softwood', hardness: 'tender' },
    ],
  });

  console.log('Seeds effectués !');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });