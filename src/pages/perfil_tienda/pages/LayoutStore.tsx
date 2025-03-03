import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { RootState } from "../../../stateManagement/store";
import { useEffect } from "react";

const LayoutStore = () => {
  const navigate = useNavigate();

  const tieneStore = useSelector((state: RootState) => state.store.tiendaGuardada);

  useEffect(() => {

  }, [])

  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg" className="rounded mb-3">
        <Container>
          <Navbar.Brand>Mi Tienda</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/store")}>Mi Tienda</Nav.Link>
            {tieneStore &&
              <Nav.Link onClick={() => navigate("/store/products")}>
                Productos
              </Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </Container>
  );
};

export default LayoutStore;
