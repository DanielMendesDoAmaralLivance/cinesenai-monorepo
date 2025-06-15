import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { VITE_API_BASE_URL } from "@/lib/utils";
import type { FilmeComGeneros } from "@cinesenai-monorepo/types-custom";
import { FilmeCard } from "./ui/filme-card";

export const FilmesPage = () => {
  const [filmesEmCartaz, setFilmesEmCartaz] = useState<FilmeComGeneros[]>([]);
  const [filmesEmBreve, setFilmesEmBreve] = useState<FilmeComGeneros[]>([]);

  const listar = async () => {
    await Promise.all([listarFilmesEmCartaz(), listarFilmesEmBreve()]);
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

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      <Filtros onChange={() => console.log()} />
      <h1 className="text-2xl font-bold mb-5">EM CARTAZ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
        {filmesEmCartaz.map((filme) => (
          <FilmeCard key={filme.id} {...filme} />
        ))}
      </div>
      <h1 className="pt-7 text-2xl font-bold mb-4">EM BREVE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
        {filmesEmBreve.map((filme) => (
          <FilmeCard key={filme.id} {...filme} />
        ))}
      </div>
    </div>
  );
};

const genders = ["Todos", "Masculino", "Feminino", "Outro"];

const Filtros = ({ onChange }: { onChange: (genero: string) => void }) => {
  const [genero, setGenero] = useState("Todos");

  const handleClick = (gender: string) => {
    setGenero(gender);
    onChange(gender);
  };

  return (
    <div>
      <p className="pt-7 mb-4">Filtrar por gênero:</p>
      <div className="flex items-center gap-4 p-4 border rounded-xl shadow">
        <div className="flex gap-2">
          {genders.map((g) => (
            <Button
              key={g}
              variant={genero === g ? "default" : "outline"}
              onClick={() => handleClick(g)}
            >
              {g}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
