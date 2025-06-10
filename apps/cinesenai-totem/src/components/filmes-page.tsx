import { useState } from "react";
import { Button } from "./ui/button";
import { Filme } from "./ui/filme";

export const FilmesPage = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      <Filtros onChange={() => console.log()} />
      <h1 className="text-2xl font-bold mb-5">EM CARTAZ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
        <Filme />
        <Filme />
        <Filme />
        <Filme />
      </div>
      <h1 className="pt-7 text-2xl font-bold mb-4">PRÉ LANÇAMENTO</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
        <Filme />
        <Filme />
        <Filme />
        <Filme />
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
