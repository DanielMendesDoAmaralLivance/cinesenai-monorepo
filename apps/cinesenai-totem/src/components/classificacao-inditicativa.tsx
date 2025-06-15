import { ClassificacaoIndicativaEnum } from "@/enums/classificacao-indicativa-enum";

interface ClassificacaoIndicativaProps {
  classificacaoIndicativaId: ClassificacaoIndicativaEnum;
}

export const ClassificacaoIndicativa = ({
  classificacaoIndicativaId,
}: ClassificacaoIndicativaProps) => {
  const classificacaoIndicativaStyles: Record<
    ClassificacaoIndicativaEnum,
    string
  > = {
    [ClassificacaoIndicativaEnum.Livre]: "bg-green-600",
    [ClassificacaoIndicativaEnum.A10]: "bg-blue-600",
    [ClassificacaoIndicativaEnum.A12]: "bg-yellow-600",
    [ClassificacaoIndicativaEnum.A14]: "bg-orange-600",
    [ClassificacaoIndicativaEnum.A16]: "bg-red-600",
    [ClassificacaoIndicativaEnum.A18]: "bg-black",
  };

  const classificacaoIndicativaNome: Record<
    ClassificacaoIndicativaEnum,
    string
  > = {
    [ClassificacaoIndicativaEnum.Livre]: "L",
    [ClassificacaoIndicativaEnum.A10]: "+10",
    [ClassificacaoIndicativaEnum.A12]: "+12",
    [ClassificacaoIndicativaEnum.A14]: "+14",
    [ClassificacaoIndicativaEnum.A16]: "+16",
    [ClassificacaoIndicativaEnum.A18]: "+18",
  };

  return (
    <div
      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${classificacaoIndicativaStyles[classificacaoIndicativaId]}`}
    >
      {classificacaoIndicativaNome[classificacaoIndicativaId]}
    </div>
  );
};
