import { ClassificacaoIndicativa } from "@/components/classificacao-inditicativa";
import { SessaoCard } from "@/components/sessao-card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const FilmeDetalhesPage = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5 mb-10 text-neutral-300">
      <div className="mt-5 w-full h-[325px] rounded-lg mb-10 relative flex items-end">
        <div className="z-10 absolute p-5 max-w-[50%] wrap-break-word flex flex-col h-[100%] justify-between text-accent-foreground">
          <div></div>
          <h1 className="text-4xl uppercase font-bold">
            Como treinar o seu dragão
          </h1>
          <p>Duração do filme: 125m</p>
        </div>
        <img
          src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FbannerHero%2FBannerHero-c4d842ec-777e-4e4e-8b6e-c9c7c04d2db1.png&w=1920&q=75"
          alt="Detalhes do Filme"
          className="w-full h-full object-cover rounded-lg opacity-60"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="flex flex-col gap-4">
            <Card className="overflow-hidden rounded-lg p-0 mb-1 w-[230px] h-[320px]">
              <div className="h-full w-full relative">
                <img
                  src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FmoviePoster%2FMoviePoster-85f6e75d-c26c-44a0-9a70-d47f5999fa54.png&w=1920&q=100"
                  alt="Capa do Filme"
                  className="w-full h-full object-cover opacity-60"
                  loading="lazy"
                />
              </div>
            </Card>
            <span className="border rounded-lg p-2 flex items-center w-fit">
              <ClassificacaoIndicativa classificacaoIndicativaId={1} />
              <p className="ml-2 text-sm">Animação</p>
            </span>
            <p className="text-muted-foreground text-balance sm:text-base">
              Live-action do famoso clássico de animação da Disney, Lilo &
              Stitch, onde Stitch (Chris Sanders), o experimento 626, é um
              alienígena expressivo que foi adotado como animal de estimação por
              Lilo (Maia Kealoha) e juntos eles descobrem o significado de
              família. Classificação indicativa 10 Anos. Contém temas sensíveis,
              violência fantasiosa.
            </p>
          </div>
          <div className="flex flex-col gap-8 mt-12">
            <Separator />
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm font-bold">Data de lançamento</span>
              <span className="text-sm font-bold text-muted-foreground">
                05/10/2023
              </span>
            </div>
            <Separator />
            <h1 className="uppercase text-xl font-bold">EQUIPE E ELENCO</h1>
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm font-bold">Diretor</span>
              <span className="text-sm font-bold text-muted-foreground">
                Nome do Diretor
              </span>
            </div>
            <Separator />
            <div className="flex justify-between min-h-[50px] gap-8">
              <span className="text-sm font-bold">Elenco</span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-muted-foreground">
                  Nome 1
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  Nome 2
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  Nome 3
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  Nome 4
                </span>
              </div>
            </div>
            <Separator />
          </div>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-7">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">SESSÕES</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold">LEGENDA</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
