export interface IListPedido {
  idEmpresa: number;
  idLocal: number;
  idPedido: number;
  codPedidoCad: string;
  Fecha: Date;
  idFacturar: number;
  desFacturar: string;
  idNotificar: number;
  desNotificador: null;
  idMoneda: string;
  desMoneda: string;
  Observacion: string;
  Estado: string;
  desEstado: string;
  Tipo: number;
  idVendedor: number;
  Vendedor: string;
  idDivision: number;
  idEstablecimiento: number;
  idZona: number;
  NemoTipoDoc: string;
  idFormaPago: number;
  TipoDoc: number;
  nrofactura: string;
  nroGuia: null | string;
  idPedidoEnlace: number;
  tipoGeneracion: string;
  CorreoEnviado: boolean | null;
  UsuarioRegistro: string;
  fechaRegistro: Date;
  UsuarioModificacion: string;
  fechaModificacion: Date;
  indObsStock: number;
  desindObsStock: string;
  indObsCredito: number;
  desindObsCredito: string;
  indBonificacion: number;
  desindBonificacion: string;
  indDsctoProntoPago: number;
  DsctoProntoPago: number;
  totsubTotal: number;
  totIgv: number;
  totDsctos: number;
  totTotal: number;
  indFechaFinReserva: number;
  FechaFinReserva: null;
  UsuarioGen: null | string;
  FechaGen: Date | null;
  NroGuiaGen: null | string;
  nroFacturaGen: null | string;
  idMonedaLineaCredito: string;
  tipCambio: number;
  LineaCredito: number;
  CreditoLetras: number;
  CreditoFacturas: number;
  CreditoDocumento: number;
  LineaDisponible: number;
  OrdenDeCompraNum: string;
  LetraNoAceptadas: number;
  LetraProtestadas: number;
  IdPaisOrigen: number;
  idPaisDestino: number;
  idIncoterms: number;
  IdiomaImpresion: number;
  idContacto: number;
  FechaEntrega: Date;
  Aprobacion: number;
  MensajeAprobacion: string;
  desAprobacion: string;
  AprobacionPrecios: number;
  MensajeAprobacionPrecios: null | string;
  desAprobacionPrecios: string;
  AprobacionAlmacen: number;
  MensajeAprobacionAlmacen: null;
  desAprobacionAlmacen: string;
  AprobacionTg: number;
  MensajeAprobacionTg: null;
  DesAprobacionTg: string;
  idCanalVenta: number;
  nombreCanal: string;
  TipoCanal: number;
  Facturado: number;
  desCondicion: string;
  PuntoLlegada: string;
}