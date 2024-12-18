import { ICustomer } from "@interface/customer/ICustomer";

export interface GetPedidoDto {
  IdPedido:                 number;
  IdEmpresa:                number;
  IdLocal:                  number;
  CodPedido:                number;
  CodPedidoCad:             string;
  Fecha:                    Date;
  IdConsignatario:          null;
  IdNotificar:              null;
  IdConsFitosanitario:      null;
  IdFacturar:               number;
  IdBroker:                 null;
  IdSemanaEmbarque:         null;
  IdPaisOrigen:             null;
  IdOrigen:                 null;
  IdPaisDestino:            null;
  IdDestino:                null;
  IdFlete:                  null;
  IdBlEmision:              null;
  IdTipoCompra:             null;
  IdIncotermsPrecio:        null;
  IdIncoterms:              null;
  IdMoneda:                 string;
  Observacion:              string;
  Indicaciones:             string;
  IdOperador:               null;
  Estado:                   string;
  Reserva:                  null;
  IdNaviera:                null;
  Eta:                      null;
  Etd:                      null;
  Barco:                    null;
  AlmacenIngreso:           null;
  FechaPosic:               null;
  FechaInspeccion:          null;
  Contenedor:               null;
  TermografosNum:           null;
  TermografosNum2:          null;
  TermografosUbi:           null;
  TermografosUbi2:          null;
  PrecintoOperador:         null;
  PrecintoNaviera:          null;
  PrecintoSenasa:           null;
  PrecintoAduana:           null;
  PrecintoOtro:             null;
  NroGuia:                  string;
  NroDocReferencia:         null;
  FecFactura:               null;
  NroFactura:               string;
  NroBl:                    null;
  NroDam:                   null;
  IdFormaPago:              number;
  IdTipCondicion:           number;
  IdCondicion:              number;
  IndDsctoProntoPago:       boolean;
  DsctoProntoPago:          number;
  IndBonificacion:          boolean;
  IndObsStock:              boolean;
  ObsStock:                 string;
  IndObsCredito:            boolean;
  ObsCredito:               string;
  IdVendedor:               number;
  IdEstablecimiento:        number;
  IdZona:                   number;
  Tipo:                     boolean;
  TotsubTotal:              number;
  TotDscto1:                number;
  TotDscto2:                number;
  TotDscto3:                number;
  TotIsc:                   number;
  TotIgv:                   number;
  TotTotal:                 number;
  IdSucursalCliente:        number;
  PuntoPartida:             string;
  PuntoLlegada:             string;
  Referencia:               null;
  Contacto:                 null;
  Telefono:                 null;
  Correo:                   null;
  FechaEntrega:             null;
  HorarioEntrega:           null;
  EsAnticipo:               null;
  TipoDoc:                  number;
  IdTransporte:             number;
  IndCotPed:                string;
  IdPedidoEnlace:           number;
  TipoGeneracion:           string;
  IdDivision:               number;
  IdCanalVenta:             number;
  PorDscto:                 number;
  FlagListaActivo:          boolean;
  IdListaPrecio:            number;
  CorreoEnviado:            boolean;
  IndFechaFinReserva:       boolean;
  FechaFinReserva:          Date;
  UsuarioGen:               string;
  FechaGen:                 Date;
  NroGuiaGen:               string;
  NroFacturaGen:            string;
  Aprobacion:               number;
  MensajeAprobacion:        string;
  IdMonedaLineaCredito:     string;
  TipCambio:                null;
  LineaCredito:             number;
  CreditoLetras:            number;
  CreditoFacturas:          number;
  CreditoDocumento:         number;
  LineaDisponible:          number;
  OrdenDeCompraNum:         string;
  LetraNoAceptadas:         null;
  LetraProtestadas:         null;
  IdiomaImpresion:          null;
  IdContacto:               null;
  PuertoOrigen:             null;
  PuertoDestino:            null;
  DiasValidez:              number;
  AprobacionPrecios:        number;
  MensajeAprobacionPrecios: string;
  IndAgencia:               boolean;
  IdAgenciaEnvio:           number;
  IdDireccion:              number;
  UbigeoCot:                string;
  AprobacionAlmacen:        null;
  MensajeAprobacionAlmacen: null;
  IndMailServicio:          boolean;
  AprobacionTg:             null;
  MensajeAprobacionTg:      null;
  IndMailTg:                null;
  ExpPedidoDets:            GetExpPedidoDet[];
  clienteHeader:            ICustomer;
}

export interface GetExpPedidoDet {
  IdPedido:                 number;
  IdEmpresa:                number;
  IdLocal:                  number;
  IdItem:                   number;
  IndArticuloNuevo:         boolean;
  IdArticulo:               number;
  NomArticulo:              string;
  IdCalibre:                null;
  IdCategoria:              null;
  IdTipoPrecio:             number;
  IndSinStock:              boolean;
  Cantidad:                 number;
  CantidadUnit:             number;
  CantidadFinal:            number;
  PrecioUnitario:           number;
  PrecioConImpuesto:        number;
  Dscto1:                   number;
  Dscto2:                   number;
  Dscto3:                   number;
  PorDscto1:                number;
  PorDscto2:                number;
  PorDscto3:                number;
  FlgIgv:                   boolean;
  Isc:                      null;
  Igv:                      number;
  SubTotal:                 number;
  Total:                    number;
  PorIsc:                   null;
  PorIgv:                   number;
  FlgAfectacionIgv:         boolean;
  TipoAfectacionIgv:        string;
  IdPresentacion:           null;
  IdMarca:                  null;
  IdTipoMedida:             number;
  IdUmedida:                number;
  IdTipoArticulo:           number;
  IdAlmacen:                number;
  Stock:                    number;
  Lote:                     string;
  NroOt:                    string;
  IndCalculo:               boolean;
  TipoImpSelectivo:         string;
  Capacidad:                number;
  Contenido:                number;
  IndDetraccion:            boolean;
  TipDetraccion:            string;
  TasaDetraccion:           number;
  IndPrecioUnit:            boolean;
  PrecioUnitIni:            number;
  TipArticulo:              string;
  IndDistribuirLote:        boolean;
  IndRptaStock:             boolean;
  IndNoAtender:             boolean;
  ObsNoAtender:             null;
  CantidadNoAtendida:       null;
  CantidadAtender:          null;
  ItemPrecio:               number;
  VerImagen:                null;
  ChkPromo:                 null;
  IndPrecioPromocional:     null;
  PrecioUnitPromocional:    null;
  IndUmedida:               boolean;
  ContenidoUmedida:         null;
  CantidadUmedida:          null;
  IndPack:                  boolean;
  IdArticuloPack:           null;
  CantidadPack:             null;
  IdArticuloNavegation:     null;
  IdPresentacionNavigation: null;
}


