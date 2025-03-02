import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { setHistorialConsumo } from "../../../stateManagement/authSlice";
import { deleteConsumptionHistory } from "../../../services/ConsumptionHistoryService";
import { parseFecha } from "../../../utils/ConsumptionHistoryUtils";

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
              <td>{parseFecha(String(item.fecha_consumo)).toLocaleString()}</td>
              <td>{item.cantidad_consumida}</td>
              <td>{JSON.stringify(item.nutrientes_ingeridos)}</td>
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
  