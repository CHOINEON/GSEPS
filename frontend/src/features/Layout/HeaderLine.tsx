import { Layout } from "antd";
import GS_Logo from "../../assets/GS_logo.svg";
import DateTime from "./components/DateTime";
const { Header } = Layout;

const HeaderLine = () => {
  return (
    <Header
      style={{
        display: "flex",
        padding: "0 30px",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={GS_Logo}
          alt="GS Logo"
          style={{
            height: "40px",
            marginRight: "20px",
          }}
        />
        <h1 style={{ color: "white", margin: 0 }}>
          복합 화력발전 LNG 4호기 공급가능용량 AI 예측 시스템
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <DateTime />
      </div>
    </Header>
  );
};

export default HeaderLine;
