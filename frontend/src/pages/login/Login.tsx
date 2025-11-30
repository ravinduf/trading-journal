import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <img src={"/login-bg.webp"} alt="bg" className='-z-10 absolute h-[100vh] bg-background'/>
      <section className="mx-auto w-1/3 pt-20">
        <div className="text-center my-6 text-3xl font-semibold">Login</div>
        <div className="space-y-5">
          <Input placeholder="Email"/>
          <Input placeholder="Password" />
        </div>
        <Button className="w-full mt-8">Login</Button>
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