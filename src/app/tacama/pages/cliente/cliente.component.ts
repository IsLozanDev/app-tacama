import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { FilterClienteComponent } from './filter-cliente/filter-cliente.component';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, TitleComponent, FilterClienteComponent],
  templateUrl: './cliente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClienteComponent {}
