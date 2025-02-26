import { Container } from "react-bootstrap";
import ProductsGrid from "../../components/ProductsGrid";
import { DBProduct } from "../../models/Product";
import { useEffect, useState } from "react";
import { getNOrLessProducts } from "../../utils/ProductsUtils";

const Home = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    getNOrLessProducts(50).then(
      products =>{
        if(products) setProducts(products);
      }
    )
  }, []);
  return (
    <Container className="py-5">
      <ProductsGrid products={products} hoverCache/>
    </Container>
  )
}

export default Home;
