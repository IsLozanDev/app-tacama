import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './filter-cliente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterClienteComponent {
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
