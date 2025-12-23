import Header from "@/components/custom/header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const PrimaryLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PrimaryLayout;
