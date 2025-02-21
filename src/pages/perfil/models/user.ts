
export enum Roles {
  ESTANDAR = "usuario",
  PAGADO = "tienda",
}

export interface User {
    uid: string;
    name: string;
    email: string;
    fecha_nacimiento: Date|string;
    rol: Roles;
    photoURL?: string;
    ajustes?: object;
  }
  
export const DATOUSERTEST =  {
  uid: '123456789',
  name: 'nombre',
  email: 'email@test.com',
  rol: Roles.ESTANDAR,
  fecha_nacimiento: new Date()
} as User