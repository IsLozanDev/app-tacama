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
  classHeader: string = 'px-4 py-3 text-sm font-semibold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-750';

  @Output() onEditEvent = new EventEmitter<number>();
  @Output() onDeleteEvent = new EventEmitter<IListPedido>();
  @Output() onViewPdfEvent = new EventEmitter<number>();

  @Input() pageSize: number = 3;
  @Input() page: number = 1;
  @Input() count: number = 0;

  categorias: IListPedido[] = [];

  @Input() set setDataList(value: IListPedido[]) {
    this.categorias = value;
  }

  edit(id: number) {
    this.onEditEvent.emit(id);
  }

  delete(row: IListPedido) {
    this.onDeleteEvent.emit(row);
  }

  sendViewPdf(id: number) {
    this.onViewPdfEvent.emit(id);
  }
  toggleDropdown($event: MouseEvent) {
    document.getElementById('dropdownMenu')?.classList.remove('hidden');
  }
}
