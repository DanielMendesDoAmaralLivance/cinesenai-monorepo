import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Link } from "@tanstack/react-router";
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";
import { ClassificacaoIndicativa } from "./classificacao-inditicativa";

export const FilmeCard = ({
  id,
  titulo,
  capaUrl,
  generos,
  classificacaoIndicativaId,
  duracaoEmMinutos,
}: FilmeComGeneros) => {
  return (
    <Link to="/filme/:id" params={{ id }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
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
    </Link>
  );
};
