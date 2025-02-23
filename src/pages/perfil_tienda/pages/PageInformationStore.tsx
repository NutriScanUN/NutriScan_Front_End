import { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Tienda } from "../../../models/Tienda";


const PageInformationStore = () => {
    const [tienda, setTienda] = useState<Tienda | null>(null);
    const [editedTienda, setEditedTienda] = useState<Tienda | null>(null);
    const [isModified, setIsModified] = useState(false);
  
    useEffect(() => {
      // Simulación de llamada a API
      fetch("/api/tienda/1")
        .then((res) => res.json())
        .then((data) => {
          setTienda(data);
          setEditedTienda(data);
        });
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!editedTienda) return;
      const { name, value } = e.target;
      const updatedTienda = { ...editedTienda, [name]: value };
      setEditedTienda(updatedTienda);
      setIsModified(JSON.stringify(updatedTienda) !== JSON.stringify(tienda));
    };
  
    const handleSubmit = () => {
      if (!editedTienda) return;
      fetch("/api/tienda/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTienda),
      })
        .then((res) => res.json())
        .then((data) => {
          setTienda(data);
          setIsModified(false);
        });
    };
  
    if (!tienda) return <p>Cargando...</p>;
  
    return (
      <Container className="mt-4">
        <Card>
          <Card.Header>Editar Tienda</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={editedTienda?.nombre || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={editedTienda?.direccion || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Enlace</Form.Label>
                    <Form.Control
                      type="text"
                      name="enlace"
                      value={editedTienda?.enlace || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="descripcion"
                      value={editedTienda?.descripcion || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Fotos (URL)</Form.Label>
                    <Form.Control
                      type="text"
                      name="fotos"
                      value={editedTienda?.fotos || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" onClick={handleSubmit} disabled={!isModified}>
                Guardar cambios
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  };
  
  export default PageInformationStore;
  