import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/auth/Signup";
import { isAuthenticatedLoader } from "./utils/isAuthenticatedLoader";
import PrimaryLayout from "./layouts/PrimaryLayout";

export const router = createBrowserRouter([
  { 
    path: "/", 
    Component: PrimaryLayout,
    loader: () => isAuthenticatedLoader(),
    children: [
      {
        index: true,
        Component: Dashboard 
      },
      {
        path: 'dashboard',
        Component: Dashboard,
      }
    ]
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: 'signup',
        Component: Signup
      }
    ]
  },
  {
    path: "/signup",
    Component: Signup,
  }
]);