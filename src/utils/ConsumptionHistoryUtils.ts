import { ConsumptionHistoryQuery } from "../models/HistorialConsumption";

export const formatConsumptionHistory = (data: ConsumptionHistoryQuery[]): string[] => {
    return data.map(
      (item) => `Producto: ${item.id_producto}, Fecha: ${new Date(item.fecha_consumo.seconds * 1000).toLocaleString()}, Cantidad: ${item.cantidad_consumida}`
    );
  };
  