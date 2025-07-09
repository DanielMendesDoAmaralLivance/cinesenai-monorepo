export enum TipoAssentoEnum {
  Normal = 1,
  Preferencial = 2,
  Acompanhante = 3,
  NamoradeiraEsquerda = 4,
  NamoradeiraDireita = 5,
}
export const TipoAssentoTexto = {
  [TipoAssentoEnum.Normal]: "Padrão",
  [TipoAssentoEnum.Preferencial]: "Preferencial",
  [TipoAssentoEnum.Acompanhante]: "Acompanhante",
  [TipoAssentoEnum.NamoradeiraEsquerda]: "Namoradeira Esquerda",
  [TipoAssentoEnum.NamoradeiraDireita]: "Namoradeira Direita",
};
