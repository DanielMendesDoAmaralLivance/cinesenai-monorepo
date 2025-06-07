/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  PrismaClient,
  TipoIntegranteEnum,
  ClassificacaoIndicativaEnum,
  TipoIdiomaEnum,
  TipoSessaoEnum,
  TipoSalaEnum,
  TipoAssentoEnum,
  SessaoAssentoStatusEnum,
  TipoEntradaEnum,
  FormaPagamentoEnum,
} from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await seedGenero();
  await seedTipoIntegrante();
  await seedClassificacaoIndicativa();
  await seedTipoIdioma();
  await seedTipoSessao();
  await seedTipoSala();
  await seedTipoAssento();
  await seedSessaoAssentoStatus();
  await seedTipoEntrada();
  await seedFormaPagamento();
}

async function seedGenero() {
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

async function seedTipoIntegrante() {
  const tiposIntegrantes = Object.values(TipoIntegranteEnum);

  for (const tipo of tiposIntegrantes) {
    await prisma.tipoIntegrante.upsert({
      where: { nome: tipo },
      update: {},
      create: { nome: tipo },
    });
  }
}

async function seedClassificacaoIndicativa() {
  const classificacoesIndicativas = Object.values(ClassificacaoIndicativaEnum);

  for (const classificacaoIndicativa of classificacoesIndicativas) {
    await prisma.classificacaoIndicativa.upsert({
      where: { nome: classificacaoIndicativa },
      update: {},
      create: { nome: classificacaoIndicativa },
    });
  }
}

async function seedTipoIdioma() {
  const tiposIdiomas = Object.values(TipoIdiomaEnum);

  for (const tipoIdioma of tiposIdiomas) {
    await prisma.tipoIdioma.upsert({
      where: { nome: tipoIdioma },
      update: {},
      create: { nome: tipoIdioma },
    });
  }
}

async function seedTipoSessao() {
  const tiposSessoes = Object.values(TipoSessaoEnum);

  for (const tipoSessao of tiposSessoes) {
    await prisma.tipoSessao.upsert({
      where: { nome: tipoSessao },
      update: {},
      create: { nome: tipoSessao },
    });
  }
}

async function seedTipoSala() {
  const tiposSalas = Object.values(TipoSalaEnum);

  for (const tipoSala of tiposSalas) {
    await prisma.tipoSala.upsert({
      where: { nome: tipoSala },
      update: {},
      create: { nome: tipoSala },
    });
  }
}

async function seedTipoAssento() {
  const tiposAssentos = Object.values(TipoAssentoEnum);

  for (const tipoAssento of tiposAssentos) {
    await prisma.tipoAssento.upsert({
      where: { nome: tipoAssento },
      update: {},
      create: { nome: tipoAssento },
    });
  }
}

async function seedSessaoAssentoStatus() {
  const sessoesAssentosStatus = Object.values(SessaoAssentoStatusEnum);

  for (const sessaoAssentoStatus of sessoesAssentosStatus) {
    await prisma.sessaoAssentoStatus.upsert({
      where: { nome: sessaoAssentoStatus },
      update: {},
      create: { nome: sessaoAssentoStatus },
    });
  }
}

async function seedTipoEntrada() {
  const tiposEntradas = Object.values(TipoEntradaEnum);

  for (const tipoEntrada of tiposEntradas) {
    await prisma.tipoEntrada.upsert({
      where: { nome: tipoEntrada },
      update: {},
      create: { nome: tipoEntrada },
    });
  }
}

async function seedFormaPagamento() {
  const formasPagamento = Object.values(FormaPagamentoEnum);

  for (const formaPagamento of formasPagamento) {
    await prisma.formaPagamento.upsert({
      where: { nome: formaPagamento },
      update: {},
      create: { nome: formaPagamento },
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
