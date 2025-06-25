import clsx from "clsx";
import { motion } from "framer-motion";
import { AccessibilityIcon, SmileIcon, XIcon } from "lucide-react";

interface AssentoBaseProps {
  className?: string;
  icon?: React.ReactNode;
  selecionavel?: boolean;
}

const AssentoBase = ({
  className,
  icon,
  selecionavel = true,
}: AssentoBaseProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={clsx(
        "w-[25px] h-[25px] rounded-sm flex justify-center items-center",
        className,
        selecionavel ? "cursor-pointer" : ""
      )}
    >
      {icon}
    </motion.div>
  );
};

export const AssentoNormal = () => {
  return <AssentoBase className="bg-neutral-300" />;
};

export const AssentoIndisponivel = () => {
  return (
    <AssentoBase
      className="bg-[#4c4b4b]"
      icon={<XIcon className="w-[20px] h-[20px] text-muted" />}
      selecionavel={false}
    />
  );
};

export const AssentoNamoradeiraEsquerda = () => {
  return (
    <AssentoBase
      className="bg-neutral-300 text-muted font-bold text-xs rounded-bl-xl rounded-tl-xl"
      icon={"NE"}
    />
  );
};

export const AssentoNamoradeiraDireita = () => {
  return (
    <AssentoBase
      className="bg-neutral-300 text-muted font-bold text-xs rounded-br-xl rounded-tr-xl"
      icon={"ND"}
    />
  );
};

export const AssentoDeficiente = () => {
  return (
    <AssentoBase
      className="bg-neutral-300 rounded-xl"
      icon={<AccessibilityIcon className="w-[20px] h-[20px] text-muted" />}
    />
  );
};

export const AssentoAcompanhante = () => {
  return (
    <AssentoBase
      className="bg-neutral-300 text-muted font-bold text-xs rounded-xl"
      icon={"A"}
    />
  );
};

export const NaoTemAssento = () => {
  return <AssentoBase selecionavel={false} />;
};

export const AssentoEscolhido = () => {
  return (
    <AssentoBase
      icon={
        <SmileIcon className="w-[25px] h-[25px] text-accent fill-destructive" />
      }
    />
  );
};
