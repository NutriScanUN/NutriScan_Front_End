
import axios from "axios";
import { SearchHistory, SearchHistoryQuery } from "../models/HistorialSearch";
import { ConsumptionHistoryQuery } from "../models/HistorialConsumption";

const API_BASE_URL = "https://localhost:3006/search-history";

export const getSearchHistory = async (uid: string, limit?: number, orderDirection: "asc" | "desc" = "asc") => {
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
        return result.data.userQuery.data as SearchHistoryQuery;
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return null;
    }
};

export const getSearchHistoryByDays = async (uid: string, days: number) => {
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

export const getAllSearchHistory = async (uid: string) => {
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

export const addSearchHistory = async (uid: string, history: Omit<SearchHistory, "id">) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "mutation Mutation($input: CreateSearchInput!) {\r\n  createSearch(input: $input) {\r\n    success\r\n  }\r\n}",
        "variables": {
            "input": {
                "id": null,
                "uid": uid,
                "fecha_busqueda": history.fecha_busqueda,
                "id_producto": history.id_producto,
                "redireccion_tienda": history.redireccion_tienda,
                "id_tienda": history.id_tienda,
                "activo": history.activo
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

      const response = await fetch("http://34.2.5.32:3003/", requestOptions)
      const result = await response.json()  // 👈 Parseamos JSON en lugar de .text(
      if(result.data.createUser.success){
          console.log("result",result.data.createUser.success);
          return true
      }
      return false
  } catch (error) {
      console.error("Error al obtener usuario:", error);
      return null;
  }
};

export const deleteSearchHistory = async (uid: string, recordId: string) => {
  await axios.delete(`${API_BASE_URL}/${uid}/${recordId}`);
};