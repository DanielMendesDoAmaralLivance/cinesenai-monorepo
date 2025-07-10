import { BotaoNavegacao } from "@/components/botao-navegacao";
import { TipoAssentoTexto } from "@/enums/tipo-assento-enum";
import { TipoIdiomaTexto } from "@/enums/tipo-idioma-enum";
import { TipoSalaTexto } from "@/enums/tipo-sala-enum";
import { TipoSessaoTexto } from "@/enums/tipo-sessao-enum";
import { formatarDataSessao } from "@/lib/extensions/date-extensions";
import { TEMPO_LOADING, VITE_API_BASE_URL } from "@/lib/utils";
import type { IngressoDetalhes } from "@cinesenai-monorepo/types-custom";
import { useParams } from "@tanstack/react-router";
import clsx from "clsx";
import { CreditCardIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export const IngressoPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { ingressoId } = useParams({ strict: false });
  const [ingresso, setIngresso] = useState<IngressoDetalhes>();

  const buscarIngresso = async () => {
    setIsLoading(true);
    const data = await fetch(`${VITE_API_BASE_URL}/api/ingresso/${ingressoId}`);
    const response = await data.json();
    setIngresso(response);

    setTimeout(() => {
      setIsLoading(false);
    }, TEMPO_LOADING);
  };

  useEffect(() => {
    void buscarIngresso();
  }, []);

  const sessao = ingresso?.sessoesAssentos[0].sessao;

  return (
    <>
      {isLoading || !ingresso ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      ) : (
        <div className="w-[500px] mx-auto flex flex-col mb-10 pt-7">
          <h1 className="text-2xl uppercase font-bold text-center mb-5">
            Imprimindo comprovante...
          </h1>
          <div className="w-[500px] mx-auto flex">
            <Rebarba direcao="cima" />
          </div>
          <div className="w-[500px] bg-amber-100 mx-auto text-accent border-3 border-dashed border-amber-500 border-t-transparent border-b-transparent">
            <code className="text-sm flex flex-col items-center text-center p-5">
              <p className="font-bold text-xl mb-2">Cine SENAI LTDA</p>
              CNPJ: 12.345.678/0001-00
              <br />
              Rua das Estrelas, 123 - Centro
              <br />
              São Paulo - SP - CEP: 01234-567
              <br />
              Tel: (11) 3456-7890
            </code>

            <div className="w-full h-[1px] bg-amber-500"></div>

            <code className="text-sm flex p-5 bg-amber-200 gap-5">
              <QRCode
                size={125}
                className="mx-auto"
                value={`${VITE_API_BASE_URL}/api/ingresso/${ingressoId}/validar`}
                viewBox={`0 0 256 256`}
              />
              <div>
                <p className="font-bold text mb-2 uppercase">
                  🎬 FILME: {sessao?.filme.titulo}
                </p>
                Sala {sessao?.sala.numero} (
                {
                  TipoSalaTexto[
                    sessao?.sala.tipoSalaId as keyof typeof TipoSalaTexto
                  ]
                }
                ) |{" "}
                {
                  TipoIdiomaTexto[
                    sessao?.tipoIdiomaId as keyof typeof TipoIdiomaTexto
                  ]
                }
                <br />
                Sessão{" "}
                {
                  TipoSessaoTexto[
                    sessao?.tipoSessaoId as keyof typeof TipoSessaoTexto
                  ]
                }{" "}
                | {formatarDataSessao(new Date(String(sessao?.inicio)))}
              </div>
            </code>

            <div className="w-full h-[0.5px] bg-amber-500"></div>

            <code className="text-sm flex flex-col p-5">
              <p className="font-bold text mb-2">ITENS</p>
              <div className="flex flex-col gap-2">
                {ingresso.sessoesAssentos
                  .sort((x, y) =>
                    (x.assento.fileira + x.assento.coluna).localeCompare(
                      y.assento.fileira + y.assento.coluna
                    )
                  )
                  .map((sessaoAssento, i) => (
                    <div key={sessaoAssento.id}>
                      <p className="uppercase">
                        {`${i + 1}`.padStart(2, "0")} - ASSENTO{" "}
                        {sessaoAssento.assento.fileira +
                          sessaoAssento.assento.coluna}{" "}
                        (
                        {
                          TipoAssentoTexto[
                            sessaoAssento.assento
                              .tipoAssentoId as keyof typeof TipoAssentoTexto
                          ]
                        }
                        ) -{" "}
                        {sessaoAssento.tipoEntradaId === 1
                          ? "INTEIRA"
                          : "MEIA-ENTRADA"}
                      </p>
                      <div className="flex justify-between">
                        <p>
                          1x R$
                          {sessaoAssento.tipoEntradaId === 1 ? 30 : 15}
                          ,00
                        </p>
                        <p className="font-bold">
                          R${sessaoAssento.tipoEntradaId === 1 ? 30 : 15},00
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </code>

            <div className="w-full h-[1px] bg-amber-500"></div>

            <code className="text-xl flex justify-between p-5 bg-amber-200 font-bold">
              <p>TOTAL</p>
              <p>R${ingresso.pagamento?.valorTotal},00</p>
            </code>

            <div className="w-full h-[1px] bg-amber-500"></div>

            <code className="text-sm flex flex-col p-5">
              <p className="font-bold text mb-2">FORMA DE PAGAMENTO</p>
              <div>
                <p className="flex items-center gap-2">
                  <CreditCardIcon size={16} />{" "}
                  {ingresso.pagamento?.formaPagamentoId === 1
                    ? "CARTÃO DE CRÉDITO"
                    : ingresso.pagamento?.formaPagamentoId === 2
                      ? "CARTÃO DE DÉBITO"
                      : "PIX"}
                </p>
                <p>VALOR PAGO: R${ingresso.pagamento?.valorTotal},00</p>
                <p>
                  DATA DO PAGAMENTO:{" "}
                  {new Date(
                    String(ingresso.pagamento?.criadoEm)
                  ).toLocaleString()}
                </p>
              </div>
            </code>

            <div className="w-full h-[1px] bg-amber-500"></div>

            <code className="text-sm flex flex-col p-5">
              <p className="font-bold text mb-2">DADOS DO CLIENTE</p>
              <div>CPF: {maskCPF(ingresso.documentoResponsavel)}</div>
            </code>

            <div className="w-full h-[0.5px] bg-amber-500"></div>

            <code className="text-sm flex flex-col items-center text-center p-5">
              ***CUPOM FISCAL ELETRÔNICO***
              <br />
              Via do Cliente
              <br />
              Consulte pela Chave de Acesso em:
              <br />
              www.nfce.fazenda.gov.br
              <div className="text-xs p-1 my-2 w-full bg-[#F3F4F6]">
                35250612345678000190650010000004567890123456
              </div>
              <br />
              Obrigado pela preferência!
              <br />
              Volte sempre! 🍿🎬
            </code>
          </div>
          <div className="w-[500px] mx-auto flex">
            <Rebarba direcao="baixo" />
          </div>
          <BotaoNavegacao
            to={`/`}
            toParams={{}}
            direction="right"
            texto="Prosseguir para Início"
          />
        </div>
      )}
    </>
  );
};

function maskCPF(cpf: string): string {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

interface RebarbaProps {
  direcao: "baixo" | "cima";
}

const Rebarba = ({ direcao }: RebarbaProps) => {
  const classes =
    direcao === "cima"
      ? "border-b-10 border-b-amber-100"
      : "border-t-10 border-t-amber-100";

  return Array.from({ length: 26 }).map(() => (
    <div
      className={clsx(
        "w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent",
        classes
      )}
    ></div>
  ));
};
