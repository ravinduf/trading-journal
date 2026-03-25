import { userAtom } from "@/atoms/userAtoms";
import Header from "@/components/custom/header/Header";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { Outlet, useLoaderData } from "react-router-dom";

const PrimaryLayout = () => {

  const { data } = useLoaderData();


  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <>
      <Header />
      <div className="px-6 py-4">
        <Outlet />
      </div>
    </>
  );
};

export default PrimaryLayout;
