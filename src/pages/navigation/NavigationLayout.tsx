import { Stack } from "react-bootstrap";
import Banner from "./Banner";
import { Outlet } from "react-router";
import Footer from "./Footer";

const NavigationLayout = () => {
  return (
    <Stack>
      <Banner/>
      <Outlet/>
      <Footer/>
    </Stack>
  );
}

export default NavigationLayout;
