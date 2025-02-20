export interface ConsumptionHistory {
    id?: string;
    id_producto: string;
    fecha_consumo: { seconds: number; nanoseconds: number };
    cantidad_consumida: number;
    nutrientes_ingeridos: Record<string, number>;
    activo: boolean;
  }
  
  export const consumptionHistoryDataTest: ConsumptionHistory[] = [
    {
      id: "1",
      id_producto: "Producto A",
      fecha_consumo: { seconds: 1700000000, nanoseconds: 0 },
      cantidad_consumida: 2,
      nutrientes_ingeridos: { proteinas: 10, carbohidratos: 20 },
      activo: true,
    },
    {
      id: "2",
      id_producto: "Producto B",
      fecha_consumo: { seconds: 1700100000, nanoseconds: 0 },
      cantidad_consumida: 1,
      nutrientes_ingeridos: { grasas: 5, fibra: 3 },
      activo: true,
    },
  ];