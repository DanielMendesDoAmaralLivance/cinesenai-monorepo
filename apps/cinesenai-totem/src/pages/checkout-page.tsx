import { ClassificacaoIndicativa } from "@/components/classificacao-inditicativa";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TipoIdiomaTexto } from "@/enums/tipo-idioma-enum";
import { TipoSalaTexto } from "@/enums/tipo-sala-enum";
import { TipoSessaoTexto } from "@/enums/tipo-sessao-enum";
import { formatarDataSessao } from "@/lib/extensions/date-extensions";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArmchairIcon,
  CheckCircle,
  ClapperboardIcon,
  PopcornIcon,
} from "lucide-react";
import { useState } from "react";

export const CheckoutPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setShowSuccessScreen(true);
    }, 1000);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-col gap-5 text-neutral-300 mb-10 pt-7">
        <div className="bg-accent rounded-lg p-5 border">
          <h1 className="text-2xl center font-bold text-center mb-10">
            CONFIRA OS DETALHES E FINALIZE O PAGAMENTO
          </h1>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 flex flex-col gap-2">
              <Card className="overflow-hidden rounded-lg p-0 mb-1 w-[230px] h-[320px]">
                <div className="h-full w-full relative">
                  <img
                    src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FmoviePoster%2FMoviePoster-ca6d7d43-4e0e-4f63-989b-ab84a4b1507e.png&w=1920&q=100"
                    alt="Capa do Filme"
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                </div>
              </Card>
              <span className="border rounded-lg p-2 flex items-center w-fit">
                <ClassificacaoIndicativa classificacaoIndicativaId={2} />
                <p className="ml-2 text-sm">{"Animação"}</p>
              </span>
            </div>
            <div className="col-span-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                    <PopcornIcon className="w-4 h-4" />
                  </div>
                  <p className="uppercase text-muted-foreground font-bold text-sm">
                    Como treinar o seu dragão
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                    {new Date(String(new Date()))
                      .getDate()
                      .toString()
                      .padStart(2, "0")}
                  </div>
                  <p className="uppercase text-muted-foreground font-bold text-sm">
                    {formatarDataSessao(new Date(String(new Date())))}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm shrink-0">
                    <ClapperboardIcon className="w-4 h-4" />
                  </div>
                  <p className="uppercase text-muted-foreground font-bold text-sm ">
                    Sala 1 ({TipoSalaTexto[1 as keyof typeof TipoSalaTexto]}
                    ), Sessão{" "}
                    {TipoSessaoTexto[1 as keyof typeof TipoSessaoTexto]},{" "}
                    {TipoIdiomaTexto[1 as keyof typeof TipoIdiomaTexto]}
                  </p>
                </div>

                <Separator className="my-10" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 min-w-[300px]">
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      Assentos
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      Meia-entrada
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      Subtotal
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 min-w-[300px]">
                    <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                      <ArmchairIcon className="w-4 h-4" />
                    </div>
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      A1 (Namoradeira Esquerda)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" className="cursor-pointer" />
                  </div>
                  <p className="font-bold">R$30,00</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 min-w-[300px]">
                    <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                      <ArmchairIcon className="w-4 h-4" />
                    </div>
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      A2 (Deficiente físico)
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Switch id="airplane-mode" className="cursor-pointer" />
                    <Label htmlFor="airplane-mode"></Label>
                  </div>
                  <p className="font-bold">R$30,00</p>
                </div>
              </div>

              <Separator className="my-10" />

              <div className="flex justify-between items-center">
                <p className="uppercase text-muted-foreground font-bold text-sm">
                  Total
                </p>
                <p className="text-2xl font-bold">R$60,00</p>
              </div>

              <Separator className="my-10" />

              <div className="flex flex-col gap-4">
                <p className="uppercase text-muted-foreground font-bold text-sm">
                  Forma de pagamento
                </p>

                <div className="grid grid-flow-col grid-rows-2 gap-4">
                  <div className="col-span-2 row-span-1 p-7 bg-purple-400 rounded-lg border-purple-700 border-2 font-bold uppercase flex items-center justify-center text-purple-950 cursor-pointer select-none opacity-50">
                    Cartão de débito
                  </div>
                  <div className="col-span-2 row-span-1 p-7 bg-gray-400 rounded-lg border-gray-700 border-2 font-bold uppercase flex items-center justify-center text-gray-950 cursor-pointer select-none opacity-50">
                    Cartão de crédito
                  </div>
                  <div className="row-span-2 p-7 bg-teal-400 rounded-lg border-teal-700 border-2 font-bold uppercase flex items-center justify-center text-teal-950 cursor-pointer select-none opacity-50">
                    Pix
                  </div>
                </div>
              </div>

              {!showSuccessScreen && (
                <motion.button
                  onClick={handleClick}
                  className="relative overflow-hidden px-6 py-3 rounded-lg text-white font-semibold bg-green-600 w-full cursor-pointer hover:bg-green-700 mt-4"
                >
                  <span className="relative z-10 uppercase text-bold">
                    Finalizar Pagamento
                  </span>
                  {isClicked && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute left-0 top-0 h-full bg-green-800 z-0"
                    />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showSuccessScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-green-600 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center text-white"
            >
              <CheckCircle size={80} className="text-white mb-4" />
              <span className="text-2xl font-bold uppercase">
                Pagamento concluído com sucesso!
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
