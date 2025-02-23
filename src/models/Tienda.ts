export interface Tienda {
    tienda_id: number;
    uid: string;
    nombre: string;
    fecha_suscripcion: string;
    direccion: string;
    descripcion: string;
    fotos: string;
    enlace: string;
  }

export interface ViewOfTienda {
  tienda_id: number;
  nombre: string;
  direccion: string;
  descripcion?: string;
  fotos?: string;
  enlace: string;
}