import { Col, Container, Row, Spinner } from "react-bootstrap";
import { DBProduct, productOffRes } from "../models/Product";
import ProductMiniature from "./ProductMiniature";
import ProductInfo from "./ProductInfo";
import { useState } from "react";
import { getOffProduct } from "../utils/ProductsUtils";

interface Props{
  products: DBProduct[]
  hoverCache?: boolean;
}

const ProductsGrid = ({products, hoverCache = false}:Props) => {
  const [productShow, setProductShow] = useState<productOffRes | null>(null);
  const [show, setShow] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(false);

  const requestOffProduct = (reference: string) => {
    setSpinnerShow(true);
    getOffProduct(reference).then(
      productOff => {
        if(productOff){
          setProductShow(productOff);
          setShow(true)
        }
        setSpinnerShow(false);
      }
    )
  }

  const handleClose = () => {
    setShow(false);
  }

  return (
    <Container fluid>
      <Row className="row-cols-auto gap-3 justify-content-center" >
        {products.map((product, index) => 
          <Col key={index}>
            <Container style={{padding: 0}} onClick={() => requestOffProduct(product.referencia)}>
              <ProductMiniature product={product} hoverCache={hoverCache}/>
            </Container>
          </Col>
        )}
      </Row>
      {productShow &&
        <ProductInfo show={show} productOff={productShow} handleClose={handleClose}/>
      }
      {
        spinnerShow &&
        <div style={
          {
            display: "grid", position: "fixed",
            top: "0%", left: "0%", bottom: "0%", right: "0%",
            backgroundColor: "rgba(0,0,0, 0.5)",
            justifyContent: "center", alignItems: "center"
          }}>
          <Spinner animation="border" style={{color: "#54E8AE"}}/>
        </div>
      }
    </Container>
  );
}


export default ProductsGrid;
