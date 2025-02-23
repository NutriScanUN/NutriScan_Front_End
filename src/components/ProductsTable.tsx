import { Container } from "react-bootstrap";
import { DBProduct } from "./types";

interface Props{
  products: DBProduct[]
}

const ProductsTable = ({products}:Props) => {

  

  return (
    <Container fluid>
      {products[0].nombre}
    </Container>
  );
}


export default ProductsTable;
