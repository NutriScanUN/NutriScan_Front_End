export type SearchHistoryQuery = {
    id?: string;
    fecha_busqueda: { seconds: number; nanoseconds: number };
    id_producto: string;
    redireccion_tienda?: boolean;
    id_tienda?: string;
    activo: boolean;
  };

export type SearchHistory = {
    id?: string;
    fecha_busqueda: string;
    id_producto: string;
    redireccion_tienda?: boolean;
    id_tienda?: string;
    activo: boolean;
  };
  
export const searchHistoryDataTest: SearchHistory[] = [
    {
        id: "1",
        fecha_busqueda: Date(),
        id_producto: "P123",
        redireccion_tienda: true,
        id_tienda: "T001",
        activo: true,
    },
    {
        id: "2",
        fecha_busqueda: Date(),
        id_producto: "P456",
        redireccion_tienda: false,
        activo: true,
    },
];
