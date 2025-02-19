import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";

const LayoutProfile = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <Navbar bg="dark" variant="dark" expand="lg" className="rounded mb-3">
        <Container>
          <Navbar.Brand>Mi Cuenta</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/profile")}>Perfil</Nav.Link>
            <Nav.Link onClick={() => navigate("/profile/consumption")}>
              Historial de Consumo
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/profile/search")}>
              Historial de Búsqueda
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </Container>
  );
};

export default LayoutProfile;
