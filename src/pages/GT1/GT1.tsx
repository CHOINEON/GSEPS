import React from "react";
import { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

const GT1: React.FC = () => {
  const [Today, setToday] = useState(new Date().toLocaleDateString());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    setToday(new Date().toLocaleDateString());
    setCurrentTime(new Date().toLocaleTimeString());

    const timer = setInterval(() => {
      setToday(new Date().toLocaleDateString());
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
