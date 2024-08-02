export interface ICustomer {
  NroTelefContacto: null;
  IdCanalVenta: number;
  NombreCanalVenta: string;
  IdListaPrecio: number;
  NombreListaPrecio: string;
  Direccion: string;
  Ruc: string;
  condiciones: Condicione[];
  idCondicion: number;
  NombreCliente: string;
}

export interface Condicione {
  Id: number;
  Descripcion: string;
}
