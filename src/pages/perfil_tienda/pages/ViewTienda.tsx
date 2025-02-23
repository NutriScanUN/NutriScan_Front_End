import { Card, Table } from "react-bootstrap";
import { ViewOfTienda } from "../../../models/Tienda";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductoReferencia } from "../../../models/Product";

const ViewTienda: React.FC = () => {
    const { idTienda } = useParams<{ idTienda: string }>();
    const [tienda, setTienda] = useState<ViewOfTienda | null>(null);
    const [productos, setProductos] = useState<ProductoReferencia[]>([]);
  
    useEffect(() => {
      // Simulación de consulta de la tienda
      const tiendasEjemplo: ViewOfTienda[] = [
        { tienda_id: 101, nombre: "Tienda A", direccion: "Calle 123", enlace: "https://www.google.com/" },
        { tienda_id: 102, nombre: "Tienda B", direccion: "Avenida 456", enlace: "https://www.google.com/" },
      ];
  
      const tiendaEncontrada = tiendasEjemplo.find(t => t.tienda_id === Number(idTienda));
      setTienda(tiendaEncontrada || null);
  
      // Simulación de consulta de productos de la tienda
      const productosEjemplo: ProductoReferencia[] = [
        { producto_id: 1, tienda_id: 101, longitud: "20cm", referencia: "REF123", nombre: "Producto A1", descripcion: "Desc 1", foto: "https://via.placeholder.com/50" },
        { producto_id: 2, tienda_id: 101, longitud: "30cm", referencia: "REF456", nombre: "Producto A2", descripcion: "Desc 2", foto: "https://via.placeholder.com/50" },
        { producto_id: 3, tienda_id: 102, longitud: "15cm", referencia: "REF789", nombre: "Producto B1", descripcion: "Desc 3", foto: "https://via.placeholder.com/50" },
      ];
  
      const productosFiltrados = productosEjemplo.filter(p => p.tienda_id === Number(idTienda));
      setProductos(productosFiltrados);
    }, [idTienda]);
  
    return (
      <div className="container mt-4">
        {tienda ? (
          <>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>🏪 {tienda.nombre}</Card.Title>
                <Card.Text>
                  <strong>📍 Dirección:</strong> {tienda.direccion} <br />
                  <strong>📞 enlace:</strong> {tienda.enlace}
                </Card.Text>
              </Card.Body>
            </Card>
  
            <h3>📦 Productos de la Tienda</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Referencia</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Foto</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <tr key={producto.producto_id}>
                      <td>{producto.producto_id}</td>
                      <td>{producto.referencia}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.descripcion}</td>
                      <td>
                        <img src={producto.foto} alt={producto.nombre} width="50" height="50" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No hay productos en esta tienda.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <h3 className="text-center">⚠️ Tienda no encontrada</h3>
        )}
      </div>
    );
  };
  
  export default ViewTienda;