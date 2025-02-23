import { DBProduct } from "../components/types";



const STORE_API = import.meta.env.VITE_TEST_STORE_URI

export async function getProduct(reference: string){
  try{
    const resp = await fetch(`${STORE_API}/product/${reference}`);

    if(resp.ok){
      return await resp.json() as DBProduct;
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}

export async function getAllProducts(){
  try{
    const resp = await fetch(`${STORE_API}/product/all`);
    
    if(resp.ok){
      return await resp.json() as DBProduct[];
    }else{
      throw Error(`${resp.status}: ${resp.statusText}`);
    }
  }catch(error: any){
    console.error(error)
  }
}
