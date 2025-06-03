// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加成绩 POST /api/student/score/add */
export async function addStudentScoreUsingPOST(
  body: API.StudentScoreAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/student/score/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除成绩 POST /api/student/score/delete */
export async function deleteStudentScoreUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/score/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取成绩 GET /api/student/score/get */
export async function getStudentScoreByIdUsingGET(
  params: API.getStudentScoreByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentScore_>('/api/student/score/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取成绩列表 POST /api/student/score/list/page */
export async function listStudentScoreByPageUsingPOST(
  body: API.StudentScoreQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentScore_>('/api/student/score/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新成绩 POST /api/student/score/update */
export async function updateStudentScoreUsingPOST(
  body: API.StudentScoreUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/student/score/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 计算学生GPA GET /api/student/score/gpa */
export async function getStudentGpaUsingGET(
  params: API.getGpaUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseNumber_>('/api/student/score/gpa', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取课程成绩分布 GET /api/student/score/distribution */
export async function getScoreDistributionUsingGET(
  params: API.getScoreDistributionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/student/score/distribution', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取学生成绩趋势 GET /api/student/score/trend */
export async function getScoreTrendUsingGET(
  params: API.getScoreTrendUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/student/score/trend', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取班级成绩排名 GET /api/student/score/ranking */
export async function getScoreRankingUsingGET(
  params: API.getScoreRankingUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/student/score/ranking', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
} 