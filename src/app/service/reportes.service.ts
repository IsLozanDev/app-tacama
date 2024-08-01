import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetPdfDto } from '@interface/report/GetPdfDto';

@Injectable({ providedIn: 'root' })

export class ReporteService {
  url: string = '';
  constructor(private http: HttpClient) {
    const { urlAddress } = environment.api;
    this.url = urlAddress ? urlAddress : '';
  }

  getListPedidos(id: number) {
    return this.http.get<GetPdfDto>(
      `${this.url}ReportTacama/GetConstanciaPdf/${id}`
    );
  }
}
