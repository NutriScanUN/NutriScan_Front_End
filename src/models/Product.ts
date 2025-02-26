export interface ProductOff{
  id_tienda?: string;
  referencia: string;
  nombre?: string;
  foto?:  string;
  categorias?: string[];
  nutriscore?: string;
}

export interface InfoProducto{
  carbohidratos?: number;
  unidadCarbohidratos?: string;
  grasas?: number;
  unidadGrasas?: string;
  grasaSaturada?: number;
  unidadGrasaSaturada?: string;
  azucar?: number;
  unidadAzucar?: string;
  proteina?: number;
  unidadProteina?: string;
  sodio?: number;
  unidadSodio?: string;
  fibra?: number;
  unidadFibra?: string;
  energia?: number;
  unidadEnergia?: string;
  cantidad?: string;
  unidadCantidad?: string;
  imagenFrontalUrl?: string;
  nivelesAltos?: string[];
}

export interface productOffRes{
  producto: ProductOff;
  infoProducto: InfoProducto;
  data?: any;
}

export interface DBProduct{
  id_producto:  number;
  referencia: string;
  nombre?: string;
  descripcion?: string;
  url_imagen?:  string;
}
