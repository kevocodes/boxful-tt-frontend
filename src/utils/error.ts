import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiResponse;

    if (response?.message) {
      if (Array.isArray(response.message)) {
        return response.message.join(", ");
      }
      return response.message;
    }

    if (response?.error) {
      return response.error;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
};
