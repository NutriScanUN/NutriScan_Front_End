import { Card } from "react-bootstrap";
import { DBProduct } from "../models/Product";
import { useRef } from "react";
import { getOffProduct } from "../utils/ProductsUtils";

interface Props{
  product: DBProduct;
  hoverCache?: boolean;
}

const ProductMiniature = ({product, hoverCache = false}: Props) => {
  const cachedProduct = useRef(true); //Change if caching is implemented

  const handleHoverCache = () => {
    if(hoverCache && !cachedProduct.current){
      cachedProduct.current = true;
      getOffProduct(product.referencia);
    }
  }

  return (
    <Card style={{ width: '18rem' }} onMouseOver={handleHoverCache}>
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
 