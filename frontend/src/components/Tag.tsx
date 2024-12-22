import React from "react";
import { Tag, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { DateTimeHistory } from "../stores";

interface HistoryTagsProps {
  history: DateTimeHistory[];
}

const HistoryTags: React.FC<HistoryTagsProps> = ({ history }) => {
  const tagColors = ["#108ee9", "#2db7f5", "#87d068", "#f50"];

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        margin: "10px 10px",
        borderRadius: "4px",
      }}
    >
      <Flex align="center" gap="12px">
        <Title level={5} style={{ margin: 0, minWidth: "fit-content" }}>
          최근 조회 기록
        </Title>
        <Flex gap="4px 0" wrap>
          {history.map((item, index) => (
            <Tag
              key={item.timestamp}
              color={tagColors[index]}
              style={{
                margin: "4px",
                padding: "4px 8px",
                fontSize: "13px",
              }}
            >
              {`조회 시점 ${item.scopeDate.format(
                "MM.DD"
              )} 예측 시점 ${item.predictionDate.format(
                "MM.DD"
              )} 예측 시간 ${String(item.predictionTimes[0]).padStart(
                2,
                "0"
              )}:00`}
            </Tag>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default HistoryTags;
