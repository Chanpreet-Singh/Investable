import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  return localStorage.getItem("isUserLoggedIn") === null ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default AuthGuard;
