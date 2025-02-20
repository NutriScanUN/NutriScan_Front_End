import { Stack } from "react-bootstrap";
import Banner from "./Banner";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../stateManagement/store";
import { Roles } from "../perfil/models/user";

const NavigationLayout = () => {
  const authenticado = useSelector((state: RootState) => state.auth.isAuthenticated)
  const rol = useSelector((state: RootState) => state.auth?.user?.rol ?? Roles.ESTANDAR)
  return (
    <Stack>
      <Banner registered={authenticado} rol={rol}/>
      <Outlet/>
      <Footer/>
    </Stack>
  );
}

export default NavigationLayout;
