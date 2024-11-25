import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

const GT1: React.FC = () => {
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
    <div>
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

      <Title level={3} style={{ margin: 0, marginTop: 10, marginLeft: 5 }}>
        예측 시간
      </Title>
      {/* <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Row>
          <Col span={8}>
            <Checkbox value="-0">-0시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="-3">-3시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="-6">-6시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="-9">-9시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="-12">-12시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="-15">-15시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="=18">-18시</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="=18">-21시</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group> */}
    </div>
  );
};

export default GT1;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
