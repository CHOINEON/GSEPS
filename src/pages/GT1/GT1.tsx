import React from "react";
import Title from "antd/es/typography/Title";
import DateTime from "../../features/Layout/components/DateTime";

const GT1: React.FC = () => {
  return (
    <div>
      <DateTime />

      <Title level={3} style={{ margin: 0, marginTop: 10, marginLeft: 5 }}>
        예측 시간
      </Title>
    </div>
  );
};

export default GT1;
