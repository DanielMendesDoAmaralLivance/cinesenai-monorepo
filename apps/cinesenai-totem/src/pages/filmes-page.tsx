import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { TEMPO_LOADING, VITE_API_BASE_URL } from "@/lib/utils";
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";
import { FilmeCard } from "../components/filme-card";
import type { Genero } from "@cinesenai-monorepo/types";
import { Loader2Icon } from "lucide-react";
import { BotaoNavegacao } from "@/components/botao-navegacao";

export const FilmesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generoSelecionado, setGeneroSelecionado] = useState<number>(0);
  const [filmesEmCartaz, setFilmesEmCartaz] = useState<FilmeComGeneros[]>([]);
  const [filmesEmBreve, setFilmesEmBreve] = useState<FilmeComGeneros[]>([]);

  const listar = async () => {
    setIsLoading(true);
    await Promise.all([
      listarGeneros(),
      listarFilmesEmCartaz(),
      listarFilmesEmBreve(),
    ]);

    setTimeout(() => {
      setIsLoading(false);
    }, TEMPO_LOADING);
  };

  const listarGeneros = async () => {
    const data = await fetch(`${VITE_API_BASE_URL}/api/genero`);
    const response = await data.json();

    response.unshift({ id: 0, nome: "Todos" });

    setGeneros(response);
  };

  const listarFilmesEmCartaz = async () => {
    const data = await fetch(`${VITE_API_BASE_URL}/api/filme/em-cartaz`);
    const response = await data.json();

    setFilmesEmCartaz(response);
  };

  const listarFilmesEmBreve = async () => {
    const data = await fetch(`${VITE_API_BASE_URL}/api/filme/em-breve`);
    const response = await data.json();
    setFilmesEmBreve(response);
  };

  useEffect(() => {
    void listar();
  }, []);

  const filmesEmCartazFiltradosPorGenero = filmesEmCartaz.filter(
    (filme) =>
      generoSelecionado === 0 ||
      filme.generos.some((g) => g.generoId === generoSelecionado)
  );

  const filmesEmBreveFiltradosPorGenero = filmesEmBreve.filter(
    (filme) =>
      generoSelecionado === 0 ||
      filme.generos.some((g) => g.generoId === generoSelecionado)
  );

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      ) : (
        <>
          <div className="max-w-5xl mx-auto flex flex-col gap-5 text-neutral-300">
            <div>
              <p className="pt-7 mb-4">Filtrar por gênero:</p>
              <div className="flex items-center gap-4 p-4 border rounded-xl shadow">
                <div className="flex gap-2 flex-wrap">
                  {generos.map((g) => (
                    <Button
                      key={g.id}
                      variant={
                        generoSelecionado === g.id ? "default" : "outline"
                      }
                      onClick={() => setGeneroSelecionado(g.id)}
                    >
                      {g.nome}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-5">EM CARTAZ</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
              {filmesEmCartazFiltradosPorGenero?.length ? (
                filmesEmCartazFiltradosPorGenero.map((filme) => (
                  <FilmeCard key={filme.id} {...filme} />
                ))
              ) : (
                <p className="col-span-full text-center">
                  Nenhum filme encontrado
                </p>
              )}
            </div>
            <h1 className="pt-7 text-2xl font-bold mb-4">EM BREVE</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
              {filmesEmBreveFiltradosPorGenero?.length ? (
                filmesEmBreveFiltradosPorGenero.map((filme) => (
                  <FilmeCard key={filme.id} {...filme} />
                ))
              ) : (
                <p className="col-span-full text-center">
                  Nenhum filme encontrado
                </p>
              )}
            </div>
          </div>
          <BotaoNavegacao direction="left" texto="Voltar para Início" to="" />
        </>
      )}
    </>
  );
};
