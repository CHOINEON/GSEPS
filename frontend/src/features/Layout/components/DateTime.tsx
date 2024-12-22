import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

const DateTime: React.FC = () => {
  const [Today, setToday] = useState(new Date().toLocaleDateString());
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
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
    <Flex align="center">
      <Title
        level={4}
        style={{
          margin: 0,
          color: "white",
          marginRight: 10,
        }}
      >
        현재시간 :{" "}
      </Title>
      <Title
        level={4}
        style={{
          margin: 0,
          color: "white",
          marginRight: 10,
        }}
      >
        {Today}
      </Title>
      <Title
        level={4}
        style={{
          margin: 0,
          color: "white",
        }}
      >
        {currentTime}
      </Title>
    </Flex>
  );
};

export default DateTime;
const Flex = styled.div`
  display: flex;
  justify-content: center;
`;
