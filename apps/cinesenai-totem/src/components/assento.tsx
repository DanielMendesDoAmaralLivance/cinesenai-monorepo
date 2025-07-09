import clsx from "clsx";
import { motion } from "framer-motion";
import { AccessibilityIcon, SmileIcon, XIcon } from "lucide-react";

interface AssentoBaseProps {
  className?: string;
  icon?: React.ReactNode;
  selecionavel?: boolean;
  onClick?: () => void;
}

const AssentoBase = ({
  className,
  icon,
  selecionavel = true,
  onClick = () => {},
}: AssentoBaseProps) => {
  return (
    <motion.div
      whileHover={{ scale: selecionavel ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={clsx(
        "w-[25px] h-[25px] rounded-sm flex justify-center items-center shrink-0",
        className,
        selecionavel ? "cursor-pointer" : ""
      )}
      onClick={selecionavel ? onClick : undefined}
    >
      {icon}
    </motion.div>
  );
};

interface AssentoOnClickProps {
  onClick?: () => void;
}

export const AssentoNormal = ({ onClick }: AssentoOnClickProps) => {
  return <AssentoBase className="bg-neutral-300" onClick={onClick} />;
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

export const AssentoNamoradeiraEsquerda = ({
  onClick,
}: AssentoOnClickProps) => {
  return (
    <AssentoBase
      className="bg-neutral-300 text-muted font-bold text-xs rounded-bl-xl rounded-tl-xl"
      icon={"NE"}
      onClick={onClick}
    />
  );
};

export const AssentoNamoradeiraDireita = ({ onClick }: AssentoOnClickProps) => {
  return (
    <AssentoBase
      className="bg-neutral-300 text-muted font-bold text-xs rounded-br-xl rounded-tr-xl"
      icon={"ND"}
      onClick={onClick}
    />
  );
};

export const AssentoDeficiente = ({ onClick }: AssentoOnClickProps) => {
  return (
    <AssentoBase
      className="bg-neutral-300 rounded-xl"
      icon={<AccessibilityIcon className="w-[20px] h-[20px] text-muted" />}
      onClick={onClick}
    />
  );
};

export const AssentoAcompanhante = ({ onClick }: AssentoOnClickProps) => {
  return (
    <AssentoBase
      className="bg-neutral-300 text-muted font-bold text-xs rounded-xl"
      icon={"A"}
      onClick={onClick}
    />
  );
};

export const NaoTemAssento = () => {
  return <AssentoBase selecionavel={false} />;
};

export const AssentoEscolhido = ({ onClick }: AssentoOnClickProps) => {
  return (
    <AssentoBase
      icon={
        <SmileIcon className="w-[25px] h-[25px] text-accent fill-destructive" />
      }
      onClick={onClick}
    />
  );
};
