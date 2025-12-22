import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { loginAction } from "./authActions";

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    // TODO: Implement login logic
    try {
      const response = await loginAction(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <img src={"/login-bg.webp"} alt="bg" className='-z-10 absolute h-[100vh] bg-background'/>
      <section className="mx-auto w-1/3 pt-20">
        <div className="text-center my-6 text-3xl font-semibold">Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              type="username"
              placeholder="Username"
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full mt-8">Login</Button>
        </form>
        <div className="text-sm text-center my-4">
          No Account? <Button variant="link" className="text-blue-700" onClick={() => {
            navigate("/signup")
          }}>Sign Up</Button>
        </div>
      </section>
    </>
  )
}

export default Login