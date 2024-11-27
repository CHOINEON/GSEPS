import { useNavigate } from "react-router-dom";

import { Menu } from "antd";

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <Menu
      style={{ justifyContent: "center" }}
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      onClick={({ key }) => {
        if (key === "1") navigate("/main/GT1");
        if (key === "2") navigate("/main/GT2");
        if (key === "3") navigate("/main/UNIT");
      }}
      items={[
        { key: "1", label: "GT1" },
        { key: "2", label: "GT2" },
        { key: "3", label: "UNIT" },
      ]}
    />
  );
};

export default HeaderMenu;
