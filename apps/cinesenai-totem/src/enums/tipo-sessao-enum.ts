export enum TipoSessaoEnum {
  TresD = 1,
  Normal = 2,
  Autismo = 3,
}

export const TipoSessaoTexto = {
  [TipoSessaoEnum.TresD]: "3D",
  [TipoSessaoEnum.Normal]: "Padrão",
  [TipoSessaoEnum.Autismo]: "CineAzul",
};
