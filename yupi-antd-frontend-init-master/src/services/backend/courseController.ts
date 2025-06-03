// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加课程 POST /api/course/add */
export async function addCourseUsingPOST(body: API.CourseAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/course/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除课程 POST /api/course/delete */
export async function deleteCourseUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID获取课程信息 GET /api/course/get */
export async function getCourseByIdUsingGET(
  params: API.getCourseByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCourse_>('/api/course/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询课程列表 POST /api/course/list/page */
export async function listCourseByPageUsingPOST(
  body: API.CourseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourse_>('/api/course/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新课程信息 POST /api/course/update */
export async function updateCourseUsingPOST(
  body: API.CourseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 检查课程是否可选 GET /api/course/check */
export async function checkCourseUsingGET(
  params: API.checkCourseUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/check', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
} 