import { RouterProvider } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { router } from "./router";
import { Toaster } from "sonner";


gsap.registerPlugin(useGSAP);

function App() {

  
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
