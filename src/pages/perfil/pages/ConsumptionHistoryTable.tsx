import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../stateManagement/store";

const ConsumptionHistoryTable: React.FC = () => {
  const historial = useSelector((state: RootState) => state.auth.historial_consumo);
  const [consumptionHistoryData, setConsumptionHistoryData] = useState([...historial]);

  const handleDelete = (id: string | undefined) => {
    if (id) {
      setConsumptionHistoryData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
      <Table striped bordered hover>
        <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 2 }}>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Fecha de Consumo</th>
            <th>Cantidad Consumida</th>
            <th>Nutrientes Ingeridos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consumptionHistoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.id_producto}</td>
              <td>{new Date(item.fecha_consumo.getTime() * 1000).toLocaleDateString()}</td>
              <td>{item.cantidad_consumida}</td>
              <td>{JSON.stringify(item.nutrientes_ingeridos)}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );  
};
  
export default ConsumptionHistoryTable;
  