import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'
import RegisterLayout from './pages/register/RegisterLayout'
import LogIn from './pages/register/LogIn'
import SignIn from './pages/register/SignIn'
import NavigationLayout from './pages/navigation/NavigationLayout';
import { Button } from 'react-bootstrap';

function App() {

  return (
    <>
      <Routes>
        <Route  element={<RegisterLayout />}>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/signin' element={<SignIn />}/>
        </Route>
        <Route element={<NavigationLayout />}>
          <Route index element={<Button>Hello</Button>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
