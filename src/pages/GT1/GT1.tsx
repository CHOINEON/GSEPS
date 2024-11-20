import React from "react";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

const GT1: React.FC = () => {
  const now = new Date();
  const Today = now.toLocaleDateString(); // 현재 날짜
  const Time = now.toLocaleTimeString(); // 현재 시간

  return (
    <Flex>
      <Title level={2}>날짜 및 시간</Title>
      <Title level={3}>{Today}</Title>
      <Title level={3}>{Time}</Title>
    </Flex>
  );
};

export default GT1;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
