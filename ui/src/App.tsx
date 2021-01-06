import React from "react";
import Login from "./views/login";
import PageNotFound from "./views/pageNotFound";
import "./App.css";
import "bootstrap";
import { useRoutes } from "hookrouter";
import MainLayout from "./views/mainLayout";

const routes = {
  "/": () => <Login />,
  "/login": () => <Login />,
  "/users": () => <MainLayout userType={"users"} />,
  "/admin": () => <MainLayout userType={"admin"} />,
};

const AppRouter: React.FC = () => {
  const routeResults = useRoutes(routes);

  return routeResults || <PageNotFound />;
};

export default AppRouter;
