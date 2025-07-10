import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "@tanstack/react-router";
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";
import { ClassificacaoIndicativa } from "./classificacao-inditicativa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";

export const FilmeCard = ({
  id,
  titulo,
  capaUrl,
  generos,
  classificacaoIndicativaId,
  duracaoEmMinutos,
}: FilmeComGeneros) => {
  const [filmeA18DialogIsOpen, setFilmeA18DialogIsOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={() => {
          if (classificacaoIndicativaId !== 6) {
            router.navigate({
              to: "/filmes/$filmeId",
              params: { filmeId: String(id) },
            });
          } else {
            setFilmeA18DialogIsOpen(true);
          }
        }}
        className="cursor-pointer"
      >
        <Card className="overflow-hidden rounded-lg p-0 mb-1">
          <div className="h-[320px] w-full relative">
            <img
              src={capaUrl}
              alt={titulo}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Card>
        <Card className="rounded-lg min-h-[125px]">
          <CardContent className="px-4 flex flex-col justify-between">
            <div className="min-h-[50px]">
              <h2 className="text-lg font-bold leading-tight uppercase">
                {titulo}
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-300">
                <span>{generos[0]?.genero?.nome ?? "Indefinido"}</span>
                <span className="text-xs">•</span>
                <span>{duracaoEmMinutos}m</span>
              </div>

              <ClassificacaoIndicativa
                classificacaoIndicativaId={classificacaoIndicativaId}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <FilmeA18Dialog
        isOpen={filmeA18DialogIsOpen}
        setIsOpen={setFilmeA18DialogIsOpen}
        filmeId={id}
      />
    </>
  );
};

interface FilmeA18DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filmeId: number;
}

const FilmeA18Dialog = ({
  isOpen,
  setIsOpen,
  filmeId,
}: FilmeA18DialogProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Este filme é para maiores de 18 anos
          </AlertDialogTitle>
          <AlertDialogDescription>
            Você precisa ter pelo menos 18 anos para assistir a este filme.
            Antes de prosseguir, por favor, confirme que você tem a idade mínima
            necessária. Documentos poderão ser solicitados na entrada da sala.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Tenho menos de 18 anos
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              router.navigate({
                to: "/filmes/$filmeId",
                params: { filmeId: String(filmeId) },
              });
            }}
          >
            Tenho 18 anos ou mais
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
