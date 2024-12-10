import React from "react";
import { Table } from "antd";

interface PredictionTableProps {
  selectedForecast: any;
  predictionTimes: number[];
  selectedCells: string[];
  handleCellClick: (
    time: string,
    predictionTime: string,
    value: number
  ) => void;
  formatHour: (time: string) => string;
  getPredictionSum: (predictions: any) => number | null;
}

const PredictionTable: React.FC<PredictionTableProps> = ({
  selectedForecast,
  predictionTimes,
  selectedCells,
  handleCellClick,
  formatHour,
  getPredictionSum,
}) => {
  const restructureData = () => {
    if (!selectedForecast?.forecasts || !selectedForecast?.predictions)
      return [];

    const weatherRow = {
      key: "weather",
      label: "날씨",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = (
          <img
            src={`https://${forecast.weatherImg}`}
            alt="weather"
            style={{ width: 32 }}
          />
        );
        return acc;
      }, {}),
    };

    const temperatureRow = {
      key: "temperature",
      label: "온도(°C)",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = forecast.temperature;
        return acc;
      }, {}),
    };

    const humidityRow = {
      key: "humidity",
      label: "습도(%)",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = forecast.humidity;
        return acc;
      }, {}),
    };

    const pressureRow = {
      key: "pressure",
      label: "기압(mb)",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = forecast.pressureMb;
        return acc;
      }, {}),
    };

    const sortedPredictionTimes = [...predictionTimes].sort((a, b) => a - b);

    const predictionRows = sortedPredictionTimes.map((time, index) => ({
      key: `prediction_${time}`,
      label: `예상용량 ${time}시`,
      style: {
        backgroundColor: getPastelColor(
          sortedPredictionTimes.length - 1 - index,
          sortedPredictionTimes.length
        ),
      },
      ...selectedForecast.forecasts.reduce(
        (acc: any, _: any, forecastIndex: number) => {
          const predictions =
            selectedForecast.predictions[time]?.[forecastIndex];
          acc[formatHour(selectedForecast.forecasts[forecastIndex].time)] =
            predictions ? getPredictionSum(predictions) : null;
          return acc;
        },
        {}
      ),
    }));

    return [
      weatherRow,
      temperatureRow,
      humidityRow,
      pressureRow,
      ...predictionRows,
    ];
  };

  const getPastelColor = (index: number, totalTimes: number) => {
    const colors = ["#ffe6e6", "#fff2e6", "#fffae6", "#e6ffe6"];
    const sortedIndex = totalTimes - 1 - index;
    return colors[sortedIndex];
  };

  const getRowClassName = (record: any) => {
    if (record.key.startsWith("prediction_")) {
      const timeIndex = predictionTimes
        .sort((a, b) => b - a)
        .indexOf(parseInt(record.key.split("_")[1]));
      return `prediction-row-${timeIndex}`;
    }
    return "";
  };

  const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      fixed: "left" as const,
      width: 120,
    },
    ...Array.from({ length: 24 }, (_, i) => ({
      title: `${i + 1}`,
      dataIndex: `${i}`,
      key: `${i}`,
      width: 80,
      align: "center" as const,
      render: (value: any, record: any) => {
        if (record.key.startsWith("prediction_")) {
          const predictionTime = record.key.split("_")[1];
          return (
            <div
              className={`
                ${value === 0 ? "disabled-cell" : "clickable-cell"}
                ${
                  selectedCells.includes(`${predictionTime}_${i}`)
                    ? "selected-cell"
                    : ""
                }
              `}
              onClick={() =>
                value !== 0 &&
                handleCellClick(i.toString(), predictionTime, value)
              }
            >
              {value}
            </div>
          );
        }
        return value;
      },
    })),
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={restructureData()}
        pagination={false}
        scroll={{ x: "max-content" }}
        bordered
        rowClassName={getRowClassName}
        className="prediction-table"
      />
      <style>
        {`
          .prediction-row-0 td { background-color: #ffe6e6 !important; }
          .prediction-row-1 td { background-color: #fff2e6 !important; }
          .prediction-row-2 td { background-color: #fffae6 !important; }
          .prediction-row-3 td { background-color: #e6ffe6 !important; }
          .disabled-cell {
            color: #00000040;
            background-color: #f5f5f5;
            padding: 4px 8px;
            border-radius: 2px;
          }
          .clickable-cell {
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 2px;
            transition: background-color 0.3s;
          }
          .clickable-cell:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
          .selected-cell {
            background-color: rgba(24, 144, 255, 0.1);
            border: 1px solid #1890ff;
          }
        `}
      </style>
    </>
  );
};

export default PredictionTable;
