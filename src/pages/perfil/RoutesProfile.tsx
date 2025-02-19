import { Routes, Route } from 'react-router'
import LayoutProfile from './pages/LayoutProfile'
import ProfileForm from './pages/PageProfile'

export const RoutesProfile = () => {
  return (
    <Routes >
      <Route element={<LayoutProfile />}>
        <Route path="/consumption" element={<div />} />
        <Route path="/search" element={<div />} />
        <Route path="/" element={<ProfileForm/>}></Route>
      </Route>
    </Routes>
  )
}
