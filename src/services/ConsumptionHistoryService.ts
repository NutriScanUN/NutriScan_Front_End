// services/consumptionHistoryService.ts
import { ConsumptionHistoryQuery } from "../models/HistorialConsumption";

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

      const response = await fetch("http://34.2.5.32:3003/", requestOptions);
      const result = await response.json();
      console.log("🚀 ~ getAllConsumptionHistory ~ result:", result)

      if(result?.data?.getAllHistorialConsumption?.data?.data == null) return [];

      const datos = result?.data?.getAllHistorialConsumption?.data.forEach((element: any) => {
          if (element?.fecha_busqueda?._seconds) {
              element.fecha_busqueda = new Date(
                  element.fecha_busqueda._seconds * 1000
              ).toISOString();
          }
          return element;
      })

      if(result?.data?.getAllHistorialConsumption?.data?.success) return datos;
      return null;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
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

      const response = await fetch("http://34.2.5.32:3003/", requestOptions);
      const result = await response.json();

      if(result?.data?.getHistorialConsumptionByDay?.data == null) return [];

      const datos = result?.data?.getHistorialConsumptionByDay?.data.forEach((element: any) => {
          if (element?.fecha_busqueda?._seconds) {
              element.fecha_busqueda = new Date(
                  element.fecha_busqueda._seconds * 1000
              ).toISOString();
          }
          return element;
      })

      if(result?.data?.getHistorialConsumptionByDay?.data?.success) return datos;
      return null;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};

export const addConsumptionHistory = async (uid: string, history: Omit<ConsumptionHistoryQuery, "id">) => {
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
                "nutrientes_ingeridos": history?.nutrientes_ingeridos,
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

      const response = await fetch("http://34.2.5.32:3003/", requestOptions);
      const result = await response.json();

      if (result?.data?.userQuery?.data?.fecha_consumo?._seconds) {
          result.data.userQuery.data.fecha_consumo = new Date(
              result.data.userQuery.data.fecha_consumo._seconds * 1000
          ).toISOString();
      }

      return result.data.userQuery.data as ConsumptionHistoryQuery;
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

      const response = await fetch("http://34.2.5.32:3003/", requestOptions);
      const result = await response.json();

      return result.data.userQuery.data as ConsumptionHistoryQuery;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};