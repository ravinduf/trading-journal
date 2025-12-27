import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/auth/Signup";
import { isAuthenticatedLoader } from "./utils/isAuthenticatedLoader";
import PrimaryLayout from "./layouts/PrimaryLayout";
import Spot from "./pages/spot/Spot";
import Futures from "./pages/futures/Futures";
import RWA from "./pages/RWA/RWA";
import PredictionMarkets from "./pages/predictionMarkets/PredictionMarkets";
import Error from "./pages/error/Error";

export const router = createBrowserRouter([
  { 
    path: "/", 
    Component: PrimaryLayout,
    loader: () => isAuthenticatedLoader(),
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Dashboard 
      },
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: "spot",
        Component: Spot,
      },
      {
        path: "futures",
        Component: Futures
      },
      {
        path: "predictionMarkets",
        Component: PredictionMarkets
      },
      {
        path: "RWA",
        Component: RWA
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