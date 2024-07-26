export interface IRequestArticleSearch {
  Anio: string;
  Mes: string;
  codArticulo: string;
  nomArticulo: string;
  idListaPrecio: number;
  FechaStock: Date;
  idCanalVenta?: number;
}
