import { Routes, Route } from 'react-router'
import LayoutProfile from './pages/LayoutProfile'
import ProfileForm from './pages/PageProfile'
import SearchHistoryTable from './pages/SearchHistoryTable'
import ConsumptionHistoryTable from './pages/ConsumptionHistoryTable'

export const RoutesProfile = () => {
  return (
    <Routes >
      <Route element={<LayoutProfile />}>
        <Route path="/consumption" element={<ConsumptionHistoryTable />} />
        <Route path="/search" element={<SearchHistoryTable/>} />
        <Route path="/" element={<ProfileForm/>}></Route>
      </Route>
    </Routes>
  )
}
