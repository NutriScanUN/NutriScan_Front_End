export interface ConsumptionHistory {
    id?: string;
    id_producto: string;
    fecha_consumo: string;
    cantidad_consumida: number;
    nutrientes_ingeridos: Record<string, string>;
    activo: boolean;
  }
  
  export const consumptionHistoryDataTest: ConsumptionHistory[] = [
    {
      id: "1",
      id_producto: "Producto A",
      fecha_consumo: Date(),
      cantidad_consumida: 2,
      nutrientes_ingeridos: { proteinas: "10g", carbohidratos: "20g" },
      activo: true,
    },
    {
      id: "2",
      id_producto: "Producto B",
      fecha_consumo: Date(),
      cantidad_consumida: 1,
      nutrientes_ingeridos: { grasas: "5g", fibra: "3g" },
      activo: true,
    },
  ];