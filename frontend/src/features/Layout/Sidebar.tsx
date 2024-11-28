import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";
const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => {
          if (key === "1") navigate("/main/GT1");
          if (key === "2") navigate("/main/GT2");
        }}
        items={[
          {
            key: "1",

            label: "GT1",
          },
          {
            key: "2",
            label: "GT2",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
