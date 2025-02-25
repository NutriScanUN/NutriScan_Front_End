import { DBProduct, productOffRes as ProductOffRes } from "../models/Product";
import { getAllProducts } from "../utils/ProductsUtils";

const STORE_API = import.meta.env.VITE_TEST_STORE_URI;

export async function testOffProducts(num: number){
  const MAX = 50;

  const CodeExamples = [
    "3017620429484",
    "8410109109832",
    "0039978033758",
    "7702007065411",
    "8410109104950",
    "8410109050882",
    "8410109050509",
    "3222471623718",
    "7702084137520",
    "7700304627561",
    "8005121000535",
    "8412170026896",
    "7700304609383",
    "3222471055113",
    "8410109113051",
    "8412170011434",
    "7590011251100",
    "8691707088075",
    "7707211631469",
    "7613031154111",
    "8901393017137",
    "3337875890021",
    "7750168001694",
    "7898024395232",
    "7501125144851",
    "7700304004645",
    "7702001163878",
    "7702535011089",
    "7792180139719",
    "0038000846731",
    "7790580660000",
    "7590011151110",
    "7702025148455",
    "7702032110360",
    "7700304202294",
    "7702025113132",
    "3222476926821",
    "7804659650066",
    "7506105606077",
    "7700304886708",
    "7622300117207",
    "7707211631865",
    "7702192422051",
    "7622300117184",
    "7750168001687",
    "7700304521005",
    "7702560026102",
    "7700304070107",
    "1014006023429"
  ];

  if(num > MAX) num = MAX;

  CodeExamples.sort(() => (Math.random() - 0.5));

  let prodList: ProductOffRes[] = [];

  for(let i = 0; i < num; i+=10){
    let resList: Promise<ProductOffRes>[] = [];
    for(let j = 0; j < 10 && j < num; j++){
      resList.push(fetch(`${STORE_API}/off/${CodeExamples[i+j]}`).then(res => res.json() as unknown as ProductOffRes));
    }
    prodList = prodList.concat(await Promise.all(resList));
  }

  return prodList;
}

export async function testDBProducts(num: number){
  const MAX = 50;
  if(num > MAX) num = MAX;

  let products = await getAllProducts();

  if(products && products.length < num){
    await testOffProducts(num);
    products = await fetch(`${STORE_API}/product/all`).then(res => res.json() as unknown as DBProduct[]);
  }
  if(products){
    products.sort(() => (Math.random() - 0.5));
  
    return products.slice(0,num);
  }
}
