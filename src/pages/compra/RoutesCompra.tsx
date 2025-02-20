import { Routes, Route } from "react-router"
import PasarelaPago from "./pages/PasarelaPago"
import ReceivePage from "./pages/ReceivePage"

export const RoutesCompra = () => {
    return (
      <Routes >
        <Route>
          <Route path="/receive" element={<ReceivePage/>}></Route>
          <Route path="*" element={<PasarelaPago/>}></Route>
        </Route>
      </Routes>
    )
  }
  