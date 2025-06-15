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
