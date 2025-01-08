import React from "react";
import { Tag, Flex, Card } from "antd";
import Title from "antd/es/typography/Title";
import { HistoryOutlined } from "@ant-design/icons";
import { DateTimeHistory } from "../stores";

interface HistoryTagsProps {
  history: DateTimeHistory[];
}

const HistoryTags: React.FC<HistoryTagsProps> = ({ history }) => {
  const tagStyles = [
    { backgroundColor: "#ffe6e6", color: "black", borderColor: "#ff9999" },
    { backgroundColor: "#fff0e6", color: "black", borderColor: "#ffa366" },
    { backgroundColor: "#fff9e6", color: "black", borderColor: "#ffdd66" },
    { backgroundColor: "#e6ffe6", color: "black", borderColor: "#66cc66" },
  ];

  const sortedHistory = [...history].sort((a, b) => {
    const timeA = a.predictionDate
      .clone()
      .hour(a.predictionTimes[0])
      .minute(0)
      .second(0);
    const timeB = b.predictionDate
      .clone()
      .hour(b.predictionTimes[0])
      .minute(0)
      .second(0);

    const now = new Date();
    const diffA = Math.abs(timeA.toDate().getTime() - now.getTime());
    const diffB = Math.abs(timeB.toDate().getTime() - now.getTime());
    return diffA - diffB;
  });

  return (
    <Card
      style={{
        margin: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(231, 234, 237, 0.8)",
      }}
      bodyStyle={{ padding: "12px" }}
    >
      <Flex vertical gap="8px" style={{ width: "100%" }}>
        <Flex
          align="center"
          justify="center"
          style={{
            borderBottom: "1px solid rgba(240, 240, 240, 0.8)",
            paddingBottom: "6px",
            width: "100%",
          }}
        >
          <HistoryOutlined
            style={{
              fontSize: "18px",
              marginRight: "8px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          />
          <Title level={5} style={{ margin: 0, color: "rgba(0, 0, 0, 0.85)" }}>
            최근 조회 기록
          </Title>
        </Flex>

        <Flex
          gap="6px"
          wrap
          justify="center"
          style={{
            width: "100%",
            marginTop: "2px",
          }}
        >
          {sortedHistory.map((item, index) => (
            <Tag
              key={item.timestamp}
              style={{
                margin: "2px 4px",
                padding: "6px 12px",
                fontSize: "13px",
                backgroundColor: tagStyles[index].backgroundColor,
                color: tagStyles[index].color,
                border: `1px solid ${tagStyles[index].borderColor}`,
                borderRadius: "6px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backdropFilter: "blur(4px)",
              }}
            >
              <Flex vertical align="center" gap="2px">
                <span style={{ fontSize: "11px", color: "#666" }}>
                  조회 시점
                </span>
                <span style={{ fontWeight: "500" }}>
                  {item.scopeDate.format("YYYY.MM.DD")}
                </span>
              </Flex>

              <div
                style={{
                  width: "1px",
                  height: "28px",
                  backgroundColor: tagStyles[index].borderColor,
                  margin: "0 2px",
                }}
              />

              <Flex vertical align="center" gap="2px">
                <span style={{ fontSize: "11px", color: "#666" }}>
                  예측 시점
                </span>
                <span style={{ fontWeight: "500" }}>
                  {item.predictionDate.format("YYYY.MM.DD")}
                </span>
              </Flex>

              <div
                style={{
                  width: "1px",
                  height: "28px",
                  backgroundColor: tagStyles[index].borderColor,
                  margin: "0 2px",
                }}
              />

              <Flex vertical align="center" gap="2px">
                <span style={{ fontSize: "11px", color: "#666" }}>
                  예측 시간
                </span>
                <span style={{ fontWeight: "600", color: "#1890ff" }}>
                  {String(item.predictionTimes[0]).padStart(2, "0")}:00
                </span>
              </Flex>
            </Tag>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default HistoryTags;
