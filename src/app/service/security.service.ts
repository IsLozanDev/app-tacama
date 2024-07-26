import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '@interface/security/ILogin';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceSession } from '../lib/service/session.service';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  url: string = '';
  constructor(private http: HttpClient,    private _sessionService: ServiceSession) {
    const { urlAddress } = environment.api;
    this.url = urlAddress ? urlAddress : '';
  }

  login(usuario: ILogin) {
    return this.http.post(`${this.url}security/login`, usuario).pipe(
      map((resp) => {
        const dataUser = JSON.stringify(resp);
        this._sessionService.create(dataUser);
        return resp;
      })
    );
  }
}
