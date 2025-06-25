import {
  AssentoAcompanhante,
  AssentoDeficiente,
  AssentoEscolhido,
  AssentoIndisponivel,
  AssentoNamoradeiraDireita,
  AssentoNamoradeiraEsquerda,
  AssentoNormal,
} from "@/components/assento";
import { useParams } from "@tanstack/react-router";
import { ClapperboardIcon, DotIcon } from "lucide-react";

export const SessaoDetalhesPage = () => {
  const { filmeId, sessaoId } = useParams({ strict: false });

  


  return (
    <>
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
                  Como treinar o seu dragão
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-accent font-bold text-sm">
                  24
                </div>
                <p className="uppercase text-muted-foreground font-bold text-sm">
                  Hoje, 20h00
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-accent font-bold text-sm shrink-0">
                  <ClapperboardIcon className="w-4 h-4" />
                </div>
                <p className="uppercase text-muted-foreground font-bold text-sm ">
                  Sala 1 (Padrão), Sessão Padrão, DUBLADO
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-7">
            <h1 className="text-2xl font-bold mb-10">ESCOLHA SEUS ASSENTOS</h1>
            <div className="w-[90%] mx-auto">
              <div className="flex gap-2 mb-15 items-center flex-col-reverse">
                <div className="flex gap-2 items-center">
                  <p className="text-muted-foreground text-xs font-semibold mr-5">
                    A
                  </p>
                  <AssentoIndisponivel />
                  <AssentoNormal />
                  <AssentoNamoradeiraEsquerda />
                  <AssentoNamoradeiraDireita />
                  <AssentoDeficiente />
                  <AssentoAcompanhante />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-muted-foreground text-xs font-semibold mr-5">
                    A
                  </p>
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-muted-foreground text-xs font-semibold mr-5">
                    A
                  </p>
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoNormal />
                  <AssentoEscolhido />
                </div>
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
            <div className="flex text-muted-foreground font-semibold mb-10 text-sm">
              <div className="flex">
                <DotIcon />
                <div>
                  <span className="text-accent-foreground">80</span> assentos
                  padrões
                </div>
              </div>
              <div className="flex">
                <DotIcon />
                <div>
                  <span className="text-accent-foreground">10</span> assentos
                  para deficiente físico
                </div>
              </div>
              <div className="flex">
                <DotIcon />
                <div>
                  <span className="text-accent-foreground">10</span>{" "}
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
                  Deficiente Físico (espaço destinado para posicionar cadeira de
                  rodas)
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
    </>
  );
};
