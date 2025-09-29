import { useFetch, useRouter, type UseFetchOptions } from 'nuxt/app';
import { useNuxtApp } from '#app';
import { ElMessage, ElMessageBox } from 'element-plus'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IResultData<T> {
  code: number;
  data: T;
  msg: string;
}

class HttpRequest {
  request<T = any>(url: string, method: Methods, data?: any, options?: UseFetchOptions<T>) {
    const nuxtApp = useNuxtApp();
    if(!import.meta.client) return;

    return new Promise((resolve, reject) => {
      const newOpts: UseFetchOptions<T> = {
        baseURL: base_url,
        method,
        ...options,
      };

      const userStore = useStore.userStore();
      if (userStore.token) {
        newOpts.headers = {
          ...newOpts.headers,
          token: userStore.token,
        };
      }

      // 根据请求方法处理参数
      if (method === 'GET' || method === 'DELETE') {
        newOpts.params = data;
      } else if (method === 'POST' || method === 'PUT') {
        newOpts.body = data;
      }
      
      //const fetchMethod = (import.meta.client && !nuxtApp.isHydrating) ? nuxtApp.$request : useFetch as any;
      // console.log('import.meta.client: ', import.meta.client)
      const fetchMethod = nuxtApp.$request;
      fetchMethod(url, newOpts).then((res: any) => {
        const result = res.data?.value || res;
        // console.log('newOpts:', newOpts)
        // if(result.status==undefined) console.log('result.status is null')
        if (result.status === 0) {          
          if (result.data.code && result.data.code !== '0') ElMessage.error(result.data.msg);
          else resolve(result.data);
        }
        else if (result.status === 2) {          
          ElMessageBox.alert(result.message, '', {
            confirmButtonText: '重新登录',
            type: 'error',
            showClose: false
          }).then(()=>{
              const router = useRouter()
              router.push('/login');
          })
        } 
        else {
          if (import.meta.client) {
            ElMessage.error(result.message);
          } else {
            console.log('SSR Error： ', result.message);
          }
        }
      })
        .catch((error: any) => {
          let errorMessage = '服务器错误';
          if (error.response && error.response._data) {
            let data = error.response._data;
            if (typeof error.response._data === 'string') {
              try {
                data = JSON.parse(error.response._data);
              } catch (e) {
                errorMessage = error.response._data;
              }
            }
            if (data.errors) {
              const errorMessages = [];
              for (const key in data.errors) {
                errorMessages.push(`${data.errors[key].join(', ')}`);
              }
              errorMessage = errorMessages.join('；') || errorMessage;
            } else {
              errorMessage = data.message || errorMessage;
            }
          }
          if (import.meta.client) {
            ElMessage.error(errorMessage);
          }
          if (error.response && [40001, 40002, 40003].includes(error.response._data.code)) {
            resolve(error.response._data);
          }
          reject(error.response ? error.response._data : errorMessage);
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