import { Checkbox, DatePicker, message, Table } from "antd";
import Title from "antd/es/typography/Title";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PredictionChart from "../../components/PredictionChart";
import DateTime from "../../features/Layout/components/DateTime";
import { getSelectedForecast } from "../../features/api/PredictionApi";

interface Forecast {
  time: string;
  temperature: number;
  pressureMb: number;
  humidity: number;
  weatherImg: string;
}

const GT1: React.FC = () => {
  const [selectedForecast, setSelectedForecast] = useState<any>(null);
  const [scopeDate, setScopeDate] = useState<Dayjs>(dayjs());
  const [predictionDate, setPredictionDate] = useState<Dayjs>(dayjs());
  const [predictionTimes, setPredictionTimes] = useState<number[]>([]);

  const timeOptions = [
    { label: "0시", value: 0 },
    { label: "3시", value: 3 },
    { label: "6시", value: 6 },
    { label: "9시", value: 9 },
    { label: "12시", value: 12 },
    { label: "15시", value: 15 },
    { label: "18시", value: 18 },
    { label: "21시", value: 21 },
  ];

  const fetchForecast = async () => {
    try {
      const formattedScopeDate = scopeDate.format("YYYY-MM-DD");
      const formattedPredictionDate = predictionDate.format("YYYY-MM-DD");
      const formattedTimes = predictionTimes.join(",");

      const data = await getSelectedForecast(
        formattedScopeDate,
        formattedPredictionDate,
        formattedTimes
      );

      console.log(data);
      setSelectedForecast(data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      message.error("데이터를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [scopeDate, predictionDate, predictionTimes]);

  const handleTimeChange = (times: number[]) => {
    if (times.length <= 4) {
      setPredictionTimes(times);
    } else {
      message.warning("최대 4개까지만 선택할 수 있습니다.");
    }
  };

  const formatHour = (time: string) => dayjs(time).format("H");

  const getPredictionSum = (predictions: any) => {
    return predictions
      ? predictions.GT1 + predictions.GT2 + predictions.ST
      : null;
  };

  const getPastelColor = (index: number, totalTimes: number) => {
    const colors = [
      "#ffe6e6", // 파스텔 빨강
      "#fff2e6", // 파스텔 주황
      "#fffae6", // 파스텔 노랑
      "#e6ffe6", // 파스텔 초록
    ];

    // 시간을 내림차순으로 정렬했을 때의 인덱스를 사용
    const sortedIndex = totalTimes - 1 - index;
    return colors[sortedIndex];
  };

  const restructureData = () => {
    if (!selectedForecast?.forecasts || !selectedForecast?.predictions)
      return [];

    // 날씨 이미지 행
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

    // 온도 행
    const temperatureRow = {
      key: "temperature",
      label: "온도(°C)",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = forecast.temperature;
        return acc;
      }, {}),
    };

    // 습도 행
    const humidityRow = {
      key: "humidity",
      label: "습도(%)",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = forecast.humidity;
        return acc;
      }, {}),
    };

    // 기압 행
    const pressureRow = {
      key: "pressure",
      label: "기압(mb)",
      ...selectedForecast.forecasts.reduce((acc: any, forecast: any) => {
        acc[formatHour(forecast.time)] = forecast.pressureMb;
        return acc;
      }, {}),
    };

    // 예측 시간을 오름차순으로 정렬 (작은 시간 -> 큰 시간)
    const sortedPredictionTimes = [...predictionTimes].sort((a, b) => a - b);

    // 예측 시간별 행
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
        // 예상용량 행에서만 특별한 스타일 적용
        if (record.key.startsWith("prediction_")) {
          return (
            <div className={value === 0 ? "disabled-cell" : ""}>{value}</div>
          );
        }
        return value;
      },
    })),
  ];

  // 예측 날짜 선택 제한 함수 수정
  const disabledPredictionDate = (current: Dayjs | null) => {
    if (!current) return false;
    // 오늘 날짜보다 미래이거나 조회 날짜보다 미래인 경우 선택 불가
    // 조회 날짜로부터 2일 이상 이전인 경우도 선택 불가
    return (
      current.isAfter(dayjs(), "day") ||
      current.isAfter(scopeDate, "day") ||
      current.isBefore(scopeDate.subtract(2, "day"), "day")
    );
  };

  // scopeDate가 변경될 때 predictionDate도 함께 체크하고 조정
  const handleScopeDateChange = (date: Dayjs | null) => {
    if (date) {
      setScopeDate(date);
      // 예측 날짜가 새로운 조회 날짜보다 미래인 경우 조회 날짜로 설정
      if (predictionDate.isAfter(date, "day")) {
        setPredictionDate(date);
      }
    }
  };

  // 조회 날짜 선택 제한 함수 추가
  const disabledScopeDate = (current: Dayjs | null) => {
    if (!current) return false;
    // 오늘로부터 2일 후까지만 선택 가능
    return current.isAfter(dayjs().add(2, "day"), "day");
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

  return (
    <div>
      <DateTime />
      <Title level={3} style={{ margin: 0, marginTop: 10, marginLeft: 5 }}>
        예측 시간
      </Title>

      <div style={{ maxWidth: 600, margin: "20px" }}>
        <div style={{ marginBottom: 16 }}>
          <div>조회 날짜</div>
          <DatePicker
            value={scopeDate}
            onChange={handleScopeDateChange}
            disabledDate={disabledScopeDate}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div>예측 날짜</div>
          <DatePicker
            value={predictionDate}
            onChange={(date) => date && setPredictionDate(date)}
            disabledDate={disabledPredictionDate}
          />
        </div>

        <div>
          <div>예측 시간 (최대 4개)</div>
          <Checkbox.Group
            options={timeOptions}
            value={predictionTimes}
            onChange={handleTimeChange}
          />
        </div>
      </div>

      {/* 차트 컨포넌트 */}
      <div style={{ margin: "20px" }}>
        {selectedForecast && predictionTimes.length > 0 && (
          <PredictionChart
            selectedForecast={selectedForecast}
            predictionTimes={predictionTimes}
            formatHour={formatHour}
            getPredictionSum={getPredictionSum}
          />
        )}
      </div>

      <div style={{ margin: "20px" }}>
        <Table
          title={() => "거래시간"}
          columns={columns}
          dataSource={restructureData()}
          pagination={false}
          scroll={{ x: "max-content" }}
          bordered
          rowClassName={getRowClassName}
          className="prediction-table"
        />
      </div>

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
        `}
      </style>
    </div>
  );
};

export default GT1;
