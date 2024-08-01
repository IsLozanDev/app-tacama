import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListPedido } from '@interface/pedido/IListPedido';

@Component({
  selector: 'app-grilla-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grilla-pedido.component.html',
  styleUrls: ['./grilla-pedido.component.css'],
})
export class GrillaPedidoComponent {
  @Output() onEditEvent = new EventEmitter<IListPedido>();
  @Output() onDeleteEvent = new EventEmitter<IListPedido>();
  @Output() onViewPdfEvent = new EventEmitter<number>();

  @Input() pageSize: number = 3;
  @Input() page: number = 1;
  @Input() count: number = 0;

  categorias: IListPedido[] = [];

  @Input() set setDataList(value: IListPedido[]) {
    this.categorias = value;
  }

  edit(row: IListPedido) {
    this.onEditEvent.emit(row);
  }

  delete(row: IListPedido) {
    this.onDeleteEvent.emit(row);
  }

  sendViewPdf(id: number) {
    this.onViewPdfEvent.emit(id);
  }
}
