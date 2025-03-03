export interface Tienda {
  id_tienda: number;
  uid: string;
  nombre?: string;
  fecha_suscripcion: string;
  direccion?: string;
  descripcion?: string;
  foto_tienda?: string;
  enlace?: string;
}

export interface TiendaInfo{
  uid?: string;
  nombre?: string;
  fecha_suscripcion: string;
  direccion?: string;
  descripcion?: string;
  foto_tienda?: string;
  enlace?: string;
}

export interface ViewOfTienda {
  id_tienda: number;
  nombre?: string;
  direccion?: string;
  descripcion?: string;
  foto_tienda?: string;
  enlace?: string;
}