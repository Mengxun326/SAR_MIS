// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加学生信息 POST /api/student/add */
export async function addStudentUsingPost(body: API.StudentAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/student/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除学生信息 POST /api/student/delete */
export async function deleteStudentUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID获取学生信息 GET /api/student/get */
export async function getStudentByIdUsingGet(
  params: API.getStudentByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudent_>('/api/student/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询学生列表 POST /api/student/list/page */
export async function listStudentByPageUsingPost(
  body: API.StudentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudent_>('/api/student/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新学生信息 POST /api/student/update */
export async function updateStudentUsingPost(
  body: API.StudentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
} 