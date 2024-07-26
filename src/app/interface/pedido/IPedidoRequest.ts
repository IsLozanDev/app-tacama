export interface IPedidoRequest {
  idEmpresa: number;
  idLocal: number;
  codPedidoCad?: string;
  todos: boolean;
  fecInicial: string;
  fecFinal: string;
  Estado?: string;
  RazonSocial?: string;
  Tipo: boolean;
  idVendedor: number;
  indCotPed: string;
}
