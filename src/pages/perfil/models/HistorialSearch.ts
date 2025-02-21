export type SearchHistory = {
    id?: string;
    fecha_busqueda: { seconds: number; nanoseconds: number };
    id_producto: string;
    redireccion_tienda: boolean;
    id_tienda?: string;
    activo: boolean;
  };
  
export const searchHistoryDataTest: SearchHistory[] = [
    {
        id: "1",
        fecha_busqueda: { seconds: 1697655300, nanoseconds: 0 },
        id_producto: "P123",
        redireccion_tienda: true,
        id_tienda: "T001",
        activo: true,
    },
    {
        id: "2",
        fecha_busqueda: { seconds: 1697658900, nanoseconds: 0 },
        id_producto: "P456",
        redireccion_tienda: false,
        activo: true,
    },
];
