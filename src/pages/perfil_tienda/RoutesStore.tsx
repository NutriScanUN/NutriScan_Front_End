import { Routes, Route } from 'react-router'
import PageInformationStore from './pages/PageInformationStore'
import CrearTiendaPage from './pages/CrearTiendaPage'
import { useSelector } from 'react-redux'
import { RootState } from '../../stateManagement/store'
import LayoutStore from './pages/LayoutStore'
import TableProducts from './pages/TableProducts'
import { CrearProducto } from './pages/CrearProducto'
import ViewTienda from './pages/ViewTienda'

export const RoutesStore = () => {
  const tieneStore = useSelector((state: RootState) => state.store.tiendaGuardada);
  return (
    <Routes >
      <Route element={<LayoutStore />}>
        {
            tieneStore?
            <>
                <Route path="/" element={<PageInformationStore/>}></Route>
                <Route path="/products" element={<TableProducts/>}></Route>
                <Route path="/addProduct" element={<CrearProducto/>}></Route>
            </>:
            <>
                <Route path="/" element={<CrearTiendaPage/>}></Route>
                <Route path="/ViewTienda/:idTienda" element={<ViewTienda/>}></Route>
            </>
        }
      </Route>
    </Routes>
  )
}
