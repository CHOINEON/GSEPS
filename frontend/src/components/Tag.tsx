import React from "react";
import { Tag, Flex } from "antd";
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

  const sortedHistory = [...history].sort(
    (a, b) => a.predictionTimes[0] - b.predictionTimes[0]
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px 20px",
        margin: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Flex vertical gap="12px">
        <Flex
          align="center"
          style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "12px" }}
        >
          <HistoryOutlined
            style={{ fontSize: "18px", marginRight: "8px", color: "#1890ff" }}
          />
          <Title level={5} style={{ margin: 0, color: "#1890ff" }}>
            최근 조회 기록
          </Title>
          <span
            style={{
              marginLeft: "12px",
              fontSize: "13px",
              color: "#8c8c8c",
              fontWeight: "normal",
            }}
          >
            (최대 4개까지 저장)
          </span>
        </Flex>

        <Flex gap="8px" wrap style={{ padding: "4px 0" }}>
          {sortedHistory.map((item, index) => (
            <Tag
              key={item.timestamp}
              style={{
                margin: "4px",
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
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {String(item.predictionTimes[0]).padStart(2, "0")}:00
              </span>
              <span>
                {`예측 ${item.predictionDate.format(
                  "MM.DD"
                )} → 조회 ${item.scopeDate.format("MM.DD")}`}
              </span>
            </Tag>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default HistoryTags;
