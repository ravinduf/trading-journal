import { RouterProvider } from "react-router-dom";
import { Button } from "./components/ui/button";
import { router } from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
