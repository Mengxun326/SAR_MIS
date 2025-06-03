// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加健康信息 POST /api/student/health/add */
export async function addStudentHealthUsingPOST(
  body: API.StudentHealthAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/student/health/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除健康信息 POST /api/student/health/delete */
export async function deleteStudentHealthUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/health/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取健康信息 GET /api/student/health/get */
export async function getStudentHealthByIdUsingGET(
  params: API.getStudentHealthByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentHealth_>('/api/student/health/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取健康信息列表 POST /api/student/health/list/page */
export async function listStudentHealthByPageUsingPOST(
  body: API.StudentHealthQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentHealth_>('/api/student/health/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新健康信息 POST /api/student/health/update */
export async function updateStudentHealthUsingPOST(
  body: API.StudentHealthUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/health/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
} 