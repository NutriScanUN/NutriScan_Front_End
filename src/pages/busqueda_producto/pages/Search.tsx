import { Stack, Form, InputGroup, Container, Button, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { DBProduct } from "../../../models/Product";
import ProductsGrid from "../../../components/ProductsGrid";
import { useEffect, useRef, useState } from "react";
import { getDBPRoductAfterOffCache, getDBProductsAfterOffCache, getProductNameSearch } from "../../../utils/ProductsUtils";
import Scanner from "../components/Scanner";

const Search = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<DBProduct[]>([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const [showScanner, setShowSCanner] = useState(false);

  const searchID = useRef<number>(0);
  const prevBulkSearch = useRef<string>("");



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formdata = new FormData(e.currentTarget);
    // @ts-expect-error
    const search = new URLSearchParams(formdata).toString();

    if(formdata.get("input")) navigate(`/search?${search}`);
    else navigate("/search");
  }

  const handleScannerReference = ( reference?: string ) => {
    setShowSCanner(false);
    if(reference){
      navigate(`/search?input=${reference}`);
    }else{
      alert("No se encontro referencia en el scaneo");
    }
  }


  useEffect(() => {
    let search = searchParams.get("input");

    if(search){
      setShowSpinner(true);
      search = search.trim();

      const currentSearchID = (searchID.current + 1)%256;
      searchID.current = currentSearchID;
      
      // Check if the search is a reference or a comma separated list of references (ignoring spaces)
      if(/^\d+(\s*,{1}\s*\d+)*$/.test(search)){

        search = search.replace(/\s/g, "");

        if(search === prevBulkSearch.current) return;
        prevBulkSearch.current = search;

        const searchList = search.split(",");

        if(searchList.length > 1) {
          getDBProductsAfterOffCache(searchList).then(
            products => {
              if(currentSearchID === searchID.current){
                setProducts(products);
                setShowSpinner(false);
              }
            }
          );
        }else{
          getDBPRoductAfterOffCache(search).then(
            product => {
              if(currentSearchID === searchID.current){
                if(product) setProducts([product]);
                setShowSpinner(false);
              }
            }
          );
        };

      }
      else{
        getProductNameSearch(search).then(
          products => {
            if(currentSearchID === searchID.current){
              if(products) setProducts(products);
              setShowSpinner(false);
            }
          }
        )
      }
    }else{
      searchID.current = 0;
      setShowSpinner(false);
      setProducts([]);
    }
  }, [searchParams]);

  return (
    <Stack className="justify-content-center">
      <h1 className="text-center text-bg-dark p-3 m-0">Busqueda de productos</h1>
      <Stack direction="horizontal" className="px-5 py-3 bg-dark-subtle" >
        <Form onSubmit={e => e.preventDefault()} onChange={handleSubmit} style={{flexGrow: 1}}>
          <InputGroup>
            <Form.Control
              name="input"
              placeholder="Nombre del producto | Codigo de barras"
              aria-label="Busqueda de productos"
              aria-describedby="busqueda"
            />
            <Button variant="primary" type="submit">Buscar 🔎</Button>
          </InputGroup>
        </Form>
        <Stack className="ps-3" style={{flexGrow: 0}}>
            <Button onClick={() => setShowSCanner(true)} variant="primary" className="px-4">Scanear 📷</Button>
        </Stack>
      </Stack>
      <Scanner show={showScanner} onHide={() => setShowSCanner(false)} onReference={handleScannerReference} />
      <Stack className="p-3" style={{flexGrow: 1}}>
        <Container fluid className="border rounded p-3" style={{flexGrow: 1, position: "relative"}}>
          <ProductsGrid products={products} />
          { showSpinner &&
            <div className="border rounded" style={
              {
                display: "flex", position: "absolute",
                top: "0%", left: "0%", bottom: "0%", right: "0%",
                backgroundColor: "rgba(0,0,0, 0.5)",
                justifyContent: "center", alignItems: "center"
              }}>
              <Spinner animation="border" style={{color: "#54E8AE"}}/>
            </div>
          }
        </Container>
      </Stack>
    </Stack>
  );
};

export default Search;