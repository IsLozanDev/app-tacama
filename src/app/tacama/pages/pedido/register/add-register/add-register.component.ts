import { CommonModule } from '@angular/common';
import { ClienteService } from './../../../../../service/cliente.service';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICustomer } from '@interface/customer/ICustomer';
import { ICmdPedido } from '@interface/pedido/ICmdPedido';
import { IMontoHeaderPedido } from '@interface/pedido/IMontoPedido';
import { ISearch } from '@interface/search/ISearch';
import { AutocompleteComponent } from '@shared/autocomplete/autocomplete.component';

@Component({
  selector: 'app-add-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AutocompleteComponent, CommonModule],
  templateUrl: './add-register.component.html',
  styles: ``,
})

export class AddRegisterComponent {
  public form!: FormGroup;

  car!: ISearch;
  listClients: ISearch[] = [];
  textPlaceHolder = 'Ingrese texto para buscar clientes...';
  customer!: ICustomer;

  AddPedido!: ICmdPedido;
  montoHeader!: IMontoHeaderPedido | null;

  constructor(private fb: FormBuilder,private _clienteService: ClienteService) {
    this.form = this.fb.group({
      idCondicion: [0],
    });
  }


  @Output() onSaveEvent = new EventEmitter<any>();
  @Output() onCloseEvent = new EventEmitter<boolean>();
  @Output() onCustomerSelectEvent = new EventEmitter<ICustomer>();

  @Input() set setMontoHeader(value: IMontoHeaderPedido) {
    if (value) {
      this.montoHeader = value;
    }else{
      this.montoHeader = { SubTotal: 0, Dscto: 0, Igv: 0, Total: 0 };
    }
  }



  save(): void {
    this.onSaveEvent.emit({ state: true, ...this.form.value });
  }

  close() {
    this.onCloseEvent.emit(true);
  }

  setCarName($event: ISearch) {
    this.car = $event;

    this._clienteService.getClientInfo($event.Id).subscribe((resp: any) => {
      this.customer = resp;
      this.onCustomerSelectEvent.emit(this.customer);
    });


  }

  getClients($event: { filter: string }) {
    const result = this._clienteService
      .getListClientsSearch($event.filter)
      .subscribe((resp: any) => {
        this.listClients = [...resp];
      });
  }
}
