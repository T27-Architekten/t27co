import { Outlet } from "react-router-dom";
import NotFound from "../components/NotFound";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token") ? true : false;

  return token ? <Outlet /> : <NotFound />;
};

export default PrivateRoutes;
