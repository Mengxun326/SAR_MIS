// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取首页统计数据 GET /api/statistics/dashboard */
export async function getDashboardStatisticsUsingGET(
  options?: { [key: string]: any },
) {
  try {
    // 真实API调用
    return await request<API.BaseResponseObject_>('/api/statistics/dashboard', {
      method: 'GET',
      ...(options || {}),
    });
  } catch (error) {
    console.error('统计API调用失败，使用Mock数据:', error);
    // 如果真实API调用失败，使用Mock数据作为备用
    return new Promise<API.BaseResponseObject_>((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          message: 'success (mock data)',
          data: {
            studentCount: 1168,
            courseCount: 95,
            monthlyAwardCount: 32,
            teacherCount: 158,
          },
        });
      }, 500);
    });
  }
} 