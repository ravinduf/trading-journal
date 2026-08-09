import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { router } from "./router";
import { Toaster } from "sonner";
import InitialLoadingScreen from "./components/custom/loaders/InitialLoadingScreen";

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
      <Suspense fallback={<InitialLoadingScreen />}> 
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App
