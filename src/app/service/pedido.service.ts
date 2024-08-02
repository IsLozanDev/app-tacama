import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IListPedido } from '@interface/pedido/IListPedido';
import { IPedidoRequest } from '@interface/pedido/IPedidoRequest';
import { ICmdPedido } from '@interface/pedido/ICmdPedido';
import { GetPedidoDto } from '@interface/pedido/IGetPedidoDto';

@Injectable({ providedIn: 'root' })
export class PedidoService {


  url: string = '';
  constructor(private http: HttpClient) {
    const { urlAddress } = environment.api;
    this.url = urlAddress ? urlAddress : '';
  }
  //Pedido/GetListPedidoNacional/10/1/ /false/2024-05-09/2024-05-13/ / /false/0/P
  getListPedidos(req: IPedidoRequest) {
    const urlRequest = `${req.idEmpresa}/${req.idLocal}/${req.codPedidoCad}/${req.todos}/${req.fecInicial}/${req.fecFinal}/${req.Estado}/${req.RazonSocial}/${req.Tipo}/${req.idVendedor}/${req.indCotPed}`;
    return this.http.get<IListPedido>(
      `${this.url}Pedido/GetListPedidoNacional/${urlRequest}`
    );
  }
  savePedido(data: ICmdPedido) {
    return this.http.post(`${this.url}Pedido/SavePedido`, data);
  }

  getPedidoById(id: number) {
    return this.http.get<GetPedidoDto>(`${this.url}pedido/${id}`);
  }

}
