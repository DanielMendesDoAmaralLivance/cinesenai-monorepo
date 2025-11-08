export const formatarComoMoedaBrasileira = (
  valor: number,
  tipoEntradaId: number
): string => {
  valor = tipoEntradaId === 2 ? valor / 2 : valor;

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
