export type AIPredictResultType = {
  datetime: Date;
  predict: PredictType[];
};

export type PredictType = {
  temperature: number;
  GT1: number;
  GT2: number;
  ST: number;
};
