import { GraphQLQuery } from "../models/Query";
import { Tienda, TiendaInfo } from "../models/Tienda";

const API_URI = import.meta.env.VITE_API_GATEWAY_URI;

const createTiendaQuery = `mutation CreateStore($input: CreateStoreInput!) {
  createStore(input: $input) {
    code
    message
    success
  }
}`;

const getTiendaQuery = `query GetStoreByUser($getStoreByUserId: String) {
  getStoreByUser(id: $getStoreByUserId) {
    id_tienda
    uid
    nombre
    fecha_suscripcion
    direccion
    descripcion
    foto_tienda
    enlace
  }
}`;

const updateTiendaQuery = `mutation UpdateStore($input: UpdateStoreInput!) {
  updateStore(input: $input) {
    code
    message
    success
  }
}`;



const HEADER: HeadersInit = new Headers();
HEADER.append("Content-Type", "application/json");

const REQUEST: RequestInit = {
  method: "POST",
  headers: HEADER
}

export async function createTienda(tienda: Tienda){
  const tiendaQuery: GraphQLQuery = {
    query: createTiendaQuery,
    operationName: "CreateStore",
    variables: {
      input: {
        descripcion: tienda.descripcion,
        direccion: tienda.direccion,
        enlace: tienda.enlace,
        foto_tienda: tienda.foto_tienda,
        nombre: tienda.nombre,
        uid: tienda.uid
      }
    }
  }

  const tiendaRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(tiendaQuery)
  }

  try{
    const resp = await fetch(API_URI, tiendaRequest);

    if(resp.ok){
      return (await resp.json()).data.createStore as {code: number, message: string, success: boolean}
    }

    return { code: resp.status, message: resp.statusText, success: false };
  }catch(error: any){
    console.error(error);
    return { code: 400, message:error, success: false };
  }
}

export async function getTienda(uid: string){
  const tiendaQuery: GraphQLQuery = {
    query: getTiendaQuery,
    operationName: "GetStoreByUser",
    variables: {
      getStoreByUserId: uid
    }
  }

  const tiendaRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(tiendaQuery)
  }

  try{
    const resp = await fetch(API_URI, tiendaRequest);

    if(resp.ok){
      return (await resp.json()).data.getStoreByUser as Tienda[];
    }
  }catch(error: any){
    console.error(error);
  }
}

export interface UpdateTienda extends TiendaInfo {
  id_tienda: number;
}

export async function updateQueryTienda(tienda: UpdateTienda){
  const tiendaQuery: GraphQLQuery = {
    query: updateTiendaQuery,
    operationName: "UpdateStore",
    variables: {
      input: {
        descripcion: tienda.descripcion,
        direccion: tienda.direccion,
        enlace: tienda.enlace,
        foto_tienda: tienda.foto_tienda,
        id_tienda: tienda.id_tienda,
        nombre: tienda.nombre,
        uid: tienda.uid
      }
    }
  }

  const tiendaRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(tiendaQuery)
  }

  try{
    const resp = await fetch(API_URI, tiendaRequest);

    if(resp.ok){
      return (await resp.json()).data.updateStore as {code: number, message: string, success: boolean}
    }

    return { code: resp.status, message: resp.statusText, success: false };
  }catch(error: any){
    console.error(error);
    return { code: 400, message:error, success: false };
  }
}
