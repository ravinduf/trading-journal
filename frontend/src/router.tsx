import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";

export const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Home
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/signup",
    Component: Signup,
  }
]);