import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router";

const RegisterLayout = () => {
  return(
    <Container fluid className="p-5">
      <Row>
        <Col md={8} lg={7} xl={6} className="m-auto">
          <Outlet/>
        </Col>
      </Row>
    </Container>
  )
};

export default RegisterLayout;
