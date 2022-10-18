import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

import AdminLayout from "../components/layouts/AdminLayout";
import useStore from "../store/useStore";

const DashboardPage = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));
const AboutPage = lazy(() => import("../pages/About"));

const afterLoggedInLoader = () => {
  const { isLoggedIn } = useStore.getState().authSlide;

  // if (isLoggedIn) {
  //   return redirect("/admin/dashboard");
  // }
};

const router = createBrowserRouter([
  {
    path: "admin",
    element: <AdminLayout />,
    // errorElement: <ErrorPage />,
    loader: () => {
      console.log("loader");
    },
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: afterLoggedInLoader,
  },
]);

export default router;
