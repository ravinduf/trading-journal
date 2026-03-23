import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginAction } from "./authActions";
import { userTokensAtom } from "@/atoms/userAtoms";
import { useSetAtom } from "jotai";
import { toast } from "sonner";
import { ArrowRight, AtSign, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/custom/appHeader/AppHeader";

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const setUserTokens = useSetAtom(userTokensAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await toast.promise(
        loginAction(data).then((response) => {
          setUserTokens(response.data);
          navigate("/");
          return response;
        }),
        {
          loading: "Logging In!",
          success: "Successfully Logged In!",
          error: (error) => {
            console.error("-------error--------", error);
            return "Error Logging In!, Please Try again later!";
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass =
    "h-auto w-full rounded-lg border-0 bg-[#0c0d1a]/40 py-4 pr-4 pl-12 text-white shadow-none ring-1 ring-white/10 transition-all placeholder:text-white/20 focus-visible:bg-[#0c0d1a]/60 focus-visible:ring-white/40 focus-visible:ring-[1px]";

  return (
    <div className="auth-shell">
      <div className="pointer-events-none absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-white/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-5%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-white/2 blur-[100px]" />

      <div className="pointer-events-none fixed top-12 left-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="flex items-center gap-4">
          <AppHeader variant="auth" as="h1" />
        </div>
      </div>

      <main className="z-10 mt-2 w-full max-w-md">
        <div
          className={cn(
            "flex flex-col gap-10 rounded-xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)] md:p-12",
            "border-t border-white/8 bg-[rgba(17,18,31,0.6)] backdrop-blur-[20px]"
          )}
        >
          <header className="space-y-2">
            <h2 className="font-orbitron text-3xl font-bold tracking-tight text-white">
              Login
            </h2>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
            noValidate
          >
            <div className="space-y-3">
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <AtSign
                    className="size-[18px] text-white/30 transition-colors group-focus-within:text-white"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <Input
                  type="text"
                  autoComplete="username"
                  placeholder="User name"
                  aria-invalid={errors.username ? "true" : "false"}
                  className={inputClass}
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock
                    className="size-[18px] text-white/30 transition-colors group-focus-within:text-white"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className={cn(
                "group h-auto w-full rounded-lg border-0 py-4 font-orbitron text-sm font-bold tracking-widest text-[#2f3131] uppercase shadow-none",
                "bg-linear-to-br from-white to-[#e2e2e2]",
                "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
              )}
            >
              <span>Login</span>
              <ArrowRight
                className="size-[18px] transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Button>
          </form>

          <footer className="flex flex-col items-center gap-4 border-t border-white/5 pt-6">
            <p className="flex items-center gap-2 text-xs text-[#c4c7c8]">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/signup"
                className="font-bold text-white underline-offset-4 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </footer>
        </div>
      </main>

    </div>
  );
};

export default Login;
