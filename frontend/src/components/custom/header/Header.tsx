import clsx from "clsx";
import AppHeader from "../appHeader/AppHeader";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { logoutAtom } from "@/atoms/userAtoms";

const Header = () => {
  const logout = useSetAtom(logoutAtom);
  
  const navigate = useNavigate();
  return (
    <nav className="px-6 py-3 bg-blue-400/10 backdrop-blur-md flex flex-row gap-6 items-center">
      <div className="flex flex-row gap-6 w-full items-center">
        <AppHeader size="22px" />
        <NavLink
          to="/dashboard"
          className={({ isActive }) => clsx({ "text-blue-300": isActive })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/spot"
          className={({ isActive }) => clsx({ "text-blue-300": isActive })}
        >
          Spot
        </NavLink>
        <NavLink
          to="/futures"
          className={({ isActive }) => clsx({ "text-blue-300": isActive })}
        >
          Futures
        </NavLink>
        <NavLink
          to="/predictionMarkets"
          className={({ isActive }) => clsx({ "text-blue-300": isActive })}
        >
          Prediction Markets
        </NavLink>
        <NavLink
          to="/RWA"
          className={({ isActive }) => clsx({ "text-blue-300": isActive })}
        >
          RWA
        </NavLink>
      </div>
      <div className="w-full flex justify-end items-center">
        <Button 
          size={'sm'} 
          onClick={() => {
            logout();
            navigate("/auth/login")
          }}>
            Logout
          </Button>
      </div>
    </nav>
  );
};

export default Header;
