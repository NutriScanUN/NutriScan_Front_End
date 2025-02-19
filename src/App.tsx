import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'
import NavigationLayout from './pages/navigation/NavigationLayout';
import { Button } from 'react-bootstrap';
import RoutesAuthentication from './pages/register/RoutesAuthentication';
import { RoutesProfile } from './pages/perfil/RoutesProfile';

function App() {

  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route path="/*" element={<RoutesAuthentication />} />
        <Route path="/profile/*" element={<RoutesProfile />} />
        <Route path="/" element={<Button>Hello</Button>} />
      </Route>
    </Routes>
  )
}

export default App
