import { motion } from "framer-motion";
import { Card, CardContent } from "./card";
import { Link } from "@tanstack/react-router";
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";

export const FilmeCard = ({ titulo, capaUrl, generos }: FilmeComGeneros) => {
  return (
    <Link>
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
        <Card className="rounded-lg">
          <CardContent className="px-4">
            <h2 className="text-lg font-bold leading-tight uppercase">
              {titulo}
            </h2>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-300">
                <span>{generos[0]?.genero.nome}</span>
                <span className="text-xs">•</span>
                <span>125m</span>
              </div>

              <div className="bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium">
                10
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
