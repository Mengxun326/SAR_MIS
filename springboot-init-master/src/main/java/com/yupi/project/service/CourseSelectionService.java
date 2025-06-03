package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.courseselection.CourseSelectionQueryRequest;
import com.yupi.project.model.entity.CourseSelection;
import com.yupi.project.model.vo.CourseSelectionVO;

import java.util.List;
import java.util.Map;

/**
 * 选课信息服务
 */
public interface CourseSelectionService extends IService<CourseSelection> {

    /**
     * 学生选课
     *
     * @param studentId
     * @param courseId
     * @return
     */
    boolean selectCourse(Long studentId, Long courseId);

    /**
     * 学生退课
     *
     * @param studentId
     * @param courseId
     * @return
     */
    boolean dropCourse(Long studentId, Long courseId);

    /**
     * 分页获取选课信息列表
     *
     * @param courseSelectionQueryRequest
     * @return
     */
    Page<CourseSelectionVO> listCourseSelectionByPage(CourseSelectionQueryRequest courseSelectionQueryRequest);

    /**
     * 获取学生的选课列表
     *
     * @param studentId
     * @return
     */
    List<CourseSelectionVO> getStudentCourseSelections(Long studentId);

    /**
     * 获取课程的选课学生列表
     *
     * @param courseId
     * @return
     */
    List<CourseSelectionVO> getCourseStudentSelections(Long courseId);

    /**
     * 检查学生是否已选某课程
     *
     * @param studentId
     * @param courseId
     * @return
     */
    boolean checkStudentSelected(Long studentId, Long courseId);

    /**
     * 获取选课统计信息
     *
     * @param courseId
     * @return 状态-数量
     */
    Map<String, Integer> getCourseSelectionStats(Long courseId);
} 