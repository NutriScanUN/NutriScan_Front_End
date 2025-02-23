import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ProductoReferencia } from "../../../models/Product";
import { useNavigate } from "react-router";


const TableProducts: React.FC = () => {
    const [productos, setProductos] = useState<ProductoReferencia[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<ProductoReferencia[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [productoEditando, setProductoEditando] = useState<ProductoReferencia | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const productosEjemplo: ProductoReferencia[] = [
        { producto_id: 1, tienda_id: 101, longitud: "20cm", referencia: "REF123", nombre: "Producto Alpha", descripcion: "Descripción del producto 1", foto: "https://via.placeholder.com/50" },
        { producto_id: 2, tienda_id: 102, longitud: "30cm", referencia: "REF456", nombre: "Beta Pro", descripcion: "Descripción del producto 2", foto: "https://via.placeholder.com/50" },
        { producto_id: 3, tienda_id: 103, longitud: "15cm", referencia: "REF789", nombre: "Gamma Plus", descripcion: "Descripción del producto 3", foto: "https://via.placeholder.com/50" }
      ];
      setProductos(productosEjemplo);
      setProductosFiltrados(productosEjemplo);
    }, []);
  
    // Filtrar productos al escribir en el buscador
    useEffect(() => {
      const filtro = productos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setProductosFiltrados(filtro);
    }, [busqueda, productos]);
  
    const handleDelete = (producto_id: number) => {
      const nuevaLista = productos.filter((p) => p.producto_id !== producto_id);
      setProductos(nuevaLista);
      setProductosFiltrados(nuevaLista);
    };
  
    const handleEdit = (producto: ProductoReferencia) => {
      setProductoEditando(producto);
      setShowModal(true);
    };
  
    const handleSaveEdit = () => {
      if (productoEditando) {
        const productosActualizados = productos.map((p) =>
          p.producto_id === productoEditando.producto_id ? productoEditando : p
        );
        setProductos(productosActualizados);
        setProductosFiltrados(productosActualizados);
      }
      setShowModal(false);
    };
  
    return (
      <div className="container mt-4">
        <h2 className="mb-3">Lista de Productos</h2>
  
        <div className="mb-3 d-flex justify-content-between">
          <Form.Control
            type="text"
            placeholder="🔍 Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-50"
          />
          <Button variant="success" onClick={() => navigate("/store/addProduct")}>
            ➕ Agregar Producto
          </Button>
        </div>
  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Referencia</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Foto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr key={producto.producto_id}>
                  <td>{producto.producto_id}</td>
                  <td>{producto.referencia}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>
                    <img src={producto.foto} alt={producto.nombre} width="50" height="50" />
                  </td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(producto)}>
                      ✏️ Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(producto.producto_id)}>
                      ❌ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">No hay productos disponibles.</td>
              </tr>
            )}
          </tbody>
        </Table>
  
        {/* Modal de Edición */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {productoEditando && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Referencia</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoEditando.referencia}
                    onChange={(e) => setProductoEditando({ ...productoEditando, referencia: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoEditando.nombre}
                    onChange={(e) => setProductoEditando({ ...productoEditando, nombre: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoEditando.descripcion}
                    onChange={(e) => setProductoEditando({ ...productoEditando, descripcion: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Foto (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoEditando.foto}
                    onChange={(e) => setProductoEditando({ ...productoEditando, foto: e.target.value })}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Guardar Cambios</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  export default TableProducts;