import { Col, Container, Row } from "react-bootstrap";
import { DBProduct } from "../models/Product";
import ProductMiniature from "./ProductMiniature";

interface Props{
  products: DBProduct[]
}

const ProductsGrid = ({products}:Props) => {

  return (
    <Container fluid>
      <Row className="row-cols-auto gap-3" >
        {products.map((product, index) => 
          <Col>
            <ProductMiniature product={product} key={index}/>
          </Col>
        )}
      </Row>
    </Container>
  );
}


export default ProductsGrid;
