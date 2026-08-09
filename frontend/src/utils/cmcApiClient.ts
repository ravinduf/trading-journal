import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { CMC_API } from "@/utils/api";

const CMC_BASE_URL = import.meta.env.DEV ? "/cmc-api" : CMC_API.baseURL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: CMC_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": CMC_API.key,
  },
});

export interface CmcApiClientOptions extends Omit<AxiosRequestConfig, "url" | "data"> {}

export interface CmcApiResponse<T = any> extends AxiosResponse<T> {}

class CmcApiClient {
  async get<T = any>(
    url: string,
    options?: CmcApiClientOptions
  ): Promise<CmcApiResponse<T>> {
    return axiosInstance.get<T>(url, options);
  }

  async post<T = any>(
    url: string,
    body?: any,
    options?: CmcApiClientOptions
  ): Promise<CmcApiResponse<T>> {
    return axiosInstance.post<T>(url, body, options);
  }

  async put<T = any>(
    url: string,
    body?: any,
    options?: CmcApiClientOptions
  ): Promise<CmcApiResponse<T>> {
    return axiosInstance.put<T>(url, body, options);
  }

  async patch<T = any>(
    url: string,
    body?: any,
    options?: CmcApiClientOptions
  ): Promise<CmcApiResponse<T>> {
    return axiosInstance.patch<T>(url, body, options);
  }

  async delete<T = any>(
    url: string,
    options?: CmcApiClientOptions
  ): Promise<CmcApiResponse<T>> {
    return axiosInstance.delete<T>(url, options);
  }
}

export const cmcApiClient = new CmcApiClient();

export default cmcApiClient;
