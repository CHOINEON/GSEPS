import React from "react";
import { Outlet } from "react-router-dom";

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <h1 className="text-2xl font-bold">GSEPS대시보드</h1>
  </header>
);

const Main: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
export default Main;
