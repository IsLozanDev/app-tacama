import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { FilterPedidoComponent } from './filter-pedido/filter-pedido.component';
import { GrillaPedidoComponent } from './grilla-pedido/grilla-pedido.component';
import { PedidoService } from '@service/pedido.service';
import { IListPedido } from '@interface/pedido/IListPedido';
import { IPedidoRequest } from '@interface/pedido/IPedidoRequest';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FilterPedidoComponent,
    GrillaPedidoComponent,
  ],
  templateUrl: './pedido.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PedidoComponent {
  pedidos: IListPedido[] = [];

  constructor(private _pedidoService: PedidoService, private router: Router) {
    this.getPedidos('');
  }

  getPedidos(filter: any) {
    const finicio = new Date(2024, 5 - 1, 9);
    const ffinal = new Date(2024, 8 - 1, 30);

    ///10/1/ /false/2024-05-09/2024-05-13/ / /false/0/P
    const request: IPedidoRequest = {
      idEmpresa: 10,
      idLocal: 1,
      codPedidoCad: ' ',
      todos: false,
      fecInicial: moment(finicio).format('YYYY-MM-DD'),
      fecFinal: moment(ffinal).format('YYYY-MM-DD'),
      Estado: ' ',
      RazonSocial: ' ',
      Tipo: false,
      idVendedor: 0,
      indCotPed: 'P',
    };
    const { filtro } = filter;
    let search = filtro ?? '';

    this._pedidoService.getListPedidos(request).subscribe((resp: any) => {
      this.pedidos = resp;
    });
  }

  openModal(id: number) {
    this.router.navigate([`/tacama/pedido/register/0`]);
  }
}
