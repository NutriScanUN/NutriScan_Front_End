import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { setHistorialConsumo } from "../../../stateManagement/authSlice";
import { deleteConsumptionHistory } from "../../../services/ConsumptionHistoryService";

const ConsumptionHistoryTable: React.FC = () => {
  const uid = useSelector((state: RootState) => state.auth.user?.uid ?? '');
  const historial = useSelector((state: RootState) => state.auth.historial_consumo);
  const [consumptionHistoryData, setConsumptionHistoryData] = useState([...historial]);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    try {
      const response = deleteConsumptionHistory(uid, id);
      if(! response) return
      setConsumptionHistoryData((prevData) => {
        const filter = prevData.filter((item) => item.id !== id)
        dispatch(setHistorialConsumo(filter))
        return filter;
      });
    } catch (error) {
      console.error("🚀 ~ handleDelete ~ error:", error)
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
              <td>{new Date(item.fecha_consumo).toLocaleString()}</td>
              <td>{item.cantidad_consumida}</td>
              <td>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                    {Object.entries(item.nutrientes_ingeridos).map(([key, _value]) => (
                        <td key={key}>{key}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(item.nutrientes_ingeridos).map(([key, value]) => (
                        <td key={key}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id ?? '')}>
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
  