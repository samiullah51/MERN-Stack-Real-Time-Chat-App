import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Signin from "./pages/Signin";

// Protected routes, only the logged in user can visit all the routes
const useAuth = () => {
  const user = useSelector((state) => state.user);
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Signin />;
};

export default ProtectedRoutes;
