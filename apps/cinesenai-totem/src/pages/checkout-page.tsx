import { appAtom, type AppAtomProps } from "@/atoms/app-atom";
import { BotaoNavegacao } from "@/components/botao-navegacao";
import { ClassificacaoIndicativa } from "@/components/classificacao-inditicativa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TipoAssentoTexto } from "@/enums/tipo-assento-enum";
import { TipoIdiomaTexto } from "@/enums/tipo-idioma-enum";
import { TipoSalaTexto } from "@/enums/tipo-sala-enum";
import { TipoSessaoTexto } from "@/enums/tipo-sessao-enum";
import { formatarDataSessao } from "@/lib/extensions/date-extensions";
import { formatarComoMoedaBrasileira } from "@/lib/extensions/string-extensions";
import { TEMPO_LOADING, VITE_API_BASE_URL } from "@/lib/utils";
import type { SessaoDetalhes } from "@cinesenai-monorepo/types-custom";
import { useParams, useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  ArmchairIcon,
  CheckCircle,
  ClapperboardIcon,
  HelpCircleIcon,
  Loader2Icon,
  PopcornIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sessaoId } = useParams({ strict: false });
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const [formaDePagamentoId, setFormaDePagamentoId] = useState<number>();

  const [meiaEntradaDialogIsOpen, setMeiaEntradaDialogIsOpen] = useState(false);

  const [assentosEscolhidos, setAssentosEscolhidos] =
    useAtom<AppAtomProps>(appAtom);

  const [sessao, setSessao] = useState<SessaoDetalhes>();

  const buscarSessao = async () => {
    setIsLoading(true);
    const data = await fetch(`${VITE_API_BASE_URL}/api/sessao/${sessaoId}`);
    const response = await data.json();
    setSessao(response);

    setTimeout(() => {
      setIsLoading(false);
    }, TEMPO_LOADING);
  };

  useEffect(() => {
    void buscarSessao();
  }, []);

  const router = useRouter();

  const handleClick = async () => {
    setIsClicked(true);
    const id = await criarIngresso();
    setTimeout(() => {
      setShowSuccessScreen(true);
    }, 1000);
    setTimeout(() => {
      router.navigate({
        to: "/ingresso/$ingressoId",
        params: { ingressoId: String(id) },
      });
    }, 4000);
  };

  const criarIngresso = async () => {
    const data = {
      data: {
        documentoResponsavel: assentosEscolhidos.cpf,
        pagamento: {
          create: {
            formaPagamentoId: formaDePagamentoId,
            valorTotal: assentosEscolhidos.sessoesAssentos.reduce(
              (total, sessaoAssento) =>
                total +
                (sessaoAssento.tipoEntradaId === 2
                  ? Number(sessao!.preco) / 2
                  : Number(sessao!.preco)),
              0
            ),
          },
        },
        sessoesAssentos: {
          createMany: {
            data: assentosEscolhidos.sessoesAssentos.map((x) => {
              return {
                sessaoId: Number(sessaoId),
                assentoId: x.assentoId,
                tipoEntradaId: x.tipoEntradaId ?? 1,
                sessaoAssentoStatusId: 2,
              };
            }),
          },
        },
      },
    };

    const response = await fetch(`${VITE_API_BASE_URL}/api/ingresso`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    console.log({ responseData });

    return responseData;
  };

  return (
    <>
      {isLoading || !sessao ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      ) : (
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
                        src={sessao.filme.capaUrl}
                        alt="Capa do Filme"
                        className="w-full h-full object-cover opacity-60"
                        loading="lazy"
                      />
                    </div>
                  </Card>
                  <span className="border rounded-lg p-2 flex items-center w-fit">
                    <ClassificacaoIndicativa
                      classificacaoIndicativaId={
                        sessao.filme.classificacaoIndicativaId
                      }
                    />
                    <p className="ml-2 text-sm">
                      {
                        (
                          sessao.filme as unknown as {
                            generos: { genero: { nome: string } }[];
                          }
                        ).generos[0].genero.nome
                      }
                    </p>
                  </span>
                </div>
                <div className="col-span-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                        <PopcornIcon className="w-4 h-4" />
                      </div>
                      <p className="uppercase text-muted-foreground font-bold text-sm">
                        {sessao.filme.titulo}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                        {new Date(sessao.inicio)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}
                      </div>
                      <p className="uppercase text-muted-foreground font-bold text-sm">
                        {formatarDataSessao(new Date(sessao.inicio))}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm shrink-0">
                        <ClapperboardIcon className="w-4 h-4" />
                      </div>
                      <p className="uppercase text-muted-foreground font-bold text-sm ">
                        Sala {sessao.sala.numero} (
                        {
                          TipoSalaTexto[
                            sessao.sala.tipoSalaId as keyof typeof TipoSalaTexto
                          ]
                        }
                        ), Sessão{" "}
                        {
                          TipoSessaoTexto[
                            sessao.tipoSessaoId as keyof typeof TipoSessaoTexto
                          ]
                        }
                        ,{" "}
                        {
                          TipoIdiomaTexto[
                            sessao.tipoIdiomaId as keyof typeof TipoIdiomaTexto
                          ]
                        }
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
                        <p className="uppercase text-muted-foreground font-bold text-sm flex gap-2 items-center">
                          Meia-entrada{" "}
                          <HelpCircleIcon
                            size={16}
                            className="cursor-pointer"
                            onClick={() => setMeiaEntradaDialogIsOpen(true)}
                          />
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="uppercase text-muted-foreground font-bold text-sm">
                          Subtotal
                        </p>
                      </div>
                    </div>
                    {assentosEscolhidos.sessoesAssentos
                      .sort((x, y) =>
                        (x.assento.fileira + x.assento.coluna).localeCompare(
                          y.assento.fileira + y.assento.coluna
                        )
                      )
                      .map((sessaoAssento) => (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 min-w-[300px]">
                            <div className="w-[40px] h-[40px] rounded-md flex justify-center items-center bg-background font-bold text-sm">
                              <ArmchairIcon className="w-4 h-4" />
                            </div>
                            <p className="uppercase text-muted-foreground font-bold text-sm">
                              {sessaoAssento.assento.fileira +
                                sessaoAssento.assento.coluna}{" "}
                              (
                              {
                                TipoAssentoTexto[
                                  sessaoAssento.assento
                                    .tipoAssentoId as keyof typeof TipoAssentoTexto
                                ]
                              }
                              )
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="airplane-mode"
                              className="cursor-pointer"
                              checked={sessaoAssento.tipoEntradaId === 2}
                              onCheckedChange={(checked) => {
                                setAssentosEscolhidos((prev) => ({
                                  ...prev,
                                  sessoesAssentos: prev.sessoesAssentos.map(
                                    (x) =>
                                      x.assentoId === sessaoAssento.assentoId
                                        ? {
                                            ...x,
                                            tipoEntradaId: checked ? 2 : 1,
                                          }
                                        : x
                                  ),
                                }));
                              }}
                            />
                          </div>
                          {sessaoAssento.tipoEntradaId === 2 ? (
                            <div>
                              <p className="text-xs line-through text-center">
                                {formatarComoMoedaBrasileira(
                                  Number(sessao.preco),
                                  sessaoAssento.tipoEntradaId
                                )}
                              </p>
                              <p className="font-bold">
                                {formatarComoMoedaBrasileira(
                                  Number(sessao.preco),
                                  sessaoAssento.tipoEntradaId
                                )}
                              </p>
                            </div>
                          ) : (
                            <p className="font-bold">
                              {formatarComoMoedaBrasileira(
                                Number(sessao.preco),
                                sessaoAssento.tipoEntradaId
                              )}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>

                  <Separator className="my-10" />

                  <div className="flex justify-between items-center">
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      Total
                    </p>
                    <div>
                      <p></p>
                      {assentosEscolhidos.sessoesAssentos.some(
                        (x) => x.tipoEntradaId === 2
                      ) ? (
                        <p className="text-sm line-through">
                          {formatarComoMoedaBrasileira(
                            assentosEscolhidos.sessoesAssentos.reduce(
                              (total) => total + Number(sessao!.preco),
                              0
                            ),
                            1
                          )}
                        </p>
                      ) : (
                        <></>
                      )}
                      <p className="text-2xl font-bold">
                        {formatarComoMoedaBrasileira(
                          assentosEscolhidos.sessoesAssentos.reduce(
                            (total, sessaoAssento) =>
                              total +
                              (sessaoAssento.tipoEntradaId === 2
                                ? Number(sessao!.preco) / 2
                                : Number(sessao!.preco)),
                            0
                          ),
                          1
                        )}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-10" />

                  <div className="flex flex-col gap-4">
                    <p className="uppercase text-muted-foreground font-bold text-sm">
                      Forma de pagamento
                    </p>

                    <div className="grid grid-flow-col grid-rows-2 gap-4">
                      <div
                        className={clsx(
                          "col-span-2 row-span-1 p-7 bg-gray-400 rounded-lg border-gray-700 border-2 font-bold uppercase flex items-center justify-center text-gray-950 cursor-pointer select-none opacity-50",
                          formaDePagamentoId === 1 && "opacity-100"
                        )}
                        onClick={() => setFormaDePagamentoId(1)}
                      >
                        Cartão de crédito
                      </div>
                      <div
                        className={clsx(
                          "col-span-2 row-span-1 p-7 bg-purple-400 rounded-lg border-purple-700 border-2 font-bold uppercase flex items-center justify-center text-purple-950 cursor-pointer select-none opacity-50",
                          formaDePagamentoId === 2 && "opacity-100"
                        )}
                        onClick={() => setFormaDePagamentoId(2)}
                      >
                        Cartão de débito
                      </div>

                      <div
                        className={clsx(
                          "row-span-2 p-7 bg-teal-400 rounded-lg border-teal-700 border-2 font-bold uppercase flex items-center justify-center text-teal-950 cursor-pointer select-none opacity-50",
                          formaDePagamentoId === 3 && "opacity-100"
                        )}
                        onClick={() => setFormaDePagamentoId(3)}
                      >
                        Pix
                      </div>
                    </div>
                  </div>

                  {!showSuccessScreen && (
                    <motion.button
                      onClick={!formaDePagamentoId ? undefined : handleClick}
                      className={clsx(
                        "relative overflow-hidden px-6 py-3 rounded-lg text-white font-semibold bg-green-600 w-full hover:bg-green-700 mt-4",
                        !formaDePagamentoId && "opacity-50 cursor-not-allowed",
                        formaDePagamentoId && "cursor-pointer"
                      )}
                      disabled={!formaDePagamentoId}
                    >
                      <span className="relative z-10 uppercase text-bold">
                        Finalizar Pagamento
                      </span>
                      {isClicked && (
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, ease: "easeInOut" }}
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
          <BotaoNavegacao direction="left" texto="Voltar para Assentos" to="" />
          <MeiaEntradaDialog
            isOpen={meiaEntradaDialogIsOpen}
            setIsOpen={setMeiaEntradaDialogIsOpen}
          />
        </>
      )}
    </>
  );
};

interface MeiaEntradaDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MeiaEntradaDialog = ({ isOpen, setIsOpen }: MeiaEntradaDialogProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Meia-entrada</AlertDialogTitle>
          <AlertDialogDescription>
            A meia-entrada é um benefício concedido a estudantes, pessoas com
            deficiência e idosos, permitindo que adquiram ingressos com
            desconto. Documentos poderão ser solicitados na entrada da sala.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => setIsOpen(false)}>Ok</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
