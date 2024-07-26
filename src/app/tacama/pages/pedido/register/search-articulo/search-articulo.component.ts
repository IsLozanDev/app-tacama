import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ArticleSearch } from '@interface/article/IArticleSearch';
import { IRequestArticleSearch } from '@interface/article/IRequestArticleSearch';
import { ICustomer } from '@interface/customer/ICustomer';
import { ISearch } from '@interface/search/ISearch';
import { ArticleService } from '@service/article.service';
import { AutocompleteComponent } from '@shared/autocomplete/autocomplete.component';

@Component({
  selector: 'app-search-articulo',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
  templateUrl: './search-articulo.component.html',
})
export class SearchArticuloComponent {
  textPlaceHolder = 'Ingrese texto para buscar articulos...';
  car!: ISearch;
  customer!: ICustomer;
  listSearch: ISearch[] = [];
  listArticles: ArticleSearch[] = [];

  @Input() set infoCustomer(value: ICustomer) {
    this.customer = value;
  }

 @Output() onArticleSelectEvent = new EventEmitter<ArticleSearch>();
 @ViewChild('cantidad') cantidad!: ElementRef;
 @ViewChild('articuleInputSearch') articuleInputSearch!: AutocompleteComponent;

  constructor(private _articleService: ArticleService) {}

  setCarName($event: ISearch) {
    this.car = $event;
  }

  addArticle(cantidadInput: number) {
    const article = this.listArticles.find((x) => x.IdArticulo == this.car.Id);
    if (article) {
      article.cantidad = cantidadInput;
      article.importe = cantidadInput * article.PrecioVenta;
      this.onArticleSelectEvent.emit(article);
      this.listSearch = [];
      this.listArticles = [];
      this.cantidad.nativeElement.value = '';
      this.articuleInputSearch.carSearchInput.nativeElement.value = '';
    }
  }

  getClients($event: { filter: string }) {
    this.listSearch = [];

    var listaSearchTemp: ISearch[] = [];

    const filter: IRequestArticleSearch = {
      Anio: '2023',
      Mes: '08',
      codArticulo: ' ',
      nomArticulo: $event.filter,
      idListaPrecio: this.customer.IdListaPrecio,
      FechaStock: new Date('2023-08-10'),
      idCanalVenta: this.customer.IdCanalVenta,
    };

    const result = this._articleService
      .getListArticlesSearch(filter)
      .subscribe((resp: ArticleSearch[]) => {
        resp.map((item) => {
          const model = new ArticleSearch(
            item.IdArticulo,
            item.CodArticulo,
            item.NomArticulo,
            item.Stock,
            item.PrecioVenta,
            item.PrecioVenta,
            item.PrecioVenta,
            item.CodBarra,
            0,
            0
          );

          const search: ISearch = {
            Id: model.IdArticulo,
            FullName: model.concatFullNameArticle,
          };

          listaSearchTemp.push(search);
        });

        this.listArticles = [...resp];

        this.listSearch = listaSearchTemp;
      });
  }
}
