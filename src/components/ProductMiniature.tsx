import { Button, Card } from "react-bootstrap";
import { DBProduct } from "./types";

interface Props{
  product: DBProduct
}

const ProductMiniature = ({product}: Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.url_imagen} />
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text>
          {product.referencia}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductMiniature;
