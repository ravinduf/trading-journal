import clsx from "clsx";
import { LayoutGrid, LogOut, Settings, TrendingUp, UserCircle2, Wallet } from "lucide-react";
import { logoutAtom, userAtom } from "@/atoms/userAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppHeader from "../appHeader/AppHeader";

const Header = () => {
  const logout = useSetAtom(logoutAtom);

  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const primaryLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { to: "/spot", label: "Spot" },
    { to: "/futures", label: "Futures" },
  ];

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background-color/95 px-4 py-3 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl md:px-6 md:py-4">
        <div className="mx-auto flex w-full  items-center justify-between">
          <div className="flex items-center gap-8">
            <AppHeader variant="nav" as="h1" size="24px" className="text-white uppercase tracking-widest" />
            <nav className="hidden items-center gap-6 md:flex">
              {primaryLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      "font-[Inter,sans-serif] text-sm font-medium text-slate-400 transition-colors hover:text-white",
                      isActive && "font-bold text-white"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full border outline-none!  bg-white/5 p-1 pl-2 transition-all hover:bg-white/10  lg:pl-3"
                type="button"
              >
                <span className="hidden font-inter text-base tracking-tight text-slate-300 lg:block md:mb-1">
                  {user?.username}
                </span>
                <UserCircle2 className="size-8 rounded-full border border-white/20 text-slate-200" strokeWidth={1.4} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-44 overflow-hidden rounded-xl border-white/10 bg-overlay-bg/95 p-0 text-slate-300 shadow-2xl backdrop-blur-2xl"
            >
              <DropdownMenuLabel className="space-y-1 border-b border-white/5 p-3 font-normal">
                <p className="font-orbitron text-[10px] tracking-widest text-slate-500 uppercase">
                  Account
                </p>
                <p className="text-sm font-semibold text-white">Verified User</p>
              </DropdownMenuLabel>
              <div className="py-1">
                <DropdownMenuItem className="cursor-pointer gap-3 px-4 py-2 text-slate-400 focus:bg-white/5 focus:text-white">
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-3 px-4 py-2 text-slate-400 focus:bg-white/5 focus:text-white"
                  onSelect={() => {
                    logout();
                    navigate("/home");
                  }}
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="h-[68px] md:h-[76px]" />

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-overlay-bg/90 px-8 py-4 backdrop-blur-2xl md:hidden">
        <div className="flex items-center justify-around">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center gap-1",
                isActive ? "text-white" : "text-slate-500"
              )
            }
          >
            <LayoutGrid className="size-5" strokeWidth={1.8} />
            <span className="font-['Orbitron',sans-serif] text-[10px] uppercase">Dashboard</span>
          </NavLink>
          <NavLink
            to="/spot"
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center gap-1",
                isActive ? "text-white" : "text-slate-500"
              )
            }
          >
            <Wallet className="size-5" strokeWidth={1.8} />
            <span className="font-['Orbitron',sans-serif] text-[10px] uppercase">Spot</span>
          </NavLink>
          <NavLink
            to="/futures"
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center gap-1",
                isActive ? "text-white" : "text-slate-500"
              )
            }
          >
            <TrendingUp className="size-5" strokeWidth={1.8} />
            <span className="font-['Orbitron',sans-serif] text-[10px] uppercase">Futures</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Header;
