import { localStorage } from '@/utils/localstorage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const injectToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig | any> => {
    try {
      const token = localStorage.getString('accessToken');
  
      if (token != null) {
        if (!config) {
          config = {};
        }
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      const err: any = error;
      throw new Error(err);
    }
  };

class Http {
    private instance: AxiosInstance | null = null;
  
    private get http(): AxiosInstance {
      return this.instance != null ? this.instance : this.initHttp();
    }
  
    initHttp() {
      const http = axios.create({
        // baseURL: process.env.EXPO_PUBLIC_APP_BASE_URL,
        baseURL: 'https://0462-80-4-132-235.ngrok-free.app'
      });
  
      http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
  
      http.interceptors.response.use(
        (response) => response,
        (error) => {
          const { response } = error;
          if (response.data.message && response.status !== 401) {
            console.log(response.data.message);
          } else {
            response.status !== 401 &&
            console.log('handle error');
            
            console.log('Something went wrong. Please check your connection and try again or contact support...');
          }
  
          return this.handleError(response);
        },
      );
  
      this.instance = http;
      return http;
    }
  
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
      return this.http.request(config);
    }
  
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.http.get<T, R>(url, config);
    }
  
    post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
      return this.http.post<T, R>(url, data, config);
    }
  
    put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
      return this.http.put<T, R>(url, data, config);
    }
  
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
      return this.http.patch<T, R>(url, data, config);
    }
  
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.http.delete<T, R>(url, config);
    }
  
    private handleError(error: { status: any }) {
      // const { status } = error;
      // console.log(error);
      // function to handle error here
      return Promise.reject(error);
    }
  }
  
  export const httpClient = new Http();
  