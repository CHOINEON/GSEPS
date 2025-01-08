import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLine from "../features/Layout/HeaderLine";
import HeaderMenu from "../features/Layout/HeaderMenu";

const Main: React.FC = () => {
  return (
    // <div className="flex w-full h-screen">
    <div
      className="flex flex-col flex-1"
      style={{
        flexDirection: "column",
        // backgroundColor: "rgba(248, 249, 250, 0.9)",
        backgroundColor: "rgba(248, 249, 250, 0.9)",
        backdropFilter: "blur(8px)",
      }}
    >
      <HeaderLine />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderMenu />
        <Outlet />
      </div>
    </div>
  );
};
export default Main;
