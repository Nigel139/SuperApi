import { useFetch, useRouter, type UseFetchOptions } from 'nuxt/app';
import { useNuxtApp } from '#app';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IResultData<T> {
    code: number;
    data: T;
    msg: string;
}

class HttpRequest {
    request<T = any>(url: string, method: Methods, data?: any, options?: UseFetchOptions<T>) {
        const nuxtApp = useNuxtApp();
        return new Promise((resolve, reject) => {
            const newOpts: UseFetchOptions<T> = {
                baseURL: base_url,
                method,
                ...options,
            };

            // 根据请求方法处理参数
            if (method === 'GET' || method === 'DELETE') {
                newOpts.params = data;
            } else if (method === 'POST' || method === 'PUT') {
                newOpts.body = data;
            }

            nuxtApp.$request(url, newOpts).then((res: any) => {
                const result = res.data?.value || res;
                if (result.status === 0) {
                    resolve(result.data);
                }
                else {
                    console.log('Result Error： ', result);
                }
            })
                .catch((error: any) => {
                    console.log('Request Error： ', error);
                    reject(error.response ? error.response._data : '服务器错误');
                });
        });
    }

    get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
        return this.request(url, 'GET', params, options);
    }

    post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
        return this.request(url, 'POST', data, options);
    }

    put<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
        return this.request(url, 'PUT', data, options);
    }

    delete<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
        return this.request(url, 'DELETE', params, options);
    }
}

const httpRequest = new HttpRequest();
export default httpRequest;