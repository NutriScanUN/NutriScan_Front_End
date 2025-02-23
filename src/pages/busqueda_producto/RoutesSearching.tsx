import { Routes, Route, Navigate } from 'react-router'
import Home from '../home/Home'
export const RoutesSearching = () => {
  return (
    <Routes >
      <Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<Navigate to={'/'}/>}></Route>
      </Route>
    </Routes>
  )
}
