import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { ServiceSession } from '../../lib/service/session.service';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html'
})
export class SidemenuComponent {

  userName: string = '';

  constructor(private _sessionService: ServiceSession) {
    this.userName = this._sessionService.user.NombreCorto;
  }

  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'));


}
