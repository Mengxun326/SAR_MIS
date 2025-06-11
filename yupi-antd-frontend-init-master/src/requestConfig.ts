import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

// 与后端约定的响应数据格式
interface BackendResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

const isDev = process.env.NODE_ENV === 'development';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD,
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 请求地址
      const requestPath: string = response.config.url ?? '';

      // 响应数据 - 这里response.data才是后端返回的实际数据
      const responseData = response.data as BackendResponse;
      if (!responseData) {
        throw new Error('服务异常');
      }

      // 错误码处理 - 从responseData中获取code
      const code: number = responseData.code;
      
      // 未登录，且不为获取用户登录信息接口
      if (
        code === 40100 &&
        !requestPath.includes('user/get/login') &&
        !location.pathname.includes('/user/login')
      ) {
        // 避免重复重定向到登录页
        if (!location.pathname.includes('/user/login')) {
          const currentPath = location.pathname + location.search;
          // 只保留路径部分，避免URL过长
          const redirectPath = encodeURIComponent(currentPath);
          
          // 显示提示信息
          message.warning('登录已过期，请重新登录');
          
          // 延迟跳转，避免与其他操作冲突
          setTimeout(() => {
            window.location.href = `/user/login?redirect=${redirectPath}`;
          }, 500);
        }
        throw new Error('请先登录');
      }

      // 权限不足
      if (code === 40101) {
        message.error('权限不足，无法访问该资源');
        throw new Error('权限不足');
      }

      // 其他错误
      if (code !== 0) {
        const errorMessage = responseData.message ?? '服务器错误';
        message.error(errorMessage);
        throw new Error(errorMessage);
      }
      
      return response;
    },
  ],
};
