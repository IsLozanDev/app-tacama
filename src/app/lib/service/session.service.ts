import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CrytoService } from './cripto.service';
import { UserModel } from '@interface/auth/IUserModel';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ServiceSession {
  private key = environment.appkey;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private crypto: CrytoService
  ) {}

  get session() {
    if (isPlatformBrowser(this.platformId)) {
      const sessionStorage = this.document.defaultView?.sessionStorage;
      const encrypted = sessionStorage?.getItem(this.key) ?? '';
      if (encrypted) {
        const objSesion = JSON.parse(this.crypto.decrypt(encrypted) as any);
        return objSesion;
      }
    }
  }

  get token() {
    if (!this.session) {
      return '';
    }
    return this.session.token;
  }

  set session(value: any) {
    if (isPlatformBrowser(this.platformId)) {
      const sessionStorage = this.document.defaultView?.sessionStorage;
      const encrypted = this.crypto.encrypt(value);
      sessionStorage?.setItem(this.key, encrypted);

    }
  }

  get user(): UserModel {
    const data = this.session as any;

    let camoens: UserModel = {
      IdPersona: 0,
      NombreCorto: '',
      roles: [],
      token: '',
    };

    if (!this.session) {
      return camoens;
    }
    const { IdPersona, NombreCorto, roles, token } = data;
    return new UserModel(IdPersona, NombreCorto, roles, token);
  }

  create(data: string) {
    this.session = data;
  }

  destroy() {
    if (isPlatformBrowser(this.platformId)) {
      const sessionStorage = this.document.defaultView?.sessionStorage;
      sessionStorage?.removeItem(this.key);
    }
  }

  get tokenExpired(): boolean {
    if (this.token === '') {
      return true;
    }
    const expiry = JSON.parse(atob(this.token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
