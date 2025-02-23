import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import { Roles } from "../../models/user";

interface Props {
  registered?: boolean;
  rol?: Roles;
}

const Banner = ({registered = false, rol = Roles.ESTANDAR}: Props) => {


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="." style={{textDecoration: "none"}}>
          <Navbar.Brand href=".">NutriScan</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="." style={{textDecoration: "none"}}>
              <Nav.Link href=".">Inicio</Nav.Link>
            </Link>
            <Link to="search" style={{textDecoration: "none"}}>
              <Nav.Link href="search">Scanner/Buscador</Nav.Link>
            </Link>
            {
              !registered ?
              <>
                <Link to="login" style={{textDecoration: "none"}}>
                <Nav.Link href="login">Ingresar</Nav.Link>
                </Link>
                <Link to="signin" style={{textDecoration: "none"}}>
                  <Nav.Link href="signin">Registrarse</Nav.Link>
                </Link>
              </>:
              <>
                <Link to="profile" style={{textDecoration: "none"}}>
                  <Nav.Link href="profile">Perfil</Nav.Link>
                </Link>
                {
                  rol == Roles.ESTANDAR ? 
                  <Link to="compra" style={{textDecoration: "none"}}>
                    <Nav.Link href="compra">Compra</Nav.Link>
                  </Link>
                  :
                  <Link to="store" style={{textDecoration: "none"}}>
                    <Nav.Link href="store">Tienda</Nav.Link>
                  </Link>
                }
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Banner;
