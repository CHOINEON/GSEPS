import { Layout } from "antd";
import GS_Logo from "../../assets/GS_logo.svg";
const { Header } = Layout;

const HeaderLine = () => {
  return (
    <Header style={{ display: "flex", padding: "0 30px" }}>
      <img
        src={GS_Logo}
        alt="GS Logo"
        style={{
          alignSelf: "center",
          height: "40px",
          marginRight: "20px",
        }}
      />
      <h1 style={{ color: "white", margin: 0 }}>
        복합 화력발전 LNG 4호기 공급가능용량 AI 예측 시스템
      </h1>
    </Header>
  );
};

export default HeaderLine;
