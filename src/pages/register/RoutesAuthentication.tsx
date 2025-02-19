import { Routes, Route, Navigate } from 'react-router';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import RegisterLayout from './pages/RegisterLayout';

const RoutesAuthentication = () => {
  return (
    <Route element={<RegisterLayout />}>
      <Route path='/login' element={<LogIn />}/>
      <Route path='/signin' element={<SignIn />}/>
    </Route>
  );
};

export default RoutesAuthentication;
