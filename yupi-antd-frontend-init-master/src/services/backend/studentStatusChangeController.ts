// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加学籍异动申请 POST /api/student-status-change/add */
export async function addStudentStatusChangeUsingPOST(
  body: API.StudentStatusChangeAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/student-status-change/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除学籍异动申请 POST /api/student-status-change/delete */
export async function deleteStudentStatusChangeUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student-status-change/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取学籍异动记录 GET /api/student-status-change/get */
export async function getStudentStatusChangeByIdUsingGET(
  params: { id: string },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentStatusChange_>('/api/student-status-change/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取学籍异动记录列表 POST /api/student-status-change/list/page */
export async function listStudentStatusChangeByPageUsingPOST(
  body: API.StudentStatusChangeQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentStatusChange_>('/api/student-status-change/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新学籍异动申请 POST /api/student-status-change/update */
export async function updateStudentStatusChangeUsingPOST(
  body: API.StudentStatusChangeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student-status-change/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审批学籍异动申请 POST /api/student-status-change/approve/{id} */
export async function approveStudentStatusChangeUsingPOST(
  id: string,
  approvalStatus: string,
  approvalComment?: string,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(`/api/student-status-change/approve/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams({
      approvalStatus,
      ...(approvalComment ? { approvalComment } : {}),
    }),
    ...(options || {}),
  });
} 