import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface BotaoNavegacaoProps {
  className?: string;
  direction?: "left" | "right";
  to: string;
  toParams?: Record<string, string>;
  nomePagina: string;
}

export const BotaoNavegacao = ({
  to,
  nomePagina,
  toParams = {},
  className = "",
  direction = "left",
}: BotaoNavegacaoProps) => {
  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="w-[30px] h-[30px]" />
    ) : (
      <ChevronRightIcon className="w-[30px] h-[30px]" />
    );

  return (
    <div className="fixed top-[calc(50%-7.5px)] right-[20px] flex flex-col items-center justify-center gap-2 z-50 max-w-[100px]">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Link
          to={to}
          params={toParams}
          className="flex items-center justify-center"
        >
          <div
            className={`text-accent-foreground flex items-center justify-center w-15 h-15 bg-destructive rounded-full shadow-[0_0_20px_5px_rgba(255,100,103,0.5)] hover:shadow-[0_0_20px_5px_rgba(255,100,103,0.7)] active:shadow-[0_0_20px_5px_rgba(255,100,103,2)] ${className}`}
          >
            {icon}
          </div>
        </Link>

        <p className="text-xs text-muted-foreground text-center cursor-default mt-2">
          Prosseguir para {nomePagina}
        </p>
      </motion.div>
      {direction === "right" ? (
        <motion.div
          className="absolute top-[calc(50%-40px)] right-[60px]"
          animate={{
            rotate: [0, 20, -10, 20, 0],
            translateX: [0, 5, -20, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <img
            src="https://framerusercontent.com/images/gKHGJy8cUfCDFgFPOpBjYP4Ab8.png"
            className="w-10 h-10 "
            alt="Mãozinha decorativa"
          />
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
};
