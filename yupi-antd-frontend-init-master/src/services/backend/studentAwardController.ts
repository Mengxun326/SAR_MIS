// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加奖励记录 POST /api/student/award/add */
export async function addStudentAwardUsingPOST(
  body: API.StudentAwardAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/student/award/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除奖励记录 POST /api/student/award/delete */
export async function deleteStudentAwardUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/award/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取奖励记录 GET /api/student/award/get */
export async function getStudentAwardByIdUsingGET(
  params: API.getStudentAwardByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentAward_>('/api/student/award/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取奖励记录列表 POST /api/student/award/list/page */
export async function listStudentAwardByPageUsingPOST(
  body: API.StudentAwardQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentAward_>('/api/student/award/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新奖励记录 POST /api/student/award/update */
export async function updateStudentAwardUsingPOST(
  body: API.StudentAwardUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/award/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
} 