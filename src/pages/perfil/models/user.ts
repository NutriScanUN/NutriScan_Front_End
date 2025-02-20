
export interface User {
    uid: string;
    name: string;
    email: string;
    fecha_nacimiento: Date|string;
    photoURL?: string;
  }
  
export const DATOUSERTEST =  {
  uid: '123456789',
  name: 'nombre',
  email: 'email@test.com',
  fecha_nacimiento: new Date()
} as User