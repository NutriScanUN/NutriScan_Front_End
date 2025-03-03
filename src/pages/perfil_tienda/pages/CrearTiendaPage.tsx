import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { Tienda } from "../../../models/Tienda";
import { addStoreToUser, updateUserStore } from "../../../utils/TiendaUtils";

const CrearTiendaPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const uid = useSelector((state:RootState) => state.auth.user?.uid)
  const userStore = useSelector((state:RootState) => state.store);

  const [formData, setFormData] = useState<Tienda>({...userStore, uid: uid??""});

  const [message, setMessage] = useState<string | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando datos:", formData);

    let resp = {code:400, message:"", success: false};

    if(userStore.tiendaGuardada){
      resp = await updateUserStore(userStore.id_tienda, userStore, dispatch);
    }else{
      resp = await addStoreToUser(formData, dispatch);
    }
    if(resp.success) setMessage("¡Tienda creada exitosamente!");
    else setMessage("No se ha podido crear la tienda")
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
                name="foto_tienda"
                value={formData.foto_tienda}
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
