import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Tienda } from "../../../models/Tienda";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { updateUserStore } from "../../../utils/TiendaUtils";


const PageInformationStore = () => {

  const dispatch = useDispatch<AppDispatch>();
  const tienda = useSelector((state: RootState) => state.store)

  const [editedTienda, setEditedTienda] = useState<Tienda | null>(tienda);
  const [isModified, setIsModified] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedTienda) return;
    const { name, value } = e.target;
    const updatedTienda = { ...editedTienda, [name]: value };
    setEditedTienda(updatedTienda);
    setIsModified(JSON.stringify(updatedTienda) !== JSON.stringify(tienda as Tienda));
  };

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!editedTienda) return;

    setLoading(true);
    await updateUserStore(tienda.id_tienda, editedTienda, dispatch);
    setLoading(false);
  };

  useEffect(() => {
    setIsModified(JSON.stringify(editedTienda) !== JSON.stringify(tienda as Tienda));
  } ,[tienda])

  if (!tienda || loading) return <p>Cargando...</p>;

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
                    name="foto_tienda"
                    value={editedTienda?.foto_tienda || ""}
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
