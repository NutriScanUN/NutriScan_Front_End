import { Col, Container, Row } from "react-bootstrap";
import { DBProduct, productOffRes } from "../models/Product";
import ProductMiniature from "./ProductMiniature";
import ProductInfo from "./ProductInfo";
import { useState } from "react";
import { getOffProduct } from "../utils/ProductsUtils";

interface Props{
  products: DBProduct[]
}

const ProductsGrid = ({products}:Props) => {
  const [productShow, setProductShow] = useState<productOffRes | null>(null);
  const [show, setShow] = useState(false);

  const requestOffProduct = (reference: string) => {
    getOffProduct(reference).then(
      productOff => {
        if(productOff){
          setProductShow(productOff);
          setShow(true)
        } 
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
              <ProductMiniature product={product}/>
            </Container>
          </Col>
        )}
      </Row>
      {productShow &&
        <ProductInfo show={show} productOff={productShow} handleClose={handleClose}/>
      }
    </Container>
  );
}


export default ProductsGrid;
