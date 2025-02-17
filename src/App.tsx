import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'
import RegisterLayout from './pages/register/RegisterLayout'
import LogIn from './pages/register/LogIn'
import SignIn from './pages/register/SignIn'

function App() {

  return (
    <>
      <Routes>
        <Route  element={<RegisterLayout />}>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/signin' element={<SignIn />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
