import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ArticleSearch } from '@interface/article/IArticleSearch';
import { IRequestArticleSearch } from '@interface/article/IRequestArticleSearch';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  url: string = '';
  constructor(private http: HttpClient) {
    const { urlAddress } = environment.api;
    this.url = urlAddress ? urlAddress : '';
  }

  getListArticlesSearch(filter: IRequestArticleSearch) {
    const urlFilter = `${filter.Anio}/${filter.Mes}/${filter.codArticulo}/${filter.nomArticulo}/${filter.idListaPrecio}/${filter.FechaStock.toISOString().split('T')[0]}/${filter.idCanalVenta}`;

    return this.http.get<ArticleSearch[]>(
      `${this.url}articulo/getArticulosDetailsSearch/${urlFilter}`
    );
  }
}
