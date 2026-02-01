import React from "react";
import Sidebar from "../Shared/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="sm:w-[15%] lg:w-[25%] xl:w-[20%] 2xl:w-[10%]">
        <Sidebar />
      </div>
      <div className="w-full flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
