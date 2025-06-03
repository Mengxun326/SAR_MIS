package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.dto.studentscore.StudentScoreQueryRequest;
import com.yupi.project.model.entity.StudentScore;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 学生成绩信息服务
 */
public interface StudentScoreService extends IService<StudentScore> {

    /**
     * 添加学生成绩信息
     *
     * @param studentScore
     * @return
     */
    boolean addStudentScore(StudentScore studentScore);

    /**
     * 更新学生成绩信息
     *
     * @param studentScore
     * @return
     */
    boolean updateStudentScore(StudentScore studentScore);

    /**
     * 分页获取学生成绩信息列表
     *
     * @param studentScoreQueryRequest
     * @return
     */
    Page<StudentScore> listStudentScoreByPage(StudentScoreQueryRequest studentScoreQueryRequest);

    /**
     * 计算学生绩点
     *
     * @param score
     * @return
     */
    BigDecimal calculateGradePoint(BigDecimal score);

    /**
     * 获取学生某学期的平均绩点
     *
     * @param studentId
     * @param semester
     * @return
     */
    BigDecimal getStudentGPA(String studentId, String semester);

    /**
     * 获取课程成绩分布
     *
     * @param courseCode
     * @param semester
     * @return 分数段及人数
     */
    Map<String, Integer> getCourseScoreDistribution(String courseCode, String semester);

    /**
     * 获取学生成绩趋势
     *
     * @param studentId
     * @return 学期-平均分
     */
    Map<String, BigDecimal> getStudentScoreTrend(String studentId);

    /**
     * 获取班级成绩排名
     *
     * @param courseCode
     * @param semester
     * @return 学号-排名
     */
    List<Map<String, Object>> getClassRanking(String courseCode, String semester);
} 