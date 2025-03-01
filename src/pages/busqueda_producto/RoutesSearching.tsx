import { Routes, Route } from 'react-router'
import Search from './pages/Search'
export const RoutesSearching = () => {
  return (
    <Routes >
      <Route index element={<Search/>} />
    </Routes>
  )
}
