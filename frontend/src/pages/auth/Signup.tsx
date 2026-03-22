import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupAction } from "./authActions";
import { toast } from "sonner";
import { ArrowRight, AtSign, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";
import AppHeader from "@/components/custom/appHeader/AppHeader";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  re_password: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>();

  const inputClass =
    "h-auto w-full rounded-lg border-0 bg-[#0c0d1a]/40 py-4 pr-4 pl-12 text-white shadow-none ring-1 ring-white/10 transition-all placeholder:text-white/20 focus-visible:bg-[#0c0d1a]/60 focus-visible:ring-white/40 focus-visible:ring-[1px]";

  const onSubmit = async (data: SignupFormData) => {
    try {
      await toast.promise(
        signupAction(data).then(() => {
          navigate("/auth/login");
        }),
        {
          loading: "Creating account…",
          success: "User created!",
          error: (error) => {
            console.error("signup error", error);
            if (isAxiosError(error) && error.response?.data) {
              const payload = error.response.data;
              if (typeof payload === "string") return payload;
              if (typeof payload === "object" && payload !== null) {
                const messages = Object.values(payload).flat();
                if (messages.length > 0) {
                  return messages.join(" ");
                }
              }
            }
            return "Could not create account. Please try again.";
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-shell">
      <div className="pointer-events-none absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-white/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-5%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-white/2 blur-[100px]" />

      <div className="pointer-events-none fixed top-12 left-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="flex items-center gap-4">
          <AppHeader variant="auth" as="h1" />
        </div>
      </div>

      <main className="z-10 mt-24 w-full max-w-md">
        <div
          className={cn(
            "flex flex-col gap-10 rounded-xl px-8 py-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)] md:px-12 md:py-6",
            "border-t border-white/8 bg-[rgba(17,18,31,0.6)] backdrop-blur-[20px]"
          )}
        >
          <header className="space-y-2">
            <h2 className="font-orbitron text-3xl font-bold tracking-tight text-white">
              Sign Up
            </h2>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
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
                  <Mail
                    className="size-[18px] text-white/30 transition-colors group-focus-within:text-white"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={inputClass}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
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
                  autoComplete="new-password"
                  placeholder="Password"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
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
                  autoComplete="new-password"
                  placeholder="Confirm password"
                  aria-invalid={errors.re_password ? "true" : "false"}
                  className={inputClass}
                  {...register("re_password", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
              </div>
              {errors.re_password && (
                <p className="text-sm text-red-400">{errors.re_password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className={cn(
                "group mt-2 h-auto w-full rounded-lg border-0 py-4 font-['Orbitron',sans-serif] text-sm font-bold tracking-widest text-[#2f3131] uppercase shadow-none",
                "bg-linear-to-br from-white to-[#e2e2e2]",
                "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
              )}
            >
              <span>Sign Up</span>
              <ArrowRight
                className="size-[18px] transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Button>
          </form>

          <footer className="flex flex-col items-center gap-4 border-t border-white/5 pt-6">
            <p className="flex items-center gap-2 text-xs text-[#c4c7c8]">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-bold text-white underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Signup;
