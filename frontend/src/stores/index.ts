import { create } from "zustand";

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
