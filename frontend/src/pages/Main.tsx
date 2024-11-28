import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLine from "../features/Layout/HeaderLine";
import HeaderMenu from "../features/Layout/HeaderMenu";

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
