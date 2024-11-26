import axiosInstance from "../../shared/ApiInstance";

export const getSelectedForecast = async (
  scopeDate: string,
  predictionDate: string,
  predictionTimes: string
) => {
  const response = await axiosInstance.get(
    `/forecast/selected?scopeDate=${scopeDate}&predictionDate=${predictionDate}&predictionTimes=${predictionTimes}`
  );
  return response.data;
};
