import React from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";

const PaymentReceive: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // Redirigir a la página principal o donde sea necesario
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center" style={{ width: "300px" }}>
        <Card.Body>
          <Card.Title>Pago Exitoso</Card.Title>
          <Card.Text>Gracias por tu compra. Tu pago ha sido procesado correctamente.</Card.Text>
          <Button variant="success" onClick={handleBackHome}>
            Volver al inicio
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentReceive;
