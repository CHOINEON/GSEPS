import { ReactElement } from "react";

export interface Forecast {
  forecastId: number;
  time: string;
  weatherImg: string;
  temperature: number;
  humidity: number;
  pressureMb: number;
}

export interface Predictions {
  [key: string]: {
    [key: number]: number[];
  };
}

export interface SelectedForecast {
  forecasts: Forecast[];
  predictions: Predictions;
}

export interface PredictionTableProps {
  selectedForecast: SelectedForecast;
  predictionTimes: number[];
  selectedCells: string[];
  handleCellClick: (
    time: string,
    predictionTime: string,
    value: number
  ) => void;
  formatHour: (time: string) => string;
  getPredictionSum: (predictions: number[]) => number | null;
}

export interface WeatherAccumulator {
  [hour: string]: ReactElement;
}

export interface TemperatureRow {
  [hour: string]: number | string;
  key: string;
  label: string;
}

export interface HumidityRow {
  [hour: string]: number | string;
  key: string;
  label: string;
}

export interface PressureRow {
  [hour: string]: number | string;
  key: string;
  label: string;
}

export interface PredictionRow {
  [hour: string]: number | string | { backgroundColor: string } | null;
  key: string;
  label: string;
  style: {
    backgroundColor: string;
  };
}
