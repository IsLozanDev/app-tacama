import { ICustomer } from '@interface/customer/ICustomer';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '@shared/dialog/dialog.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { TitleComponent } from '@shared/title/title.component';
import { AddRegisterComponent } from './add-register/add-register.component';
import { GrillaRegisterComponent } from './grilla-register/grilla-register.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { AutocompleteComponent } from '@shared/autocomplete/autocomplete.component';
import { SearchArticuloComponent } from './search-articulo/search-articulo.component';
import { ArticleSearch } from '@interface/article/IArticleSearch';
import { IMontoHeaderPedido } from '@interface/pedido/IMontoPedido';
import { ExpPedidoDet, ICmdPedido } from '@interface/pedido/ICmdPedido';
import { ServiceSession } from '../../../../lib/service/session.service';
import { PedidoService } from '@service/pedido.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    ModalComponent,
    AddRegisterComponent,
    GrillaRegisterComponent,
    ModalRegisterComponent,
    SearchArticuloComponent,
  ],
  templateUrl: './register.component.html',
  styles: ``,
})
export default class RegisterComponent {
  idParam: number = 0;
  customerSelected: ICustomer = {} as ICustomer;
  montoHeaderPedido: IMontoHeaderPedido = {} as IMontoHeaderPedido;
  listArticlesSelected: ArticleSearch[] = [];

  sendMessage!: string;
  type!: 'grabar' | 'actualiza' | 'eliminar';

  @ViewChild('confirm') confirm!: DialogComponent;
  @ViewChild('headerComponent') headerComponent!: AddRegisterComponent;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private elementRef: ElementRef,
    private _sessionService: ServiceSession,
    private _pedidoService: PedidoService
  ) {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
  }

  showModalAdd() {}

  setArticleSelected(article: ArticleSearch) {
    this.listArticlesSelected.push(article);

    const headerPedido = this.listArticlesSelected.map((x) => {
      return {
        SubTotal: x.importe,
        Dscto: x.importe !== null ? x.importe * 0.1 : 0,
        Igv: x.Igv,
        Total: x.importe + x.Igv,
      } as IMontoHeaderPedido;
    });

    const total = headerPedido.reduce((acc, cur) => {
      return {
        SubTotal: acc.SubTotal + cur.SubTotal,
        Dscto: acc.Dscto + cur.Dscto,
        Igv: acc.Igv + cur.Igv,
        Total: acc.Total + cur.Total + acc.Igv - (acc.Dscto + cur.Dscto),
      } as IMontoHeaderPedido;
    });

    this.montoHeaderPedido = total;
  }

  goReturn() {
    this._router.navigate(['/tacama/pedido']);
  }

  save() {
    this.sendMessage = '¿Desea grabar el pedido?';
    this.confirm.openModal();
  }

  confirmacion(rest: any) {
    if (rest) {
      if (this.type === 'grabar') {
        this.listArticlesSelected = [];
        this.customerSelected = {} as ICustomer;
        this.montoHeaderPedido = {} as IMontoHeaderPedido;
        this.goReturn();
      } else {
        const idCondicion =
          this.headerComponent?.form.get('idCondicion')?.value;
        const data = this.getCmdPedido(
          this.listArticlesSelected,
          this.customerSelected,
          this.montoHeaderPedido
        );
        data.idCondicion = Number(idCondicion);
        //Llamar al servicio para grabar
        this._pedidoService.savePedido(data).subscribe((resp) => {
          this.type = 'grabar';
          this.sendMessage = 'Pedido grabado con éxito, presione SI para continuar';
          this.confirm.openModal();
        });
      }
    }
  }
  getCmdPedido(
    listArticlesSelected: ArticleSearch[],
    customerSelected: ICustomer,
    montoHeaderPedido: IMontoHeaderPedido
  ) {
    var idItem = 0;

    const pedidoDetails = listArticlesSelected.map((x) => {
      return {
        idItem: ++idItem,
        indArticuloNuevo: false,
        idArticulo: x.IdArticulo,
        nomArticulo: x.NomArticulo,
        flgAfectacionIgv: true,
        tipoAfectacionIgv: '10',
        idTipoPrecio: 0,
        indSinStock: false,
        cantidad: x.cantidad,
        precioUnitario: x.PrecioVenta,
        precioConImpuesto: x.PrecioVenta + x.Igv,
        dscto1: 0,
        dscto2: 0,
        dscto3: 0,
        porDscto1: 0,
        porDscto2: 0,
        porDscto3: 0,
        flgIgv: true,
        igv: x.Igv,
        subTotal: x.importe,
        total: x.importe + x.Igv,
        porIgv: 0.18,
        idTipoMedida: 0,
        idUmedida: 0,
        idTipoArticulo: 0,
        idAlmacen: 0,
        stock: 0,
        lote: '',
        nroOt: '',
        indCalculo: false,
        tipoImpSelectivo: '',
        capacidad: 0,
        contenido: 0,
        indDetraccion: false,
        tipDetraccion: '',
        tasaDetraccion: 0,
        indPrecioUnit: false,
        precioUnitIni: 0,
        tipArticulo: '',
        indDistribuirLote: false,
        indNoAtender: false,
        itemPrecio: 0,
        indUmedida: false,
      } as ExpPedidoDet;
    });

    const cmdPedido: ICmdPedido = {
      NroRucCliente: customerSelected.Ruc,
      idLocal: 1,
      codPedido: 0,
      fecha: new Date(Date.now()).toISOString().split('T')[0],
      idMoneda: '02',
      observacion: '',
      indicaciones: '',
      idFormaPago: 0,
      idCondicion: 0,
      indDsctoProntoPago: false,
      dsctoProntoPago: 0,
      indBonificacion: false,
      indObsStock: false,
      obsStock: '',
      indObsCredito: false,
      obsCredito: '',
      idVendedor: this._sessionService.user.IdPersona,
      idEstablecimiento: 11,
      idZona: 18,
      tipo: false,
      totsubTotal: montoHeaderPedido.SubTotal,
      totDscto1: 0,
      totDscto2: 0,
      totDscto3: 0,
      totIsc: 0,
      totIgv: montoHeaderPedido.Igv,
      totTotal: montoHeaderPedido.Total,
      idSucursalCliente: 250,
      puntoPartida: customerSelected.Direccion,
      puntoLlegada: customerSelected.Direccion,
      tipoDoc: 105001,
      idTransporte: 148,
      idPedidoEnlace: 37143,
      idDivision: 261001,
      idCanalVenta: customerSelected.IdCanalVenta,
      porDscto: 0,
      flagListaActivo: true,
      idListaPrecio: customerSelected.IdListaPrecio,
      correoEnviado: false,
      indFechaFinReserva: false,
      fechaFinReserva: new Date(Date.now()),
      usuarioGen: this._sessionService.user.NombreCorto,
      fechaGen: new Date(Date.now()),
      aprobacion: 0,
      mensajeAprobacion: '',
      idMonedaLineaCredito: '',
      lineaCredito: 0,
      creditoLetras: 0,
      creditoFacturas: 0,
      creditoDocumento: 0,
      lineaDisponible: 0,
      ordenDeCompraNum: '',
      diasValidez: 0,
      aprobacionPrecios: 0,
      mensajeAprobacionPrecios: '',
      indAgencia: false,
      idAgenciaEnvio: 0,
      idDireccion: 0,
      ubigeoCot: '150501',
      ExpPedidoDets: pedidoDetails,
    };

    return cmdPedido;
  }
}
