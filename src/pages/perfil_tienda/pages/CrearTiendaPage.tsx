import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../stateManagement/store";

const CrearTiendaPage: React.FC = () => {
  const uid = useSelector((state:RootState) => state.auth.user?.uid)
  const [formData, setFormData] = useState({
    uid: uid,
    nombre: "",
    fecha_suscripcion: new Date().toISOString().split("T")[0], // Fecha actual
    direccion: "",
    descripcion: "",
    fotos: "",
    enlace: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando datos:", formData);
    setMessage("¡Tienda creada exitosamente!");
  };

  // Validar si todos los campos requeridos están completos
  const isFormValid = formData.uid && formData.nombre && formData.direccion;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Crear Tienda</h2>
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre de la tienda"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ingrese la dirección"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción breve de la tienda"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fotos (URL)</Form.Label>
              <Form.Control
                type="text"
                name="fotos"
                value={formData.fotos}
                onChange={handleChange}
                placeholder="URL de la imagen"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enlace</Form.Label>
              <Form.Control
                type="text"
                name="enlace"
                value={formData.enlace}
                onChange={handleChange}
                placeholder="URL de la tienda"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Crear Tienda
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearTiendaPage;
