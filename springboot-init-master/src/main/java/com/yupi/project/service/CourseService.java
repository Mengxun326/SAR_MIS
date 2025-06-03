package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.course.CourseQueryRequest;
import com.yupi.project.model.entity.Course;

import java.util.List;
import java.util.Map;

/**
 * 课程信息服务
 */
public interface CourseService extends IService<Course> {

    /**
     * 添加课程信息
     *
     * @param course
     * @return
     */
    boolean addCourse(Course course);

    /**
     * 更新课程信息
     *
     * @param course
     * @return
     */
    boolean updateCourse(Course course);

    /**
     * 分页获取课程信息列表
     *
     * @param courseQueryRequest
     * @return
     */
    Page<Course> listCourseByPage(CourseQueryRequest courseQueryRequest);

    /**
     * 获取教师的课程列表
     *
     * @param teacherId
     * @param semester
     * @return
     */
    List<Course> getTeacherCourses(Long teacherId, String semester);

    /**
     * 获取院系课程统计
     *
     * @param semester
     * @return 院系-课程数量
     */
    Map<String, Integer> getDepartmentCourseStats(String semester);

    /**
     * 获取课程类型统计
     *
     * @param semester
     * @return 课程类型-课程数量
     */
    Map<String, Integer> getCourseTypeStats(String semester);

    /**
     * 检查课程是否可以选课
     *
     * @param courseId
     * @return
     */
    boolean checkCourseAvailable(Long courseId);
} 