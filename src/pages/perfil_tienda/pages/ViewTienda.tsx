import { Card, Table } from "react-bootstrap";
import { ViewOfTienda } from "../../../models/Tienda";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DBProduct } from "../../../models/Product";
import { getNOrLessProducts } from "../../../utils/ProductsUtils";

const ViewTienda: React.FC = () => {
    const { idTienda } = useParams<{ idTienda: string }>();
    const [tienda, setTienda] = useState<ViewOfTienda | null>(null);
    const [productos, setProductos] = useState<DBProduct[]>([]);
  
    useEffect(() => {
      // Simulación de consulta de la tienda
      const tiendasEjemplo: ViewOfTienda[] = [
        { id_tienda: 101, nombre: "Tienda A", direccion: "Calle 123", enlace: "https://www.google.com/" },
        { id_tienda: 102, nombre: "Tienda B", direccion: "Avenida 456", enlace: "https://www.google.com/" },
      ];
  
      const tiendaEncontrada = tiendasEjemplo.find(t => t.id_tienda === Number(idTienda));
      setTienda(tiendaEncontrada || null);
  
      // Simulación de consulta de productos de la tienda
      getNOrLessProducts(10).then(
        products =>{
          if(products) {
            setProductos(products);
          }
        }
      )
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
                    <tr key={producto.id_producto}>
                      <td>{producto.referencia}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.descripcion}</td>
                      <td>
                        <img src={producto.url_imagen} alt={producto.nombre} width="50" height="50" />
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