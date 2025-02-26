import { DBProduct, productOffRes } from "../models/Product";
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

const OffCache = await caches.open("off-products");

const STORE_API = import.meta.env.VITE_TEST_STORE_URI;
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

export async function getNOrLessProducts(num: number){
  const products = await getAllProducts();

  if(products){
    products.sort(() => (Math.random() - 0.5));
  
    return products.slice(0,num);
  }
}


//TODO: IMPLEMENT CORRECTLY
export async function getOffProduct(reference: string){
  // const productQuery: GraphQLQuery = {
  //   query: DBProductQuery,
  //   operationName: "GetProduct",
  //   variables: { getProductId: reference }
  // };

  // const productRequest: RequestInit = {
  //   ...REQUEST,
  //   body: JSON.stringify(productQuery)
  // }

  try{
    const url = `${STORE_API}/off/${reference}`;
    const cache = await OffCache.match(url);

    if(cache){
      return (await cache.json() as productOffRes);
    }

    const resp = await fetch(url);

    if(resp.ok){
      OffCache.put(url, resp.clone());
      setTimeout(() => OffCache.delete(url), 1000 * 60 * 5);
      return (await resp.json() as productOffRes);
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}

export async function getProductNameSearch(name: string){
  // const productQuery: GraphQLQuery = {
  //   query: NameSearchQuery,
  //   operationName: "GetProducts",
  //   variables: { name }
  // };

  // const productRequest: RequestInit = {
  //   ...REQUEST,
  //   body: JSON.stringify(productQuery)
  // }

  try{
    const resp = await fetch(`${STORE_API}/product/name/${name}`);

    if(resp.ok){
      return (await resp.json() as DBProduct[]);
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}

export async function getDBPRoductAfterOffCache(reference: string){
  const offProduct = await getOffProduct(reference);

  if(offProduct){
    return getProduct(reference);
  }
}

export async function getDBProductsAfterOffCache(references: string[]){
  let products: DBProduct[] = [];

  for(let reference of references){
    const product = await getDBPRoductAfterOffCache(reference);

    if(product){
      products.push(product);
    }
  }

  return products;
}
