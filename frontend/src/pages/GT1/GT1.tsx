import { Checkbox, DatePicker, message, Tag, Flex } from "antd";
import Title from "antd/es/typography/Title";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import PredictionChart from "../../components/PredictionChart";
import PredictionTable from "../../components/PredictionTable/Table";
import DateTime from "../../features/Layout/components/DateTime";
import { getSelectedForecast } from "../../features/api/PredictionApi";
import logger from "../../shared/logger";
import { useSelectedCellStore, useDateTimeStore } from "../../stores/index";
import HistoryTags from "../../components/Tag";

const GT1: React.FC = () => {
  const [selectedForecast, setSelectedForecast] = useState<any>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const { addSelectedCell, removeSelectedCell } = useSelectedCellStore();
  const {
    scopeDate,
    predictionDate,
    predictionTimes,
    setScopeDate,
    setPredictionDate,
    setPredictionTimes,
    addToHistory,
    history,
  } = useDateTimeStore();

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
      console.log("예측 시간 변경:", times);
      setPredictionTimes(times);
    } else {
      message.warning("최대 4개까지만 선택할 수 있습니다.");
    }
  };

  const formatHour = (time: string) => dayjs(time).format("H");
  //이후 여러 시간 값에서 H시간 값만 추출하는데 쓰임.

  const getPredictionSum = (predictions: any) => {
    return predictions
      ? Number((predictions.GT1 + predictions.GT2 + predictions.ST).toFixed(2))
      : null;
  };

  const handleCellClick = (
    time: string,
    predictionTime: string,
    value: number
  ) => {
    if (value === 0 || !value) return;

    const cellId = `${predictionTime}_${time}`;
    const predictionId =
      selectedForecast?.predictions[predictionTime]?.[parseInt(time)]
        ?.predictionId;

    setSelectedCells((prev) => {
      if (prev.includes(cellId)) {
        removeSelectedCell(predictionTime, time);
        return prev.filter((id) => id !== cellId);
      }

      const filteredSelection = prev.filter(
        (id) => !id.startsWith(`${predictionTime}_`)
      );
      const newSelection = [...filteredSelection, cellId];

      addSelectedCell({
        time,
        predictionTime,
        value,
        predictionId,
      });

      return newSelection.slice(-2);
    });

    // logger.log(
    //   `- Clicked: Prediction Time ${predictionTime}, Hour ${time}, Value ${value}, Prediction ID ${predictionId}
    //    - Scope Date: ${scopeDate.format("YYYY-MM-DD")}
    //    - Prediction Date: ${predictionDate.format("YYYY-MM-DD")}`
    // );
  };

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
      // console.log("조회 시점 변경:", date.format("YYYY-MM-DD"));
      setScopeDate(date);
      if (predictionDate.isAfter(date, "day")) {
        // console.log("예측 시점 자동 조정:", date.format("YYYY-MM-DD"));
        setPredictionDate(date);
      }
    }
  };

  const handlePredictionDateChange = (date: Dayjs | null) => {
    if (date) {
      console.log("예측 시점 변경:", date.format("YYYY-MM-DD"));
      setPredictionDate(date);
      // 예측 시점이 변경되면 예측 시간 초기화
      setPredictionTimes([]);
    }
  };

  // 조회 날짜 선택 제한 함수 추가
  const disabledScopeDate = (current: Dayjs | null) => {
    if (!current) return false;
    // 오늘로부터 2일 후까지만 선택 가능
    return current.isAfter(dayjs().add(2, "day"), "day");
  };

  // selectedCells 상태가 변경될 때마다 콘솔에 출력
  // useEffect(() => {
  //   console.log("Selected Cells Store Data:", selectedCells);
  // }, [selectedCells]);

  // Zustand 상태 변화 모니터링
  // useEffect(() => {
  //   console.log("DateTime Store 상태 변경:", {
  //     scopeDate: scopeDate.format("YYYY-MM-DD"),
  //     predictionDate: predictionDate.format("YYYY-MM-DD"),
  //     predictionTimes,
  //   });
  // }, [scopeDate, predictionDate, predictionTimes]);

  // 상태 변경 시 히스토리에 추가
  useEffect(() => {
    addToHistory();
  }, [scopeDate, predictionDate, predictionTimes]);

  // 히스토리 모니터링을 위한 로그
  useEffect(() => {
    console.log(
      "DateTime History:",
      history.map((item) => ({
        scopeDate: item.scopeDate.format("YYYY-MM-DD"),
        predictionDate: item.predictionDate.format("YYYY-MM-DD"),
        predictionTimes: item.predictionTimes,
        timestamp: new Date(item.timestamp).toLocaleString(),
      }))
    );
  }, [history]);

  return (
    <div>
      {/* <DateTime /> */}
      {/* <HistoryTags history={history} /> */}

      <Title
        level={4}
        style={{
          margin: 0,
          marginTop: 5,
          marginLeft: 5,
          textAlign: "center",
        }}
      >
        예측 시간대 설정
      </Title>

      <div
        style={{
          margin: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: 10, marginRight: 10 }}>
          <Title level={5} style={{ textAlign: "center" }}>
            조회 시점{" "}
          </Title>
          <DatePicker
            value={scopeDate}
            onChange={handleScopeDateChange}
            disabledDate={disabledScopeDate}
          />
        </div>

        <div style={{ marginBottom: 10, marginRight: 10 }}>
          <Title level={5} style={{ textAlign: "center" }}>
            예측 시점
          </Title>
          <DatePicker
            value={predictionDate}
            onChange={handlePredictionDateChange}
            disabledDate={disabledPredictionDate}
          />
        </div>

        <div>
          <Title level={5} style={{ textAlign: "center" }}>
            예측 시간 (최대 4개)
          </Title>
          <Checkbox.Group
            options={timeOptions}
            value={predictionTimes}
            onChange={handleTimeChange}
          />
        </div>
      </div>
      <HistoryTags history={history} />
      <Title level={3} style={{ margin: 0, marginTop: 5, marginLeft: 10 }}>
        예측 차트
      </Title>

      <div style={{ margin: "0px 20px" }}>
        {selectedForecast && (
          <PredictionChart
            selectedForecast={selectedForecast}
            predictionTimes={predictionTimes}
            formatHour={formatHour}
            getPredictionSum={getPredictionSum}
          />
        )}
      </div>
      {/* <Button
        type="primary"
        style={{ margin: 10, backgroundColor: "black", width: "100px" }}
      >
        비교
      </Button> */}
      <Title level={3} style={{ margin: 0, marginLeft: 10 }}>
        용량 테이블
      </Title>
      <div style={{ margin: "20px" }}>
        <PredictionTable
          selectedForecast={selectedForecast}
          predictionTimes={predictionTimes}
          selectedCells={selectedCells}
          handleCellClick={handleCellClick}
          formatHour={formatHour}
          getPredictionSum={getPredictionSum}
        />
      </div>
    </div>
  );
};

export default GT1;
