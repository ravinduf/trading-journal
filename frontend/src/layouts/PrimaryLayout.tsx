import Header from "@/components/custom/header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const PrimaryLayout = () => {
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
