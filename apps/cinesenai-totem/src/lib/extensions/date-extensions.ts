export function formatarDataSessao(dataStr: string | Date) {
  const data = new Date(dataStr);
  const agora = new Date();

  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const dataComparar = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate()
  );

  const horaMin = data
    .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");

  if (dataComparar.getTime() === hoje.getTime()) {
    return `Hoje, ${horaMin}`;
  }
  if (dataComparar.getTime() === amanha.getTime()) {
    return `Amanhã, ${horaMin}`;
  }

  const extenso = data
    .toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    })
    .replace(".", "")
    .replace(
      /^([a-zá-úç]{3}), (\d{2}) de ([a-zá-úç]+)/i,
      (_, dia, num, mes) => {
        return (
          dia.charAt(0).toUpperCase() +
          dia.slice(1) +
          ", " +
          num +
          " de " +
          mes.charAt(0).toUpperCase() +
          mes.slice(1)
        );
      }
    );

  return `${extenso}, ${horaMin}`;
}
