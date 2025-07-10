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

export type SessaoDetalhes = Prisma.SessaoGetPayload<{
  include: {
    sala: {
      include: {
        assentos: true;
      };
    };
    filme: true;
    sessoesAssentos: true;
  };
}>;

export type IngressoDetalhes = Prisma.IngressoGetPayload<{
  include: {
    sessoesAssentos: {
      include: {
        sessao: {
          include: {
            filme: true;
            sala: true;
          };
        };
        assento: true;
      };
    };
    pagamento: true;
  };
}>;
