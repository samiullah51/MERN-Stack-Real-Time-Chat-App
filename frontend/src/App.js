import React, { useContext } from "react";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index path="/" element={<HomePage />} />
        </Route>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
