// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加课程 POST /api/course/add */
export async function addCourseUsingPOST(
  body: API.CourseAddRequest,
  options?: { [key: string]: any },
) {
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

/** 根据 id 获取课程 GET /api/course/get */
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

/** 分页获取课程列表 POST /api/course/list/page */
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

/** 更新课程 POST /api/course/update */
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

/** 查询教师课程列表 GET /api/course/teacher/list */
export async function getTeacherCoursesUsingGET(
  params: API.getTeacherCoursesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/course/teacher/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询院系课程统计 GET /api/course/stats/department */
export async function getDepartmentStatsUsingGET(
  params: API.getCourseStatsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/course/stats/department', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询课程类型统计 GET /api/course/stats/type */
export async function getCourseTypeStatsUsingGET(
  params: API.getCourseStatsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/course/stats/type', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 检查课程是否可以选课 GET /api/course/check */
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