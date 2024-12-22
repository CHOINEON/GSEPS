import { create } from "zustand";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface SelectedCell {
  time: string;
  predictionTime: string;
  value: number;
  predictionId?: number;
}

interface SelectedCellStore {
  selectedCells: SelectedCell[];
  addSelectedCell: (cell: SelectedCell) => void;
  removeSelectedCell: (predictionTime: string, time: string) => void;
  clearSelectedCells: () => void;
}
interface DateTimeHistory {
  scopeDate: Dayjs;
  predictionDate: Dayjs;
  predictionTimes: number[];
  timestamp: number;
}

interface DateTimeStore {
  scopeDate: Dayjs;
  predictionDate: Dayjs;
  predictionTimes: number[];
  history: DateTimeHistory[];
  setScopeDate: (date: Dayjs) => void;
  setPredictionDate: (date: Dayjs) => void;
  setPredictionTimes: (times: number[]) => void;
  addToHistory: () => void;
}

export const useDateTimeStore = create<DateTimeStore>((set) => ({
  scopeDate: dayjs(),
  predictionDate: dayjs(),
  predictionTimes: [],
  history: [],

  setScopeDate: (date) => set({ scopeDate: date }),

  setPredictionDate: (date) => set({ predictionDate: date }),

  setPredictionTimes: (times) => set({ predictionTimes: times }),

  // 현재 상태를 히스토리에 추가하는 함수
  addToHistory: () =>
    set((state) => {
      const newHistoryItems = state.predictionTimes.map((time) => ({
        scopeDate: state.scopeDate,
        predictionDate: state.predictionDate,
        predictionTimes: [time], // 각 시간을 단일 요소 배열로 저장
        timestamp: Date.now(),
      }));

      // 새로운 항목들이 이미 존재하는지 확인
      const filteredNewItems = newHistoryItems.filter(
        (newItem) =>
          !state.history.some(
            (existingItem) =>
              existingItem.scopeDate.isSame(newItem.scopeDate) &&
              existingItem.predictionDate.isSame(newItem.predictionDate) &&
              existingItem.predictionTimes[0] === newItem.predictionTimes[0]
          )
      );

      // 기존 히스토리와 새로운 항목들을 합치고 최근 4개만 유지
      return {
        history: [...state.history, ...filteredNewItems].slice(-4),
      };
    }),
}));
export const useSelectedCellStore = create<SelectedCellStore>((set) => ({
  selectedCells: [],
  addSelectedCell: (cell) =>
    set((state) => {
      // 이미 같은 예측 시간대의 셀이 있다면 제거
      const filteredCells = state.selectedCells.filter(
        (existingCell) => existingCell.predictionTime !== cell.predictionTime
      );

      // 새로운 셀 추가하되 최대 2개까지만 유지
      return {
        selectedCells: [...filteredCells, cell].slice(-2),
      };
    }),
  removeSelectedCell: (predictionTime, time) =>
    set((state) => ({
      selectedCells: state.selectedCells.filter(
        (cell) =>
          !(cell.predictionTime === predictionTime && cell.time === time)
      ),
    })),
  clearSelectedCells: () => set({ selectedCells: [] }),
}));
