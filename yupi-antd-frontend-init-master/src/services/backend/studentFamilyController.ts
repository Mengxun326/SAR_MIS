// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加家庭信息 POST /api/student/family/add */
export async function addStudentFamilyUsingPOST(
  body: API.StudentFamilyAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/student/family/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除家庭信息 POST /api/student/family/delete */
export async function deleteStudentFamilyUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/family/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取家庭信息 GET /api/student/family/get */
export async function getStudentFamilyByIdUsingGET(
  params: API.getStudentFamilyByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentFamily_>('/api/student/family/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取家庭信息列表 POST /api/student/family/list/page */
export async function listStudentFamilyByPageUsingPOST(
  body: API.StudentFamilyQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentFamily_>('/api/student/family/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新家庭信息 POST /api/student/family/update */
export async function updateStudentFamilyUsingPOST(
  body: API.StudentFamilyUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/family/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
} 