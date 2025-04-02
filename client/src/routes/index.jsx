import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DaycareSearch from "../components/parent/DaycareSearch";
import DaycareForm from "../components/provider/DaycareForm";
import DaycareManagement from "../components/provider/DaycareManagement";
import EnrollmentForm from "../components/parent/EnrollmentForm";

const Home = React.lazy(() => import("../pages/Home"));
const Profile = React.lazy(() => import("../pages/Profile"));

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <DaycareSearch /> },
      { path: "/provider", element: <DaycareManagement /> },
      { path: "/provider/create", element: <DaycareForm /> },
      { path: "/enrollments", element: <EnrollmentForm /> },
      { path: "/profile", element: <Profile /> },
      // Redirect any unknown routes to home
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];
