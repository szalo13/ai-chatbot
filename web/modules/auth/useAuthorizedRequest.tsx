import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuth } from "./auth.context";

export const useAuthorizedRequest = () => {
  const auth = useAuth();

  const getConfig = (newConfig: AxiosRequestConfig<any> | undefined) => {
    const config = newConfig || {};

    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${auth.getToken()}`,
      },
    };
  };

  const handleRequest = async (request: Promise<AxiosResponse<any, any>>) => {
    try {
      const res = await request;
      return res;
    } catch (error) {
      if ((error as any).response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const get = (
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any, any>> => {
    return handleRequest(axios.get(url, getConfig(config)));
  };

  const post = (
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any, any>> => {
    return handleRequest(axios.post(url, data, getConfig(config)));
  };

  const put = (
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any, any>> => {
    return handleRequest(axios.put(url, data, getConfig(config)));
  };

  const del = (
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any, any>> => {
    return handleRequest(axios.delete(url, getConfig(config)));
  };

  return { get, post, put, delete: del };
};
