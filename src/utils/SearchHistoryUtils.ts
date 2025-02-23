import { SearchHistory, searchHistoryDataTest, SearchHistoryQuery } from "../models/HistorialSearch";

export const formatSearchHistory = (data: SearchHistoryQuery[]): SearchHistory[] => {
  console.log("🚀 ~ data:", data)
  return searchHistoryDataTest
  // return data.map(
  //   (item) => `Producto: ${item.id_producto}, Fecha: ${new Date(item.fecha_busqueda.seconds * 1000).toLocaleString()}`
  // );
};
