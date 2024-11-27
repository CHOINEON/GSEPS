// import Sider from "antd/es/layout/Sider";
import React from "react";
import { Outlet } from "react-router-dom";
import Sider from "../features/Layout/Sidebar";
import HeaderLine from "../features/Layout/HeaderLine";
import HeaderMenu from "../features/Layout/HeaderMenu";
// const Header = () => (
//   <header>
//     <h1 className="text-2xl font-bold">GSEPS대시보드</h1>
//   </header>
// );

const Main: React.FC = () => {
  return (
    // <div className="flex w-full h-screen">
    <div className="flex flex-col flex-1">
      <HeaderLine />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HeaderMenu />
        <Outlet />
      </div>
    </div>
  );
};
export default Main;
