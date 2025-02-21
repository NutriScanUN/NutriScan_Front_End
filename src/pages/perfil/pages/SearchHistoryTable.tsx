import { useState } from "react";
import { searchHistoryDataTest } from "../models/HistorialSearch";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchHistoryTable: React.FC = () => {
  const [searchHistoryData, setSearchHistoryData] = useState(searchHistoryDataTest);

  const deleteRecord = (id?: string) => {
    if (id) {
      setSearchHistoryData(prevData => prevData.filter(record => record.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Historial de Búsqueda</h2>
      <table className="table table-striped">
        <thead>
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
          {searchHistoryData.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{new Date(record.fecha_busqueda.seconds * 1000).toLocaleString()}</td>
              <td>{record.id_producto}</td>
              <td>{record.redireccion_tienda ? 'Sí' : 'No'}</td>
              <td>{record.id_tienda || 'N/A'}</td>
              <td>{record.activo ? 'Sí' : 'No'}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteRecord(record.id)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchHistoryTable;
