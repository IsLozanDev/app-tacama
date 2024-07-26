export class UserModel {
  IdPersona: number;
  NombreCorto: string;
  roles: Role[];
  token: string;

  constructor(idPersona: number, nombreCorto: string, roles: Role[], token: string) {
    this.IdPersona = idPersona;
    this.NombreCorto = nombreCorto;
    this.roles = roles;
    this.token = token;
  }
}

export class Role {
  IdRol: number;
  Nombre: string;

  constructor(idRol: number, nombre: string) {
    this.IdRol = idRol;
    this.Nombre = nombre;
  }
}
