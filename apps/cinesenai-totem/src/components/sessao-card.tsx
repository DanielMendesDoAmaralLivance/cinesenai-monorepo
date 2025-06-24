import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { FilmeDetalhes } from "@cinesenai-monorepo/types-custom";
import clsx from "clsx";

export const SessaoCard = (sessao: FilmeDetalhes["sessoes"][0]) => {
  return (
    <Link>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card className="rounded-lg min-h-[125px] w-[190px] col-span-1">
          <CardContent className="px-4 flex flex-col justify-between">
            <div className="min-h-[35px] text-sm font-medium">
              <h1>{formatarDataExtenso(new Date(sessao.inicio))}</h1>
            </div>

            <div className="flex items-center flex-wrap">
              <BadgeSala
                numero={sessao.sala.numero}
                tipoSalaId={sessao.sala.tipoSalaId}
              />
              <BadgeTipoSessao tipoSessaoId={sessao.tipoSessaoId} />
              <BadgeTipoIdioma tipoIdiomaId={sessao.tipoIdiomaId} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

type BadgeSalaProps = {
  numero: string;
  tipoSalaId: number;
};

const BadgeSala = ({ numero, tipoSalaId }: BadgeSalaProps) => {
  const tipoSalaAtributos = {
    1: { texto: "Padrão" },
    2: { cor: "bg-amber-300", texto: "VIP" },
    3: { cor: "bg-purple-500 text-accent-foreground", texto: "4D" },
  }[tipoSalaId];

  return (
    <Badge
      className={clsx("mr-1 mb-1", tipoSalaAtributos?.cor)}
    >{`Sala ${numero} (${tipoSalaAtributos?.texto})`}</Badge>
  );
};

type BadgeTipoSessaoProps = {
  tipoSessaoId: number;
};

const BadgeTipoSessao = ({ tipoSessaoId }: BadgeTipoSessaoProps) => {
  const tipoSessaoAtributos = {
    1: {
      cor: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-accent-foreground",
      texto: "3D",
    },
    2: { texto: "Padrão" },
    3: { cor: "bg-blue-400 text-accent-foreground", texto: "CineAzul" },
  }[tipoSessaoId];

  return (
    <Badge className={clsx("mr-1 mb-1", tipoSessaoAtributos?.cor)}>
      {tipoSessaoAtributos!.texto}
    </Badge>
  );
};

type BadgeTipoIdiomaProps = {
  tipoIdiomaId: number;
};

const BadgeTipoIdioma = ({ tipoIdiomaId }: BadgeTipoIdiomaProps) => {
  const tipoIdiomaAtributos = {
    1: {
      texto: "DUB",
    },
    2: { texto: "LEG" },
    3: { texto: "ORIG" },
  }[tipoIdiomaId];

  return (
    <Badge className="mr-1 mb-1 bg-destructive">
      {tipoIdiomaAtributos!.texto}
    </Badge>
  );
};

function formatarDataExtenso(date: Date) {
  const str = date
    .toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    })
    .replace(".", "");
  // Capitaliza a primeira letra e a do mês
  return str.replace(
    /^([a-zá-úç]{3}), (\d{2}) de ([a-zá-úç]+)/i,
    (_, dia, num, mes) => {
      return (
        dia.charAt(0).toUpperCase() +
        dia.slice(1) +
        ", " +
        num +
        " de " +
        mes.charAt(0).toUpperCase() +
        mes.slice(1)
      );
    }
  );
}
