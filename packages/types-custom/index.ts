import type { Prisma } from "@cinesenai-monorepo/types";

export type FilmeComGeneros = Prisma.FilmeGetPayload<{
  include: {
    generos: {
      include: {
        genero: true;
      };
    };
  };
}>;

export type FilmeDetalhes = Prisma.FilmeGetPayload<{
  include: {
    generos: {
      include: {
        genero: true;
      };
    };
    integrantes: {
      include: {
        integrante: {
          include: {
            tipoIntegrante: true;
          };
        };
      };
    };
    sessoes: {
      include: {
        tipoSessao: true;
        sala: {
          include: {
            tipoSala: true;
          };
        };
        tipoIdioma: true;
      };
    };
  };
}>;
