import { useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface BotaoNavegacaoProps {
  className?: string;
  direction?: "left" | "right";
  to: string;
  toParams?: Record<string, string>;
  texto: string;
}

export const BotaoNavegacao = ({
  to,
  texto,
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

  const router = useRouter();

  return (
    <div
      className={clsx(
        "fixed top-[calc(50%-7.5px)] flex flex-col items-center justify-center gap-2 max-w-[100px]",
        direction === "right" ? " right-[20px]" : "left-[20px]"
      )}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div
          onClick={() => {
            if (direction === "left") {
              router.history.back();
            } else {
              router.navigate({
                to,
                params: toParams,
              });
            }
          }}
          className="flex items-center justify-center cursor-pointer"
        >
          <div
            className={`text-accent-foreground flex items-center justify-center w-15 h-15 bg-destructive rounded-full shadow-[0_0_20px_5px_rgba(255,100,103,0.5)] hover:shadow-[0_0_20px_5px_rgba(255,100,103,0.7)] active:shadow-[0_0_20px_5px_rgba(255,100,103,2)] ${className}`}
          >
            {icon}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center cursor-default mt-2">
          {texto}
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
