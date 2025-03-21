// src/router/Router.tsx
import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

const RouterProvider: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterProvider;
