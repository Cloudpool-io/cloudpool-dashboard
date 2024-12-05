import { AxiosError } from "axios";

interface CustomResponseData {
  code?: string;
  message?: string;
}

export interface CustomAxiosError extends AxiosError<CustomResponseData> { }
