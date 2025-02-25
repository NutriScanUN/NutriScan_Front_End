import { Container } from "react-bootstrap";
import ProductsGrid from "../../components/ProductsGrid";
import { DBProduct } from "../../models/Product";
import { useEffect, useState } from "react";
import { testDBProducts } from "../../test/data";

const Home = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    testDBProducts(20).then(
      examples =>{
        setProducts(examples);
      }
    )
  }, []);
  return (
    <Container>
      <ProductsGrid products={products} />
    </Container>
  )
}

export default Home;
