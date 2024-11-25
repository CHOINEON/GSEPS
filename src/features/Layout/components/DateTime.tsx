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
    <Flex>
      <Title
        level={3}
        style={{ margin: 0, marginTop: 5, marginRight: 10, marginLeft: 5 }}
      >
        날짜 및 시간
      </Title>
      <Title level={3} style={{ margin: 0, marginTop: 5 }}>
        {Today}
      </Title>
      <Title level={3} style={{ margin: 0, marginTop: 5 }}>
        {currentTime}
      </Title>
    </Flex>
  );
};

export default DateTime;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
