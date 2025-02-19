import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container >
      <footer className="d-flex justify-content-center align-items-center">
        <img style={{height: "2rem", width: ""}} src="nutriscan-logo.png"></img>
        NutriScan
      </footer>
    </Container>
  );
};

export default Footer;
