
import { SearchHistory } from "../models/HistorialSearch";

export const getSearchHistory = async (uid: string, limit?: number) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "query": "query GetHistorialSearchWithLimit($uid: String, $limit: Int) {\r\n  getHistorialSearchWithLimit(uid: $uid, limit: $limit) {\r\n    success\r\n    data {\r\n      success\r\n      data {\r\n        ... on HistorialSearch {\r\n          id\r\n          uid\r\n          id_producto\r\n          fecha_busqueda\r\n          id_tienda\r\n          redireccion_tienda\r\n          activo\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            "variables": {
                "uid": uid,
                "limit": limit ?? 0
            },
            "operationName": "GetHistorialSearchWithLimit"
        });

        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://34.2.5.32:3003/", requestOptions);
        const result = await response.json();

        if(result?.data?.getAllHistorialConsumption?.data == null) return [];

        const datos = result?.data?.getHistorialSearchWithLimit?.data?.data.forEach((element: any) => {
            if (element?.fecha_busqueda?._seconds) {
                element.fecha_busqueda = new Date(
                    element.fecha_busqueda._seconds * 1000
                ).toISOString();
            }
            return element;
        })
        console.log("🚀 ~ datos ~ datos:", datos)
  
        if(result?.data?.getHistorialSearchWithLimit?.data?.success) return datos;
        return null;
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return null;
    }
};

export const getSearchHistoryByDays = async (uid: string, days: number) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "query GetHistorialSearchByDay($uid: String, $days: Int) {\r\n  getHistorialSearchByDay(uid: $uid, days: $days) {\r\n    success\r\n    data {\r\n      success\r\n      data {\r\n        ... on HistorialSearch {\r\n          id\r\n          id_producto\r\n          fecha_busqueda\r\n          id_tienda\r\n          redireccion_tienda\r\n          activo\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
        "variables": {
            "uid": uid,
            "days": days
        },
        "operationName": "GetHistorialSearchByDay"
    });

      const requestOptions: RequestInit  = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
      };

      const response = await fetch("http://34.2.5.32:3003/", requestOptions);
      const result = await response.json();

      if(result?.data?.getAllHistorialConsumption?.data == null) return [];

      const datos = result?.data?.getHistorialSearchByDay?.data?.data.forEach((element: any) => {
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
      console.error("Error al get usuario por dia:", error);
      return null;
  }
};

export const getAllSearchHistory = async (uid: string) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "query": "query GetAllHistorialSearch($uid: String) {\r\n  getAllHistorialSearch(uid: $uid) {\r\n    success\r\n    data {\r\n      success\r\n      data {\r\n        ... on HistorialSearch {\r\n          id\r\n          id_producto\r\n          fecha_busqueda\r\n          id_tienda\r\n          redireccion_tienda\r\n          activo\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            "variables": {
                "uid": uid
            },
            "operationName": "GetAllHistorialSearch"
        });

        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://34.2.5.32:3003/", requestOptions);
        const result = await response.json();
        console.log("🚀 ~ getAllSearchHistory ~ result:", result)

        console.log("🚀 ~ getAllSearchHistory ~ result?.data?.getAllHistorialSearch?.data?.data:", result?.data?.getAllHistorialSearch?.data?.data)
        if(!result?.data?.getAllHistorialSearch?.data?.data) return [];

        const datos = result?.data?.getAllHistorialSearch?.data?.data.map((element: any) => {
            if (element?.fecha_busqueda?._seconds) {
                element.fecha_busqueda = new Date(
                    element.fecha_busqueda._seconds * 1000
                ).toISOString();
            }
            console.log("🚀 ~ datos ~ element:", element)
            return element;
        })
        console.log("🚀 ~ datos ~ datos:", datos)   

        if(result?.data?.getAllHistorialSearch?.data?.success) return datos;
        return null;
    } catch (error) {
        console.error("Error al get all usuario:", error);
        return null;
    }
};

export const addSearchHistory = async (uid: string, history: Omit<SearchHistory, "id">) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "query": "mutation AddHistorialSearch($input: CreateSearchInput!) {\r\n  addHistorialSearch(input: $input) {\r\n    success\r\n    data {\r\n      success\r\n      message\r\n      id\r\n    }\r\n  }\r\n}",
        "variables": {
            "input": {
                "uid": uid,
                "fecha_busqueda": history?.fecha_busqueda,
                "id_producto": history?.id_producto,
                "redireccion_tienda": history?.redireccion_tienda,
                "id_tienda": history?.id_tienda,
                "activo":history?.activo 
            }
        },
        "operationName": "AddHistorialSearch"
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
          return true
      }
      return false
  } catch (error) {
      console.error("Error al crear usuario:", error);
      return null;
  }
};

export const deleteSearchHistory = async (uid: string, recordId: string) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        const raw = JSON.stringify({
            "query": "mutation DeleteHistorialSearch($uid: ID, $recordId: ID) {\r\n  deleteHistorialSearch(uid: $uid, recordId: $recordId) {\r\n    success\r\n    data {\r\n      success\r\n      message\r\n      data {\r\n        success\r\n        message\r\n      }\r\n    }\r\n  }\r\n}",
            "variables": {
                "uid": uid,
                "recordId": recordId
            },
            "operationName": "DeleteHistorialSearch"
        });
  
        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
  
        const response = await fetch("http://34.2.5.32:3003/", requestOptions)
        const result = await response.json()  // 👈 Parseamos JSON en lugar de .text(
        if(result?.data?.deleteHistorialSearch?.data?.data?.success){
            return true
        }
        return false
    } catch (error) {
        console.error("Error al delete usuario:", error);
        return null;
    }
};