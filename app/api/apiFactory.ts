import axios, {AxiosInstance} from 'axios';
import {Configuration} from './NorthWindService/configuration';
import {
    OrderApi,
} from './NorthWindService/api';

// 定義服務介面
export interface ApiServices {
    orders: OrderApi;
}


export default class ApiFactory {
    private static instance: ApiFactory;
    private axiosInstance: AxiosInstance;
    private readonly services: ApiServices;


    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // 建立配置
        const configuration = new Configuration({
            basePath: process.env.NEXT_PUBLIC_API_URL,
            baseOptions: {
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                headers: this.axiosInstance.defaults.headers,
            },
        });

        // 註冊所有服務
        this.services = {
            orders: new OrderApi(configuration),
        };

        // 配置攔截器
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(
            // (config) => {
            //     const token = localStorage.getItem('token');
            //     if (token) {
            //         config.headers.Authorization = `Bearer ${token}`;
            //     }
            //     return config;
            // },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // 處理未授權
                            break;
                        case 403:
                            // 處理禁止訪問
                            break;
                        case 404:
                            // 處理未找到
                            break;
                        default:
                            console.error('API Error:', error);
                            break;
                    }
                }
                return Promise.reject(error);
            }
        );
    }


    public static getInstance(): ApiFactory {
        if (!ApiFactory.instance) {
            ApiFactory.instance = new ApiFactory();
        }
        return ApiFactory.instance;
    }

    public getService<K extends keyof ApiServices>(serviceName: K): ApiServices[K] {
        return this.services[serviceName];
    }

}