import React from "react";
import { Header, Footer } from "../components";
import { Outlet } from "react-router-dom";

const OnlyHeaderLayout = () => {
  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-primary-color font-poppins text-white">
      <Header />
      <main className="containerH paddingX max-w-dvw custom-scrollbar size-full grow overflow-y-auto bg-primary-color">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default OnlyHeaderLayout;
