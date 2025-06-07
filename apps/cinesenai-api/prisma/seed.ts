import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await seedGeneros();
}

async function seedGeneros() {
  const generos = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Fantasia',
    'Ficção científica',
    'Terror',
    'Animação',
    'Documentário',
    'Romance',
    'Suspense',
    'Musical',
    'Policial',
  ];

  for (const genero of generos) {
    await prisma.genero.upsert({
      where: { nome: genero },
      update: {},
      create: { nome: genero },
    });
  }
}

main()
  .then(() => {
    console.log('Seed concluído!');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
