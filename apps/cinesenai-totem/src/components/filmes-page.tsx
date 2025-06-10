import { useState } from "react";
import { Button } from "./ui/button";
import { Filme } from "./ui/filme";
import { motion } from "framer-motion";
import { Input } from "./ui/input";

const genders = ["Todos", "Masculino", "Feminino", "Outro"];

const FilterPanel = ({
  onGenderFilterChange,
}: {
  onGenderFilterChange: (gender: string) => void;
  onTextFilterChange: (text: string) => void;
}) => {
  const [selectedGender, setSelectedGender] = useState("Todos");

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender);
    onGenderFilterChange(gender);
  };

  return (
    <div>
      <p className="pt-7 mb-4">Filtrar por gênero:</p>
      <div className="flex items-center gap-4 p-4 border rounded-xl shadow">
        <div className="flex gap-2">
          {genders.map((gender) => (
            <Button
              key={gender}
              variant={selectedGender === gender ? "default" : "outline"}
              onClick={() => handleGenderClick(gender)}
            >
              {gender}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FilmesPage = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      <FilterPanel
        onGenderFilterChange={() => console.log()}
        onTextFilterChange={() => console.log()}
      />
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
