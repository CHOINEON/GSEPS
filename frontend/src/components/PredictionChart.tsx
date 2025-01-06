import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionChartProps {
  selectedForecast: any;
  predictionTimes: number[];
  formatHour: (time: string) => string;
  getPredictionSum: (predictions: any) => number | null;
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  selectedForecast,
  predictionTimes,
  formatHour,
  getPredictionSum,
}) => {
  const colorSchemes = [
    { borderColor: "#ff9999", backgroundColor: "#ffe6e6" }, // 빨강계열
    { borderColor: "#ffa366", backgroundColor: "#fff0e6" }, // 주황계열
    { borderColor: "#ffdd66", backgroundColor: "#fff9e6" }, // 노랑계열
    { borderColor: "#66cc66", backgroundColor: "#e6ffe6" }, // 진한 초록계열
  ];

  const prepareChartData = () => {
    if (!selectedForecast?.forecasts || !selectedForecast?.predictions) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = Array.from({ length: 24 }, (_, i) => `${i + 1}`);
    const sortedTimes = [...predictionTimes].sort((a, b) => a - b);

    const datasets = sortedTimes.map((time, index) => {
      const data = Array(24).fill(null);

      selectedForecast.forecasts.forEach(
        (forecast: any, forecastIndex: number) => {
          const hour = parseInt(formatHour(forecast.time));
          const predictions =
            selectedForecast.predictions[time]?.[forecastIndex];
          if (predictions) {
            const sum = getPredictionSum(predictions);
            data[hour] = sum === 0 ? null : sum;
          }
        }
      );

      // 시간 순서에 따라 색상 스키마 적용
      const colorScheme = colorSchemes[index];

      return {
        label: `${time}시 예측`,
        data: data,
        borderColor: colorScheme.borderColor,
        backgroundColor: colorScheme.backgroundColor,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      };
    });

    return {
      labels,
      datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "시간별 예상용량",
      },
    },
    scales: {
      y: {},
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line options={chartOptions} data={prepareChartData()} />
    </div>
  );
};

export default PredictionChart;
