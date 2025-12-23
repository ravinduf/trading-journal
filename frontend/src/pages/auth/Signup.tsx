import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  signupAction } from "./authActions";
import AppHeader from "@/components/custom/appHeader/AppHeader";
import { toast } from "sonner";

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

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
    // TODO: Implement login logic
    toast.promise(signupAction(data), {
      loading: "Creating User!!!",
      success: () => {
        navigate("/auth/login");
        return "User Created!";
      },
      error: (error) => {
        console.log("---------error--------", error);
        const errors: string[] = Object.values(error.response.data);
        return (
          <>
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </>
        );
      },
    });
  };

  return (
    <>
      <img
        src={"/login-bg.webp"}
        alt="bg"
        className="-z-10 absolute h-screen bg-background"
      />
      <section className="mx-auto w-1/3 pt-20">
        <div className="flex justify-center">
          <AppHeader size="48px" />
        </div>
        <div className="text-center my-6 text-3xl font-medium">Sign Up</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              type="text"
              placeholder="Username"
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              aria-invalid={errors.re_password ? "true" : "false"}
              {...register("re_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.re_password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.re_password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full mt-8">
            Login
          </Button>
        </form>
        <div className="text-sm text-center my-4">
          Already have an Account?{" "}
          <Button
            variant="link"
            className="text-blue-700"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Signup
          </Button>
        </div>
      </section>
    </>
  );
};

export default Signup;
