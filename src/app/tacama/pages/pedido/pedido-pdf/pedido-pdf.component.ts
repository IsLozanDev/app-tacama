import { ICmdPedido } from './../../../../interface/pedido/ICmdPedido';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetPdfDto } from '@interface/report/GetPdfDto';
import { ReportViewComponent } from '@shared/ReportView/ReportView.component';

@Component({
  selector: 'app-pedido-pdf',
  standalone: true,
  imports: [CommonModule, ReportViewComponent],
  templateUrl: './pedido-pdf.component.html',
})
export class PedidoPdfComponent {

  strPdf!: any;

  @Output() onClosed = new EventEmitter<void>();


  @Input() set idPedido(value: string) {
    this.strPdf = '';
    if (value) {
      this.strPdf = value;
    }

  }
  close() {
    this.strPdf = '';
    this.onClosed.emit();
  }
}
