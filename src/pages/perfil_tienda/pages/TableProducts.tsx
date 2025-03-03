import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { DBProduct } from "../../../models/Product";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { setProducts } from "../../../stateManagement/productsSlice";


const TableProducts = () => {

  const dispatch = useDispatch<AppDispatch>();
  const productos = useSelector((state: RootState) => state.productsTienda.products)


  const [productosFiltrados, setProductosFiltrados] = useState<DBProduct[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState<DBProduct | null>(null);
  const navigate = useNavigate();

  // Filtrar productos al escribir en el buscador
  useEffect(() => {
    const filtro = productos.filter((p) =>
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(filtro);
  }, [busqueda, productos]);

  const handleDelete = (producto_id: number) => {
    const nuevaLista = productos.filter((p) => p.id_producto !== producto_id);
    dispatch(setProducts(productos));
    setProductosFiltrados(nuevaLista);
  };

  const handleEdit = (producto: DBProduct) => {
    setProductoEditando(producto);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    if (productoEditando) {
      const productosActualizados = productos.map((p) =>
        p.id_producto === productoEditando.id_producto ? productoEditando : p
      );
      // setProductos(productosActualizados);
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
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.referencia}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <img src={producto.url_imagen} alt={producto.nombre} width="50" height="50" />
                </td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(producto)}>
                    ✏️ Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(producto.id_producto)}>
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
                  value={productoEditando.url_imagen}
                  onChange={(e) => setProductoEditando({ ...productoEditando, url_imagen: e.target.value })}
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