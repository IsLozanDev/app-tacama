import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-pedido',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter-pedido.component.html',
  styles: ``,
})
export class FilterPedidoComponent {
  @Output() onFiltroEvent = new EventEmitter<any>();
  @Output() onAddEvent = new EventEmitter<any>();

  filtroForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.filtroForm = this._formBuilder.group({ filtro: [''] });
  }

  send() {
    this.onFiltroEvent.emit(this.filtroForm.value);
  }

  add() {
    this.onAddEvent.emit(true);
  }
}
