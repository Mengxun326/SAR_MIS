// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 学生选课 POST /api/course-selection/select */
export async function selectCourseUsingPOST(
  body: API.CourseSelectionRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course-selection/select', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退课 POST /api/course-selection/drop/{courseId} */
export async function dropCourseUsingPOST(
  params: API.dropCourseUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { courseId } = params;
  return request<API.BaseResponseBoolean_>(`/api/course-selection/drop/${courseId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 分页查询选课记录 POST /api/course-selection/list/page */
export async function listCourseSelectionByPageUsingPOST(
  body: API.CourseSelectionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseSelection_>('/api/course-selection/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取学生选课列表 GET /api/course-selection/student/list */
export async function getStudentCourseSelectionUsingGET(
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject_>('/api/course-selection/student/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取课程选课学生列表 GET /api/course-selection/course/{courseId}/students */
export async function getCourseStudentsUsingGET(
  params: API.getCourseStudentsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { courseId } = params;
  return request<API.BaseResponseObject_>(`/api/course-selection/course/${courseId}/students`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 检查学生是否已选某课程 GET /api/course-selection/check/{courseId} */
export async function checkCourseSelectionUsingGET(
  params: API.checkCourseSelectionUsingGETParams,
  options?: { [key: string]: any },
) {
  const { courseId } = params;
  return request<API.BaseResponseBoolean_>(`/api/course-selection/check/${courseId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取选课统计信息 GET /api/course-selection/stats/{courseId} */
export async function getCourseSelectionStatsUsingGET(
  params: API.getCourseSelectionStatsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { courseId } = params;
  return request<API.BaseResponseObject_>(`/api/course-selection/stats/${courseId}`, {
    method: 'GET',
    ...(options || {}),
  });
} 