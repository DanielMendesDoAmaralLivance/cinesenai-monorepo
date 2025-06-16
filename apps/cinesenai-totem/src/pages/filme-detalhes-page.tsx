import { SessaoCard } from "@/components/sessao-card";
import { Card } from "@/components/ui/card";

export const FilmeDetalhesPage = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      <div className="mt-5 w-full h-[320px] rounded-lg mb-10">
        <img
          src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FbannerHero%2FBannerHero-c4d842ec-777e-4e4e-8b6e-c9c7c04d2db1.png&w=1920&q=75"
          alt="Detalhes do Filme"
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5">
          <Card className="overflow-hidden rounded-lg p-0 mb-1 w-[230px] h-[320px]">
            <div className="h-full w-full relative">
              <img
                src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FmoviePoster%2FMoviePoster-85f6e75d-c26c-44a0-9a70-d47f5999fa54.png&w=1920&q=100"
                alt="Capa do Filme"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Card>
        </div>

        <div className="col-span-7">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">SESSÕES</h2>
              </div>
            </div>

            {/* Grid de horários */}
            <div className="grid grid-cols-3 gap-4">
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
              <SessaoCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
