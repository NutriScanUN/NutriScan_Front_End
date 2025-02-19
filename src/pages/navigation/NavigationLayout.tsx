import { Stack } from "react-bootstrap";
import Banner from "./Banner";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../stateManagement/store";

const NavigationLayout = () => {
  const authenticado = useSelector((state: RootState) => state.auth.isAuthenticated)
  return (
    <Stack>
      <Banner registered={authenticado}/>
      <Outlet/>
      <Footer/>
    </Stack>
  );
}

export default NavigationLayout;
