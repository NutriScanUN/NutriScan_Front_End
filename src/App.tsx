import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import NavigationLayout from './pages/navigation/NavigationLayout';
import RoutesAuthentication from './pages/register/RoutesAuthentication';
import { RoutesProfile } from './pages/perfil/RoutesProfile';
import { RoutesCompra } from './pages/compra/RoutesCompra';
import { RoutesStore } from './pages/perfil_tienda/RoutesStore';
import { RoutesSearching } from './pages/busqueda_producto/RoutesSearching';
import Home from './pages/home/Home';

function App() {

  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route index element={<Home/>} />
        <Route path="/*" element={<RoutesAuthentication />} />
        <Route path="/profile/*" element={<RoutesProfile />} />
        <Route path="/compra/*" element={<RoutesCompra />} />
        <Route path="/store/*" element={<RoutesStore />} />
        <Route path="/search/*" element={<RoutesSearching />} />
      </Route>
    </Routes>
  )
}

export default App
