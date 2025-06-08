import { atom } from "jotai";

export interface AppAtomProps {
  cpf: string;
}

export const appAtom = atom<AppAtomProps>({
  cpf: "",
});
