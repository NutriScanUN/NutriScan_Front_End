
export enum Roles {
  ESTANDAR = "usuario",
  PAGADO = "tienda",
}

export interface UserQuery {
    uid: string;
    nombres: string;
    email: string;
    fecha_nacimiento: { seconds: number; nanoseconds: number };
    fecha_registro?: { seconds: number; nanoseconds: number };
    rol: Roles;
    url_imagen?: string;
    ajustes?: object;
  }

export interface User {
    uid: string;
    nombres: string;
    email: string;
    fecha_nacimiento: Date|string;
    fecha_registro?: Date|string;
    rol: Roles;
    url_imagen?: string;
    ajustes?: object;
  }
  
export const DATOUSERTEST =  {
  uid: '123456789',
  nombres: 'nombre',
  email: 'email@test.com',
  rol: Roles.ESTANDAR,
  fecha_nacimiento: new Date()
} as User