import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import { isAuthenticatedLoader } from "./utils/isAuthenticatedLoader";

export const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Home,
    loader: () => isAuthenticatedLoader(),
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