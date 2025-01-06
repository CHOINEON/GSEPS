import React, { useEffect, useState } from "react";
import { Typography, Space } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;

const DateTime: React.FC = () => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <DateTimeWrapper>
      <Space size={16}>
        <Space size={8}>
          <ClockCircleOutlined
            style={{
              fontSize: "18px",
              color: "#fff",
            }}
          />
          {/* <Text strong style={{ color: "#fff", fontSize: "15px" }}>
            현재 시간
          </Text> */}
        </Space>

        <DateTimeContent>
          <Text
            style={{
              color: "#fff",
              fontSize: "15px",
              padding: "4px 12px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
            }}
          >
            {formatDate(today)}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: "15px",
              padding: "4px 12px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            {formatTime(today)}
          </Text>
        </DateTimeContent>
      </Space>
    </DateTimeWrapper>
  );
};

export default DateTime;

const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  background: transparent;
`;

const DateTimeContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
