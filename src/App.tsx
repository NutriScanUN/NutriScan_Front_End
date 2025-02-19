import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'
import NavigationLayout from './pages/navigation/NavigationLayout';
import { Button } from 'react-bootstrap';
import RoutesAuthentication from './pages/register/RoutesAuthentication';

function App() {

  return (
    <>
      <Routes>
        <RoutesAuthentication/>
        <Route element={<NavigationLayout />}>
          <Route index element={<Button>Hello</Button>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
