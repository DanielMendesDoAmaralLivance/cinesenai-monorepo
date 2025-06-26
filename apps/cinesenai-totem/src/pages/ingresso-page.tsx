import clsx from "clsx";
import { CreditCardIcon } from "lucide-react";
import QRCode from "react-qr-code";

export const IngressoPage = () => {
  return (
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
            value={"https://www.cinesenai.com.br/ingresso/1234567890"}
            viewBox={`0 0 256 256`}
          />
          <div>
            <p className="font-bold text mb-2">
              🎬 FILME: COMO TREINAR O SEU DRAGÃO
            </p>
            Sala 1 (Padrão) | Dublado
            <br />
            Sessão CineAzul | 01/01/2025 20:00 - 22:00
          </div>
        </code>

        <div className="w-full h-[1px] bg-amber-500"></div>

        <code className="text-sm flex flex-col p-5 gap-2">
          <p className="font-bold text mb-2">ITENS</p>
          01 - ASSENTO A1 (NAMORADEIRA ESQUERDA) - MEIA-ENTRADA
          <br />
          <div className="flex justify-between">
            1x R$15,00
            <p className="font-bold">R$15,00</p>
          </div>
          01 - ASSENTO A2 (DEFICIENTE FÍSICO) - INTEIRA
          <br />
          <div className="flex justify-between">
            1x R$30,00
            <p className="font-bold">R$30,00</p>
          </div>
        </code>

        <div className="w-full h-[1px] bg-amber-500"></div>

        <code className="text-xl flex justify-between p-5 bg-amber-200 font-bold">
          <p>TOTAL</p>
          <p>R$45,00</p>
        </code>

        <div className="w-full h-[1px] bg-amber-500"></div>

        <code className="text-sm flex flex-col p-5">
          <p className="font-bold text mb-2">FORMA DE PAGAMENTO</p>
          <div>
            <p className="flex items-center gap-2">
              <CreditCardIcon size={16} /> CARTÃO DE CRÉDITO
            </p>
            <p>VALOR PAGO: R$45,00</p>
            <p>DATA DO PAGAMENTO: 01/01/2025 23:59:18</p>
          </div>
        </code>

        <div className="w-full h-[1px] bg-amber-500"></div>

        <code className="text-sm flex flex-col p-5">
          <p className="font-bold text mb-2">DADOS DO CLIENTE</p>
          <div>CPF: 123.456.789-00</div>
        </code>

        <div className="w-full h-[1px] bg-amber-500"></div>

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
    </div>
  );
};

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
