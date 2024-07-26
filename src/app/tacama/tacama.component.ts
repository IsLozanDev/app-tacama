import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';

@Component({
  selector: 'app-tacama',
  standalone: true,
  imports: [CommonModule,RouterOutlet, SidemenuComponent],
  templateUrl: './tacama.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TacamaComponent {}
