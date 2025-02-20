import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { consumptionHistoryDataTest } from "../models/HistorialConsumption";

const ConsumptionHistoryTable: React.FC = () => {
    const [consumptionHistoryData, setConsumptionHistoryData] = useState(consumptionHistoryDataTest);
  
    const handleDelete = (id: string | undefined) => {
      if (id) {
        setConsumptionHistoryData((prevData) => prevData.filter((item) => item.id !== id));
      }
    };
  
    return (
      <Table striped bordered hover>
        <thead>
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
              <td>{new Date(item.fecha_consumo.seconds * 1000).toLocaleDateString()}</td>
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
    );
  };
  
  export default ConsumptionHistoryTable;
  