import React, { lazy } from "react";
import MainLayout from "./components/layout/MainLayout";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));

// Define routes
export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "provider", element: <div>Provider Dashboard</div> },
      { path: "enrollments", element: <div>Enrollments</div> },
      { path: "profile", element: <div>Profile Page</div> },
      { path: "*", element: <div>Page Not Found</div> },
    ],
  },
];
