import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'; // Usa 'react-router-dom' en lugar de 'react-router'
import RegisterLayout from './pages/register/pages/RegisterLayout';
import RoutesAuthentication from './pages/register/Routes';

function App() {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        {/* Aquí debes expandir las rutas de RoutesAuthentication */}
        <Route path='*' element={<RoutesAuthentication />} />
      </Route>
    </Routes>
  );
}

export default App;
