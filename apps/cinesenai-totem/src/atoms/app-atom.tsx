import type { Prisma } from "@cinesenai-monorepo/types";
import { atom } from "jotai";

export interface AppAtomProps {
  cpf: string;
  sessoesAssentos: Prisma.SessaoAssentoGetPayload<{
    include: {
      assento: true;
    };
  }>[];
}

export const appAtom = atom<AppAtomProps>({
  cpf: "",
  sessoesAssentos: [],
});
