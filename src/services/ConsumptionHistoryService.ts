// services/consumptionHistoryService.ts
import { ConsumptionHistory } from "../models/HistorialConsumption";

const API_URI = import.meta.env.VITE_API_GATEWAY_URI;

export const getAllConsumptionHistory = async (uid: string) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "query GetAllHistorialConsumption($getAllHistorialConsumptionId: ID!) {\r\n  getAllHistorialConsumption(id: $getAllHistorialConsumptionId) {\r\n    success\r\n    data {\r\n      success\r\n      data {\r\n        ... on HistorialConsumption {\r\n          id\r\n          uid\r\n          id_producto\r\n          fecha_consumo\r\n          cantidad_consumida\r\n          nutrientes_ingeridos\r\n          activo\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
        "variables": {
            "getAllHistorialConsumptionId": uid
        },
        "operationName": "GetAllHistorialConsumption"
    });

      const requestOptions: RequestInit  = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
      };

      const response = await fetch(API_URI, requestOptions);
      const result = await response.json();
      console.log("🚀 ~ getAllConsumptionHistory ~ result:", result)

      const data = result.data.getAllHistorialConsumption.data.data;

      if(data) {
        const history = data.map((element: any) => {
            element.nutrientes_ingeridos = JSON.parse(element.nutrientes_ingeridos);
            return element as ConsumptionHistory;
        });

        return history as ConsumptionHistory[];
      }
      return [] as ConsumptionHistory[];
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return [] as ConsumptionHistory[];
  }
};

export const getConsumptionHistoryByDays = async (uid: string, days: number) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "query GetHistorialConsumptionByDay($getHistorialConsumptionByDayId: ID!, $days: Int) {\r\n  getHistorialConsumptionByDay(id: $getHistorialConsumptionByDayId, days: $days) {\r\n    success\r\n    data {\r\n      success\r\n      data {\r\n        ... on HistorialConsumption {\r\n          id\r\n          uid\r\n          id_producto\r\n          fecha_consumo\r\n          cantidad_consumida\r\n          nutrientes_ingeridos\r\n          activo\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
        "variables": {
            "getHistorialConsumptionByDayId": uid,
            "days": days
        },
        "operationName": "GetHistorialConsumptionByDay"
    });

      const requestOptions: RequestInit  = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
      };

      const response = await fetch(API_URI, requestOptions);
      const result = await response.json();

      const data = result.data.getHistorialConsumptionByDay.data.data;

      if(data) {
        const history = data.map((element: any) => {
            element.nutrientes_ingeridos = JSON.parse(element.nutrientes_ingeridos);
            return element as ConsumptionHistory;
        });

        return history as ConsumptionHistory[];
      }
      return [] as ConsumptionHistory[];
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return [] as ConsumptionHistory[];
  }
};

export const addConsumptionHistory = async (uid: string, history: Omit<ConsumptionHistory, "id">) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "mutation Mutation($input: CreateHistorialInput!) {\r\n  addHistorialConsumption(input: $input) {\r\n    success\r\n    data {\r\n      success\r\n      message\r\n      id\r\n    }\r\n  }\r\n}",
        "variables": {
            "input": {
                "uid": uid,
                "id_producto": history?.id_producto,
                "fecha_consumo": history?.fecha_consumo,
                "cantidad_consumida": history?.cantidad_consumida,
                "nutrientes_ingeridos": JSON.stringify(history?.nutrientes_ingeridos),
                "activo": history?.activo 
            }
        },
        "operationName": "Mutation"
      });

      const requestOptions: RequestInit  = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
      };

      const response = await fetch(API_URI, requestOptions);
      const result = await response.json();

      return result.data.addHistorialConsumption.data as {id: string, message: string, success: boolean}
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};

export const deleteConsumptionHistory = async (uid: string, recordId: string) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "mutation DeleteHistorialConsumption($uid: ID, $recordId: ID) {\r\n  deleteHistorialConsumption(uid: $uid, recordId: $recordId) {\r\n    success\r\n    data {\r\n      success\r\n      message\r\n      data {\r\n        success\r\n        message\r\n      }\r\n    }\r\n  }\r\n}",
        "variables": {
            "uid": uid,
            "recordId": recordId
        },
        "operationName": "DeleteHistorialConsumption"
      });

      const requestOptions: RequestInit  = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
      };
  
      const response = await fetch(API_URI, requestOptions)
      const result = await response.json()  // 👈 Parseamos JSON en lugar de .text(
      if(result?.data?.deleteHistorialConsumption?.data?.data?.success){
          return true
      }
      return false
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};