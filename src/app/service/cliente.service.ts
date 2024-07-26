import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ISearch } from '@interface/search/ISearch';
import { ICustomer } from '@interface/customer/ICustomer';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  url: string = '';
  constructor(private http: HttpClient) {
    const { urlAddress } = environment.api;
    this.url = urlAddress ? urlAddress : '';
  }

  getListClientsSearch(filter: string) {
    return this.http.get<ISearch>(
      `${this.url}Cliente/getListClients/${filter}`
    );

  }
  getClientInfo(Id: number) {
     return this.http.get<ICustomer>(
      `${this.url}Pedido/getClientInfo/${Id}`
    );
  }

}
