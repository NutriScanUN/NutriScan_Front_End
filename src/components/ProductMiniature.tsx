import { Button, Card } from "react-bootstrap";
import { DBProduct } from "./types";

interface Props{
  product: DBProduct
}

const ProductMiniature = ({product}: Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {product.nombre}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductMiniature;
