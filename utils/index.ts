import { ApiResponse } from "../types";

export const createApiResponse = (
  success: boolean,
  message: string,
  data?: any
): ApiResponse => {
  const response: ApiResponse = { success, message };
  if (data) {
    response.data = data;
  }
  return response;
};
