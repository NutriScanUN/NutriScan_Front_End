import { Routes, Route, Navigate } from 'react-router';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';

const RoutesAuthentication = () => {
  return (
    <Routes>
      <Route path='/login' element={<LogIn />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/' element={<Navigate to='/login' />} />
    </Routes>
  );
};

export default RoutesAuthentication;
