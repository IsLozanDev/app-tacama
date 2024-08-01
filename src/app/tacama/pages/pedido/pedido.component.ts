import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { FilterPedidoComponent } from './filter-pedido/filter-pedido.component';
import { GrillaPedidoComponent } from './grilla-pedido/grilla-pedido.component';
import { PedidoService } from '@service/pedido.service';
import { IListPedido } from '@interface/pedido/IListPedido';
import { IPedidoRequest } from '@interface/pedido/IPedidoRequest';
import moment from 'moment';
import { Router } from '@angular/router';
import { ModalComponent } from '@shared/modal/modal.component';
import { PedidoPdfComponent } from './pedido-pdf/pedido-pdf.component';
import { ReporteService } from '@service/reportes.service';
import { GetPdfDto } from '@interface/report/GetPdfDto';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FilterPedidoComponent,
    GrillaPedidoComponent,
    ModalComponent,
    PedidoPdfComponent,
  ],
  templateUrl: './pedido.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PedidoComponent {
  @ViewChild('modal') modal!: ModalComponent;

  pedidos: IListPedido[] = [];
  base64ReportPedido!: any;

  constructor(
    private _pedidoService: PedidoService,
    private router: Router,
    private _reporteService: ReporteService
  ) {
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

  goModalPdf(id: number) {

    this.base64ReportPedido = null;
    this._reporteService.getListPedidos(id).subscribe((resp: GetPdfDto) => {
      const basePdf = resp.base64;
      try {
        const byteArray = new Uint8Array(
          atob(basePdf)
            .split('')
            .map((char) => char.charCodeAt(0))
        );

        const file = new Blob([byteArray], { type: 'application/pdf' });
        const fileURL = window.URL.createObjectURL(file);

        this.base64ReportPedido = byteArray;

        this.modal.openModal();


      } catch (error) {
        console.log(error);
      }
    });
  }

  closeModal() {
    this.base64ReportPedido = '';
    this.modal.closeModal();
  }
}
