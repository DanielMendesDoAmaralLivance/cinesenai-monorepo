import {
  AssentoAcompanhante,
  AssentoDeficiente,
  AssentoEscolhido,
  AssentoIndisponivel,
  AssentoNamoradeiraDireita,
  AssentoNamoradeiraEsquerda,
  AssentoNormal,
  NaoTemAssento,
} from "@/components/assento";
import { BotaoNavegacao } from "@/components/botao-navegacao";
import { TipoIdiomaTexto } from "@/enums/tipo-idioma-enum";
import { TipoSalaTexto } from "@/enums/tipo-sala-enum";
import { TipoSessaoTexto } from "@/enums/tipo-sessao-enum";
import { TEMPO_LOADING, VITE_API_BASE_URL } from "@/lib/utils";
import type { Assento } from "@cinesenai-monorepo/types";
import type { SessaoDetalhes } from "@cinesenai-monorepo/types-custom";
import { useParams } from "@tanstack/react-router";
import {
  ArmchairIcon,
  ClapperboardIcon,
  DotIcon,
  Loader2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

export const SessaoDetalhesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { filmeId, sessaoId } = useParams({ strict: false });
  const [sessao, setSessao] = useState<SessaoDetalhes>();
  const [assentosEscolhidos, setAssentosEscolhidos] = useState<Assento[]>([]);

  const handleAssentosEscolhidos: (assento: Assento) => void = (assentos) => {
    if (assentosEscolhidos.some((x) => x.id === assentos.id)) {
      setAssentosEscolhidos((prev) => prev.filter((x) => x.id !== assentos.id));
      return;
    }
    setAssentosEscolhidos([...assentosEscolhidos, assentos]);
  };

  const buscarSessao = async () => {
    setIsLoading(true);
    const data = await fetch(`${VITE_API_BASE_URL}/api/sessao/${sessaoId}`);
    const response = await data.json();
    setSessao(response);

    setTimeout(() => {
      setIsLoading(false);
    }, TEMPO_LOADING);
  };

  useEffect(() => {
    void buscarSessao();
  }, []);

  return (
    <>
      {isLoading || !sessao ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col gap-5 text-neutral-300 mb-10 pt-7">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <h1 className="text-2xl font-bold mb-10">RESUMO DA COMPRA</h1>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-[40px] h-[40px] rounded-md object-cover opacity-75"
                    src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FmoviePoster%2FMoviePoster-ca6d7d43-4e0e-4f63-989b-ab84a4b1507e.png&w=1920&q=100"
                    loading="lazy"
                  />
                  <p className="uppercase text-muted-foreground font-bold text-sm">
                    {sessao?.filme.titulo}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-accent font-bold text-sm">
                    {new Date(String(sessao?.inicio))
                      .getDate()
                      .toString()
                      .padStart(2, "0")}
                  </div>
                  <p className="uppercase text-muted-foreground font-bold text-sm">
                    {formatarDataSessao(new Date(String(sessao?.inicio)))}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-accent font-bold text-sm shrink-0">
                    <ClapperboardIcon className="w-4 h-4" />
                  </div>
                  <p className="uppercase text-muted-foreground font-bold text-sm ">
                    Sala 1 (
                    {
                      TipoSalaTexto[
                        sessao.sala.tipoSalaId as keyof typeof TipoSalaTexto
                      ]
                    }
                    ), Sessão{" "}
                    {
                      TipoSessaoTexto[
                        sessao.tipoSessaoId as keyof typeof TipoSessaoTexto
                      ]
                    }
                    ,{" "}
                    {
                      TipoIdiomaTexto[
                        sessao.tipoIdiomaId as keyof typeof TipoIdiomaTexto
                      ]
                    }
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-accent font-bold text-sm">
                    <ArmchairIcon className="w-4 h-4" />
                  </div>
                  <p className="uppercase text-muted-foreground font-bold text-sm">
                    {assentosEscolhidos.length
                      ? assentosEscolhidos
                          .map((x) => `${x.fileira}${x.coluna}`)
                          .join(", ")
                      : "Nenhum assento selecionado"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-7">
              <h1 className="text-2xl font-bold mb-10">
                ESCOLHA SEUS ASSENTOS PARA PROSSEGUIR
              </h1>
              <div className="w-[90%] mx-auto">
                <div className="flex gap-2 mb-15 items-center flex-col-reverse">
                  {Array.from({ length: sessao.sala.quantidadeFileiras }).map(
                    (_, indiceFileira) => {
                      const fileiraLetra = String.fromCharCode(
                        65 + indiceFileira
                      );

                      return (
                        <div className="flex gap-2 items-center">
                          <p className="text-muted-foreground text-xs font-semibold mr-5">
                            {fileiraLetra}
                          </p>
                          {Array.from({
                            length: sessao.sala.quantidadeAssentosPorFileira,
                          }).map((_, indiceAssento) => {
                            const esteAssento = sessao.sala.assentos.find(
                              (x) =>
                                x.coluna === indiceAssento + 1 &&
                                x.fileira === fileiraLetra
                            );

                            if (!esteAssento) return <NaoTemAssento />;

                            const assentoEstaIndisponivel =
                              sessao.sessoesAssentos.some(
                                (x) => x.assentoId === esteAssento.id
                              );

                            if (assentoEstaIndisponivel)
                              return <AssentoIndisponivel />;

                            const esseAssentoFoiEscolhidoPorMim =
                              assentosEscolhidos.some(
                                (x) => x.id === esteAssento.id
                              );

                            if (esseAssentoFoiEscolhidoPorMim)
                              return (
                                <AssentoEscolhido
                                  onClick={() =>
                                    handleAssentosEscolhidos(esteAssento)
                                  }
                                />
                              );

                            if (esteAssento.tipoAssentoId === 1)
                              return (
                                <AssentoNormal
                                  onClick={() =>
                                    handleAssentosEscolhidos(esteAssento)
                                  }
                                />
                              );

                            if (esteAssento.tipoAssentoId === 2)
                              return (
                                <AssentoDeficiente
                                  onClick={() =>
                                    handleAssentosEscolhidos(esteAssento)
                                  }
                                />
                              );

                            if (esteAssento.tipoAssentoId === 3)
                              return (
                                <AssentoAcompanhante
                                  onClick={() =>
                                    handleAssentosEscolhidos(esteAssento)
                                  }
                                />
                              );

                            if (esteAssento.tipoAssentoId === 4)
                              return (
                                <AssentoNamoradeiraEsquerda
                                  onClick={() =>
                                    handleAssentosEscolhidos(esteAssento)
                                  }
                                />
                              );

                            if (esteAssento.tipoAssentoId === 5)
                              return (
                                <AssentoNamoradeiraDireita
                                  onClick={() =>
                                    handleAssentosEscolhidos(esteAssento)
                                  }
                                />
                              );
                          })}
                        </div>
                      );
                    }
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground text-xs text-center font-semibold">
                    TELA
                  </p>
                  <img src="https://www.cinemark.com.br/_next/image?url=%2Fimages%2Fscreen.png&w=1920&q=75" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-15 mb-5">
                CAPACIDADE DA SALA
              </h1>
              <div className="text-muted-foreground font-semibold mb-10 text-sm">
                <div className="flex">
                  <DotIcon />
                  <div>
                    <span className="text-accent-foreground">
                      {
                        sessao.sala.assentos.filter(
                          (x) => x.tipoAssentoId === 1
                        ).length
                      }
                    </span>{" "}
                    assentos padrões
                  </div>
                </div>
                <div className="flex">
                  <DotIcon />
                  <div>
                    <span className="text-accent-foreground">
                      {
                        sessao.sala.assentos.filter(
                          (x) => x.tipoAssentoId === 2 || x.tipoAssentoId === 3
                        ).length
                      }
                    </span>{" "}
                    assentos para deficientes físicos e acompanhantes
                  </div>
                </div>
                <div className="flex">
                  <DotIcon />
                  <div>
                    <span className="text-accent-foreground">
                      {
                        sessao.sala.assentos.filter(
                          (x) => x.tipoAssentoId === 4 || x.tipoAssentoId === 5
                        ).length
                      }
                    </span>{" "}
                    namoradeiras
                  </div>
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-15 mb-5">LEGENDA</h1>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <AssentoNormal />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Disponível
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <AssentoEscolhido />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Selecionado
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <AssentoIndisponivel />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Indisponível
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <AssentoDeficiente />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Deficiente Físico (espaço destinado para posicionar cadeira
                    de rodas)
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <AssentoAcompanhante />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Acompanhante (reservado para acompanhantes dos assentos
                    especiais)
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <AssentoNamoradeiraEsquerda />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Namoradeira (esquerda)
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <AssentoNamoradeiraDireita />
                  <p className="text-muted-foreground font-semibold text-sm">
                    Namoradeira (direita)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {assentosEscolhidos.length > 0 ? (
        <BotaoNavegacao direction="right" />
      ) : (
        <></>
      )}
    </>
  );
};

function formatarDataSessao(dataStr: string | Date) {
  const data = new Date(dataStr);
  const agora = new Date();

  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const dataComparar = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate()
  );

  const horaMin = data
    .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");

  if (dataComparar.getTime() === hoje.getTime()) {
    return `Hoje, ${horaMin}`;
  }
  if (dataComparar.getTime() === amanha.getTime()) {
    return `Amanhã, ${horaMin}`;
  }

  const extenso = data
    .toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    })
    .replace(".", "")
    .replace(
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

  return `${extenso}, ${horaMin}`;
}
