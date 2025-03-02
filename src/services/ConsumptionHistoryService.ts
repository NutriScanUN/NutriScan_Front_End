// services/consumptionHistoryService.ts
import axios from "axios";
import { formatConsumptionHistory } from "../utils/ConsumptionHistoryUtils";
import { ConsumptionHistoryQuery } from "../models/HistorialConsumption";

const API_BASE_URL = "http://localhost:3006/consumption-history";

export const getAllConsumptionHistory = async (uid: string) => {
  console.log("🚀 ~ getUser ~ uid:", uid)
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

      if (result?.data?.userQuery?.data?.fecha_consumo?._seconds) {
          result.data.userQuery.data.fecha_consumo = new Date(
              result.data.userQuery.data.fecha_consumo._seconds * 1000
          ).toISOString();
      }

      console.log("result", result);
      return result.data.userQuery.data as ConsumptionHistoryQuery;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};

export const getConsumptionHistoryByDays = async (uid: string, days: number) => {
  console.log("🚀 ~ getUser ~ uid:", uid)
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

      if (result?.data?.userQuery?.data?.fecha_consumo?._seconds) {
          result.data.userQuery.data.fecha_consumo = new Date(
              result.data.userQuery.data.fecha_consumo._seconds * 1000
          ).toISOString();
      }

      console.log("result", result);
      return result.data.userQuery.data as ConsumptionHistoryQuery;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};

export const addConsumptionHistory = async (uid: string, history: Omit<ConsumptionHistoryQuery, "id">) => {
  console.log("🚀 ~ getUser ~ uid:", uid)
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

      console.log("result", result);
      return result.data.userQuery.data as ConsumptionHistoryQuery;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};

export const deleteConsumptionHistory = async (uid: string, recordId: string) => {
  console.log("🚀 ~ getUser ~ uid:", uid)
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

      console.log("result", result);
      return result.data.userQuery.data as ConsumptionHistoryQuery;
  } catch (error) {
      console.error("Error al get all usuario:", error);
      return null;
  }
};