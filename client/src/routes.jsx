import React, { lazy } from "react";
import MainLayout from "./components/layout/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Enrollments = lazy(() => import("./pages/Enrollments"));
const ProviderDashboard = lazy(() => import("./pages/ProviderDashboard"));

// Define routes
export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "provider", element: <ProviderDashboard /> },
      { path: "enrollments", element: <Enrollments /> },
      { path: "profile", element: <div>Profile Page</div> },
      { path: "*", element: <div>Page Not Found</div> },
    ],
  },
];
