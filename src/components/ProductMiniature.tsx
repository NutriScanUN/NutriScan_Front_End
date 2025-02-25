import { Card } from "react-bootstrap";
import { DBProduct } from "../models/Product";

interface Props{
  product: DBProduct;
}

const ProductMiniature = ({product}: Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.url_imagen}
        style={{ width: "auto", height: "10rem", objectFit: "cover"}} />
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
 