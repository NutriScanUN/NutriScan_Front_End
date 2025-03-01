// services/consumptionHistoryService.ts
import axios from "axios";
import { formatConsumptionHistory } from "../utils/ConsumptionHistoryUtils";
import { ConsumptionHistoryQuery } from "../models/HistorialConsumption";

const API_BASE_URL = "http://localhost:3006/consumption-history";

export const getAllConsumptionHistory = async (uid: string, orderDirection: "asc" | "desc" = "asc") => {
    console.log("🚀 ~ getUser ~ uid:", uid)
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "query": "query GetSearch($getSearchId: String) {\r\n  getSearch(id: $getSearchId) {\r\n    id\r\n    fecha_busqueda\r\n    id_producto\r\n    redireccion_tienda\r\n    id_tienda\r\n    activo\r\n  }\r\n}",
          "variables": {
              "getSearchId": uid
          },
          "operationName": "GetSearch"
      });

        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://34.2.5.32:3003/", requestOptions);
        const result = await response.json();

        if (result?.data?.userQuery?.data?.fecha_nacimiento?._seconds) {
            result.data.userQuery.data.fecha_nacimiento = new Date(
                result.data.userQuery.data.fecha_nacimiento._seconds * 1000
            ).toISOString();
        }

        console.log("result", result);
        return result.data.userQuery.data as ConsumptionHistoryQuery;
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return null;
    }
};

export const getConsumptionHistoryByDays = async (uid: string, days: number, orderDirection: "asc" | "desc" = "asc") => {
  const response = await axios.get<ConsumptionHistoryQuery[]>(`${API_BASE_URL}/${uid}/${days}`, { params: { orderDirection } });
  return formatConsumptionHistory(response.data);
};

export const addConsumptionHistory = async (uid: string, history: Omit<ConsumptionHistoryQuery, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/${uid}`, history);
  return formatConsumptionHistory(response.data);
};

export const deleteConsumptionHistory = async (uid: string, recordId: string) => {
  await axios.delete(`${API_BASE_URL}/${uid}/${recordId}`);
};