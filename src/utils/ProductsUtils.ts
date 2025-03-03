import { DBProduct, InfoProducto, ProductNutriments, productOffRes } from "../models/Product";
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
interface ProductOFFQueryRes{
  data:{
    getInfoOff: productOffRes;
  }
}

// let OffCache: Cache | null = null;
// window.caches.open("off-products").then(cache => OffCache = cache);

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

const OFFproductQuery = `query InfoProducto($getInfoOffId: String) {
  getInfoOff(id: $getInfoOffId) {
    infoProducto {
      azucar
      cantidad
      carbohidratos
      energia
      fibra
      grasaSaturada
      grasas
      imagenFrontalUrl
      nivelesAltos
      proteina
      sodio
      unidadAzucar
      unidadSodio
      unidadProteina
      unidadGrasas
      unidadGrasaSaturada
      unidadFibra
      unidadEnergia
      unidadCarbohidratos
      unidadCantidad
    }
    producto {
      categorias
      foto
      nombre
      nutriscore
      referencia
    }
  }
}`;

const HEADER: HeadersInit = new Headers();
HEADER.append("Content-Type", "application/json");

const REQUEST: RequestInit = {
  method: "POST",
  headers: HEADER
}

export function infoToNutriments(info: InfoProducto): ProductNutriments{
  return {
    carbohidratos: (info.carbohidratos)? (info.carbohidratos.toString() + (info.unidadCarbohidratos ?? "")): undefined,
    grasas: (info.grasas)? (info.grasas.toString() + (info.unidadGrasas ?? "")): undefined,
    grasaSaturada: (info.grasaSaturada)? (info.grasaSaturada.toString() + (info.unidadGrasaSaturada ?? "")): undefined,
    azucar: (info.azucar)? (info.azucar.toString() + (info.unidadAzucar ?? "")): undefined,
    proteina: (info.proteina)? (info.proteina.toString() + (info.unidadProteina ?? "")): undefined,
    sodio: (info.sodio)? (info.sodio.toString() + (info.unidadSodio ?? "")): undefined,
    fibra: (info.fibra)? (info.fibra.toString() + (info.unidadFibra ?? "")): undefined,
    energia: (info.energia)? (info.energia.toString() + (info.unidadEnergia ?? "")): undefined,
  }
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
    }
  }catch(error: any){
    console.error(error)
  }
}

export async function getProducts(references: string[]){
  const products: DBProduct[] = [];

  for(let reference of references){
    const product = await getProduct(reference);

    if(product){
      products.push(product);
    }
  }

  return products;
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
  const productQuery: GraphQLQuery = {
    query: OFFproductQuery,
    operationName: "InfoProducto",
    variables: { getInfoOffId: reference }
  };

  const productRequest: RequestInit = {
    ...REQUEST,
    body: JSON.stringify(productQuery)
  }

  try{
    const url = API_URI;
    const request = new Request(url, productRequest);

    // if(OffCache){
    //   const cache = await OffCache.match(request);
  
    //   if(cache){
    //     return ((await cache.json() as ProductOFFQueryRes).data.getInfoOff);
    //   }
    // }

    const resp = await fetch(request);

    if(resp.ok){
      // OffCache?.put(request, resp.clone());
      // setTimeout(() => OffCache?.delete(request), 1000 * 60 * 5);
      return ((await resp.json() as ProductOFFQueryRes).data.getInfoOff);
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
