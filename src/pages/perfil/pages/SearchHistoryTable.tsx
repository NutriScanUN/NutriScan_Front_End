import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { deleteSearchHistory } from "../../../services/SearchHistoryService";
import { setHistorialBusqueda } from "../../../stateManagement/authSlice";
import { DatesFixUp } from "../../../utils/ConsumptionHistoryUtils";

const SearchHistoryTable: React.FC = () => {
  const uid = useSelector((state: RootState) => state.auth.user?.uid ?? '');
  const historial = useSelector((state: RootState) => state.auth.historial_busqueda ?? []);
  const [searchHistoryData, setSearchHistoryData] = useState(historial);
  console.log("🚀 ~ searchHistoryData:", searchHistoryData)
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    setSearchHistoryData(historial);
  }, [historial]); // Se actualiza cuando `historial` cambia

  const deleteRecord = (id: string) => {
    try {
      const response = deleteSearchHistory(uid, id);
      if(! response) return;
      setSearchHistoryData((prevState) => {
        const filter = prevState.filter((item) => item.id !== id)
        dispatch(setHistorialBusqueda(filter))
        return filter;
      });
    } catch (error) {
      console.error("🚀 ~ handleDelete ~ error:", error)
    }
  };

  return (
    <div className="container mt-4">
      <h2>Historial de Búsqueda</h2>
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table table-striped">
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 2 }}>
            <tr>
              <th>ID</th>
              <th>Fecha de Búsqueda</th>
              <th>ID Producto</th>
              <th>Redirección a Tienda</th>
              <th>ID Tienda</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {searchHistoryData?.length > 0 && searchHistoryData?.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{DatesFixUp(record.fecha_busqueda)}</td>
                <td>{record.id_producto}</td>
                <td>{record.redireccion_tienda ? 'Sí' : 'No'}</td>
                <td>{record.id_tienda || 'N/A'}</td>
                <td>{record.activo ? 'Sí' : 'No'}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRecord(record.id ?? '')}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );  
};

export default SearchHistoryTable;
