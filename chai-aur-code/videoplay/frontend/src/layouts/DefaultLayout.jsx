import React from "react";
import { Sidebar, Header, Footer, CustomToaster } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" flex h-dvh w-screen flex-col overflow-hidden overflow-y-hidden bg-primary-color font-poppins text-white">
      <CustomToaster />
      <Header />
      <div className="paddingL flex grow bg-secondary-color">
        <div className="  min-w-fit   ">
          <Sidebar />
        </div>
        <div className=" flex w-full grow flex-col bg-primary-color  ">
          <main className="containerH  max-w-dvw     custom-scrollbar  grow overflow-y-auto    ">
            <Outlet />
          </main>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
