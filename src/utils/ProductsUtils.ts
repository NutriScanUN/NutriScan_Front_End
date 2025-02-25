import { DBProduct } from "../models/Product";
import { GraphQLQuery } from "../models/Query";

interface ProductQueryRes{
  data:{
    getProduct: DBProduct;
  }
}
interface ProductListQueryRes{
  data:{
    getProducts: DBProduct[];
  }
}

//const STORE_API = import.meta.env.VITE_TEST_STORE_URI;
const API_URI = import.meta.env.VITE_API_GATEWAY_URI;

const DBProductQuery = `query GetProduct($getProductId: ID!) {
  getProduct(id: $getProductId) {
    descripcion
    id_producto
    nombre
    referencia
    url_imagen
  }
}`;
const DBPRoductListQuery = `query GetProducts {
  getProducts {
    descripcion
    id_producto
    nombre
    referencia
    url_imagen
  }
}`;

const HEADER: HeadersInit = new Headers();
HEADER.append("Content-Type", "application/json");

const REQUEST: RequestInit = {
  method: "POST",
  headers: HEADER
}

export async function getProduct(reference: string){
  const productQuery: GraphQLQuery = {
    query: DBProductQuery,
    operationName: "GetProduct",
    variables: { getProductId: reference }
  };

  const productRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(productQuery)
  }

  try{
    const resp = await fetch(API_URI, productRequest);

    if(resp.ok){
      return (await resp.json() as ProductQueryRes).data.getProduct;
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}

export async function getAllProducts(){
  const productQuery: GraphQLQuery = {
    query: DBPRoductListQuery,
    operationName: "GetProducts",
    variables: {}
  };

  const productRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(productQuery)
  }

  try{
    const resp = await fetch(API_URI, productRequest);

    if(resp.ok){
      return (await resp.json() as ProductListQueryRes).data.getProducts;
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}


//TODO: IMPLEMENT CORRECTLY
export async function getOffProduct(reference: string){
  const productQuery: GraphQLQuery = {
    query: DBProductQuery,
    operationName: "GetProduct",
    variables: { getProductId: reference }
  };

  const productRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(productQuery)
  }

  try{
    const resp = await fetch(API_URI, productRequest);

    if(resp.ok){
      return (await resp.json() as ProductQueryRes).data.getProduct;
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}
