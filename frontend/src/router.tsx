import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";

export const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Home
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
        Component: Login
      }
    ]
  },
  {
    path: "/signup",
    Component: Signup,
  }
]);