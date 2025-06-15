import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faQuestion,
  faHashtag,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPDotSeparator,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useAtom } from "jotai";
import { appAtom, type AppAtomProps } from "@/atoms/app-atom";
import { useRouter } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

export const HomePage = () => {
  const [cpfDialogIsOpen, setCpfDialogIsOpen] = useState(false);
  const [, setCpf] = useAtom<AppAtomProps>(appAtom);

  return (
    <>
      <div className="flex flex-col items-center justify-end h-screen gap-4">
        <div className="group bg-accent flex flex-col gap-3 rounded-lg p-12 w-[400px] mb-40">
          <div className="relative">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-yellow-300 via-orange-300 to-orange-400 shadow-[0_0_20px_5px_rgba(255,186,0,0.5)] hover:shadow-[0_0_20px_5px_rgba(255,186,0,0.7)] active:shadow-[0_0_20px_5px_rgba(255,186,0,2)] text-lg"
              onClick={() => setCpfDialogIsOpen(true)}
            >
              Comprar ingresso
            </Button>
            <motion.div
              className="absolute"
              style={{
                bottom: 0,
                left: -20,
              }}
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
          </div>

          <Button size="lg" className="w-full text-lg">
            Pedir ajuda
          </Button>
        </div>
        <div className="flex gap-10 mb-7.5">
          <BannerPropaganda tipo="bomboniere" />
          <BannerPropaganda tipo="site" />
          <BannerPropaganda tipo="redesSociais" />
        </div>
      </div>
      <CpfDialog
        isOpen={cpfDialogIsOpen}
        setIsOpen={setCpfDialogIsOpen}
        setCpf={setCpf}
      />
    </>
  );
};

interface CpfDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  setCpf: (cpf: AppAtomProps) => void;
}

const CpfDialog = ({ isOpen, setIsOpen, setCpf }: CpfDialogProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const irParaFilmes = () => {
    setIsLoading(true);

    setTimeout(async () => {
      setIsLoading(false);
      setIsOpen(false);
      router.navigate({ to: "/filmes" });
    }, 1500);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Insira o seu CPF para continuar</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="py-15">
              <InputOTP
                maxLength={11}
                onChange={(v) =>
                  setCpf({
                    cpf: v,
                  })
                }
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPDotSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
                <InputOTPDotSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                  <InputOTPSlot index={8} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={9} />
                  <InputOTPSlot index={10} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={irParaFilmes} disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : null}
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type TipoBannerPropaganda = "bomboniere" | "site" | "redesSociais";

interface BannerPropagandaProps {
  tipo: TipoBannerPropaganda;
}

const BannerPropaganda = ({ tipo }: BannerPropagandaProps) => {
  const banner = {
    bomboniere: {
      bgColor: "bg-red-400",
      asset: "assets/images/balde-pipoca.png",
      ehImagem: true,
      text: "Prepare-se para o show: visite nossa bomboniere!",
      shadow: "shadow-[0_0_20px_5px_rgba(200,38,38,0.7)]",
    },
    site: {
      bgColor: "bg-inherit",
      asset: faQuestion,
      text: "Precisa de mais informações? Visite o nosso site!",
      shadow: "shadow-[0_0_20px_5px_rgba(50,50,50,1)]",
    },
    redesSociais: {
      bgColor: "bg-blue-400",
      asset: faHashtag,
      text: "Fique ligado em nossas redes sociais para saber de novidades e promoções!",
      shadow: "shadow-[0_0_20px_5px_rgba(96,165,250,0.5)]",
    },
  }[tipo];

  return (
    <div
      className={clsx(
        "rounded-lg p-4 flex w-[400px] h-[100px] relative items-center justify-center text-center text-white font-bold gap-4 overflow-hidden cursor-pointer",
        banner.bgColor,
        banner.shadow
      )}
    >
      {banner.ehImagem ? (
        <img src={banner.asset} alt={banner.text} className="w-18 h-18 z-10" />
      ) : (
        <div className="mr-1">
          <FontAwesomeIcon
            color="white"
            size="3x"
            icon={banner.asset as IconDefinition}
          />
        </div>
      )}

      <h1 className="text-foreground font-bold z-10 text-left">
        {banner.text}
      </h1>

      <FontAwesomeIcon
        icon={faCheck}
        className="absolute scale-[30] rotate-[10deg] opacity-15 lg:right-[11rem] lg:top-[1rem] "
      />
    </div>
  );
};
