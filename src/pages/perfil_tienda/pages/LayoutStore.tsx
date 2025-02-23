import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";

const LayoutStore = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <Navbar bg="dark" variant="dark" expand="lg" className="rounded mb-3">
        <Container>
          <Navbar.Brand>Mi Tienda</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/store")}>Mi Tienda</Nav.Link>
            <Nav.Link onClick={() => navigate("/store/products")}>
              Productos
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </Container>
  );
};

export default LayoutStore;
