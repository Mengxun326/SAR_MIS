// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加处分记录 POST /api/student-punishment/add */
export async function addStudentPunishmentUsingPOST(
  body: API.StudentPunishmentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/student-punishment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除处分记录 POST /api/student-punishment/delete */
export async function deleteStudentPunishmentUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student-punishment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取处分记录 GET /api/student-punishment/get */
export async function getStudentPunishmentByIdUsingGET(
  params: API.getStudentPunishmentByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentPunishment_>('/api/student-punishment/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取处分记录列表 POST /api/student-punishment/list/page */
export async function listStudentPunishmentByPageUsingPOST(
  body: API.StudentPunishmentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentPunishment_>('/api/student-punishment/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新处分记录 POST /api/student-punishment/update */
export async function updateStudentPunishmentUsingPOST(
  body: API.StudentPunishmentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student-punishment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 处分解除 POST /api/student-punishment/revoke/{id} */
export async function revokeStudentPunishmentUsingPOST(
  params: API.revokePunishmentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id } = params;
  return request<API.BaseResponseBoolean_>(`/api/student-punishment/revoke/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
} 