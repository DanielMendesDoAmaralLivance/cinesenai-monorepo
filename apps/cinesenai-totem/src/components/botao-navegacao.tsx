import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface BotaoNavegacaoProps {
  className?: string;
  direction?: "left" | "right";
}

export const BotaoNavegacao = ({
  className = "",
  direction,
}: BotaoNavegacaoProps) => {
  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="w-[30px] h-[30px]" />
    ) : (
      <ChevronRightIcon className="w-[30px] h-[30px]" />
    );

  return (
    <a
      className={`fixed text-accent-foreground top-[calc(50%-10px)] right-[20px] flex items-center justify-center w-20 h-20 bg-destructive rounded-full ${className}`}
    >
      {icon}
    </a>
  );
};
