/* tslint:disable */
/* eslint-disable */
/**
 * NorthWind API
 * NorthWind Service API Documentation
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { NewOrderReqDTO } from '../models';
import { OrderDropdownListsResponse } from '../models';
import { QueryBasicOrderDTO } from '../models';
import { UpdateOrderCustomerNameDTO } from '../models';
/**
 * OrderApi - axios parameter creator
 * @export
 */
export const OrderApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {NewOrderReqDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createOrderPost: async (body?: NewOrderReqDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/CreateOrder`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        queryBasicOrderGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/QueryBasicOrder`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        queryOrderAddDropDownListsGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/QueryOrderAddDropDownLists`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} orderId 
         * @param {UpdateOrderCustomerNameDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCustomerNameOrderIdPut: async (orderId: number, body?: UpdateOrderCustomerNameDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orderId' is not null or undefined
            if (orderId === null || orderId === undefined) {
                throw new RequiredError('orderId','Required parameter orderId was null or undefined when calling updateCustomerNameOrderIdPut.');
            }
            const localVarPath = `/UpdateCustomerName/{orderId}`
                .replace(`{${"orderId"}}`, encodeURIComponent(String(orderId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OrderApi - functional programming interface
 * @export
 */
export const OrderApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {NewOrderReqDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createOrderPost(body?: NewOrderReqDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<number>>> {
            const localVarAxiosArgs = await OrderApiAxiosParamCreator(configuration).createOrderPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async queryBasicOrderGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<QueryBasicOrderDTO>>>> {
            const localVarAxiosArgs = await OrderApiAxiosParamCreator(configuration).queryBasicOrderGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async queryOrderAddDropDownListsGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<OrderDropdownListsResponse>>> {
            const localVarAxiosArgs = await OrderApiAxiosParamCreator(configuration).queryOrderAddDropDownListsGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} orderId 
         * @param {UpdateOrderCustomerNameDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCustomerNameOrderIdPut(orderId: number, body?: UpdateOrderCustomerNameDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await OrderApiAxiosParamCreator(configuration).updateCustomerNameOrderIdPut(orderId, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * OrderApi - factory interface
 * @export
 */
export const OrderApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {NewOrderReqDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createOrderPost(body?: NewOrderReqDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
            return OrderApiFp(configuration).createOrderPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async queryBasicOrderGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<QueryBasicOrderDTO>>> {
            return OrderApiFp(configuration).queryBasicOrderGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async queryOrderAddDropDownListsGet(options?: AxiosRequestConfig): Promise<AxiosResponse<OrderDropdownListsResponse>> {
            return OrderApiFp(configuration).queryOrderAddDropDownListsGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} orderId 
         * @param {UpdateOrderCustomerNameDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCustomerNameOrderIdPut(orderId: number, body?: UpdateOrderCustomerNameDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return OrderApiFp(configuration).updateCustomerNameOrderIdPut(orderId, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * OrderApi - object-oriented interface
 * @export
 * @class OrderApi
 * @extends {BaseAPI}
 */
export class OrderApi extends BaseAPI {
    /**
     * 
     * @param {NewOrderReqDTO} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public async createOrderPost(body?: NewOrderReqDTO, options?: AxiosRequestConfig) : Promise<AxiosResponse<number>> {
        return OrderApiFp(this.configuration).createOrderPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public async queryBasicOrderGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<QueryBasicOrderDTO>>> {
        return OrderApiFp(this.configuration).queryBasicOrderGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public async queryOrderAddDropDownListsGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<OrderDropdownListsResponse>> {
        return OrderApiFp(this.configuration).queryOrderAddDropDownListsGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} orderId 
     * @param {UpdateOrderCustomerNameDTO} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public async updateCustomerNameOrderIdPut(orderId: number, body?: UpdateOrderCustomerNameDTO, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return OrderApiFp(this.configuration).updateCustomerNameOrderIdPut(orderId, body, options).then((request) => request(this.axios, this.basePath));
    }
}