export class ArticleSearch {
  constructor(
    public IdArticulo: number,
    public CodArticulo: string,
    public NomArticulo: string,
    public Stock: number,
    public Porigv: number,
    public Igv: number,
    public PrecioVenta: number,
    public CodBarra: string,
    public cantidad: number,
    public importe: number
    ) {}

 get concatFullNameArticle(): string {
    return ` ${this.CodArticulo} | ${this.NomArticulo} | Stock: ${this.Stock} | PV: ${this.PrecioVenta}`;
  }

}
